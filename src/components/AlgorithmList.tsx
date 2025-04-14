'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Database } from '@/types/supabase';
import ContentCard from '@/components/ui/content-card';

type Algorithm = Database['public']['Tables']['algorithms']['Row'];

interface AlgorithmListProps {
  algorithms: Algorithm[];
}

export default function AlgorithmList({ algorithms }: AlgorithmListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'created_at'>('name');

  console.log('AlgorithmList received algorithms:', algorithms);

  // Filter and sort algorithms
  const filteredAlgorithms = algorithms
    .filter(alg => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      console.log('Filtering algorithm:', { alg, query });
      return (
        alg.name.toLowerCase().includes(query) ||
        alg.description?.toLowerCase().includes(query) ||
        alg.use_cases?.some(k => k.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      console.log('Comparing for sort:', {
        a_name: a.name,
        b_name: b.name,
        a_slug: a.slug,
        b_slug: b.slug
      });
      if (sortBy === 'created_at') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return a.name.localeCompare(b.name);
    });

  console.log('Filtered and sorted algorithms:', filteredAlgorithms);

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
            placeholder="Search by name, description, or use cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
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
      <div className="text-sm text-[var(--text-secondary)]">
        {filteredAlgorithms.length} algorithm{filteredAlgorithms.length !== 1 ? 's' : ''} found
      </div>

      {/* Algorithm Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlgorithms.map((algorithm) => (
          <ContentCard
            key={algorithm.slug}
            title={algorithm.name}
            description={algorithm.description || ''}
            badges={algorithm.use_cases || []}
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