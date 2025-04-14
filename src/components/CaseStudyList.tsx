'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { CaseStudy } from '@/lib/types';
import ContentCard from '@/components/ui/content-card';

interface CaseStudyListProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyList({ caseStudies }: CaseStudyListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'lastUpdated'>('title');

  // Get unique industries for filtering
  const industries = Array.from(new Set(caseStudies.map(cs => cs.industry?.[0] || 'Unknown'))).filter(i => i !== 'Unknown').sort();

  // Filter and sort case studies
  const filteredCaseStudies = caseStudies
    .filter(cs => {
      if (industryFilter !== 'all' && !cs.industry?.includes(industryFilter)) return false;
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      const industryMatch = cs.industry?.some(ind => ind.toLowerCase().includes(query)) || false;
      const techMatch = cs.technologies?.some(tech => tech.toLowerCase().includes(query)) || false;
      
      return (
        cs.title.toLowerCase().includes(query) ||
        cs.description.toLowerCase().includes(query) ||
        industryMatch ||
        techMatch
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
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="text-sm font-medium mb-1.5 block">
            Search case studies
          </Label>
          <Input
            id="search"
            type="search"
            placeholder="Search by title, description, industry, or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full sm:w-[200px]">
          <Label htmlFor="industry" className="text-sm font-medium mb-1.5 block">
            Industry
          </Label>
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger id="industry" className="w-full">
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        {filteredCaseStudies.length} case stud{filteredCaseStudies.length !== 1 ? 'ies' : 'y'} found
      </div>

      {/* Case Study Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCaseStudies.map((caseStudy) => (
          <ContentCard
            key={caseStudy.slug}
            title={caseStudy.title}
            description={caseStudy.description}
            badges={[...(caseStudy.industry || []), ...(caseStudy.technologies || [])]}
            href={`/case-study/${caseStudy.slug}`}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredCaseStudies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-[var(--text-secondary)]">
            No case studies found matching your search.
          </p>
        </div>
      )}
    </div>
  );
} 