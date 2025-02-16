
import React, { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, addDays, startOfWeek, isSameDay, addMonths, subMonths, addWeeks, subWeeks } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Day } from "./Day";
import { WeekHeader } from "./WeekHeader";
import { Event, CalendarGridProps } from "./types";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

export const CalendarGrid: React.FC<CalendarGridProps> = ({ view, currentDate, onSelectDate, onInitialLoad }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isWeekView = view === "week";
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null);

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
  }, [currentDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const dayEvents = events.filter(event => {
      const eventDate = event.event_date || event.transaction_date;
      return eventDate && isSameDay(new Date(eventDate), date);
    });
    onSelectDate(date, dayEvents);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Ignore vertical swipes
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      return;
    }

    const threshold = 50; // Increased threshold to prevent accidental triggers
    const velocity = 0.5; // Increased velocity threshold

    if (Math.abs(info.velocity.x) < velocity || Math.abs(info.offset.x) < threshold) {
      return;
    }

    if (info.offset.x > 0) {
      setDragDirection("right");
      if (isWeekView) {
        onSelectDate(subWeeks(currentDate, 1), []);
      } else {
        onSelectDate(subMonths(currentDate, 1), []);
      }
    } else {
      setDragDirection("left");
      if (isWeekView) {
        onSelectDate(addWeeks(currentDate, 1), []);
      } else {
        onSelectDate(addMonths(currentDate, 1), []);
      }
    }
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

  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? -300 : 300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0
    })
  };

  if (isWeekView) {
    const weekDays = getWeekDays();
    return (
      <motion.div 
        className="border w-full overflow-hidden mt-4 rounded-2xl border-[rgba(238,238,238,1)] border-solid"
        drag="x"
        dragDirectionLock // Lock drag to horizontal direction only
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        dragMomentum={false}
      >
        <WeekHeader />
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentDate.toISOString()}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.2,
              ease: "easeOut"
            }}
            custom={dragDirection}
            className="flex min-h-[60px] md:min-h-[80px] lg:min-h-[100px] w-full items-stretch gap-px"
          >
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
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }

  const monthDays = getMonthDays();
  const weeks = Array.from({ length: Math.ceil(monthDays.length / 7) }, (_, i) =>
    monthDays.slice(i * 7, (i + 1) * 7)
  );

  return (
    <motion.div 
      className="border w-full overflow-hidden mt-4 rounded-2xl border-[rgba(238,238,238,1)] border-solid"
      drag="x"
      dragDirectionLock // Lock drag to horizontal direction only
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      dragMomentum={false}
    >
      <WeekHeader />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentDate.toISOString()}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
          custom={dragDirection}
        >
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex min-h-[50px] md:min-h-[70px] lg:min-h-[90px] w-full items-stretch gap-px">
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
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
