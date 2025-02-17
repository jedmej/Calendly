
import { useState } from "react";
import { EventFormData, EventFormErrors } from "../types/event";
import { useToast } from "@/components/ui/use-toast";

export const useFormValidation = () => {
  const [errors, setErrors] = useState<EventFormErrors>({});
  const { toast } = useToast();

  const validateForm = (formData: EventFormData) => {
    const newErrors: EventFormErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
        className: "bg-red-50/90 text-red-900 border-none"
      });
      return false;
    }
    
    return true;
  };

  const clearError = (fieldId: string) => {
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  return {
    errors,
    validateForm,
    clearError
  };
};
