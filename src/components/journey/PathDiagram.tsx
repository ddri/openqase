// File: src/components/journey/PathDiagram.tsx - updated version
'use client';

import React from 'react';
import Link from 'next/link';

const PathDiagram = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <svg 
        viewBox="0 0 1400 400"
        className="w-full max-w-6xl mx-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connecting Lines - Using theme variables */}
        <path 
          d="M700 80 L300 300 M700 80 L700 300 M700 80 L1100 300" 
          stroke="var(--accent)" 
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Center Circle */}
        <circle 
          cx="700" 
          cy="80"
          r="10"
          fill="var(--accent)" 
        />

        {/* Persona Path */}
        <Link href="/paths/persona">
          <rect
            x="150"
            y="250"
            width="300"
            height="100"
            rx="12"
            fill="var(--card)"
            stroke="var(--accent)"
            strokeWidth="2"
            className="transition-all duration-300 hover:opacity-90"
          />
          <text x="300" y="285" textAnchor="middle" fill="var(--text-primary)" className="text-lg font-semibold">
            Persona Path
          </text>
          <text x="300" y="315" textAnchor="middle" fill="var(--text-secondary)" className="text-sm">
            Choose your role to find relevant
          </text>
          <text x="300" y="335" textAnchor="middle" fill="var(--text-secondary)" className="text-sm">
            quantum computing applications
          </text>
        </Link>

        {/* Industry Path */}
        <Link href="/paths/industry">
          <rect
            x="550"
            y="250"
            width="300"
            height="100"
            rx="12"
            fill="var(--card)"
            stroke="var(--accent)"
            strokeWidth="2"
            className="transition-all duration-300 hover:opacity-90"
          />
          <text x="700" y="285" textAnchor="middle" fill="var(--text-primary)" className="text-lg font-semibold">
            Industry Path
          </text>
          <text x="700" y="315" textAnchor="middle" fill="var(--text-secondary)" className="text-sm">
            Explore quantum computing
          </text>
          <text x="700" y="335" textAnchor="middle" fill="var(--text-secondary)" className="text-sm">
            use cases in your sector
          </text>
        </Link>

        {/* Algorithm Path */}
        <Link href="/paths/algorithm">
          <rect
            x="950"
            y="250"
            width="300"
            height="100"
            rx="12"
            fill="var(--card)"
            stroke="var(--accent)"
            strokeWidth="2"
            className="transition-all duration-300 hover:opacity-90"
          />
          <text x="1100" y="285" textAnchor="middle" fill="var(--text-primary)" className="text-lg font-semibold">
            Algorithm Path
          </text>
          <text x="1100" y="315" textAnchor="middle" fill="var(--text-secondary)" className="text-sm">
            Learn about specific quantum
          </text>
          <text x="1100" y="335" textAnchor="middle" fill="var(--text-secondary)" className="text-sm">
            algorithms and their applications
          </text>
        </Link>
      </svg>
    </div>
  );
};

export default PathDiagram;