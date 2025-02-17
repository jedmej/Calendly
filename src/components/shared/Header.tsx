
import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  showBackButton?: boolean
  rightContent?: React.ReactNode
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, title, showBackButton = false, rightContent, ...props }, ref) => {
    const navigate = useNavigate()

    return (
      <header
        ref={ref}
        className={cn(
          "rounded-[500px] bg-white/60 backdrop-blur-md min-h-[60px] px-6 py-3 flex items-center sticky top-0 z-10",
          className
        )}
        {...props}
      >
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl p-2 hover:bg-black/5 w-[36px] h-[36px] flex items-center justify-center mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-[17px] md:text-xl lg:text-2xl text-foreground font-medium">
          {title}
        </h1>
        {rightContent && (
          <div className="ml-auto">
            {rightContent}
          </div>
        )}
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }
