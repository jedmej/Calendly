
import React from "react";
import { motion } from "framer-motion";
import { Day } from "./Day";
import { WeekHeader } from "./WeekHeader";
import { Event } from "./types";
import { isSameDay } from "date-fns";

interface WeekViewProps {
  weekDays: Date[];
  events: Event[];
  selectedDate: Date | null;
  dragDirection: "left" | "right" | null;
  currentDate: Date;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: any) => void;
  onSelect: (date: Date) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  weekDays,
  events,
  selectedDate,
  dragDirection,
  currentDate,
  onDragEnd,
  onSelect
}) => {
  return (
    <motion.div 
      className="border w-full overflow-hidden mt-4 rounded-2xl border-[rgba(238,238,238,1)] border-solid"
      drag="x"
      dragDirectionLock
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={onDragEnd}
      dragMomentum={false}
      whileTap={{ cursor: "grabbing" }}
    >
      <WeekHeader />
      <div className="flex min-h-[60px] md:min-h-[80px] lg:min-h-[100px] w-full items-stretch gap-px">
        {weekDays.map((date, index) => (
          <Day
            key={index}
            date={date}
            events={events}
            isWeekView={true}
            isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
            onSelect={onSelect}
          />
        ))}
      </div>
    </motion.div>
  );
};
