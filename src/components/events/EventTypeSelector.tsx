
import React from "react";
import { Calendar, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EventTypeSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 px-2">
      <button className="flex-1 bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 rounded-[500px] py-3.5 md:py-4 px-6">
        <div className="flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Event</span>
        </div>
      </button>
      <button 
        onClick={() => navigate('/add-transaction')} 
        className="flex-1 bg-black/5 text-black rounded-[500px] py-3.5 md:py-4 px-6"
      >
        <div className="flex items-center justify-center gap-2">
          <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Transaction</span>
        </div>
      </button>
    </div>
  );
};
