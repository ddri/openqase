'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ContentCompletenessProps {
  percentage: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * ContentCompleteness Component
 * 
 * Displays a visual indicator of content completion percentage.
 * 
 * @param percentage - The percentage of content completion (0-100)
 * @param showLabel - Whether to show the percentage label
 * @param size - The size of the component (sm, md, lg)
 * @param className - Additional CSS classes
 */
export function ContentCompleteness({
  percentage,
  showLabel = true,
  size = 'md',
  className
}: ContentCompletenessProps) {
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.max(0, Math.min(100, percentage));
  
  // Determine color based on percentage
  const getColor = () => {
    if (validPercentage < 30) return 'bg-red-500';
    if (validPercentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-1.5 text-xs';
      case 'lg':
        return 'h-3 text-base';
      case 'md':
      default:
        return 'h-2 text-sm';
    }
  };
  
  return (
    <div className={cn('w-full space-y-1', className)}>
      {showLabel && (
        <div className="flex justify-between items-center">
          <span className={cn('text-muted-foreground', getSizeClasses())}>
            Content Completeness
          </span>
          <span className={cn('font-medium', getSizeClasses())}>
            {validPercentage}%
          </span>
        </div>
      )}
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', getSizeClasses())}>
        <div
          className={cn('h-full rounded-full transition-all duration-300', getColor())}
          style={{ width: `${validPercentage}%` }}
          role="progressbar"
          aria-valuenow={validPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export default ContentCompleteness;