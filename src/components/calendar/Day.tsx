
import React from "react";
import { isSameMonth, isSameDay, isToday, format } from "date-fns";
import { startOfMonth } from "date-fns";
import { Event } from "./types";

interface DayProps {
  date: Date;
  events: Event[];
  isWeekView?: boolean;
  isSelected?: boolean;
  onSelect: (date: Date) => void;
}

export const Day: React.FC<DayProps> = ({ 
  date, 
  events, 
  isWeekView = false, 
  isSelected = false, 
  onSelect 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(date);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  const getEventColor = (event: Event) => {
    if (event.amount !== undefined && event.type !== undefined) {
      return "bg-[#F97316]";
    }
    
    switch (event.category?.toLowerCase()) {
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
      onClick={handleClick}
      onPointerDown={handlePointerDown}
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
