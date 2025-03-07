'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Algorithm } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AlgorithmListProps {
  algorithms: Algorithm[];
}

type SortOption = 'title' | 'lastUpdated';

export default function AlgorithmList({ algorithms }: AlgorithmListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title');

  // Get unique applications for filtering
  const allApplications = useMemo(() => {
    const apps = new Set<string>();
    algorithms.forEach(alg => alg.applications.forEach(app => apps.add(app)));
    return Array.from(apps).sort();
  }, [algorithms]);

  // Filter and sort algorithms
  const filteredAlgorithms = useMemo(() => {
    let filtered = [...algorithms];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(alg => 
        alg.title.toLowerCase().includes(query) ||
        alg.description.toLowerCase().includes(query) ||
        alg.keywords.some(k => k.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'lastUpdated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [algorithms, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Filters and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex-1 w-full">
          <Label htmlFor="search" className="mb-4 block">Search algorithms</Label>
          <Input
            id="search"
            type="search"
            placeholder="Search by title, description, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1">
            <Label htmlFor="sort" className="mb-4 block">Sort by</Label>
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
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
      </div>

      {/* Results count */}
      <div className="text-sm text-[var(--text-secondary)]">
        {filteredAlgorithms.length} algorithm{filteredAlgorithms.length !== 1 ? 's' : ''} found
      </div>

      {/* Algorithm Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlgorithms.map((algorithm) => (
          <Link key={algorithm.slug} href={`/paths/algorithm/${algorithm.slug}`}>
            <Card fixedHeight height={320} className="hover:bg-accent/15 hover:shadow-lg transition-all flex flex-col p-6">
              <div className="h-[4rem] flex items-start">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] line-clamp-2">
                  {algorithm.title}
                </h3>
              </div>
              <div className="flex-1">
                <p className="text-[var(--text-secondary)] line-clamp-5">
                  {algorithm.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {[...algorithm.applications]
                  .sort((a, b) => a.length - b.length)
                  .slice(0, 3)
                  .map((app: string, index: number) => (
                    <Badge 
                      key={app} 
                      variant="outline" 
                      className="text-[var(--text-secondary)] border-[var(--border)]"
                    >
                      {app}
                    </Badge>
                  ))}
                {algorithm.applications.length > 3 && (
                  <Badge variant="outline" className="more-badge">
                    +{algorithm.applications.length - 3} more
                  </Badge>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 