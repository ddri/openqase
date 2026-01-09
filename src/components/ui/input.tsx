import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  /** Show error state styling */
  error?: boolean
  /** Show success state styling */
  success?: boolean
  /** Helper text to display below input */
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border-2 border-input bg-surface-sunken px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            error && "border-red-500 focus-visible:ring-red-500/50 dark:border-red-600",
            success && "border-green-500 focus-visible:ring-green-500/50 dark:border-green-600",
            className
          )}
          ref={ref}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={helperText ? `${props.id}-helper` : undefined}
          {...props}
        />
        {helperText && (
          <p
            id={`${props.id}-helper`}
            className={cn(
              "mt-1.5 text-sm",
              error && "text-red-600 dark:text-red-400",
              success && "text-green-600 dark:text-green-400",
              !error && !success && "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
