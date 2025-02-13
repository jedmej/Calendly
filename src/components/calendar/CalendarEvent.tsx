
import React from "react";
import { Briefcase } from "lucide-react";

interface CalendarEventProps {
  icon?: string;
  title: string;
  time?: string;
  location?: string;
  withPeople?: string[];
  amount?: {
    value: number;
    type: "income" | "expense";
  };
  category?: string;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({
  icon,
  title,
  time,
  location,
  withPeople,
  amount,
  category,
}) => {
  const showWorkIcon = category?.toLowerCase() === "work";

  return (
    <div className="bg-[rgba(255,255,255,0.5)] border flex w-full items-center gap-4 mt-2.5 p-4 rounded-xl border-[rgba(0,0,0,0.05)] border-solid">
      {showWorkIcon && (
        <div className="bg-[rgba(0,0,0,0.03)] self-stretch flex items-center justify-center gap-2.5 w-10 h-10 my-auto p-2.5 rounded-[500px]">
          <Briefcase className="w-5 h-5 text-gray-600" />
        </div>
      )}
      {icon && !showWorkIcon && (
        <div className="bg-[rgba(0,0,0,0.03)] self-stretch flex items-center gap-2.5 w-10 h-10 my-auto p-2.5 rounded-[500px]">
          <img
            loading="lazy"
            src={icon}
            className="aspect-[1] object-contain w-5 self-stretch my-auto"
            alt={title}
          />
        </div>
      )}
      <div className="self-stretch text-xs text-gray-500 font-normal leading-loose flex-1 shrink basis-5 my-auto">
        <div className="text-gray-900 text-sm font-medium leading-6">
          {title}
        </div>
        {time && <div>{time}</div>}
        {location && <div>{location}</div>}
        {withPeople && withPeople.length > 0 && (
          <div className="flex w-full items-center">
            <div className="self-stretch w-[38px] my-auto">With: </div>
            <div className="self-stretch w-[65px] my-auto">
              {withPeople.join(", ")}
            </div>
          </div>
        )}
      </div>
      {amount && (
        <div
          className={`self-stretch flex items-center text-sm ${amount.type === "income" ? "text-green-600" : "text-red-600"} font-medium whitespace-nowrap text-right leading-loose my-auto`}
        >
          <div className="self-stretch w-2.5 my-auto">
            {amount.type === "income" ? "+" : "-"}
          </div>
          <div className="self-stretch w-2.5 my-auto">$</div>
          <div className="leading-6 self-stretch my-auto">{amount.value}</div>
        </div>
      )}
    </div>
  );
};
