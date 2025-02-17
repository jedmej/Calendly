
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

interface WageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const WageInput: React.FC<WageInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <DollarSign className="w-4 h-4 text-[#374151]" />
        <Label htmlFor="hourlyWage" className="text-xs md:text-sm text-[#374151] font-medium">
          Hourly Wage
        </Label>
      </div>
      <Input
        id="hourlyWage"
        value={value}
        onChange={onChange}
        placeholder="15.00"
        className="bg-white/70 h-[42px] md:h-[48px] rounded-xl text-sm placeholder:text-[#CCCCCC] w-full border border-[#DCEDCF]"
      />
    </div>
  );
};
