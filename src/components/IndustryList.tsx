'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Industry } from '@/types/supabase';
import ContentCard from '@/components/ui/content-card';

interface IndustryListProps {
  industries: Industry[];
}

export default function IndustryList({ industries }: IndustryListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'created_at'>('name');

  // Get unique sectors for filtering
  const sectors = Array.from(new Set(industries.map(ind => ind.sector || 'Other'))).sort();

  // Filter and sort industries
  const filteredIndustries = industries
    .filter(industry => {
      if (sectorFilter !== 'all' && industry.sector !== sectorFilter) return false;
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        industry.name.toLowerCase().includes(query) ||
        industry.description?.toLowerCase().includes(query) ||
        (industry.sector || '').toLowerCase().includes(query) ||
        industry.key_applications?.some(app => 
          app.title.toLowerCase().includes(query) || 
          app.description.toLowerCase().includes(query)
        )
      );
    })
    .sort((a, b) => {
      if (sortBy === 'created_at') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="text-sm font-medium mb-1.5 block">
            Search industries
          </Label>
          <Input
            id="search"
            type="search"
            placeholder="Search by name, description, sector, or applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full sm:w-[200px]">
          <Label htmlFor="sector" className="text-sm font-medium mb-1.5 block">
            Sector
          </Label>
          <Select value={sectorFilter} onValueChange={setSectorFilter}>
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

        <div className="w-full sm:w-[200px]">
          <Label htmlFor="sort" className="text-sm font-medium mb-1.5 block">
            Sort by
          </Label>
          <Select value={sortBy} onValueChange={(value: 'name' | 'created_at') => setSortBy(value)}>
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="created_at">Last Updated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredIndustries.length} industr{filteredIndustries.length !== 1 ? 'ies' : 'y'} found
      </div>

      {/* Industry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIndustries.map((industry) => (
          <ContentCard
            key={industry.slug}
            title={industry.name}
            description={industry.description || ''}
            badges={[
              industry.sector || 'Other',
              ...(industry.key_applications?.map(app => app.title) || [])
            ]}
            href={`/paths/industry/${industry.slug}`}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredIndustries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No industries found matching your search.
          </p>
        </div>
      )}
    </div>
  );
} 