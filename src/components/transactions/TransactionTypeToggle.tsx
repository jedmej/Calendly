
import React from "react";
import { Plus, Minus } from "lucide-react";
import { SmallButton } from "../shared/SmallButton";

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
      <SmallButton
        onClick={() => setIsIncome(true)}
        isActive={isIncome}
        leftIcon={<Plus className="w-4 h-4" />}
      >
        Przychód
      </SmallButton>
      <SmallButton
        onClick={() => setIsIncome(false)}
        isActive={!isIncome}
        leftIcon={<Minus className="w-4 h-4" />}
      >
        Wydatek
      </SmallButton>
    </div>
  );
};
