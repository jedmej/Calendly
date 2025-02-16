
import { useState, useEffect } from "react";
import { isSameDay } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Event } from "../types";

export const useCalendarEvents = (currentDate: Date, onInitialLoad?: (events: Event[]) => void) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEventsAndTransactions = async () => {
      try {
        const [eventsResult, transactionsResult] = await Promise.all([
          supabase.from('events').select('*'),
          supabase.from('transactions').select('*')
        ]);
        
        if (eventsResult.error) throw eventsResult.error;
        if (transactionsResult.error) throw transactionsResult.error;

        const transformedTransactions: Event[] = transactionsResult.data?.map((transaction: any) => ({
          id: transaction.id,
          title: transaction.title,
          amount: transaction.amount,
          category: transaction.category,
          transaction_date: transaction.transaction_date,
          type: transaction.type === 'income' ? 'income' : 'expense'
        })) || [];

        const allEvents: Event[] = [
          ...(eventsResult.data || []),
          ...transformedTransactions
        ];

        setEvents(allEvents);

        const currentDateEvents = allEvents.filter(event => {
          const eventDate = event.event_date || event.transaction_date;
          return eventDate && isSameDay(new Date(eventDate), currentDate);
        });
        
        if (onInitialLoad) {
          onInitialLoad(currentDateEvents);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEventsAndTransactions();
  }, [currentDate, onInitialLoad]);

  return events;
};
