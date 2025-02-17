
import React from "react";
import { TitleInput } from "./form/TitleInput";
import { DateInput } from "./form/DateInput";
import { TimeInputs } from "./form/TimeInputs";
import { WageInput } from "./form/WageInput";
import { EventFormData, EventFormErrors } from "./types/event";

interface EventFormProps {
  formData: EventFormData;
  errors: EventFormErrors;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  formData,
  errors,
  handleInputChange
}) => {
  return (
    <div className="space-y-4">
      <TitleInput 
        value={formData.title}
        error={errors.title}
        onChange={handleInputChange}
      />
      
      <DateInput 
        value={formData.date}
        error={errors.date}
        onChange={handleInputChange}
      />
      
      <TimeInputs 
        startTime={formData.startTime}
        endTime={formData.endTime}
        startTimeError={errors.startTime}
        endTimeError={errors.endTime}
        onChange={handleInputChange}
      />
      
      <WageInput 
        value={formData.hourlyWage}
        onChange={handleInputChange}
      />
    </div>
  );
};
