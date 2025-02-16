
import { useState } from "react";
import { PanInfo } from "framer-motion";
import { addWeeks, subWeeks, addMonths, subMonths } from "date-fns";
import { Event } from "../types";

interface UseCalendarNavigationProps {
  currentDate: Date;
  isWeekView: boolean;
  onSelectDate: (date: Date, events: Event[]) => void;
}

export const useCalendarNavigation = ({ currentDate, isWeekView, onSelectDate }: UseCalendarNavigationProps) => {
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      return;
    }

    const threshold = 50;
    const velocity = 0.5;

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

  return { dragDirection, handleDragEnd };
};
