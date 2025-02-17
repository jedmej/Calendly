import React from "react";
import { Input } from "@/components/ui/input";
interface EarningsCalculatorProps {
  estimatedEarnings: number;
  tips: string;
  totalEarnings: number;
  handleTipsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const EarningsCalculator = ({
  estimatedEarnings,
  tips,
  totalEarnings,
  handleTipsChange
}: EarningsCalculatorProps) => {
  return <div className="bg-white/70 border border-[#DCEDCF] p-6 space-y-4 rounded-3xl">
      <div className="flex justify-between items-center">
        <span className="text-[#4B5563] font-semibold text-sm">Szacowane zarobki</span>
        <span className="text-black font-bold">{Math.round(estimatedEarnings || 0)} zł</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[#4B5563] font-semibold text-sm">Napiwki</span>
        <Input type="number" value={tips} onChange={handleTipsChange} placeholder="0" className="w-[100px] h-[42px] bg-white/70 rounded-xl text-sm text-right pr-4 border border-[#DCEDCF]" />
      </div>
      <div className="h-[1px] bg-[#E8F1FF]" />
      <div className="flex justify-between items-center">
        <span className="text-[#4B5563] font-semibold">Całkowite zarobki</span>
        <span className="text-black font-bold">{Math.round(totalEarnings || 0)} zł</span>
      </div>
    </div>;
};