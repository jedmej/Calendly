
import React, { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, addDays, startOfWeek, isSameDay } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Day } from "./Day";
import { WeekHeader } from "./WeekHeader";
import { Event, CalendarGridProps } from "./types";

export const CalendarGrid: React.FC<CalendarGridProps> = ({ view, currentDate, onSelectDate }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isWeekView = view === "week";

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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEventsAndTransactions();
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const dayEvents = events.filter(event => {
      const eventDate = event.event_date || event.transaction_date;
      return eventDate && isSameDay(new Date(eventDate), date);
    });
    onSelectDate(date, dayEvents);
  };

  const getMonthDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const firstWeek = startOfWeek(start, { weekStartsOn: 1 });
    const totalDays = eachDayOfInterval({ start: firstWeek, end });
    return totalDays;
  };

  const getWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  if (isWeekView) {
    const weekDays = getWeekDays();
    return (
      <div className="border w-full overflow-hidden mt-4 rounded-2xl border-[rgba(238,238,238,1)] border-solid">
        <WeekHeader />
        <div className="flex min-h-[60px] w-full items-stretch gap-px">
          {weekDays.map((date, index) => (
            <Day
              key={index}
              date={date}
              events={events}
              isWeekView={true}
              isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
              onSelect={handleDateSelect}
            />
          ))}
        </div>
      </div>
    );
  }

  const monthDays = getMonthDays();
  const weeks = Array.from({ length: Math.ceil(monthDays.length / 7) }, (_, i) =>
    monthDays.slice(i * 7, (i + 1) * 7)
  );

  return (
    <div className="border w-full overflow-hidden mt-4 rounded-2xl border-[rgba(238,238,238,1)] border-solid">
      <WeekHeader />
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex min-h-[50px] w-full items-stretch gap-px">
          {week.map((date, dayIndex) => (
            <Day
              key={dayIndex}
              date={date}
              events={events}
              isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
              onSelect={handleDateSelect}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
