"use client"

import React from 'react'
import { motion } from 'framer-motion'

export const FloatingBlob = ({ 
  className = "", 
  delay = 0,
  duration = 20,
  size = "w-96 h-96" 
}: { 
  className?: string
  delay?: number
  duration?: number
  size?: string
}) => {
  return (
    <motion.div
      className={`absolute blob ${size} ${className}`}
      animate={{
        x: [0, 30, -30, 0],
        y: [0, -30, 30, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

export const WaveDivider = ({ 
  color = "var(--background)",
  flip = false 
}: { 
  color?: string
  flip?: boolean 
}) => {
  return (
    <div className={`wave-divider ${flip ? 'rotate-180' : ''}`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

export const ParticleField = ({ 
  count = 50,
  className = "" 
}: { 
  count?: number
  className?: string 
}) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export const GradientOrb = ({ 
  className = "",
  gradient = "var(--gradient-primary)" 
}: { 
  className?: string
  gradient?: string 
}) => {
  return (
    <div 
      className={`absolute rounded-full filter blur-3xl opacity-30 ${className}`}
      style={{ background: gradient }}
    />
  )
}