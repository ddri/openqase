'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex-1 w-full">
          <Label htmlFor="search" className="mb-4 block">Search case studies</Label>
          <Input
            id="search"
            type="search"
            placeholder="Search by title, description, or tags..."
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
        {filteredCaseStudies.length} case stud{filteredCaseStudies.length !== 1 ? 'ies' : 'y'} found
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCaseStudies.map((study) => (
          <Link key={study.slug} href={`/case-study/${study.slug}`}>
            <Card fixedHeight height={260} className="hover:bg-accent/5 transition-colors relative">
              <CardHeader flexGrow>
                <CardTitle className="text-xl mb-2">{study.title}</CardTitle>
                <CardDescription className="mb-12">
                  {study.description}
                </CardDescription>
              </CardHeader>
              
              {/* Fixed position badge container at bottom of card */}
              <div className="absolute bottom-4 left-6 right-6">
                {study.tags && study.tags.length > 0 && (
                  <div className="flex overflow-x-auto pb-1 scrollbar-none">
                    <div className="flex gap-2 flex-nowrap">
                      {study.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="whitespace-nowrap">
                          {tag}
                        </Badge>
                      ))}
                      {study.tags.length > 3 && (
                        <Badge variant="outline" className="whitespace-nowrap">
                          +{study.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 