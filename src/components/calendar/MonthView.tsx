
import React from "react";
import { motion } from "framer-motion";
import { Day } from "./Day";
import { WeekHeader } from "./WeekHeader";
import { Event } from "./types";
import { isSameDay } from "date-fns";
import { calendarVariants } from "./utils/animations";

interface MonthViewProps {
  weeks: Date[][];
  events: Event[];
  selectedDate: Date | null;
  dragDirection: "left" | "right" | null;
  currentDate: Date;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: any) => void;
  onSelect: (date: Date) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  weeks,
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
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentDate.toISOString()}
          variants={calendarVariants}
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
                  onSelect={onSelect}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
