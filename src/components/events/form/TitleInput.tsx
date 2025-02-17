
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TitleInputProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({ value, error, onChange }) => {
  return (
    <div>
      <Label htmlFor="title" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
        Title *
      </Label>
      <Input
        id="title"
        value={value}
        onChange={onChange}
        placeholder="Event title"
        className={`bg-white/70 h-[42px] md:h-[48px] rounded-xl text-sm md:text-base placeholder:text-[#CCCCCC] w-full border border-[#DCEDCF] ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <span className="text-xs md:text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};
