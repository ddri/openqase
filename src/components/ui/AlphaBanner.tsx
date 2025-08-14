'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

export default function AlphaBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[hsl(var(--primary))] text-primary-foreground text-xs">
      <div className="container mx-auto px-4 h-7 flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 translate-y-[0.5px]" />
          <span className="ml-2">
            <span className="font-semibold">Alpha Release:</span>
            {' '}openQase is currently in active development. Features may be incomplete or contain errors.
          </span>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1.5 hover:bg-primary-foreground/20 rounded-sm opacity-90 hover:opacity-100 transition-all"
          aria-label="Close alpha banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
} 