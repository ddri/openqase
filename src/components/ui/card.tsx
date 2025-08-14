// src/components/ui/card.tsx
"use client"

import * as React from "react";
import { motion } from "framer-motion";

interface BaseCardProps {
  fixedHeight?: boolean;
  height?: number;
  className?: string;
}

interface StaticCardProps extends BaseCardProps, React.HTMLAttributes<HTMLDivElement> {
  animated?: false;
}

// ARCHITECTURAL DECISION: Event Handler Exclusion for Motion Component Compatibility
// ================================================================================
// Framer Motion's event handlers have different signatures than standard HTML events:
// - HTML onDrag: (event: DragEvent) => void  
// - Motion onDrag: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
// - HTML onAnimationStart: (event: AnimationEvent) => void
// - Motion onAnimationStart: (definition: AnimationDefinition) => void
//
// Solution: Exclude conflicting event props to prevent TypeScript errors while
// maintaining all other HTML attributes (className, onClick, etc.)
// This follows the industry standard pattern used by React-Aria, Emotion, and other libraries.
interface AnimatedCardProps extends BaseCardProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd'> {
  animated: true;
}

type CardProps = StaticCardProps | AnimatedCardProps;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, fixedHeight = false, height = 210, animated = false, ...props }, ref) => {
    const baseClassName = `relative rounded-lg border border-border bg-card shadow-md 
      transition-all duration-200 hover:shadow-lg hover:border-primary
      ${fixedHeight ? 'flex flex-col' : ''} ${className || ""}`;
    
    const style = fixedHeight ? { height: `${height}px` } : undefined;

    if (animated) {
      const { animated: _, ...motionProps } = props as AnimatedCardProps;
      return (
        <motion.div
          ref={ref}
          className={baseClassName}
          style={style}
          whileHover={{ 
            y: -1,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          {...motionProps}
        />
      );
    }

    const { animated: _, ...divProps } = props as StaticCardProps;
    return (
      <div
        ref={ref}
        className={baseClassName}
        style={style}
        {...divProps}
      />
    );
  }
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