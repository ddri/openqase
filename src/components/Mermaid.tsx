// File: src/components/Mermaid.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  className?: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart, className = '' }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      flowchart: {
        htmlLabels: true,
        padding: 20,
        nodeSpacing: 50,
        rankSpacing: 150,
        curve: 'basis',
        defaultRenderer: 'dagre-wrapper'
      }
    });
    
    if (elementRef.current) {
      mermaid.render('mermaid-diagram', chart).then(({ svg }) => {
        if (elementRef.current) {
          elementRef.current.innerHTML = svg;
          
          // Style the SVG
          const svgElement = elementRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.width = '100%';
            svgElement.style.height = 'auto';
            svgElement.style.minHeight = '400px';
          }

          // Style the node labels
          const labels = elementRef.current.querySelectorAll('.nodeLabel');
          labels.forEach(label => {
            if (label instanceof HTMLElement) {
              label.style.fontFamily = 'inherit';
              label.style.lineHeight = '1.5';
              label.style.padding = '1rem';
              label.style.textAlign = 'center';
            }
          });

          // Add hover effect to nodes
          const nodes = elementRef.current.querySelectorAll('.node');
          nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
              const rect = node.querySelector('rect');
              if (rect) {
                rect.style.filter = 'brightness(0.95)';
                rect.style.transition = 'all 0.2s ease';
              }
            });
            node.addEventListener('mouseleave', () => {
              const rect = node.querySelector('rect');
              if (rect) {
                rect.style.filter = 'none';
              }
            });
          });
        }
      });
    }
  }, [chart]);

  return (
    <div ref={elementRef} className={`flex justify-center items-center ${className}`} />
  );
};

export default Mermaid;