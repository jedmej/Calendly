
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useEventForm = (initialState?: any) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = initialState?.isEditing || false;

  const [category, setCategory] = useState<"Work" | "School" | "Other">(
    initialState?.category as "Work" | "School" | "Other" || "Work"
  );

  const [formData, setFormData] = useState({
    title: initialState?.title || "",
    date: initialState?.date || "",
    startTime: initialState?.startTime || "",
    endTime: initialState?.endTime || "",
    hourlyWage: initialState?.hourlyWage || (category === "Work" ? "26" : ""),
    coworkers: initialState?.coworkers || ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  const [tips, setTips] = useState("0");
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    if (category === "Work" && !isEditing && !formData.hourlyWage) {
      setFormData(prev => ({
        ...prev,
        hourlyWage: "26"
      }));
    }
  }, [category, isEditing]);

  useEffect(() => {
    if (isEditing && initialState?.totalEarnings !== undefined) {
      setTotalEarnings(Number(initialState.totalEarnings));
    }
  }, [isEditing, initialState?.totalEarnings]);

  useEffect(() => {
    calculateEarnings();
  }, [formData.startTime, formData.endTime, formData.hourlyWage]);

  useEffect(() => {
    if (isEditing && initialState?.totalEarnings !== undefined && formData.hourlyWage) {
      const start = new Date(`2000/01/01 ${formData.startTime}`);
      const end = new Date(`2000/01/01 ${formData.endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      const baseEarnings = hours * parseFloat(formData.hourlyWage || "0");
      const calculatedTips = Math.max(0, initialState.totalEarnings - baseEarnings);
      setTips(calculatedTips.toFixed(2));
      setEstimatedEarnings(baseEarnings);
      setTotalEarnings(initialState.totalEarnings);
    }
  }, [isEditing, initialState?.totalEarnings, formData.startTime, formData.endTime, formData.hourlyWage]);

  const calculateEarnings = () => {
    if (formData.startTime && formData.endTime && formData.hourlyWage) {
      const start = new Date(`2000/01/01 ${formData.startTime}`);
      const end = new Date(`2000/01/01 ${formData.endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      const earnings = hours * parseFloat(formData.hourlyWage || "0");
      setEstimatedEarnings(earnings);
      const tipsValue = parseFloat(tips || "0");
      setTotalEarnings(earnings + tipsValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const handleTipsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "0";
    setTips(value);
    const tipsValue = parseFloat(value || "0");
    setTotalEarnings(estimatedEarnings + tipsValue);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string; } = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
        className: "bg-red-50/90 text-red-900 border-none"
      });
      return;
    }

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
