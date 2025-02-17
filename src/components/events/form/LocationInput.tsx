
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LocationInputProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({ value, error, onChange }) => {
  return (
    <div>
      <Label htmlFor="location" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
        Location *
      </Label>
      <Input
        id="location"
        value={value}
        onChange={onChange}
        placeholder="Enter location"
        className={`bg-white/70 h-[42px] md:h-[48px] rounded-xl text-sm md:text-base placeholder:text-[#CCCCCC] w-full border border-[#DCEDCF] ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <span className="text-xs md:text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};
