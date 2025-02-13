
import React from "react";

export const WeekHeader: React.FC = () => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7;

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
