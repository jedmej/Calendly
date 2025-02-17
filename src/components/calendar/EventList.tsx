import React from "react";
import { CalendarEvent } from "./CalendarEvent";
import { motion, AnimatePresence } from "framer-motion";
import { addDays, subDays, format } from "date-fns";
import { calendarVariants } from "./utils/animations";
interface EventListProps {
  date: string;
  events: Array<{
    id?: string;
    icon?: string;
    title: string;
    time?: string;
    location?: string;
    withPeople?: string[];
    amount?: {
      value: number;
      type: "income" | "expense";
    } | number;
    category?: string;
    event_date?: string;
    transaction_date?: string;
    start_time?: string;
    end_time?: string;
    hourly_wage?: number;
    total_earnings?: number;
    type?: 'income' | 'expense';
  }>;
  onDateChange?: (date: Date) => void;
}
export const EventList: React.FC<EventListProps> = ({
  date,
  events,
  onDateChange
}) => {
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    if (!onDateChange) return;
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      return;
    }
    const threshold = 50;
    const velocity = 0.5;
    if (Math.abs(info.velocity.x) < velocity || Math.abs(info.offset.x) < threshold) {
      return;
    }
    const currentDate = new Date(date);
    if (info.offset.x > 0) {
      onDateChange(subDays(currentDate, 1));
    } else {
      onDateChange(addDays(currentDate, 1));
    }
  };
  return <motion.div drag="x" dragDirectionLock dragConstraints={{
    left: 0,
    right: 0
  }} dragElastic={0.1} onDragEnd={handleDragEnd} dragMomentum={false} className="bg-[rgba(255,255,255,0.7)] border w-full mt-4 p-4 border-[rgba(255,255,255,0.2)] border-solid rounded-3xl">
      <div className="self-stretch min-h-7 w-full gap-1 text-[15px] text-gray-900 font-medium leading-7">
        Wydarzenia na dzień <span className="font-bold">{date}</span>
      </div>
      <AnimatePresence initial={false} mode="wait">
        <motion.div key={date} variants={calendarVariants} initial="enter" animate="center" exit="exit" transition={{
        duration: 0.2,
        ease: "easeOut"
      }}>
          {events.map((event, index) => <CalendarEvent key={index} {...event} amount={event.amount} type={event.type} transaction_date={event.transaction_date} />)}
        </motion.div>
      </AnimatePresence>
    </motion.div>;
};