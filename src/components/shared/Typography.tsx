import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "small"
}

const variantClassMap = {
  h1: "text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight font-display",
  h2: "text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight font-display",
  h3: "text-lg md:text-xl lg:text-2xl font-medium tracking-tight font-display",
  h4: "text-base md:text-lg lg:text-xl font-medium tracking-tight font-display",
  h5: "text-sm md:text-base lg:text-lg font-medium tracking-tight font-display",
  h6: "text-xs md:text-sm lg:text-base font-medium tracking-tight font-display",
  body: "text-sm md:text-base lg:text-lg leading-relaxed text-gray-600 font-text",
  small: "text-xs md:text-sm leading-relaxed text-gray-500 font-text",
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as = "p", variant, className, children, ...props }, ref) => {
    const Component = as
    const variantClass = variant ? variantClassMap[variant] : variantClassMap[as as keyof typeof variantClassMap]

    return React.createElement(
      Component,
      {
        ref,
        className: cn(variantClass, className),
        ...props,
      },
      children
    )
  }
)
Typography.displayName = "Typography"

export { Typography }