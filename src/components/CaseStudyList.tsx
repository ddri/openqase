'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CaseStudyListProps {
  caseStudies: CaseStudy[];
}

type SortOption = 'title' | 'lastUpdated';

export default function CaseStudyList({ caseStudies }: CaseStudyListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title');

  // Filter and sort case studies
  const filteredCaseStudies = useMemo(() => {
    let filtered = [...caseStudies];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(study => 
        study.title.toLowerCase().includes(query) ||
        study.description.toLowerCase().includes(query) ||
        study.tags?.some(tag => tag.toLowerCase().includes(query))
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
  }, [caseStudies, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Filters and Sort Controls */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr,auto]">
        <div className="w-full">
          <Label htmlFor="search" className="text-sm font-medium mb-1.5 block">
            Search case studies
          </Label>
          <Input
            id="search"
            type="search"
            placeholder="Search by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full sm:max-w-[200px]">
          <Label htmlFor="sort" className="text-sm font-medium mb-1.5 block">
            Sort by
          </Label>
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

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredCaseStudies.length} case stud{filteredCaseStudies.length !== 1 ? 'ies' : 'y'} found
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredCaseStudies.map((study) => (
          <Link key={study.slug} href={`/case-study/${study.slug}`} className="group">
            <Card className={cn(
              "h-full transition-all duration-200 hover:border-border-hover",
              "hover:shadow-sm hover:bg-accent/5"
            )}>
              <CardHeader className="h-full flex flex-col">
                <div className="flex-grow">
                  <CardTitle className="text-lg sm:text-xl mb-2 line-clamp-2">
                    {study.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 mb-4">
                    {study.description}
                  </CardDescription>
                </div>
                
                {/* Tags */}
                {study.tags && study.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {study.tags.slice(0, 3).map((tag: string) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs px-2 py-0.5 whitespace-nowrap"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {study.tags.length > 3 && (
                      <Badge 
                        variant="outline" 
                        className="text-xs px-2 py-0.5 whitespace-nowrap"
                      >
                        +{study.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredCaseStudies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No case studies found matching your search.
          </p>
        </div>
      )}
    </div>
  );
} 