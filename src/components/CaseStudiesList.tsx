'use client';

import { useState, useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Database } from '@/types/supabase';
import ContentCard from '@/components/ui/content-card';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

interface CaseStudiesListProps {
  caseStudies: CaseStudy[];
}

type SortOption = 'title-asc' | 'title-desc' | 'updated-asc' | 'updated-desc' | 'year-asc' | 'year-desc';

export function CaseStudiesList({ caseStudies }: CaseStudiesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title-asc');
  const [yearFilter, setYearFilter] = useState<string>('all');

  if (!caseStudies || caseStudies.length === 0) {
    return <div>No case studies found.</div>;
  }

  // Memoize unique years for filter dropdown
  const availableYears = useMemo(() => {
    return Array.from(
      new Set(caseStudies.map(cs => cs.year).filter(Boolean))
    ).sort((a, b) => b - a); // Sort years descending
  }, [caseStudies]);

  // Memoize expensive filtering and sorting operations
  const filteredCaseStudies = useMemo(() => {
    return caseStudies
    .filter(caseStudy => {
      // Year filter
      if (yearFilter !== 'all' && caseStudy.year !== parseInt(yearFilter)) {
        return false;
      }
      
      // Search filter
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        caseStudy.title.toLowerCase().includes(query) ||
        (caseStudy.description?.toLowerCase().includes(query) || false) ||
        (caseStudy.year?.toString().includes(query) || false) // Search by year with null check
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'updated-asc':
          const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
          const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
          return dateA - dateB;
        case 'updated-desc':
          const dateC = a.updated_at ? new Date(a.updated_at).getTime() : 0;
          const dateD = b.updated_at ? new Date(b.updated_at).getTime() : 0;
          return dateD - dateC;
        case 'year-asc':
          if (a.year !== b.year) {
            return a.year - b.year;
          }
          return a.title.localeCompare(b.title);
        case 'year-desc':
          if (a.year !== b.year) {
            return b.year - a.year;
          }
          return a.title.localeCompare(b.title);
        default:
          return a.title.localeCompare(b.title);
      }
    });
  }, [caseStudies, yearFilter, searchQuery, sortBy]);

  // Memoize event handlers to prevent child re-renders
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((value: SortOption) => {
    setSortBy(value);
  }, []);

  const handleYearFilterChange = useCallback((value: string) => {
    setYearFilter(value);
  }, []);

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
            placeholder="Search by title, description, or year..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        
        <div className="w-full sm:w-[200px]">
          <Label htmlFor="year-filter" className="text-sm font-medium mb-1.5 block">
            Filter by year
          </Label>
          <Select value={yearFilter} onValueChange={handleYearFilterChange}>
            <SelectTrigger id="year-filter" className="w-full">
              <SelectValue placeholder="All years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {availableYears.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-[200px]">
          <Label htmlFor="sort" className="text-sm font-medium mb-1.5 block">
            Sort by
          </Label>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              <SelectItem value="year-desc">Year (Newest First)</SelectItem>
              <SelectItem value="year-asc">Year (Oldest First)</SelectItem>
              <SelectItem value="updated-desc">Recently Updated</SelectItem>
              <SelectItem value="updated-asc">Least Recently Updated</SelectItem>
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