'use client';

import { Grid3X3, List } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ViewMode } from '@/hooks/useViewSwitcher';

interface ViewSwitcherProps {
  value: ViewMode;
  onValueChange: (value: ViewMode) => void;
  className?: string;
}

export function ViewSwitcher({ value, onValueChange, className }: ViewSwitcherProps) {
  return (
    <Tabs 
      value={value} 
      onValueChange={(newValue) => onValueChange(newValue as ViewMode)}
      className={className}
    >
      <TabsList>
        <TabsTrigger value="grid" aria-label="Grid view">
          <Grid3X3 className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="list" aria-label="List view">
          <List className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}