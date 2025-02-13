
import React from "react";
import { ActionBar } from "@/components/calendar/ActionBar";

export const Finances = () => {
  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-[480px] mx-auto space-y-4">
        <div className="bg-white/70 backdrop-blur-lg rounded-[500px] min-h-[60px] w-full px-6 py-3 flex items-center justify-between">
          <span className="text-[17px] text-[#111827] font-medium">
            Finances
          </span>
        </div>

        {/* Placeholder for financial data */}
        <div className="bg-white/70 border border-white/20 rounded-2xl p-4">
          <h2 className="text-sm text-gray-900 font-medium mb-4">
            Coming soon...
          </h2>
        </div>
      </div>
      <ActionBar />
    </div>
  );
};

export default Finances;
