
import { useState, useEffect } from "react";
import { EventCategory, EventFormData } from "../types/event";

interface InitialState {
  id?: string;
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  category?: EventCategory;
  hourlyWage?: string;
  coworkers?: string;
  isEditing?: boolean;
}

export const useEventState = (initialState?: InitialState) => {
  const [category, setCategory] = useState<EventCategory>(
    initialState?.category || "Work"
  );

  const [formData, setFormData] = useState<EventFormData>({
    title: initialState?.title || "",
    date: initialState?.date || "",
    startTime: initialState?.startTime || "",
    endTime: initialState?.endTime || "",
    hourlyWage: initialState?.hourlyWage || (category === "Work" ? "26" : ""),
    coworkers: initialState?.coworkers || ""
  });

  useEffect(() => {
    if (category === "Work" && !initialState?.isEditing && !formData.hourlyWage) {
      setFormData(prev => ({
        ...prev,
        hourlyWage: "26"
      }));
    }
  }, [category, initialState?.isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return {
    category,
    setCategory,
    formData,
    handleInputChange
  };
};
