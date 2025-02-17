
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
    <div className="flex flex-wrap gap-2 text-sm font-medium mb-8">
      <button
        onClick={() => setIsIncome(true)}
        className={`flex-1 ${
          isIncome 
            ? "bg-green-500 text-white" 
            : "bg-black/5 hover:bg-black/10"
        } rounded-[500px] h-[50px] md:h-[60px] flex items-center justify-center gap-2 transition-colors`}
      >
        <Plus className="w-4 h-4" />
        Przychód
      </button>
      <button
        onClick={() => setIsIncome(false)}
        className={`flex-1 ${
          !isIncome 
            ? "bg-red-500 text-white" 
            : "bg-black/5 hover:bg-black/10"
        } rounded-[500px] h-[50px] md:h-[60px] flex items-center justify-center gap-2 transition-colors`}
      >
        <Minus className="w-4 h-4" />
        Wydatek
      </button>
    </div>
  );
};
