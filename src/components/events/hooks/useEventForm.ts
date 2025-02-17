
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { EventCategory, EventFormData } from "../types/event";
import { useEarningsCalculation } from "./useEarningsCalculation";
import { useFormValidation } from "./useFormValidation";

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
  totalEarnings?: number;
}

export const useEventForm = (initialState?: InitialState) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = initialState?.isEditing || false;

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

  const { errors, validateForm, clearError } = useFormValidation();
  
  const { 
    estimatedEarnings, 
    tips, 
    totalEarnings, 
    handleTipsChange 
  } = useEarningsCalculation({
    startTime: formData.startTime,
    endTime: formData.endTime,
    hourlyWage: formData.hourlyWage,
    initialEarnings: initialState?.totalEarnings
  });

  useEffect(() => {
    if (category === "Work" && !isEditing && !formData.hourlyWage) {
      setFormData(prev => ({
        ...prev,
        hourlyWage: "26"
      }));
    }
  }, [category, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    clearError(id);
  };

  const handleSubmit = async () => {
    if (!validateForm(formData)) return;

    try {
      const eventData = {
        title: formData.title,
        event_date: formData.date,
        start_time: formData.startTime,
        end_time: formData.endTime,
        category: category,
        hourly_wage: formData.hourlyWage ? parseFloat(formData.hourlyWage) : null,
        coworkers: formData.coworkers ? formData.coworkers.split(",").map(c => c.trim()) : null,
        total_earnings: totalEarnings
      };

      if (isEditing && initialState?.id) {
        const { error } = await supabase.from("events").update(eventData).eq("id", initialState.id);
        if (error) throw error;
        toast({
          title: "Success!",
          description: "Event has been updated successfully.",
          className: "bg-[#F2FCE2]/90 text-green-800 border-none"
        });
      } else {
        const { error } = await supabase.from("events").insert(eventData);
        if (error) throw error;
        toast({
          title: "Success!",
          description: "Event has been created successfully.",
          className: "bg-[#F2FCE2]/90 text-green-800 border-none"
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save event. Please try again.",
        className: "bg-red-50/90 text-red-900 border-none"
      });
    }
  };

  const handleDelete = async () => {
    if (!initialState?.id) return;
    try {
      const { error } = await supabase.from("events").delete().eq("id", initialState.id);
      if (error) throw error;
      toast({
        title: "Success!",
        description: "Event has been deleted successfully.",
        className: "bg-[#F2FCE2]/90 text-green-800 border-none"
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete event. Please try again.",
        className: "bg-red-50/90 text-red-900 border-none"
      });
    }
  };

  return {
    category,
    setCategory,
    formData,
    errors,
    estimatedEarnings,
    tips,
    totalEarnings,
    isEditing,
    handleInputChange,
    handleTipsChange,
    handleSubmit,
    handleDelete
  };
};
