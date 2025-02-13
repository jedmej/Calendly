
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddEvent = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-[373px]">
        {/* Header */}
        <div className="bg-white/70 min-h-[80px] w-full px-4 py-5 flex items-center gap-2 rounded-xl mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="rounded-xl p-2 hover:bg-black/5"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/194100382beea9a7388c598de790d73dab7df312b64b483063e7ac20d7c1c164"
              alt="Back"
              className="w-5 h-5"
            />
          </button>
          <span className="text-[17px] text-[#111827] font-medium">Add New</span>
        </div>

        {/* Form Container */}
        <div className="bg-white/70 border border-white/20 rounded-xl p-6">
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <Label htmlFor="title" className="text-xs text-gray-700 font-medium">Title</Label>
              <Input id="title" placeholder="Event title" className="mt-1.5" />
            </div>

            {/* Date Input */}
            <div>
              <Label htmlFor="date" className="text-xs text-gray-700 font-medium">Date</Label>
              <Input 
                id="date" 
                type="date" 
                className="mt-1.5" 
              />
            </div>

            {/* Time Inputs */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="startTime" className="text-xs text-gray-700 font-medium">Start Time</Label>
                <Input 
                  id="startTime" 
                  type="time" 
                  className="mt-1.5" 
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="endTime" className="text-xs text-gray-700 font-medium">End Time</Label>
                <Input 
                  id="endTime" 
                  type="time" 
                  className="mt-1.5" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full mt-4 bg-blue-600 text-white">
          Add Event
        </Button>
      </div>
    </div>
  );
};

export default AddEvent;
