
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, CreditCard, DollarSign, Users, Save, Trash, Briefcase, GraduationCap, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

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
}

const AddEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const state = location.state as LocationState;
  const isEditing = state?.isEditing || false;
  const isMobile = useIsMobile();

  const [category, setCategory] = useState<"Work" | "School" | "Other">(
    state?.category as "Work" | "School" | "Other" || "Work"
  );
  const [formData, setFormData] = useState({
    title: state?.title || "",
    date: state?.date || "",
    startTime: state?.startTime || "",
    endTime: state?.endTime || "",
    hourlyWage: state?.hourlyWage || "",
    coworkers: state?.coworkers || "",
  });

  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  const [tips, setTips] = useState("0");
  const [totalEarnings, setTotalEarnings] = useState(state?.totalEarnings || 0);

  useEffect(() => {
    calculateEarnings();
  }, [formData.startTime, formData.endTime, formData.hourlyWage]);

  // Initialize tips when editing
  useEffect(() => {
    if (isEditing && state?.totalEarnings !== undefined && formData.hourlyWage) {
      const start = new Date(`2000/01/01 ${formData.startTime}`);
      const end = new Date(`2000/01/01 ${formData.endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      const baseEarnings = hours * parseFloat(formData.hourlyWage);
      const calculatedTips = (state.totalEarnings - baseEarnings).toFixed(2);
      setTips(calculatedTips);
    }
  }, [isEditing, state?.totalEarnings, formData.startTime, formData.endTime, formData.hourlyWage]);

  const calculateEarnings = () => {
    if (formData.startTime && formData.endTime && formData.hourlyWage) {
      const start = new Date(`2000/01/01 ${formData.startTime}`);
      const end = new Date(`2000/01/01 ${formData.endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      const earnings = hours * parseFloat(formData.hourlyWage);
      setEstimatedEarnings(earnings);
      setTotalEarnings(earnings + parseFloat(tips || "0"));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleTipsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTips(value);
    setTotalEarnings(estimatedEarnings + parseFloat(value || "0"));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

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
        coworkers: formData.coworkers ? formData.coworkers.split(",").map((c) => c.trim()) : null,
        total_earnings: totalEarnings // Add total earnings to the event data
      };

      if (isEditing && state?.id) {
        const { error } = await supabase
          .from("events")
          .update(eventData)
          .eq("id", state.id);

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Event has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from("events")
          .insert(eventData);

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Event has been created successfully.",
        });
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save event. Please try again.",
      });
    }
  };

  const handleDelete = async () => {
    if (!state?.id) return;

    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", state.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Event has been deleted successfully.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete event. Please try again.",
      });
    }
  };

  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-[480px] mx-auto">
        <div className="bg-white/70 backdrop-blur-lg rounded-[500px] min-h-[60px] w-full px-2 py-3 flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl p-2 hover:bg-black/5 w-[36px] h-[36px] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-[17px] text-[#111827] font-medium">
            {isEditing ? "Edit Event" : "Add New"}
          </span>
        </div>

        <div className="mt-4 flex gap-4 px-4">
          <button className="flex-1 bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 rounded-[500px] py-[15px] px-[30px] text-sm font-medium">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Event
            </div>
          </button>
          <button className="flex-1 bg-black/5 text-black rounded-[500px] py-[15px] px-[30px] text-sm font-medium">
            <div className="flex items-center justify-center gap-3.5">
              <CreditCard className="w-5 h-5" />
              Transaction
            </div>
          </button>
        </div>

        <div className="bg-white/70 border border-white/20 rounded-2xl p-6 mt-4">
          <div className="flex flex-wrap gap-2 text-xs font-medium mb-6">
            {[
              { name: "Work", icon: <Briefcase className="w-4 h-4" /> },
              { name: "School", icon: <GraduationCap className="w-4 h-4" /> },
              { name: "Other", icon: <Star className="w-4 h-4" /> }
            ].map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => setCategory(name as "Work" | "School" | "Other")}
                className={`flex-1 ${
                  category === name
                    ? "bg-[#2563EB] text-white"
                    : "bg-black/5"
                } rounded-[500px] py-3.5 px-4 flex items-center justify-center gap-2`}
              >
                {icon}
                {name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-xs text-[#374151] font-medium">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Event title"
                className={`mt-1.5 bg-[#EEEEEE]/60 h-[38px] rounded-xl text-sm placeholder:text-[#CCCCCC] ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
            </div>

            <div>
              <Label htmlFor="date" className="text-xs text-[#374151] font-medium">
                Date *
              </Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`mt-1.5 bg-[#EEEEEE]/60 h-[40px] rounded-xl text-sm cursor-pointer ${
                    errors.date ? "border-red-500" : ""
                  }`}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
              {errors.date && <span className="text-xs text-red-500">{errors.date}</span>}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="startTime" className="text-xs text-[#374151] font-medium">
                  Start Time *
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className={`mt-1.5 bg-[#EEEEEE]/60 h-[40px] rounded-xl text-sm ${
                    errors.startTime ? "border-red-500" : ""
                  }`}
                />
                {errors.startTime && (
                  <span className="text-xs text-red-500">{errors.startTime}</span>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="endTime" className="text-xs text-[#374151] font-medium">
                  End Time *
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className={`mt-1.5 bg-[#EEEEEE]/60 h-[40px] rounded-xl text-sm ${
                    errors.endTime ? "border-red-500" : ""
                  }`}
                />
                {errors.endTime && <span className="text-xs text-red-500">{errors.endTime}</span>}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-[#374151]" />
                <Label htmlFor="hourlyWage" className="text-xs text-[#374151] font-medium">
                  Hourly Wage
                </Label>
              </div>
              <Input
                id="hourlyWage"
                value={formData.hourlyWage}
                onChange={handleInputChange}
                placeholder="15.00"
                className="mt-1.5 bg-[#EEEEEE]/60 h-[38px] rounded-xl text-sm placeholder:text-[#CCCCCC]"
              />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#374151]" />
                <Label htmlFor="coworkers" className="text-xs text-[#374151] font-medium">
                  Co-workers
                </Label>
              </div>
              <Input
                id="coworkers"
                value={formData.coworkers}
                onChange={handleInputChange}
                placeholder="Add co-workers (comma separated)"
                className="mt-1.5 bg-white/60 border border-black/10 h-[38px] rounded-xl text-sm placeholder:text-[#CCCCCC]"
              />
            </div>

            <div className="bg-[#F8FAFF] border border-[#E8F1FF] rounded-2xl p-6 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-[#4B5563] font-semibold text-sm">Estimated earnings</span>
                <span className="text-[#2463EB] font-bold">${estimatedEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[#4B5563] font-semibold text-sm">Tips</span>
                <Input
                  type="number"
                  value={tips}
                  onChange={handleTipsChange}
                  placeholder="0.00"
                  className="w-[75px] h-[38px] bg-[#EEEEEE]/60 rounded-xl text-sm text-center"
                />
              </div>
              <div className="h-[1px] bg-[#E8F1FF] my-2" />
              <div className="flex justify-between items-center">
                <span className="text-[#4B5563] font-semibold">Total Earnings</span>
                <span className="text-[#2463EB] font-bold">${totalEarnings.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          {isEditing && (
            <Button
              onClick={handleDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-[500px] h-[44px] text-xs font-medium"
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete Event
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            className={`${isEditing ? 'flex-1' : 'w-full'} bg-[#2563EB] text-white rounded-[500px] h-[44px] text-xs font-medium`}
          >
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? "Save Changes" : "Add Event"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
