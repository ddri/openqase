// File: src/components/journey/PathDiagram.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const PathDiagram = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <svg 
        viewBox="0 0 1400 400" // Increased width for more spacing
        className="w-full max-w-6xl mx-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connecting Lines - Made thicker */}
        <path 
          d="M700 80 L300 300 M700 80 L700 300 M700 80 L1100 300" 
          stroke="#F4A261" 
          strokeWidth="4" // Increased from 3 to 4
          strokeLinecap="round"
        />
        
        {/* Center Circle - Made slightly larger */}
        <circle 
          cx="700" 
          cy="80" // Moved up from 100 to 80
          r="10" // Increased from 8 to 10
          fill="#F4A261" 
        />

        {/* Persona Path - Moved left */}
        <Link href="/paths/personas">
          <rect 
            x="150" 
            y="250"
            width="300" 
            height="100" 
            rx="12" 
            fill="white" 
            stroke="#F4A261"
            strokeWidth="2"
            className="transition-all duration-300 hover:opacity-90"
          />
          <text x="300" y="285" textAnchor="middle" fill="#0f172a" className="text-lg font-semibold">
            Persona Path
          </text>
          <text x="300" y="315" textAnchor="middle" fill="#0f172a" className="text-sm">
            Choose your role to find relevant
          </text>
          <text x="300" y="335" textAnchor="middle" fill="#0f172a" className="text-sm">
            quantum computing applications
          </text>
        </Link>

        {/* Industry Path - Centered */}
        <Link href="/paths/industries">
          <rect 
            x="550" 
            y="250" 
            width="300" 
            height="100" 
            rx="12" 
            fill="white" 
            stroke="#F4A261"
            strokeWidth="2"
            className="transition-all duration-300 hover:opacity-90"
          />
          <text x="700" y="285" textAnchor="middle" fill="#0f172a" className="text-lg font-semibold">
            Industry Path
          </text>
          <text x="700" y="315" textAnchor="middle" fill="#0f172a" className="text-sm">
            Explore quantum computing
          </text>
          <text x="700" y="335" textAnchor="middle" fill="#0f172a" className="text-sm">
            use cases in your sector
          </text>
        </Link>

        {/* Algorithm Path - Moved right */}
        <Link href="/paths/algorithms">
          <rect 
            x="950" 
            y="250" 
            width="300" 
            height="100" 
            rx="12" 
            fill="white" 
            stroke="#F4A261"
            strokeWidth="2"
            className="transition-all duration-300 hover:opacity-90"
          />
          <text x="1100" y="285" textAnchor="middle" fill="#0f172a" className="text-lg font-semibold">
            Algorithm Path
          </text>
          <text x="1100" y="315" textAnchor="middle" fill="#0f172a" className="text-sm">
            Learn about specific quantum
          </text>
          <text x="1100" y="335" textAnchor="middle" fill="#0f172a" className="text-sm">
            algorithms and their applications
          </text>
        </Link>
      </svg>
    </div>
  );
};

export default PathDiagram;