
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, PlusCircle, DollarSign } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const ActionBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <div className={`
      bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.05)] border self-center
      flex w-full max-w-[373px] items-stretch rounded-[500px] 
      border-[rgba(255,255,255,0.2)] border-solid
      ${isMobile ? 'fixed bottom-8 left-1/2 -translate-x-1/2 h-[70px]' : ''}
    `}>
      <div className="flex w-full items-stretch px-[7px] py-2 gap-3.5">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-2">
          <Calendar className="w-6 h-6 text-gray-600" />
        </div>
        
        <div className="flex flex-1 items-center justify-center px-4 py-4">
          <button 
            onClick={() => navigate('/add')}
            className="w-[38px] h-[38px] rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 py-2">
          <DollarSign className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
};
