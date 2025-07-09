'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Database } from '@/types/supabase';
import ContentCard from '@/components/ui/content-card';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

interface CaseStudiesListProps {
  caseStudies: CaseStudy[];
}

export function CaseStudiesList({ caseStudies }: CaseStudiesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'updated_at'>('title');

  if (!caseStudies || caseStudies.length === 0) {
    return <div>No case studies found.</div>;
  }

  // Filter and sort case studies
  const filteredCaseStudies = caseStudies
    .filter(caseStudy => {
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        caseStudy.title.toLowerCase().includes(query) ||
        (caseStudy.description?.toLowerCase().includes(query) || false)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'updated_at') {
        // Handle null updated_at values
        const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return dateB - dateA;
      }
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="text-sm font-medium mb-1.5 block">
            Search case studies
          </Label>
          <Input
            id="search"
            type="search"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full sm:w-[200px]">
          <Label htmlFor="sort" className="text-sm font-medium mb-1.5 block">
            Sort by
          </Label>
          <Select value={sortBy} onValueChange={(value: 'title' | 'updated_at') => setSortBy(value)}>
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title (A-Z)</SelectItem>
              <SelectItem value="updated_at">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredCaseStudies.length} case stud{filteredCaseStudies.length !== 1 ? 'ies' : 'y'} found
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCaseStudies.map((caseStudy) => {
          return (
            <ContentCard
              key={caseStudy.id}
              title={caseStudy.title}
              description={caseStudy.description || ''}
              badges={[]}
              href={`/case-study/${caseStudy.slug}`}
            />
          );
        })}
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