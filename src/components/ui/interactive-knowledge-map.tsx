'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  User, 
  Building2, 
  CircuitBoard, 
  BookOpen
} from 'lucide-react'
import { KnowledgeConnectors } from './knowledge-connectors'

interface InteractiveKnowledgeMapProps {
  algorithmsCount: number
  industriesCount: number
  personasCount: number
}

export function InteractiveKnowledgeMap({ 
  algorithmsCount, 
  industriesCount, 
  personasCount 
}: InteractiveKnowledgeMapProps) {
  const [hoveredSection, setHoveredSection] = useState<'algorithms' | 'industries' | 'roles' | 'case-studies' | null>(null)

  return (
    <div className="relative space-y-16">
      {/* SVG Connector Lines */}
      <KnowledgeConnectors hoveredSection={hoveredSection} />
      
      {/* Case Studies - Full Width Clickable Box */}
      <Link 
        href="/case-study" 
        className="block group relative z-10"
        onMouseEnter={() => setHoveredSection('case-studies')}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="relative overflow-hidden bg-card border border-border rounded-lg p-8 text-center cursor-pointer transform transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:border-primary/30">
          <div className="absolute inset-0 bg-primary/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <BookOpen className="w-12 h-12 text-primary mx-auto mb-3 relative z-10 drop-shadow-lg group-hover:text-primary group-hover:drop-shadow-xl transition-all duration-300" />
          <div className="font-bold text-2xl mb-1 relative z-10 text-foreground group-hover:text-foreground transition-colors duration-300">Case Studies</div>
          <div className="text-sm text-muted-foreground relative z-10 group-hover:text-muted-foreground transition-colors duration-300">Real implementations</div>
        </div>
      </Link>

      {/* Three clickable subsections underneath */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mt-32">
        {/* Algorithms */}
        <Link 
          href="/paths/algorithm" 
          className="block group"
          onMouseEnter={() => setHoveredSection('algorithms')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="bg-card border border-border rounded-lg p-6 text-center cursor-pointer relative overflow-hidden transform transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:border-primary/30">
            <CircuitBoard className="w-8 h-8 mx-auto mb-2 text-primary relative z-10 group-hover:text-primary transition-colors duration-300" />
            <div className="font-semibold text-base relative z-10 group-hover:text-foreground transition-colors duration-300">Algorithms</div>
            <div className="text-sm text-muted-foreground relative z-10 group-hover:text-muted-foreground/80 transition-colors duration-300">{algorithmsCount} types</div>
          </div>
        </Link>

        {/* Industries */}
        <Link 
          href="/paths/industry" 
          className="block group"
          onMouseEnter={() => setHoveredSection('industries')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="bg-card border border-border rounded-lg p-6 text-center cursor-pointer relative overflow-hidden transform transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:border-primary/30">
            <Building2 className="w-8 h-8 mx-auto mb-2 text-primary relative z-10 group-hover:text-primary transition-colors duration-300" />
            <div className="font-semibold text-base relative z-10 group-hover:text-foreground transition-colors duration-300">Industries</div>
            <div className="text-sm text-muted-foreground relative z-10 group-hover:text-muted-foreground/80 transition-colors duration-300">{industriesCount} sectors</div>
          </div>
        </Link>

        {/* Professional Roles */}
        <Link 
          href="/paths/persona" 
          className="block group"
          onMouseEnter={() => setHoveredSection('roles')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="bg-card border border-border rounded-lg p-6 text-center cursor-pointer relative overflow-hidden transform transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:border-primary/30">
            <User className="w-8 h-8 mx-auto mb-2 text-primary relative z-10 group-hover:text-primary transition-colors duration-300" />
            <div className="font-semibold text-base relative z-10 group-hover:text-foreground transition-colors duration-300">Professional Roles</div>
            <div className="text-sm text-muted-foreground relative z-10 group-hover:text-muted-foreground/80 transition-colors duration-300">{personasCount} perspectives</div>
          </div>
        </Link>
      </div>
    </div>
  )
}