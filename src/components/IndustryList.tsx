'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Industry } from '@/lib/types';
import ContentList from '@/components/ui/content-list';

interface IndustryListProps {
  industries: Industry[];
}

export default function IndustryList({ industries }: IndustryListProps) {
  const [sectorFilter, setSectorFilter] = useState<string>('all');

  // Get unique sectors for filtering
  const sectors = Array.from(new Set(industries.map(ind => ind.sector))).sort();

  const renderExtraFilters = () => (
    <div className="w-full sm:max-w-[200px]">
      <Label htmlFor="sector" className="text-sm font-medium mb-1.5 block">
        Sector
      </Label>
      <Select value={sectorFilter} onValueChange={(value) => setSectorFilter(value)}>
        <SelectTrigger id="sector" className="w-full">
          <SelectValue placeholder="Filter by sector" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sectors</SelectItem>
          {sectors.map(sector => (
            <SelectItem key={sector} value={sector}>
              {sector}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderBadges = (industry: Industry) => (
    <>
      <Badge 
        variant="outline" 
        className="text-xs px-2 py-0.5 whitespace-nowrap"
      >
        {industry.sector}
      </Badge>
      {industry.applications?.slice(0, 2).map((app) => (
        <Badge 
          key={app} 
          variant="outline" 
          className="text-xs px-2 py-0.5 whitespace-nowrap"
        >
          {app}
        </Badge>
      ))}
      {(industry.applications?.length ?? 0) > 2 && (
        <Badge 
          variant="outline" 
          className="text-xs px-2 py-0.5 whitespace-nowrap"
        >
          +{industry.applications!.length - 2} more
        </Badge>
      )}
    </>
  );

  const filteredIndustries = sectorFilter === 'all' 
    ? industries 
    : industries.filter(ind => ind.sector === sectorFilter);

  return (
    <ContentList
      items={filteredIndustries}
      type="industry"
      renderBadges={renderBadges}
      renderExtraFilters={renderExtraFilters}
      basePath="/paths/industry"
      sortOptions={[
        { value: 'title', label: 'Name (A-Z)' },
        { value: 'lastUpdated', label: 'Last Updated' }
      ]}
    />
  );
} 