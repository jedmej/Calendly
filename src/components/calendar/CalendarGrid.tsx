
import React from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addDays, startOfWeek, isSameMonth, isSameDay, isToday } from "date-fns";

interface DayProps {
  date: Date;
  events: {
    type: "blue" | "green" | "orange";
  }[];
  isWeekView?: boolean;
}

const Day: React.FC<DayProps> = ({ date, events, isWeekView = false }) => {
  const getEventColor = (type: "blue" | "green" | "orange") => {
    switch (type) {
      case "blue":
        return "bg-[rgba(59,130,246,0.7)]";
      case "green":
        return "bg-green-600";
      case "orange":
        return "bg-[rgba(222,159,34,1)]";
    }
  };

  const isCurrentDay = isToday(date);

  return (
    <div 
      className={`
        flex flex-col items-center 
        ${isWeekView ? 'min-h-[60px]' : 'w-[49px] h-[49px]'} 
        flex-1 shrink basis-[0%] px-2 py-3 
        ${!isSameMonth(date, startOfMonth(date)) ? 'opacity-50' : ''}
        ${isCurrentDay ? 'bg-[rgba(235,241,254,1)]' : 'bg-[rgba(255,255,255,0.5)]'}
      `}
    >
      <div className="text-gray-900 text-xs font-medium leading-loose">
        {format(date, 'd')}
      </div>
      {events.length > 0 && (
        <div className="flex gap-1 mt-1">
          {events.map((event, index) => (
            <div
              key={index}
              className={`flex min-h-1.5 w-1.5 h-1.5 rounded-full ${getEventColor(event.type)}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const WeekHeader: React.FC = () => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="flex w-full gap-px text-xs text-gray-600 font-medium whitespace-nowrap text-center leading-loose">
      {days.map((day, index) => (
        <div
          key={index}
          className={`min-h-[48px] flex-1 shrink px-[17px] py-[5px] flex items-center justify-center ${
            day === "F" ? "bg-blue-600 text-white" : "bg-[rgba(0,0,0,0.02)]"
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
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ view, currentDate }) => {
  const isWeekView = view === "week";

  const getMonthDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const firstWeek = startOfWeek(start);
    const totalDays = eachDayOfInterval({ start: firstWeek, end });
    return totalDays;
  };

  const getWeekDays = () => {
    const start = startOfWeek(currentDate);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const getDayEvents = (date: Date) => {
    // Mock events - you can replace this with real event data
    const day = parseInt(format(date, 'd'));
    if (day % 3 === 0) return [{ type: "blue" as const }];
    if (day % 3 === 1) return [{ type: "green" as const }, { type: "orange" as const }];
    return [{ type: "orange" as const }];
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
              events={getDayEvents(date)}
              isWeekView={true}
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
              events={getDayEvents(date)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
