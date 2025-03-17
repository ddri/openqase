'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { BaseContent } from '@/lib/types';

interface SortOption {
  value: string;
  label: string;
}

interface ContentListProps<T extends BaseContent> {
  items: T[];
  type: 'algorithm' | 'case-study' | 'industry' | 'persona';
  renderBadges?: (item: T) => React.ReactNode;
  renderExtraFilters?: () => React.ReactNode;
  basePath: string;
  sortOptions?: SortOption[];
}

export default function ContentList<T extends BaseContent>({ 
  items,
  type,
  renderBadges,
  renderExtraFilters,
  basePath,
  sortOptions = [
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'lastUpdated', label: 'Last Updated' }
  ]
}: ContentListProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(sortOptions[0].value);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = [...items];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.keywords?.some(keyword => keyword.toLowerCase().includes(query))
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
  }, [items, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Filters and Sort Controls */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr,auto,auto]">
        <div className="w-full">
          <Label htmlFor="search" className="text-sm font-medium mb-1.5 block">
            Search
          </Label>
          <Input
            id="search"
            type="search"
            placeholder={`Search ${type}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {renderExtraFilters?.()}

        <div className="w-full sm:max-w-[200px]">
          <Label htmlFor="sort" className="text-sm font-medium mb-1.5 block">
            Sort by
          </Label>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredItems.length} {type}{filteredItems.length !== 1 ? 's' : ''} found
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Link key={item.slug} href={`${basePath}/${item.slug}`}>
            <Card className={cn(
              "h-full transition-all duration-200 hover:border-border-hover",
              "hover:shadow-sm hover:bg-accent/5"
            )}>
              <CardHeader className="h-full flex flex-col">
                <div className="flex-grow">
                  <CardTitle className="text-lg sm:text-xl mb-2 line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 mb-4">
                    {item.description}
                  </CardDescription>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {renderBadges?.(item)}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No {type}s found matching your search.
          </p>
        </div>
      )}
    </div>
  );
} 