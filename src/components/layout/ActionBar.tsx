
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Plus, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

export const ActionBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAddRoute = location.pathname === '/add';
  const isTransactionRoute = location.pathname === '/add-transaction';
  const isHomeRoute = location.pathname === '/';
  const isFinancesRoute = location.pathname === '/finances';

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center px-4 py-4 md:py-6 z-50 bg-transparent">
      <div className="action-bar flex w-full md:max-w-[373px] items-stretch rounded-[500px] bg-white/95 backdrop-blur-md shadow-lg border border-[rgba(255,255,255,0.15)]">
        <div className="flex w-full items-stretch px-2 py-2 gap-0">
          <NavButton 
            icon={<Calendar className="w-5 h-5 md:w-6 md:h-6" />} 
            isActive={isHomeRoute} 
            onClick={() => navigate('/')} 
          />
          
          <div className="flex flex-1 items-center justify-center">
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
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-black/90 transition-colors shadow-md"
            >
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>

          <NavButton 
            icon={<PieChart className="w-5 h-5 md:w-6 md:h-6" />} 
            isActive={isFinancesRoute} 
            onClick={() => navigate('/finances')} 
          />
        </div>
      </div>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavButton = ({
  icon,
  isActive,
  onClick
}: NavButtonProps) => (
  <div 
    onClick={onClick} 
    className={cn(
      "flex flex-1 flex-col items-center justify-center px-4 py-2 cursor-pointer rounded-full transition-colors", 
      isActive ? "bg-black/5" : "hover:bg-black/5"
    )}
  >
    <div className={cn(isActive ? "text-black" : "text-gray-600")}>
      {icon}
    </div>
  </div>
);
