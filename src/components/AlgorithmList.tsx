'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Algorithm } from '@/lib/types';
import ContentCard from '@/components/ui/content-card';

interface AlgorithmListProps {
  algorithms: Algorithm[];
}

export default function AlgorithmList({ algorithms }: AlgorithmListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'lastUpdated'>('title');

  // Filter and sort algorithms
  const filteredAlgorithms = algorithms
    .filter(alg => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        alg.title.toLowerCase().includes(query) ||
        alg.description.toLowerCase().includes(query) ||
        alg.keywords.some(k => k.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'lastUpdated') {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="text-sm font-medium mb-1.5 block">
            Search algorithms
          </Label>
          <Input
            id="search"
            type="search"
            placeholder="Search by title, description, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full sm:w-[200px]">
          <Label htmlFor="sort" className="text-sm font-medium mb-1.5 block">
            Sort by
          </Label>
          <Select value={sortBy} onValueChange={(value: 'title' | 'lastUpdated') => setSortBy(value)}>
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title (A-Z)</SelectItem>
              <SelectItem value="lastUpdated">Last Updated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-[var(--text-secondary)]">
        {filteredAlgorithms.length} algorithm{filteredAlgorithms.length !== 1 ? 's' : ''} found
      </div>

      {/* Algorithm Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlgorithms.map((algorithm) => (
          <ContentCard
            key={algorithm.slug}
            title={algorithm.title}
            description={algorithm.description}
            badges={algorithm.applications}
            href={`/paths/algorithm/${algorithm.slug}`}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredAlgorithms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-[var(--text-secondary)]">
            No algorithms found matching your search.
          </p>
        </div>
      )}
    </div>
  );
} 