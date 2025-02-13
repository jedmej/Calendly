
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddEvent = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="bg-white/70 rounded-[500px] min-h-[60px] w-full px-2 py-3 flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="rounded-xl p-2 hover:bg-black/5 w-[36px] h-[36px] flex items-center justify-center"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/194100382beea9a7388c598de790d73dab7df312b64b483063e7ac20d7c1c164"
              alt="Back"
              className="w-5 h-5"
            />
          </button>
          <span className="text-[17px] text-[#111827] font-medium">Add New</span>
        </div>

        {/* Event/Transaction Toggle */}
        <div className="mt-4 flex gap-4 px-4">
          <button className="flex-1 bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 rounded-[500px] py-[15px] px-[30px] text-sm font-medium">
            <div className="flex items-center justify-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4bc3856ce93226d5b80694dcf0ee837a054018ca3e3c1147ef1492d79935cfe"
                alt="Calendar"
                className="w-5 h-5"
              />
              Event
            </div>
          </button>
          <button className="flex-1 bg-black/5 text-black rounded-[500px] py-[15px] px-[30px] text-sm font-medium">
            <div className="flex items-center justify-center gap-3.5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4256662ac526d04d0232ed0bd0a7c7c130b68639dfacfe1d2809c94b09890ae"
                alt="Transaction"
                className="w-5 h-5"
              />
              Transaction
            </div>
          </button>
        </div>

        {/* Category Buttons */}
        <div className="mt-4 flex gap-2 text-xs font-medium px-4">
          <button className="bg-[#2563EB] text-white rounded-[500px] px-8 py-3.5">Work</button>
          <button className="bg-black/5 rounded-[500px] px-7 py-3.5">School</button>
          <button className="bg-black/5 rounded-[500px] px-8 py-3.5">Other</button>
        </div>

        {/* Form Container */}
        <div className="bg-white/70 border border-white/20 rounded-2xl p-6 mt-4">
          <div className="space-y-4 max-w-[291px]">
            {/* Title Input */}
            <div>
              <Label htmlFor="title" className="text-xs text-[#374151] font-medium">Title</Label>
              <Input 
                id="title" 
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
                  placeholder="mm/dd/yyyy"
                  className="mt-1.5 bg-[#EEEEEE]/60 h-[40px] rounded-xl text-sm pr-10" 
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/007e686618b4b9fe3c9639738e36231618daadf67e8db4258fe94fedbccc1fe9"
                  alt="Calendar"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5"
                />
              </div>
            </div>

            {/* Time Inputs */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="startTime" className="text-xs text-[#374151] font-medium">Start Time</Label>
                <Input 
                  id="startTime" 
                  type="time" 
                  className="mt-1.5 bg-[#EEEEEE]/60 h-[40px] rounded-xl text-sm" 
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="endTime" className="text-xs text-[#374151] font-medium">End Time</Label>
                <Input 
                  id="endTime" 
                  type="time" 
                  className="mt-1.5 bg-[#EEEEEE]/60 h-[40px] rounded-xl text-sm" 
                />
              </div>
            </div>

            {/* Hourly Wage */}
            <div>
              <div className="flex items-center gap-1">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/965f9968558b0b87ce4e90063c48d663f7a47ff99a0c0d8d927634488b3ce05c"
                  alt="Wage"
                  className="w-4 h-4"
                />
                <Label htmlFor="wage" className="text-xs text-[#374151] font-medium">Hourly Wage</Label>
              </div>
              <Input 
                id="wage" 
                placeholder="15.00"
                className="mt-1.5 bg-[#EEEEEE]/60 h-[38px] rounded-xl text-sm placeholder:text-[#CCCCCC]" 
              />
            </div>

            {/* Co-workers */}
            <div>
              <div className="flex items-center gap-1">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7c21b76f8b308ba3857cdfcd9a91ff10c361f9b70056ac9fc0dddf5d932a7e1"
                  alt="Co-workers"
                  className="w-4 h-4"
                />
                <Label htmlFor="coworkers" className="text-xs text-[#374151] font-medium">Co-workers</Label>
              </div>
              <Input 
                id="coworkers" 
                placeholder="Add co-workers (comma separated)"
                className="mt-1.5 bg-white/60 border border-black/10 h-[38px] rounded-xl text-sm placeholder:text-[#CCCCCC]" 
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          className="w-full mt-4 bg-[#2563EB] text-white rounded-xl h-[52px] text-xs font-medium shadow-sm hover:bg-[#2563EB]/90"
        >
          Add Event
        </Button>
      </div>
    </div>
  );
};

export default AddEvent;
