'use client';

import { useState } from 'react';

// Light Mode Palette - No pure white (#FFFFFF)
const lightPalette = {
  // Backgrounds - Subtle off-whites with slight blue tint
  'bg-base': '#FAFBFC',      // Main background - GitHub-style off-white
  'bg-surface': '#FCFDFE',   // Cards/surfaces - Not pure white!
  'bg-elevated': '#FEFEFF',  // Elevated elements - Still not pure white
  'bg-subtle': '#F6F8FA',    // Subtle backgrounds
  'bg-muted': '#F1F4F7',     // More muted areas
  
  // Text - No pure black (#000000)
  'text-primary': '#1A1F26',    // Main text - Soft blue-black
  'text-secondary': '#4B5563',  // Secondary text
  'text-muted': '#6B7280',      // Muted text
  'text-disabled': '#9CA3AF',   // Disabled text
  
  // Borders & Dividers
  'border-default': '#E5E7EB',  // Default borders
  'border-subtle': '#F3F4F6',   // Very subtle borders
  'border-strong': '#D1D5DB',   // Stronger borders
  
  // Interactive Elements
  'primary': '#3B82F6',          // Primary blue
  'primary-hover': '#2563EB',   
  'primary-muted': '#EFF6FF',   // Primary tinted background
  
  // Semantic Colors
  'success': '#10B981',
  'warning': '#F59E0B',
  'error': '#EF4444',
  'info': '#06B6D4',
  
  // Special
  'code-bg': '#F8F9FB',         // Code block background
  'code-border': '#E8EAED',
  'shadow': 'rgba(0, 0, 0, 0.04)',
};

// Dark Mode Palette - No pure black (#000000)
const darkPalette = {
  // Backgrounds - Blue-tinted blacks
  'bg-base': '#0B0E14',        // Main background - Blue-black
  'bg-surface': '#13171F',     // Cards/surfaces
  'bg-elevated': '#1A1F2B',    // Elevated elements
  'bg-subtle': '#151921',      // Subtle backgrounds  
  'bg-muted': '#0F1218',       // More muted areas
  
  // Text - No pure white (#FFFFFF)
  'text-primary': '#F7F8F9',    // Main text - Soft white
  'text-secondary': '#C1C7CE',  // Secondary text
  'text-muted': '#8B92A1',      // Muted text
  'text-disabled': '#565D6B',   // Disabled text
  
  // Borders & Dividers
  'border-default': '#2A3142',  // Default borders
  'border-subtle': '#1E2430',   // Very subtle borders
  'border-strong': '#374151',   // Stronger borders
  
  // Interactive Elements
  'primary': '#5B9EF8',          // Primary blue (lighter in dark)
  'primary-hover': '#7AB3FA',   
  'primary-muted': '#1A2332',   // Primary tinted background
  
  // Semantic Colors (adjusted for dark)
  'success': '#34D399',
  'warning': '#FBBF24',
  'error': '#F87171',
  'info': '#67E8F9',
  
  // Special
  'code-bg': '#0D1117',         // Code block background
  'code-border': '#1F2937',
  'shadow': 'rgba(0, 0, 0, 0.3)',
};

export default function DesignSystem() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const palette = mode === 'light' ? lightPalette : darkPalette;
  
  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: palette['bg-base'] }}
    >
      {/* Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className="px-4 py-2 rounded-lg transition-all"
          style={{
            backgroundColor: palette['bg-elevated'],
            color: palette['text-primary'],
            border: `1px solid ${palette['border-default']}`,
            boxShadow: `0 2px 8px ${palette['shadow']}`
          }}
        >
          {mode === 'light' ? '🌙' : '☀️'} {mode === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ color: palette['text-primary'] }}
          >
            OpenQase Design System
          </h1>
          <p 
            className="text-lg"
            style={{ color: palette['text-secondary'] }}
          >
            {mode === 'light' ? 'Light' : 'Dark'} Mode Color Palette - No pure {mode === 'light' ? 'white' : 'black'}
          </p>
        </div>

        {/* Color Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Background Colors */}
          <div 
            className="p-6 rounded-lg"
            style={{ 
              backgroundColor: palette['bg-surface'],
              border: `1px solid ${palette['border-subtle']}`
            }}
          >
            <h3 
              className="font-semibold mb-4"
              style={{ color: palette['text-primary'] }}
            >
              Backgrounds
            </h3>
            <div className="space-y-3">
              {['bg-base', 'bg-surface', 'bg-elevated', 'bg-subtle', 'bg-muted'].map(key => (
                <div key={key} className="flex items-center justify-between">
                  <span style={{ color: palette['text-secondary'] }}>{key}</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-12 h-6 rounded"
                      style={{ 
                        backgroundColor: palette[key],
                        border: `1px solid ${palette['border-default']}`
                      }}
                    />
                    <code 
                      className="text-xs"
                      style={{ color: palette['text-muted'] }}
                    >
                      {palette[key]}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text Colors */}
          <div 
            className="p-6 rounded-lg"
            style={{ 
              backgroundColor: palette['bg-surface'],
              border: `1px solid ${palette['border-subtle']}`
            }}
          >
            <h3 
              className="font-semibold mb-4"
              style={{ color: palette['text-primary'] }}
            >
              Text Colors
            </h3>
            <div className="space-y-3">
              {['text-primary', 'text-secondary', 'text-muted', 'text-disabled'].map(key => (
                <div key={key}>
                  <span style={{ color: palette[key] }}>{key}</span>
                  <code 
                    className="text-xs ml-2"
                    style={{ color: palette['text-muted'] }}
                  >
                    {palette[key]}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Colors */}
          <div 
            className="p-6 rounded-lg"
            style={{ 
              backgroundColor: palette['bg-surface'],
              border: `1px solid ${palette['border-subtle']}`
            }}
          >
            <h3 
              className="font-semibold mb-4"
              style={{ color: palette['text-primary'] }}
            >
              Interactive Elements
            </h3>
            <div className="space-y-3">
              <button
                className="w-full px-4 py-2 rounded-md transition-colors"
                style={{
                  backgroundColor: palette['primary'],
                  color: mode === 'light' ? '#FFFFFF' : palette['bg-base']
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette['primary-hover']}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette['primary']}
              >
                Primary Button
              </button>
              <button
                className="w-full px-4 py-2 rounded-md transition-colors"
                style={{
                  backgroundColor: palette['bg-elevated'],
                  color: palette['text-primary'],
                  border: `1px solid ${palette['border-default']}`
                }}
              >
                Secondary Button
              </button>
            </div>
          </div>
        </div>

        {/* Example Components */}
        <div className="space-y-8">
          {/* Case Study Card Example */}
          <div>
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: palette['text-primary'] }}
            >
              Component Examples
            </h2>
            
            {/* Card */}
            <div 
              className="rounded-lg p-6 mb-6"
              style={{ 
                backgroundColor: palette['bg-surface'],
                border: `1px solid ${palette['border-subtle']}`,
                boxShadow: `0 1px 3px ${palette['shadow']}`
              }}
            >
              <div className="flex gap-2 mb-3">
                <span 
                  className="px-2 py-1 text-xs rounded"
                  style={{
                    backgroundColor: palette['primary-muted'],
                    color: palette['primary']
                  }}
                >
                  QuEra
                </span>
                <span 
                  className="px-2 py-1 text-xs rounded"
                  style={{
                    backgroundColor: palette['bg-subtle'],
                    color: palette['text-secondary']
                  }}
                >
                  Pawsey Supercomputing
                </span>
              </div>
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: palette['text-primary'] }}
              >
                QuEra and Pawsey conduct quantum-classical research
              </h3>
              <p 
                className="mb-4"
                style={{ color: palette['text-secondary'] }}
              >
                Partnering to advance methods and approaches to quantum-classical integration for advanced research.
              </p>
              <a 
                href="#"
                className="inline-flex items-center font-medium"
                style={{ color: palette['primary'] }}
              >
                Read case study →
              </a>
            </div>
          </div>

          {/* Code Block Example */}
          <div>
            <h3 
              className="text-xl font-bold mb-3"
              style={{ color: palette['text-primary'] }}
            >
              Code Block
            </h3>
            <div 
              className="rounded-lg p-4 font-mono text-sm"
              style={{
                backgroundColor: palette['code-bg'],
                border: `1px solid ${palette['code-border']}`
              }}
            >
              <div style={{ color: palette['text-muted'] }}>// Quantum algorithm example</div>
              <div>
                <span style={{ color: palette['primary'] }}>const</span>
                <span style={{ color: palette['text-primary'] }}> algorithm = </span>
                <span style={{ color: palette['success'] }}>'VQE'</span>
                <span style={{ color: palette['text-primary'] }}>;</span>
              </div>
              <div>
                <span style={{ color: palette['primary'] }}>const</span>
                <span style={{ color: palette['text-primary'] }}> qubits = </span>
                <span style={{ color: palette['warning'] }}>128</span>
                <span style={{ color: palette['text-primary'] }}>;</span>
              </div>
            </div>
          </div>

          {/* Surface Elevation Example */}
          <div>
            <h3 
              className="text-xl font-bold mb-3"
              style={{ color: palette['text-primary'] }}
            >
              Surface Elevation Levels
            </h3>
            <div className="space-y-4">
              {[
                { level: 'Base', bg: 'bg-base' },
                { level: 'Surface', bg: 'bg-surface' },
                { level: 'Elevated', bg: 'bg-elevated' }
              ].map((item) => (
                <div 
                  key={item.level}
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: palette[item.bg],
                    border: `1px solid ${palette['border-subtle']}`,
                    boxShadow: item.level === 'Elevated' ? `0 4px 12px ${palette['shadow']}` : undefined
                  }}
                >
                  <span style={{ color: palette['text-primary'] }}>
                    {item.level} - {palette[item.bg]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Color Values Display */}
        <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: palette['bg-subtle'] }}>
          <h3 
            className="text-lg font-bold mb-4"
            style={{ color: palette['text-primary'] }}
          >
            Key Design Principles
          </h3>
          <ul className="space-y-2" style={{ color: palette['text-secondary'] }}>
            <li>• No pure white (#FFFFFF) or pure black (#000000)</li>
            <li>• Light mode: Warm-tinted grays for a paper-like feel</li>
            <li>• Dark mode: Cool-tinted blues for a technical feel</li>
            <li>• Subtle borders in light mode, stronger in dark mode</li>
            <li>• Shadows provide depth in light mode, elevation colors in dark mode</li>
          </ul>
        </div>
      </div>
    </div>
  );
}