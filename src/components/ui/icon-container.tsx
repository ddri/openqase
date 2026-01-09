import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { categoryColors } from "@/lib/design-tokens";

const iconContainerVariants = cva(
  "inline-flex items-center justify-center flex-shrink-0",
  {
    variants: {
      size: {
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-10 w-10",
        xl: "h-12 w-12",
      },
      category: {
        caseStudy: categoryColors.caseStudy,
        algorithm: categoryColors.algorithm,
        industry: categoryColors.industry,
        persona: categoryColors.persona,
        blog: categoryColors.blog,
        quantumCompany: categoryColors.quantumCompany,
        partnerCompany: categoryColors.partnerCompany,
        quantumHardware: categoryColors.quantumHardware,
        quantumSoftware: categoryColors.quantumSoftware,
      },
    },
    defaultVariants: {
      size: "md",
      category: "caseStudy",
    },
  }
);

export interface IconContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconContainerVariants> {
  children: React.ReactNode;
}

/**
 * IconContainer - Consistent wrapper for dashboard and category icons
 *
 * Provides standardized colors based on content category, eliminating
 * hardcoded color values throughout the application.
 *
 * @example
 * ```tsx
 * <IconContainer category="caseStudy" size="lg">
 *   <FileText className="h-full w-full" />
 * </IconContainer>
 * ```
 */
export const IconContainer = React.forwardRef<HTMLDivElement, IconContainerProps>(
  ({ className, size, category, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(iconContainerVariants({ size, category }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

IconContainer.displayName = "IconContainer";
