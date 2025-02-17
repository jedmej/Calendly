
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DateInputProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ value, error, onChange }) => {
  return (
    <div>
      <Label htmlFor="date" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
        Date *
      </Label>
      <Input
        id="date"
        type="date"
        value={value}
        onChange={onChange}
        className={`bg-white/70 h-[42px] md:h-[48px] rounded-xl text-sm cursor-pointer w-full border border-[#DCEDCF] ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <span className="text-xs md:text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};
