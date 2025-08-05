"use client"

import React, { useEffect, useRef, useState } from 'react'

export function KnowledgeConnectors() {
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
  const startY = boxPositions.caseStudy.bottom + 20 // Start slightly below case study box
  const endY = boxPositions.algorithms.top - 20 // End slightly above target boxes
  const midY = (startY + endY) / 2
  
  // Check if we're on mobile (all boxes have same centerX)
  const isMobile = dimensions.width < 768 || (
    boxPositions.algorithms.centerX === boxPositions.industries.centerX &&
    boxPositions.industries.centerX === boxPositions.roles.centerX
  )

  const pathData = {
    left: boxPositions.algorithms.centerX > 0 && !isMobile ? 
      `M ${boxPositions.caseStudy.centerX} ${startY} Q ${boxPositions.caseStudy.centerX} ${midY} ${boxPositions.algorithms.centerX} ${endY}` : '',
    center: boxPositions.industries.centerX > 0 && !isMobile ? 
      `M ${boxPositions.caseStudy.centerX} ${startY} Q ${boxPositions.caseStudy.centerX} ${midY} ${boxPositions.industries.centerX} ${endY}` : '',
    right: boxPositions.roles.centerX > 0 && !isMobile ? 
      `M ${boxPositions.caseStudy.centerX} ${startY} Q ${boxPositions.caseStudy.centerX} ${midY} ${boxPositions.roles.centerX} ${endY}` : ''
  }

  // Add debugging info
  if (process.env.NODE_ENV === 'development') {
    console.log('Connector positions:', {
      dimensions,
      boxPositions,
      pathData
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
          <stop offset="50%" stopColor="hsl(var(--purple-vivid))" stopOpacity="0.6" />
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

      {/* Animated paths */}
      <g filter="url(#glow)">
        {/* Left path (to Algorithms) */}
        {pathData.left && (
          <path
            d={pathData.left}
            fill="none"
            stroke="url(#connector-gradient)"
            strokeWidth={hoveredPath === 'left' ? "3" : "2"}
            opacity="0"
            style={{
              transition: 'stroke-width 0.3s ease',
              filter: hoveredPath === 'left' ? 'brightness(1.5)' : undefined
            }}
          >
            <animate
              attributeName="opacity"
              from="0"
              to={hoveredPath === 'left' ? "1" : "0.7"}
              dur="0.8s"
              begin="0.3s"
              fill="freeze"
            />
            <animate
              attributeName="stroke-dasharray"
              from="0 500"
              to="500 0"
              dur="1.2s"
              begin="0.3s"
            />
          </path>
        )}

        {/* Center path (to Industries) */}
        {pathData.center && (
          <path
            d={pathData.center}
            fill="none"
            stroke="url(#connector-gradient)"
            strokeWidth={hoveredPath === 'center' ? "3" : "2"}
            opacity="0"
            style={{
              transition: 'stroke-width 0.3s ease',
              filter: hoveredPath === 'center' ? 'brightness(1.5)' : undefined
            }}
          >
            <animate
              attributeName="opacity"
              from="0"
              to={hoveredPath === 'center' ? "1" : "0.7"}
              dur="0.8s"
              begin="0.5s"
              fill="freeze"
            />
            <animate
              attributeName="stroke-dasharray"
              from="0 500"
              to="500 0"
              dur="1s"
              begin="0.5s"
            />
          </path>
        )}

        {/* Right path (to Professional Roles) */}
        {pathData.right && (
          <path
            d={pathData.right}
            fill="none"
            stroke="url(#connector-gradient)"
            strokeWidth={hoveredPath === 'right' ? "3" : "2"}
            opacity="0"
            style={{
              transition: 'stroke-width 0.3s ease',
              filter: hoveredPath === 'right' ? 'brightness(1.5)' : undefined
            }}
          >
            <animate
              attributeName="opacity"
              from="0"
              to={hoveredPath === 'right' ? "1" : "0.7"}
              dur="0.8s"
              begin="0.7s"
              fill="freeze"
            />
            <animate
              attributeName="stroke-dasharray"
              from="0 500"
              to="500 0"
              dur="1.2s"
              begin="0.7s"
            />
          </path>
        )}
      </g>

      {/* Animated dots along the paths */}
      {pathData.left && (
        <circle r="5" fill="url(#dot-gradient)" filter="url(#dot-glow)">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={pathData.left}
            begin="1.5s"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="1.5s"
          />
          <animate
            attributeName="r"
            values="3;5;3"
            dur="3s"
            repeatCount="indefinite"
            begin="1.5s"
          />
        </circle>
      )}

      {pathData.center && (
        <circle r="5" fill="url(#dot-gradient)" filter="url(#dot-glow)">
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path={pathData.center}
            begin="1.7s"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="2.8s"
            repeatCount="indefinite"
            begin="1.7s"
          />
          <animate
            attributeName="r"
            values="3;5;3"
            dur="2.8s"
            repeatCount="indefinite"
            begin="1.7s"
          />
        </circle>
      )}

      {pathData.right && (
        <circle r="5" fill="url(#dot-gradient)" filter="url(#dot-glow)">
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path={pathData.right}
            begin="1.9s"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="3.2s"
            repeatCount="indefinite"
            begin="1.9s"
          />
          <animate
            attributeName="r"
            values="3;5;3"
            dur="3.2s"
            repeatCount="indefinite"
            begin="1.9s"
          />
        </circle>
      )}
    </svg>
  )
}