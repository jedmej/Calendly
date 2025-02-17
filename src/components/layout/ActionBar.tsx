
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Plus, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

// Types for navigation items and props
type NavigationItem = {
  icon: React.ReactNode;
  isActive: (pathname: string) => boolean;
  onClick: (navigate: (path: string) => void) => void;
};

interface NavButtonProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

// Navigation configuration for reusability and maintainability
const navigationItems: NavigationItem[] = [
  {
    icon: <Calendar className="w-5 h-5 md:w-6 md:h-6" />,
    isActive: (pathname) => pathname === '/',
    onClick: (navigate) => navigate('/')
  },
  {
    icon: <PieChart className="w-5 h-5 md:w-6 md:h-6" />,
    isActive: (pathname) => pathname === '/finances',
    onClick: (navigate) => navigate('/finances')
  }
];

// Reusable NavButton component with improved props typing
const NavButton: React.FC<NavButtonProps> = ({
  icon,
  isActive,
  onClick
}) => (
  <div 
    onClick={onClick} 
    className="relative flex flex-1 flex-col items-center justify-center px-4 py-2 cursor-pointer rounded-full"
  >
    <div className={cn("relative z-10", isActive ? "text-black" : "text-gray-600")}>
      {icon}
    </div>
  </div>
);

// Main ActionBar component with improved structure and readability
export const ActionBar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Memoized route checks to prevent unnecessary re-renders
  const isAddRoute = pathname === '/add';
  const isTransactionRoute = pathname === '/add-transaction';

  // Handler for the center action button
  const handleCenterButtonClick = () => {
    if (isAddRoute) {
      navigate('/add-transaction');
    } else if (isTransactionRoute) {
      navigate('/add');
    } else {
      navigate('/add');
    }
  };

  const isLeftActive = navigationItems[0].isActive(pathname);
  const isRightActive = navigationItems[1].isActive(pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center px-4 py-4 md:py-6 z-50">
      <div className="action-bar flex w-full md:max-w-[373px] items-stretch rounded-[500px] bg-white border border-[rgba(255,255,255,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        <div className="flex w-full items-stretch px-2 py-2 gap-0 relative">
          {/* Animated background pill */}
          <div 
            className={cn(
              "absolute top-2 bottom-2 w-[calc(33.33%-8px)] rounded-full bg-black/5 transition-transform duration-300 ease-in-out",
              isLeftActive ? "translate-x-2" : "translate-x-[calc(200%-4px)]"
            )}
          />

          {/* Left navigation button */}
          <NavButton 
            icon={navigationItems[0].icon}
            isActive={navigationItems[0].isActive(pathname)}
            onClick={() => navigationItems[0].onClick(navigate)}
          />
          
          {/* Center action button */}
          <div className="flex flex-1 items-center justify-center">
            <button 
              onClick={handleCenterButtonClick}
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-black/90 transition-colors shadow-md"
            >
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Right navigation button */}
          <NavButton 
            icon={navigationItems[1].icon}
            isActive={navigationItems[1].isActive(pathname)}
            onClick={() => navigationItems[1].onClick(navigate)}
          />
        </div>
      </div>
    </div>
  );
};
