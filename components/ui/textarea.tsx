import * as React from "react"

import { cn } from "@/lib/utils"

// Changed from empty interface to properly extend HTMLTextAreaElement attributes
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // We can add custom props here if needed
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
