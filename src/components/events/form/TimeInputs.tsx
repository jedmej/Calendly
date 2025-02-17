
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TimeInputsProps {
  startTime: string;
  endTime: string;
  startTimeError?: string;
  endTimeError?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TimeInputs: React.FC<TimeInputsProps> = ({
  startTime,
  endTime,
  startTimeError,
  endTimeError,
  onChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="startTime" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
          Start Time *
        </Label>
        <Input
          id="startTime"
          type="time"
          value={startTime}
          onChange={onChange}
          className={`bg-white/70 h-[42px] md:h-[48px] rounded-xl text-sm w-full border border-[#DCEDCF] ${
            startTimeError ? "border-red-500" : ""
          }`}
        />
        {startTimeError && <span className="text-xs md:text-sm text-red-500 mt-1">{startTimeError}</span>}
      </div>
      <div>
        <Label htmlFor="endTime" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
          End Time *
        </Label>
        <Input
          id="endTime"
          type="time"
          value={endTime}
          onChange={onChange}
          className={`bg-white/70 h-[42px] md:h-[48px] rounded-xl text-sm w-full border border-[#DCEDCF] ${
            endTimeError ? "border-red-500" : ""
          }`}
        />
        {endTimeError && <span className="text-xs md:text-sm text-red-500 mt-1">{endTimeError}</span>}
      </div>
    </div>
  );
};
