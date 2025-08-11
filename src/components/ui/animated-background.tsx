"use client"

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ParticleField, DotCloud } from './particle-field'

interface AnimatedBackgroundProps {
  variant?: 'gradient' | 'orbs' | 'mesh' | 'particles' | 'dots'
  className?: string
  children?: React.ReactNode
}

export function AnimatedBackground({ 
  variant = 'gradient', 
  className,
  children 
}: AnimatedBackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (variant === 'gradient') {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <div className="absolute inset-0 animated-gradient bg-gradient-to-br from-primary/20 via-[hsl(var(--purple-vivid))]/10 to-[hsl(var(--yellow-sharp))]/10 dark:from-primary/10 dark:via-[hsl(var(--purple-vivid))]/5 dark:to-[hsl(var(--yellow-sharp))]/5" />
        {children}
      </div>
    )
  }

  if (variant === 'orbs' && mounted) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {/* Floating orbs with staggered animations */}
        <div 
          className="floating-orb w-64 h-64 bg-[hsl(var(--purple-vivid))]/20"
          style={{ 
            left: '10%',
            animation: 'float-up 20s infinite',
            animationDelay: '0s'
          }}
        />
        <div 
          className="floating-orb w-96 h-96 bg-[hsl(var(--yellow-sharp))]/15"
          style={{ 
            left: '60%',
            animation: 'float-diagonal 25s infinite',
            animationDelay: '5s'
          }}
        />
        <div 
          className="floating-orb w-80 h-80 bg-primary/20"
          style={{ 
            right: '20%',
            animation: 'float-up 30s infinite',
            animationDelay: '10s'
          }}
        />
        {children}
      </div>
    )
  }

  if (variant === 'mesh') {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <div className="absolute inset-0 mesh-animated">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-[hsl(var(--purple-vivid))]/5" />
          <div className="absolute inset-0 bg-gradient-to-bl from-[hsl(var(--yellow-sharp))]/5 via-transparent to-transparent" />
        </div>
        {children}
      </div>
    )
  }

  if (variant === 'particles') {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <ParticleField 
          particleCount={80}
          particleColor="rgba(139, 92, 246, 0.3)"
          connectionDistance={150}
        />
        {children}
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <DotCloud dotCount={100} />
        {children}
      </div>
    )
  }

  return <div className={className}>{children}</div>
}

export function SectionDivider({ variant = 'wave' }: { variant?: 'wave' | 'angle' }) {
  if (variant === 'wave') {
    return (
      <div className="relative h-24 -mt-1">
        <svg
          className="absolute bottom-0 w-full h-24 text-background"
          preserveAspectRatio="none"
          viewBox="0 0 1440 74"
        >
          <path
            fill="currentColor"
            d="M0,32L48,37.3C96,43,192,53,288,56C384,59,480,53,576,42.7C672,32,768,16,864,16C960,16,1056,32,1152,37.3C1248,43,1344,37,1392,34.7L1440,32L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="relative h-16 -mt-1">
      <svg
        className="absolute bottom-0 w-full h-16 text-background"
        preserveAspectRatio="none"
        viewBox="0 0 1440 48"
      >
        <path
          fill="currentColor"
          d="M0,48L1440,0L1440,48L0,48Z"
        />
      </svg>
    </div>
  )
}