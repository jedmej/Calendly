import React, { useState } from "react";
import { WeekView } from "./WeekView";
import { MonthView } from "./MonthView";
import { CalendarGridProps } from "./types";
import { useCalendarEvents } from "./hooks/useCalendarEvents";
import { useCalendarNavigation } from "./hooks/useCalendarNavigation";
import { getMonthDays, getWeekDays } from "./utils/dateHelpers";
import { isSameDay } from "date-fns";

export const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  view, 
  currentDate, 
  onSelectDate, 
  onInitialLoad 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isWeekView = view === "week";
  
  const events = useCalendarEvents(currentDate, onInitialLoad);
  const { dragDirection, handleDragEnd } = useCalendarNavigation({
    currentDate,
    isWeekView,
    onSelectDate
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const dayEvents = events.filter(event => {
      const eventDate = event.event_date || event.transaction_date;
      return eventDate && isSameDay(new Date(eventDate), date);
    });
    onSelectDate(date, dayEvents);
  };

  if (isWeekView) {
    const weekDays = getWeekDays(currentDate);
    return (
      <WeekView
        weekDays={weekDays}
        events={events}
        selectedDate={selectedDate}
        dragDirection={dragDirection}
        currentDate={currentDate}
        onDragEnd={handleDragEnd}
        onSelect={handleDateSelect}
      />
    );
  }

  const monthDays = getMonthDays(currentDate);
  const weeks = Array.from({ length: Math.ceil(monthDays.length / 7) }, (_, i) =>
    monthDays.slice(i * 7, (i + 1) * 7)
  );

  return (
    <MonthView
      weeks={weeks}
      events={events}
      selectedDate={selectedDate}
      dragDirection={dragDirection}
      currentDate={currentDate}
      onDragEnd={handleDragEnd}
      onSelect={handleDateSelect}
    />
  );
};