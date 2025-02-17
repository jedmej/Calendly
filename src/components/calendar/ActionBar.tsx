
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, PlusCircle, DollarSign } from "lucide-react";

export const ActionBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isAddRoute = location.pathname === '/add';
  const isTransactionRoute = location.pathname === '/add-transaction';
  const isHomeRoute = location.pathname === '/';
  const isFinancesRoute = location.pathname === '/finances';
  
  return (
    <div className="w-full flex justify-center px-4 pb-8">
      <div className="action-bar flex w-full max-w-[373px] items-stretch">
        <div className="flex w-full items-stretch px-[7px] py-2 gap-3.5">
          <div 
            onClick={() => navigate('/')}
            className={`flex flex-1 flex-col items-center justify-center px-6 py-2 cursor-pointer`}
          >
            <div className={`p-2 rounded-xl ${isHomeRoute ? 'bg-black/5' : ''}`}>
              <Calendar 
                className={`w-6 h-6 ${isHomeRoute ? 'text-black' : 'text-gray-600'}`} 
              />
            </div>
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
              className="w-[38px] h-[38px] rounded-full bg-[#282828] flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <PlusCircle className="w-6 h-6 text-white" />
            </button>
          </div>

          <div 
            onClick={() => navigate('/finances')}
            className={`flex flex-1 flex-col items-center justify-center px-6 py-2 cursor-pointer`}
          >
            <div className={`p-2 rounded-xl ${isFinancesRoute ? 'bg-black/5' : ''}`}>
              <DollarSign 
                className={`w-6 h-6 ${isFinancesRoute ? 'text-black' : 'text-gray-600'}`} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
