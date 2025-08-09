"use client"

import React, { useEffect, useRef, useState } from 'react'

interface KnowledgeConnectorsProps {
  hoveredSection?: 'algorithms' | 'industries' | 'roles' | 'case-studies' | null
}

export function KnowledgeConnectors({ hoveredSection }: KnowledgeConnectorsProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const [boxPositions, setBoxPositions] = useState({
    caseStudy: { bottom: 0, centerX: 0 },
    algorithms: { top: 0, centerX: 0 },
    industries: { top: 0, centerX: 0 },
    roles: { top: 0, centerX: 0 }
  })

  useEffect(() => {
    const updatePositions = () => {
      if (svgRef.current && svgRef.current.parentElement) {
        const parent = svgRef.current.parentElement
        const rect = parent.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })

        // Find the actual boxes
        const caseStudyBox = parent.querySelector('a[href="/case-study"]')
        const algorithmBox = parent.querySelector('a[href="/paths/algorithm"]')
        const industryBox = parent.querySelector('a[href="/paths/industry"]')
        const rolesBox = parent.querySelector('a[href="/paths/persona"]')

        if (caseStudyBox && algorithmBox && industryBox && rolesBox) {
          const parentRect = parent.getBoundingClientRect()
          const caseRect = caseStudyBox.getBoundingClientRect()
          const algoRect = algorithmBox.getBoundingClientRect()
          const indRect = industryBox.getBoundingClientRect()
          const roleRect = rolesBox.getBoundingClientRect()

          setBoxPositions({
            caseStudy: {
              bottom: caseRect.bottom - parentRect.top,
              centerX: caseRect.left + caseRect.width / 2 - parentRect.left
            },
            algorithms: {
              top: algoRect.top - parentRect.top,
              centerX: algoRect.left + algoRect.width / 2 - parentRect.left
            },
            industries: {
              top: indRect.top - parentRect.top,
              centerX: indRect.left + indRect.width / 2 - parentRect.left
            },
            roles: {
              top: roleRect.top - parentRect.top,
              centerX: roleRect.left + roleRect.width / 2 - parentRect.left
            }
          })
        }
      }
    }

    updatePositions()
    window.addEventListener('resize', updatePositions)
    // Use multiple delays to ensure DOM is fully rendered
    const timer1 = setTimeout(updatePositions, 100)
    const timer2 = setTimeout(updatePositions, 300)
    const timer3 = setTimeout(updatePositions, 500)
    
    // Add hover listeners to the boxes with a delay
    const hoverTimer = setTimeout(() => {
      const parent = svgRef.current?.parentElement
      if (parent) {
        const algorithmBox = parent.querySelector('a[href="/paths/algorithm"]')
        const industryBox = parent.querySelector('a[href="/paths/industry"]')
        const rolesBox = parent.querySelector('a[href="/paths/persona"]')
        
        const handleAlgoEnter = () => setHoveredPath('left')
        const handleIndEnter = () => setHoveredPath('center')
        const handleRoleEnter = () => setHoveredPath('right')
        const handleLeave = () => setHoveredPath(null)
        
        algorithmBox?.addEventListener('mouseenter', handleAlgoEnter)
        algorithmBox?.addEventListener('mouseleave', handleLeave)
        industryBox?.addEventListener('mouseenter', handleIndEnter)
        industryBox?.addEventListener('mouseleave', handleLeave)
        rolesBox?.addEventListener('mouseenter', handleRoleEnter)
        rolesBox?.addEventListener('mouseleave', handleLeave)
      }
    }, 600)
    
    return () => {
      window.removeEventListener('resize', updatePositions)
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(hoverTimer)
      
      // Clean up hover listeners
      const parent = svgRef.current?.parentElement
      if (parent) {
        const algorithmBox = parent.querySelector('a[href="/paths/algorithm"]')
        const industryBox = parent.querySelector('a[href="/paths/industry"]')
        const rolesBox = parent.querySelector('a[href="/paths/persona"]')
        
        const handleAlgoEnter = () => setHoveredPath('left')
        const handleIndEnter = () => setHoveredPath('center')
        const handleRoleEnter = () => setHoveredPath('right')
        const handleLeave = () => setHoveredPath(null)
        
        algorithmBox?.removeEventListener('mouseenter', handleAlgoEnter)
        algorithmBox?.removeEventListener('mouseleave', handleLeave)
        industryBox?.removeEventListener('mouseenter', handleIndEnter)
        industryBox?.removeEventListener('mouseleave', handleLeave)
        rolesBox?.removeEventListener('mouseenter', handleRoleEnter)
        rolesBox?.removeEventListener('mouseleave', handleLeave)
      }
    }
  }, [])

  // Calculate path positions based on actual box positions
  const startY = boxPositions.caseStudy.bottom + 5 // Start just below case study box
  const endY = boxPositions.algorithms.top - 5 // End just above target boxes
  const midY = (startY + endY) / 2
  
  // Check if we're on mobile (screen width only - more reliable than position comparison)
  const isMobile = dimensions.width < 768

  // Force center line to be slightly offset if it would be perfectly vertical
  const centerTargetX = Math.abs(boxPositions.industries.centerX - boxPositions.caseStudy.centerX) < 5 ? 
    boxPositions.industries.centerX + 10 : boxPositions.industries.centerX

  const pathData = {
    left: boxPositions.algorithms.centerX > 0 && boxPositions.caseStudy.centerX > 0 && !isMobile ? 
      `M ${boxPositions.caseStudy.centerX} ${boxPositions.caseStudy.bottom} L ${boxPositions.algorithms.centerX} ${boxPositions.algorithms.top}` : '',
    center: !isMobile && boxPositions.industries.centerX > 0 && boxPositions.caseStudy.centerX > 0 ? 
      `M ${boxPositions.caseStudy.centerX} ${boxPositions.caseStudy.bottom} L ${centerTargetX} ${boxPositions.industries.top}` : '',
    right: boxPositions.roles.centerX > 0 && boxPositions.caseStudy.centerX > 0 && !isMobile ? 
      `M ${boxPositions.caseStudy.centerX} ${boxPositions.caseStudy.bottom} L ${boxPositions.roles.centerX} ${boxPositions.roles.top}` : ''
  }

  // Add debugging info
  if (process.env.NODE_ENV === 'development') {
    console.log('Connector positions:', {
      dimensions,
      boxPositions,
      pathData,
      isMobile,
      centerXComparison: {
        algoCenterX: boxPositions.algorithms.centerX,
        industryCenterX: boxPositions.industries.centerX,
        rolesCenterX: boxPositions.roles.centerX,
        caseStudyCenterX: boxPositions.caseStudy.centerX,
        centerLineDiff: Math.abs(boxPositions.industries.centerX - boxPositions.caseStudy.centerX),
        isVerticalLine: Math.abs(boxPositions.industries.centerX - boxPositions.caseStudy.centerX) < 5,
        centerConditions: {
          isMobile: isMobile,
          industriesXValid: boxPositions.industries.centerX > 0,
          caseStudyXValid: boxPositions.caseStudy.centerX > 0,
          shouldShowCenter: !isMobile && boxPositions.industries.centerX > 0 && boxPositions.caseStudy.centerX > 0
        }
      }
    })
  }

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-none z-0"
      width={dimensions.width}
      height={dimensions.height}
      style={{ opacity: 0.7 }}
    >
      <defs>
        <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          <stop offset="50%" stopColor="hsl(var(--gold-light))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
        </linearGradient>
        
        <linearGradient id="dot-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--yellow-sharp))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
        </linearGradient>
        
        {/* Glow filter for premium effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Stronger glow for dots */}
        <filter id="dot-glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Interactive paths with hover highlighting */}
      <g filter="url(#glow)">
        {/* Left path (to Algorithms) */}
        {pathData.left && (
          <path
            d={pathData.left}
            fill="none"
            stroke="url(#connector-gradient)"
            strokeWidth={hoveredSection === 'algorithms' ? "3" : "2"}
            opacity={
              !hoveredSection ? "0.7" : 
              hoveredSection === 'algorithms' || hoveredSection === 'case-studies' ? "0.9" : "0.3"
            }
            style={{ transition: 'opacity 300ms ease, stroke-width 200ms ease' }}
          />
        )}

        {/* Center path (to Industries) */}
        {pathData.center && (
          <path
            d={pathData.center}
            fill="none"
            stroke="url(#connector-gradient)"
            strokeWidth={hoveredSection === 'industries' ? "4" : "3"}
            opacity={
              !hoveredSection ? "0.8" : 
              hoveredSection === 'industries' || hoveredSection === 'case-studies' ? "1.0" : "0.3"
            }
            strokeLinecap="round"
            style={{ transition: 'opacity 300ms ease, stroke-width 200ms ease' }}
          />
        )}

        {/* Right path (to Professional Roles) */}
        {pathData.right && (
          <path
            d={pathData.right}
            fill="none"
            stroke="url(#connector-gradient)"
            strokeWidth={hoveredSection === 'roles' ? "3" : "2"}
            opacity={
              !hoveredSection ? "0.7" : 
              hoveredSection === 'roles' || hoveredSection === 'case-studies' ? "0.9" : "0.3"
            }
            style={{ transition: 'opacity 300ms ease, stroke-width 200ms ease' }}
          />
        )}
      </g>

    </svg>
  )
}