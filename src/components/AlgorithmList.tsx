'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Algorithm } from '@/lib/types';
import ContentList from '@/components/ui/content-list';

interface AlgorithmListProps {
  algorithms: Algorithm[];
}

export default function AlgorithmList({ algorithms }: AlgorithmListProps) {
  const [complexityFilter, setComplexityFilter] = useState<string>('all');

  // Get unique complexity levels for filtering
  const complexityLevels = Array.from(new Set(algorithms.map(alg => alg.complexity))).sort();

  const renderExtraFilters = () => (
    <div className="w-full sm:max-w-[200px]">
      <Label htmlFor="complexity" className="text-sm font-medium mb-1.5 block">
        Complexity
      </Label>
      <Select value={complexityFilter} onValueChange={(value) => setComplexityFilter(value)}>
        <SelectTrigger id="complexity" className="w-full">
          <SelectValue placeholder="Filter by complexity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Complexities</SelectItem>
          {complexityLevels.map(level => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderBadges = (algorithm: Algorithm) => (
    <>
      <Badge 
        variant="outline" 
        className="text-xs px-2 py-0.5 whitespace-nowrap"
      >
        {algorithm.complexity}
      </Badge>
      {algorithm.applications.slice(0, 2).map((app) => (
        <Badge 
          key={app.title} 
          variant="outline" 
          className="text-xs px-2 py-0.5 whitespace-nowrap"
        >
          {app.title}
        </Badge>
      ))}
      {algorithm.applications.length > 2 && (
        <Badge 
          variant="outline" 
          className="text-xs px-2 py-0.5 whitespace-nowrap"
        >
          +{algorithm.applications.length - 2} more
        </Badge>
      )}
    </>
  );

  const filteredAlgorithms = complexityFilter === 'all' 
    ? algorithms 
    : algorithms.filter(alg => alg.complexity === complexityFilter);

  return (
    <ContentList
      items={filteredAlgorithms}
      type="algorithm"
      renderBadges={renderBadges}
      renderExtraFilters={renderExtraFilters}
      basePath="/paths/algorithm"
    />
  );
} 