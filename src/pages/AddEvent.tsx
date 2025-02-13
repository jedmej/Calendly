
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, CreditCard, DollarSign, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AddEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [category, setCategory] = useState<"Work" | "School" | "Other">("Work");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    hourlyWage: "",
    coworkers: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from('events').insert({
        title: formData.title,
        event_date: formData.date,
        start_time: formData.startTime,
        end_time: formData.endTime,
        category: category,
        hourly_wage: formData.hourlyWage ? parseFloat(formData.hourlyWage) : null,
        coworkers: formData.coworkers ? formData.coworkers.split(',').map(c => c.trim()) : null
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Event has been created successfully.",
      });

      navigate('/');
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create event. Please try again.",
      });
    }
  };

  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-[480px] mx-auto">
        {/* Header */}
        <div className="bg-white/70 rounded-[500px] min-h-[60px] w-full px-2 py-3 flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="rounded-xl p-2 hover:bg-black/5 w-[36px] h-[36px] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-[17px] text-[#111827] font-medium">Add New</span>
        </div>

        {/* Event/Transaction Toggle */}
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

        {/* Form Container */}
        <div className="bg-white/70 border border-white/20 rounded-2xl p-4 sm:p-6 mt-4 w-full">
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2 text-xs font-medium mb-6">
            {["Work", "School", "Other"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat as "Work" | "School" | "Other")}
                className={`flex-1 sm:flex-none ${
                  category === cat
                    ? "bg-[#2563EB] text-white"
                    : "bg-black/5"
                } rounded-[500px] px-4 sm:px-8 py-3.5`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4 w-full sm:max-w-[291px]">
            {/* Title Input */}
            <div>
              <Label htmlFor="title" className="text-xs text-[#374151] font-medium">Title</Label>
              <Input 
                id="title" 
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Event title" 
                className="mt-1.5 bg-[#EEEEEE]/60 h-[38px] rounded-xl text-sm placeholder:text-[#CCCCCC]" 
              />
            </div>

            {/* Date Input */}
            <div>
              <Label htmlFor="date" className="text-xs text-[#374151] font-medium">Date</Label>
              <div className="relative">
                <Input 
                  id="date" 
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  inputMode="none"
                  className="mt-1.5 bg-[#EEEEEE]/60 h-[40px] rounded-xl text-sm pr-10 [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:dark:bg-transparent [&::-webkit-calendar-picker-indicator]:dark:hover:bg-transparent cursor-pointer w-full" 
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Time Inputs */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="startTime" className="text-xs text-[#374151] font-medium">Start Time</Label>
                <Input 
                  id="startTime" 
                  type="time"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  inputMode="none"
                  className="mt-1.5 bg-[#EEEEEE]/60 h-[40px] rounded-xl text-sm [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:dark:bg-transparent [&::-webkit-calendar-picker-indicator]:dark:hover:bg-transparent cursor-pointer w-full" 
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="endTime" className="text-xs text-[#374151] font-medium">End Time</Label>
                <Input 
                  id="endTime" 
                  type="time"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  inputMode="none"
                  className="mt-1.5 bg-[#EEEEEE]/60 h-[40px] rounded-xl text-sm [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:dark:bg-transparent [&::-webkit-calendar-picker-indicator]:dark:hover:bg-transparent cursor-pointer w-full" 
                />
              </div>
            </div>

            {/* Hourly Wage */}
            <div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-[#374151]" />
                <Label htmlFor="hourlyWage" className="text-xs text-[#374151] font-medium">Hourly Wage</Label>
              </div>
              <Input 
                id="hourlyWage" 
                value={formData.hourlyWage}
                onChange={handleInputChange}
                placeholder="15.00"
                className="mt-1.5 bg-[#EEEEEE]/60 h-[38px] rounded-xl text-sm placeholder:text-[#CCCCCC] w-full" 
              />
            </div>

            {/* Co-workers */}
            <div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#374151]" />
                <Label htmlFor="coworkers" className="text-xs text-[#374151] font-medium">Co-workers</Label>
              </div>
              <Input 
                id="coworkers" 
                value={formData.coworkers}
                onChange={handleInputChange}
                placeholder="Add co-workers (comma separated)"
                className="mt-1.5 bg-white/60 border border-black/10 h-[38px] rounded-xl text-sm placeholder:text-[#CCCCCC] w-full" 
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full mt-4 bg-[#2563EB] text-white rounded-xl h-[52px] text-xs font-medium shadow-sm hover:bg-[#2563EB]/90"
        >
          Add Event
        </Button>
      </div>
    </div>
  );
};

export default AddEvent;
