"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  glowColor?: string
  interactive?: boolean
}

export function PremiumCard({
  children,
  className,
  glowColor = "purple",
  interactive = true,
  ...props
}: PremiumCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return
    
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  const glowColors = {
    purple: "rgba(139, 92, 246, 0.3)",
    yellow: "rgba(255, 208, 0, 0.3)",
    blue: "rgba(59, 130, 246, 0.3)"
  }
  
  return (
    <motion.div
      className={cn("premium-card p-6", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        transformStyle: "preserve-3d"
      }}
      whileHover={interactive ? {} : { y: -4 }}
      transition={{ type: "spring", stiffness: 150, damping: 20, duration: 0.4 }}
      {...props}
    >
      {/* Inner glow effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${glowColors[glowColor as keyof typeof glowColors]}, transparent 40%)`,
        }}
      />
      
      {/* Content with 3D depth */}
      <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
    </motion.div>
  )
}

export function PremiumCardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  )
}

export function PremiumCardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-normal tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function PremiumCardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export function PremiumCardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-4", className)} {...props} />
}

export function PremiumCardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
}