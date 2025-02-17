
import React from "react";
import { Plus, Minus } from "lucide-react";

interface TransactionTypeToggleProps {
  isIncome: boolean;
  setIsIncome: (value: boolean) => void;
}

export const TransactionTypeToggle: React.FC<TransactionTypeToggleProps> = ({
  isIncome,
  setIsIncome
}) => {
  return (
    <div className="flex w-full gap-2 text-xs md:text-sm lg:text-base font-medium whitespace-nowrap text-center mb-8">
      <button
        onClick={() => setIsIncome(true)}
        className={`h-9 flex items-center justify-center gap-2.5 flex-1 shrink px-4 rounded-[500px] transition-colors ${
          isIncome 
            ? "bg-[#282828] text-white" 
            : "bg-black/5 text-black hover:bg-black/10"
        }`}
      >
        <Plus className="w-4 h-4" />
        Przychód
      </button>
      <button
        onClick={() => setIsIncome(false)}
        className={`h-9 flex items-center justify-center gap-2.5 flex-1 shrink px-4 rounded-[500px] transition-colors ${
          !isIncome 
            ? "bg-[#282828] text-white" 
            : "bg-black/5 text-black hover:bg-black/10"
        }`}
      >
        <Minus className="w-4 h-4" />
        Wydatek
      </button>
    </div>
  );
};
