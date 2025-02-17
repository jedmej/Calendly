
import React from "react";
import { Briefcase, DollarSign } from "lucide-react";
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
  } | number;
  category?: string;
  event_date?: string;
  transaction_date?: string;
  start_time?: string;
  end_time?: string;
  hourly_wage?: number;
  total_earnings?: number | null;
  type?: 'income' | 'expense';
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({
  id,
  icon,
  title,
  location,
  withPeople,
  amount,
  category,
  event_date,
  transaction_date,
  start_time,
  end_time,
  hourly_wage,
  total_earnings,
  type
}) => {
  const navigate = useNavigate();
  const showWorkIcon = category?.toLowerCase() === "work";
  const isTransaction = type !== undefined;

  const handleClick = () => {
    if (!id) return; // Don't navigate if there's no id

    if (isTransaction) {
      navigate('/add-transaction', {
        state: {
          id,
          title,
          date: transaction_date,
          amount: typeof amount === 'number' ? amount : amount?.value,
          type,
          category,
          isEditing: true,
          returnDate: transaction_date || event_date
        }
      });
    } else {
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
          isEditing: true,
          totalEarnings: total_earnings,
          returnDate: event_date
        }
      });
    }
  };

  const getAmountClass = () => {
    if (total_earnings !== undefined && total_earnings !== null) {
      return "text-green-600";
    }
    if (type === 'income' || typeof amount === 'object' && amount?.type === "income") {
      return "text-green-600";
    }
    return "text-red-600";
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return "";
    return timeString.split(":").slice(0, 2).join(":");
  };

  const getDisplayAmount = () => {
    if (isTransaction && amount !== undefined) {
      return typeof amount === 'number' ? amount : amount.value;
    }
    if (total_earnings !== undefined && total_earnings !== null) {
      return total_earnings;
    }
    if (typeof amount === 'object' && amount !== null) {
      return amount.value;
    }
    return undefined;
  };

  const displayAmount = getDisplayAmount();

  return (
    <div 
      onClick={handleClick} 
      className="bg-white/70 flex w-full items-center gap-4 mt-2.5 p-4 cursor-pointer hover:bg-white/80 transition-colors rounded-2xl"
    >
      {showWorkIcon && !isTransaction && (
        <div className="bg-[rgba(0,0,0,0.03)] self-stretch flex items-center justify-center gap-2.5 w-10 h-10 my-auto p-2.5 rounded-[500px]">
          <Briefcase className="w-5 h-5 text-gray-600" />
        </div>
      )}
      {isTransaction && (
        <div className="bg-[#FEF7CD] self-stretch flex items-center justify-center gap-2.5 w-10 h-10 my-auto p-2.5 rounded-[500px]">
          <DollarSign className="w-5 h-5 text-black" />
        </div>
      )}
      {icon && !showWorkIcon && !isTransaction && (
        <div className="bg-[rgba(0,0,0,0.03)] self-stretch flex items-center gap-2.5 w-10 h-10 my-auto p-2.5 rounded-[500px]">
          <img loading="lazy" src={icon} className="aspect-[1] object-contain w-5 self-stretch my-auto" alt={title} />
        </div>
      )}
      <div className="self-stretch text-xs text-gray-500 font-normal leading-loose flex-1 shrink basis-5 my-auto">
        <div className="text-gray-900 text-sm font-medium leading-6">
          {title}
        </div>
        {start_time && end_time && (
          <div>{formatTime(start_time)} - {formatTime(end_time)}</div>
        )}
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
      {displayAmount !== undefined && (
        <div className={`text-sm ${getAmountClass()} font-medium`}>
          {type === 'expense' ? '-' : '+'}{typeof displayAmount === 'number' ? Math.round(displayAmount) : displayAmount} zł
        </div>
      )}
    </div>
  );
};
