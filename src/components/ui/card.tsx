// src/components/ui/card.tsx
import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  fixedHeight?: boolean;
  height?: number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, fixedHeight = false, height = 210, ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-[var(--card)] text-[var(--card-foreground)] rounded-lg border border-[var(--border)] shadow-sm 
      [data-theme='dark'] & relative overflow-hidden 
      ${fixedHeight ? 'flex flex-col' : ''} ${className || ""}`}
      style={fixedHeight ? { height: `${height}px` } : undefined}
      {...props}
    />
  )
);

Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  flexGrow?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, flexGrow = false, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${
        flexGrow ? 'flex-grow' : ''
      } ${className || ""}`}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-2xl font-semibold leading-none tracking-tight ${className || ""}`}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-[var(--muted-foreground)] text-sm ${className || ""}`}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className || ""}`} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center p-6 pt-0 ${className || ""}`}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }; 