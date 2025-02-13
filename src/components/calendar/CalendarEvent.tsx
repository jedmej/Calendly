
import React from "react";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CalendarEventProps {
  id?: string;
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
  event_date?: string;
  start_time?: string;
  end_time?: string;
  hourly_wage?: number;
  total_earnings?: number;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({
  id,
  icon,
  title,
  time,
  location,
  withPeople,
  amount,
  category,
  event_date,
  start_time,
  end_time,
  hourly_wage,
  total_earnings,
}) => {
  const navigate = useNavigate();
  const showWorkIcon = category?.toLowerCase() === "work";

  const handleClick = () => {
    if (id) {
      navigate('/add', {
        state: {
          id,
          title,
          date: event_date,
          startTime: start_time,
          endTime: end_time,
          category,
          hourlyWage: hourly_wage?.toString(),
          coworkers: withPeople?.join(', '),
          isEditing: true
        }
      });
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-[rgba(255,255,255,0.5)] border flex w-full items-center gap-4 mt-2.5 p-4 rounded-xl border-[rgba(0,0,0,0.05)] border-solid cursor-pointer hover:bg-[rgba(255,255,255,0.7)] transition-colors"
    >
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
      {(total_earnings !== undefined || amount) && (
        <div
          className={`self-stretch flex items-center text-sm ${
            (total_earnings !== undefined || amount?.type === "income") ? "text-green-600" : "text-red-600"
          } font-medium whitespace-nowrap text-right leading-loose my-auto`}
        >
          <div className="self-stretch w-2.5 my-auto">+</div>
          <div className="self-stretch w-2.5 my-auto">$</div>
          <div className="leading-6 self-stretch my-auto">
            {total_earnings !== undefined ? total_earnings.toFixed(2) : amount?.value.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};
