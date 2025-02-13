
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
    <div className="flex flex-wrap gap-2 text-xs md:text-sm font-medium mb-8">
      <button
        onClick={() => setIsIncome(true)}
        className={`flex-1 ${
          isIncome 
            ? "bg-green-500 text-white" 
            : "bg-black/5"
        } rounded-[500px] py-3.5 md:py-4 px-4 flex items-center justify-center gap-2`}
      >
        <Plus className="w-4 h-4 md:w-5 md:h-5" />
        Przychód
      </button>
      <button
        onClick={() => setIsIncome(false)}
        className={`flex-1 ${
          !isIncome 
            ? "bg-red-500 text-white" 
            : "bg-black/5"
        } rounded-[500px] py-3.5 md:py-4 px-4 flex items-center justify-center gap-2`}
      >
        <Minus className="w-4 h-4 md:w-5 md:h-5" />
        Wydatek
      </button>
    </div>
  );
};
