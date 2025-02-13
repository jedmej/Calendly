
import React, { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addDays, startOfWeek, isSameMonth, isSameDay, isToday } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  title: string;
  event_date?: string;
  transaction_date?: string;
  category: string;
  start_time?: string;
  end_time?: string;
  coworkers?: string[] | null;
  hourly_wage?: number | null;
  amount?: number;
  type?: 'income' | 'expense';
}

interface DayProps {
  date: Date;
  events: Event[];
  isWeekView?: boolean;
  isSelected?: boolean;
  onSelect: (date: Date) => void;
}

const Day: React.FC<DayProps> = ({ date, events, isWeekView = false, isSelected = false, onSelect }) => {
  const getEventColor = (event: Event) => {
    // If it's a transaction (has amount and type), return yellow
    if (event.amount !== undefined && event.type !== undefined) {
      return "bg-[#FEF7CD]";
    }
    
    // For regular events, use the existing color logic
    switch (event.category.toLowerCase()) {
      case "work":
        return "bg-[rgba(59,130,246,0.7)]";
      case "school":
        return "bg-green-600";
      case "other":
        return "bg-[rgba(222,159,34,1)]";
      default:
        return "bg-gray-400";
    }
  };

  const isCurrentDay = isToday(date);
  const dayEvents = events.filter(event => {
    const eventDate = event.event_date || event.transaction_date;
    return eventDate && isSameDay(new Date(eventDate), date);
  });

  return (
    <div 
      onClick={() => onSelect(date)}
      className={`
        flex flex-col items-center cursor-pointer
        ${isWeekView ? 'min-h-[60px]' : 'w-[49px] h-[49px]'} 
        flex-1 shrink basis-[0%] px-2 py-3 
        ${!isSameMonth(date, startOfMonth(date)) ? 'opacity-50' : ''}
        ${isSelected ? 'bg-blue-100' : isCurrentDay ? 'bg-[rgba(235,241,254,1)]' : 'bg-[rgba(255,255,255,0.5)]'}
        hover:bg-blue-50 transition-colors
      `}
    >
      <div className="text-gray-900 text-xs font-medium leading-loose">
        {format(date, 'd')}
      </div>
      {dayEvents.length > 0 && (
        <div className="flex gap-1 mt-1">
          {dayEvents.map((event, index) => (
            <div
              key={event.id}
              className={`flex min-h-1.5 w-1.5 h-1.5 rounded-full ${getEventColor(event)}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const WeekHeader: React.FC = () => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // Convert Sunday = 0 to Sunday = 6

  return (
    <div className="flex w-full gap-px text-xs text-gray-600 font-medium whitespace-nowrap text-center leading-loose">
      {days.map((day, index) => (
        <div
          key={index}
          className={`min-h-[48px] flex-1 shrink px-[17px] py-[5px] flex items-center justify-center ${
            index === currentDayIndex ? "bg-blue-600 text-white" : "bg-[rgba(0,0,0,0.02)]"
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

interface CalendarGridProps {
  view: "week" | "month";
  currentDate: Date;
  onSelectDate: (date: Date, events: Event[]) => void;
}

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

        const allEvents = [
          ...(eventsResult.data || []),
          ...(transactionsResult.data?.map(transaction => ({
            ...transaction,
            event_date: transaction.transaction_date
          })) || [])
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
