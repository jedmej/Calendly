import * as React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Calendar, PlusCircle, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

export const ActionBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const isAddRoute = location.pathname === '/add'
  const isTransactionRoute = location.pathname === '/add-transaction'
  const isHomeRoute = location.pathname === '/'
  const isFinancesRoute = location.pathname === '/finances'
  
  return (
    <div className="bg-background w-full flex justify-center px-4 pb-6 md:pb-8">
      <div className="action-bar flex w-full max-w-[320px] md:max-w-[373px] items-stretch rounded-[500px] bg-white/95 backdrop-blur-md shadow-[0px_0px_16px_rgba(0,0,0,0.03)] border border-[rgba(255,255,255,0.15)]">
        <div className="flex w-full items-stretch px-2 py-1 gap-2">
          <NavButton
            icon={<Calendar className="w-5 h-5 md:w-6 md:h-6" />}
            isActive={isHomeRoute}
            onClick={() => navigate('/')}
          />
          
          <div className="flex flex-1 items-center justify-center px-2">
            <button 
              onClick={() => {
                if (isAddRoute) {
                  navigate('/add-transaction')
                } else if (isTransactionRoute) {
                  navigate('/add')
                } else {
                  navigate('/add')
                }
              }}
              className="w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>

          <NavButton
            icon={<DollarSign className="w-5 h-5 md:w-6 md:h-6" />}
            isActive={isFinancesRoute}
            onClick={() => navigate('/finances')}
          />
        </div>
      </div>
    </div>
  )
}

interface NavButtonProps {
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
}

const NavButton = ({ icon, isActive, onClick }: NavButtonProps) => (
  <div 
    onClick={onClick}
    className={cn(
      "flex flex-1 flex-col items-center justify-center px-6 py-2 cursor-pointer",
      isActive && "bg-[rgba(37,99,235,0.05)] rounded-[500px]"
    )}
  >
    <div className={cn(
      isActive ? "text-blue-600" : "text-gray-600 dark:text-gray-400"
    )}>
      {icon}
    </div>
  </div>
)