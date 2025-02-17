import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Header } from "@/components/shared/Header";
import { Typography } from "@/components/shared/Typography";
import { ArrowLeft, Save, Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { CategorySelector } from "@/components/events/CategorySelector";
import { EarningsCalculator } from "@/components/events/EarningsCalculator";
import { EventTypeSelector } from "@/components/events/EventTypeSelector";
import { EventForm } from "@/components/events/EventForm";
interface LocationState {
  id?: string;
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  category?: "Work" | "School" | "Other";
  hourlyWage?: string;
  coworkers?: string;
  isEditing?: boolean;
  totalEarnings?: number;
  returnDate?: string;
}
const AddEvent = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const location = useLocation();
  const state = location.state as LocationState;
  const isEditing = state?.isEditing || false;
  const [category, setCategory] = useState<"Work" | "School" | "Other">(state?.category as "Work" | "School" | "Other" || "Work");
  const [formData, setFormData] = useState({
    title: state?.title || "",
    date: state?.date || "",
    startTime: state?.startTime || "",
    endTime: state?.endTime || "",
    hourlyWage: state?.hourlyWage || (category === "Work" ? "26" : ""),
    coworkers: state?.coworkers || ""
  });
  useEffect(() => {
    if (category === "Work" && !isEditing && !formData.hourlyWage) {
      setFormData(prev => ({
        ...prev,
        hourlyWage: "26"
      }));
    }
  }, [category, isEditing]);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  const [tips, setTips] = useState("0");
  const [totalEarnings, setTotalEarnings] = useState(0);
  useEffect(() => {
    if (isEditing && state?.totalEarnings !== undefined && state?.totalEarnings !== null) {
      setTotalEarnings(Number(state.totalEarnings));
    }
  }, [isEditing, state?.totalEarnings]);
  useEffect(() => {
    calculateEarnings();
  }, [formData.startTime, formData.endTime, formData.hourlyWage]);
  useEffect(() => {
    if (isEditing && state?.totalEarnings !== undefined && state?.totalEarnings !== null && formData.hourlyWage) {
      const start = new Date(`2000/01/01 ${formData.startTime}`);
      const end = new Date(`2000/01/01 ${formData.endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      const baseEarnings = hours * parseFloat(formData.hourlyWage || "0");
      const calculatedTips = Math.max(0, state.totalEarnings - baseEarnings);
      setTips(calculatedTips.toFixed(2));
      setEstimatedEarnings(baseEarnings);
      setTotalEarnings(state.totalEarnings);
    }
  }, [isEditing, state?.totalEarnings, formData.startTime, formData.endTime, formData.hourlyWage]);
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
    const {
      id,
      value
    } = e.target;
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
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }
    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }
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
      if (isEditing && state?.id) {
        const {
          error
        } = await supabase.from("events").update(eventData).eq("id", state.id);
        if (error) throw error;
        toast({
          title: "Success!",
          description: "Event has been updated successfully.",
          className: "bg-[#F2FCE2]/90 text-green-800 border-none"
        });
      } else {
        const {
          error
        } = await supabase.from("events").insert(eventData);
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
    if (!state?.id) return;
    try {
      const {
        error
      } = await supabase.from("events").delete().eq("id", state.id);
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
  const handleBack = () => {
    const returnDate = state?.returnDate || state?.date || new Date().toISOString();
    navigate('/', {
      state: {
        returnDate
      }
    });
  };
  return <div className="bg-[#D8EAE3] min-h-screen flex flex-col items-center p-4 pb-20 md:p-6 md:pb-24 lg:p-8 lg:pb-24">
      <div className="w-full max-w-[800px] md:max-w-[640px] lg:max-w-[800px] mx-auto space-y-4 md:space-y-6">
        <Header title={isEditing ? "Edit Event" : "Add New"} showBackButton />

        {!isEditing && <EventTypeSelector />}

        <Card variant="glass">
          <CategorySelector category={category} setCategory={setCategory} />
          <EventForm formData={formData} errors={errors} handleInputChange={handleInputChange} />
          <div className="mt-6 md:mt-8">
            <EarningsCalculator estimatedEarnings={estimatedEarnings} tips={tips} totalEarnings={totalEarnings} handleTipsChange={handleTipsChange} />
          </div>
        </Card>
      </div>

      <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[320px] md:max-w-[373px]">
        <div className="bg-white/95 backdrop-blur-md shadow-[0px_0px_16px_rgba(0,0,0,0.03)] border border-[rgba(255,255,255,0.15)] rounded-[500px]">
          <div className="flex w-full items-stretch px-1 py-1 gap-2">
            {isEditing && <Button variant="destructive" onClick={handleDelete} fullWidth leftIcon={<Trash className="w-4 h-4" />}>
                Delete Event
              </Button>}
            <Button variant="primary" onClick={handleSubmit} fullWidth leftIcon={<Save className="w-4 h-4" />}>
              {isEditing ? "Save Changes" : "Add Event"}
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default AddEvent;