import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors duration-200",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Show loading spinner and disable button */
  loading?: boolean
  /** Text to display when loading (defaults to button children) */
  loadingText?: string
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode
  /** Data attribute for testing */
  "data-testid"?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    children,
    disabled,
    "data-testid": dataTestId,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Determine if button has icons for padding adjustment
    const hasIcons = Boolean(leftIcon || rightIcon || loading)

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          hasIcons && size !== "icon" && "has-[>svg]:px-3"
        )}
        ref={ref}
        disabled={disabled || loading}
        data-testid={dataTestId}
        data-variant={variant}
        data-size={size}
        data-loading={loading ? "true" : undefined}
        {...props}
      >
        {loading && (
          <Loader2 className="animate-spin" aria-hidden="true" />
        )}
        {!loading && leftIcon && leftIcon}
        {loading && loadingText ? loadingText : children}
        {!loading && rightIcon && rightIcon}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
