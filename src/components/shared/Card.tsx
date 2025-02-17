import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-6 md:p-8",
          variant === "default" && "bg-white shadow-sm",
          variant === "glass" && "bg-white/70 backdrop-blur-sm border border-white/20",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export { Card }