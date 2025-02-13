
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, PlusCircle, DollarSign } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const ActionBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isAddRoute = location.pathname === '/add';
  const isTransactionRoute = location.pathname === '/add-transaction';
  const isHomeRoute = location.pathname === '/';
  
  return (
    <div className={`
      bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.05)] border self-center
      flex w-full max-w-[373px] items-stretch rounded-[500px] 
      border-[rgba(255,255,255,0.2)] border-solid
      ${isMobile ? 'fixed bottom-8 left-1/2 -translate-x-1/2 h-[70px]' : ''}
    `}>
      <div className="flex w-full items-stretch px-[7px] py-2 gap-3.5">
        <div 
          onClick={() => navigate('/')}
          className={`flex flex-1 flex-col items-center justify-center px-6 py-2 cursor-pointer
            ${isHomeRoute ? 'bg-[rgba(37,99,235,0.05)] rounded-[500px]' : ''}
          `}
        >
          <Calendar 
            className={`w-6 h-6 ${isHomeRoute ? 'text-blue-600' : 'text-gray-600'}`} 
          />
        </div>
        
        <div className="flex flex-1 items-center justify-center px-4 py-4">
          <button 
            onClick={() => {
              if (isAddRoute) {
                navigate('/add-transaction');
              } else if (isTransactionRoute) {
                navigate('/add');
              } else {
                navigate('/add');
              }
            }}
            className="w-[38px] h-[38px] rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-6 h-6 text-white" />
          </button>
        </div>

        <div 
          onClick={() => navigate('/add-transaction')}
          className={`flex flex-1 flex-col items-center justify-center px-6 py-2 cursor-pointer
            ${isTransactionRoute ? 'bg-[rgba(37,99,235,0.05)] rounded-[500px]' : ''}
          `}
        >
          <DollarSign 
            className={`w-6 h-6 ${isTransactionRoute ? 'text-blue-600' : 'text-gray-600'}`} 
          />
        </div>
      </div>
    </div>
  );
};
