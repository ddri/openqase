'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { CaseStudy } from '@/lib/types';
import ContentList from '@/components/ui/content-list';

interface CaseStudyListProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyList({ caseStudies }: CaseStudyListProps) {
  const [industryFilter, setIndustryFilter] = useState<string>('all');

  // Get unique industries for filtering
  const industries = Array.from(new Set(caseStudies.flatMap(cs => cs.industry))).sort();

  const renderExtraFilters = () => (
    <div className="w-full sm:max-w-[200px]">
      <Label htmlFor="industry" className="text-sm font-medium mb-1.5 block">
        Industry
      </Label>
      <Select value={industryFilter} onValueChange={(value) => setIndustryFilter(value)}>
        <SelectTrigger id="industry" className="w-full">
          <SelectValue placeholder="Filter by industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Industries</SelectItem>
          {industries.map(ind => (
            <SelectItem key={ind} value={ind}>
              {ind}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderBadges = (caseStudy: CaseStudy) => (
    <>
      {caseStudy.industry.slice(0, 1).map(ind => (
        <Badge 
          key={ind} 
          variant="outline" 
          className="text-xs px-2 py-0.5 whitespace-nowrap"
        >
          {ind}
        </Badge>
      ))}
      {caseStudy.technologies.slice(0, 2).map(tech => (
        <Badge 
          key={tech} 
          variant="outline" 
          className="text-xs px-2 py-0.5 whitespace-nowrap"
        >
          {tech}
        </Badge>
      ))}
      {caseStudy.technologies.length > 2 && (
        <Badge 
          variant="outline" 
          className="text-xs px-2 py-0.5 whitespace-nowrap"
        >
          +{caseStudy.technologies.length - 2} more
        </Badge>
      )}
    </>
  );

  const filteredCaseStudies = industryFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry.includes(industryFilter));

  return (
    <ContentList
      items={filteredCaseStudies}
      type="case-study"
      renderBadges={renderBadges}
      renderExtraFilters={renderExtraFilters}
      basePath="/paths/case-study"
    />
  );
} 