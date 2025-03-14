import React from "react";
import { Calendar, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const TransactionTypeSelector = () => {
  const navigate = useNavigate();
  return <div className="flex gap-2 px-2">
      <button onClick={() => navigate('/add')} className="flex-1 bg-black/5 text-black rounded-[500px] py-3.5 md:py-4 px-6">
        <div className="flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Wydarzenie</span>
        </div>
      </button>
      <button className="flex-1 border border-black/20 rounded-[500px] py-3.5 md:py-4 px-6 bg-[#00000a] text-slate-50">
        <div className="flex items-center justify-center gap-2">
          <CreditCard className="w-4 h-4" />
          <span className="text-sm">Transakcja</span>
        </div>
      </button>
    </div>;
};