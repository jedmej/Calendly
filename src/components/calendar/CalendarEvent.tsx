
import React from "react";
import { Briefcase, DollarSign, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  type,
}) => {
  const navigate = useNavigate();
  const showWorkIcon = category?.toLowerCase() === "work";
  const isTransaction = type !== undefined;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        const { error } = await supabase
          .from('transactions')
          .delete()
          .eq('id', id);

        if (error) throw error;

        toast.success('Transaction deleted successfully');
        // Force a reload to refresh the events
        window.location.reload();
      } catch (error) {
        console.error('Error deleting transaction:', error);
        toast.error('Failed to delete transaction');
      }
    }
  };

  const handleClick = () => {
    if (id) {
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
    }
  };

  const getAmountClass = () => {
    if (total_earnings !== undefined && total_earnings !== null) {
      return "text-green-600";
    }
    if (type === 'income' || (typeof amount === 'object' && amount?.type === "income")) {
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
      className="bg-[rgba(255,255,255,0.5)] border flex w-full items-center gap-4 mt-2.5 p-4 rounded-xl border-[rgba(0,0,0,0.05)] border-solid cursor-pointer hover:bg-[rgba(255,255,255,0.7)] transition-colors relative group"
    >
      {showWorkIcon && !isTransaction && (
        <div className="bg-[rgba(0,0,0,0.03)] self-stretch flex items-center justify-center gap-2.5 w-10 h-10 my-auto p-2.5 rounded-[500px]">
          <Briefcase className="w-5 h-5 text-gray-600" />
        </div>
      )}
      {isTransaction && (
        <div className="bg-[#FEF7CD] self-stretch flex items-center justify-center gap-2.5 w-10 h-10 my-auto p-2.5 rounded-[500px]">
          <DollarSign className="w-5 h-5 text-[#F97316]" />
        </div>
      )}
      {icon && !showWorkIcon && !isTransaction && (
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
        {(start_time && end_time) && (
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
      <div className="flex items-center gap-4">
        {displayAmount !== undefined && (
          <div className={`text-sm ${getAmountClass()} font-medium`}>
            {type === 'expense' ? '-' : '+'}{typeof displayAmount === 'number' ? Math.round(displayAmount) : displayAmount} zł
          </div>
        )}
        {isTransaction && (
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full"
            aria-label="Delete transaction"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        )}
      </div>
    </div>
  );
};
