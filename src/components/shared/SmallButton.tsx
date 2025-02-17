
import React from "react";
import { cn } from "@/lib/utils";

interface SmallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  leftIcon?: React.ReactNode;
}

export const SmallButton: React.FC<SmallButtonProps> = ({
  children,
  isActive,
  leftIcon,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "h-9 flex items-center justify-center gap-2.5 flex-1 shrink px-4 rounded-[500px] transition-colors",
        isActive
          ? "bg-[#282828] text-white"
          : "bg-black/5 text-black hover:bg-black/10",
        className
      )}
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  );
};
