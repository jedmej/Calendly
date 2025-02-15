
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign, Users } from "lucide-react";

interface EventFormProps {
  formData: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    hourlyWage: string;
    coworkers: string;
  };
  errors: { [key: string]: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EventForm = ({ formData, errors, handleInputChange }: EventFormProps) => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <Label htmlFor="title" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
          Title *
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Event title"
          className={`bg-[#EEEEEE]/60 h-[42px] md:h-[48px] rounded-xl text-sm md:text-base placeholder:text-[#CCCCCC] w-full ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && <span className="text-xs md:text-sm text-red-500 mt-1">{errors.title}</span>}
      </div>

      <div>
        <Label htmlFor="date" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
          Date *
        </Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
          className={`bg-[#EEEEEE]/60 h-[42px] md:h-[48px] rounded-xl text-sm cursor-pointer w-full ${
            errors.date ? "border-red-500" : ""
          }`}
        />
        {errors.date && <span className="text-xs md:text-sm text-red-500 mt-1">{errors.date}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTime" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
            Start Time *
          </Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleInputChange}
            className={`bg-[#EEEEEE]/60 h-[42px] md:h-[48px] rounded-xl text-sm w-full ${
              errors.startTime ? "border-red-500" : ""
            }`}
          />
          {errors.startTime && <span className="text-xs md:text-sm text-red-500 mt-1">{errors.startTime}</span>}
        </div>
        <div>
          <Label htmlFor="endTime" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
            End Time *
          </Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleInputChange}
            className={`bg-[#EEEEEE]/60 h-[42px] md:h-[48px] rounded-xl text-sm w-full ${
              errors.endTime ? "border-red-500" : ""
            }`}
          />
          {errors.endTime && <span className="text-xs md:text-sm text-red-500 mt-1">{errors.endTime}</span>}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <DollarSign className="w-4 h-4 text-[#374151]" />
          <Label htmlFor="hourlyWage" className="text-xs md:text-sm text-[#374151] font-medium">
            Hourly Wage
          </Label>
        </div>
        <Input
          id="hourlyWage"
          value={formData.hourlyWage}
          onChange={handleInputChange}
          placeholder="15.00"
          className="bg-[#EEEEEE]/60 h-[42px] md:h-[48px] rounded-xl text-sm placeholder:text-[#CCCCCC] w-full"
        />
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Users className="w-4 h-4 text-[#374151]" />
          <Label htmlFor="coworkers" className="text-xs md:text-sm text-[#374151] font-medium">
            Co-workers
          </Label>
        </div>
        <Input
          id="coworkers"
          value={formData.coworkers}
          onChange={handleInputChange}
          placeholder="Add co-workers (comma separated)"
          className="bg-white/60 border border-black/10 h-[42px] md:h-[48px] rounded-xl text-sm placeholder:text-[#CCCCCC] w-full"
        />
      </div>
    </div>
  );
};
