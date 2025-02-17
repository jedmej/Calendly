
import { EventCategory } from "../types/event";
import { useEventState } from "./useEventState";
import { useEventMutation } from "./useEventMutation";
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
  const { category, setCategory, formData, handleInputChange } = useEventState(initialState);
  const { createEvent, updateEvent, deleteEvent } = useEventMutation();
  const { errors, validateForm, clearError } = useFormValidation();
  const { estimatedEarnings, tips, totalEarnings, handleTipsChange } = useEarningsCalculation({
    startTime: formData.startTime,
    endTime: formData.endTime,
    hourlyWage: formData.hourlyWage,
    initialEarnings: initialState?.totalEarnings
  });

  const handleSubmit = async () => {
    if (!validateForm(formData)) return;

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

    try {
      if (initialState?.isEditing && initialState?.id) {
        await updateEvent(initialState.id, eventData);
      } else {
        await createEvent(eventData);
      }
    } catch (error) {
      // Error is already handled in mutation hooks
      console.error("Event operation failed:", error);
    }
  };

  const handleDelete = async () => {
    if (!initialState?.id) return;
    try {
      await deleteEvent(initialState.id);
    } catch (error) {
      // Error is already handled in mutation hook
      console.error("Delete operation failed:", error);
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
    isEditing: initialState?.isEditing || false,
    handleInputChange,
    handleTipsChange,
    handleSubmit,
    handleDelete
  };
};
