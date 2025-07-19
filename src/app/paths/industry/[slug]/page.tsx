// src/app/paths/industry/[slug]/page.tsx
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import MarkdownIt from 'markdown-it';
import { SupabaseClient } from '@supabase/supabase-js';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});

// Function to fix bullet points in markdown content
function preprocessMarkdown(content: string): string {
  // Fix lists: ensure there's a space after each dash at the beginning of a line
  // and add a newline before lists if needed
  const fixedContent = content
    .replace(/^-([^\s])/gm, '- $1')  // Add space after dash at line start if missing
    .replace(/([^\n])\n^-\s/gm, '$1\n\n- '); // Add blank line before list starts
    
  return fixedContent;
}

// Customize renderer to improve table formatting
const defaultRender = md.renderer.rules.table_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.table_open = function(tokens, idx, options, env, self) {
  // Add a div wrapper with a class around the table
  return '<div class="table-container">' + defaultRender(tokens, idx, options, env, self);
};

md.renderer.rules.table_close = function(tokens, idx, options, env, self) {
  // Close both the table and the wrapper div
  return '</table></div>';
};

// Customize cell rendering for numeric detection
const defaultCellRender = md.renderer.rules.td_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.td_open = function(tokens, idx, options, env, self) {
  // Check if cell content might be numeric
  const content = tokens[idx+1]?.content;
  const isNumeric = content && !isNaN(parseFloat(content)) && content.trim() !== '';
  
  if (isNumeric) {
    return '<td class="numeric">';
  }
  return defaultCellRender(tokens, idx, options, env, self);
};

// Define enriched types
type EnrichedIndustry = Database['public']['Tables']['industries']['Row'] & {
  algorithm_industry_relations?: { algorithms: { id: string; name: string; slug?: string | null } | null }[];
  persona_industry_relations?: { personas: { id: string; name: string; slug?: string | null } | null }[];
  case_study_industry_relations?: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }[];
};

// Simple type for case studies from industry relations (only includes fetched fields)
type IndustryRelatedCaseStudy = {
  id: string;
  title: string;
  slug: string;
  description: string;
  published_at: string;
};

interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  industries: string[];
}

// Get metadata for the page
export async function generateMetadata({ params }: PageParams) {
  const resolvedParams = await params;
  
  const industry = await getStaticContentWithRelationships('industries', resolvedParams.slug) as EnrichedIndustry;
  
  if (!industry) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: industry.name,
    description: industry.description,
  };
}

// Generate static params for all published industries
export async function generateStaticParams() {
  return generateStaticParamsForContentType('industries');
}

export default async function IndustryPage({ params }: PageParams) {
  const resolvedParams = await params;
  
  console.log('Fetching industry with slug:', resolvedParams.slug);
  // Fetch industry along with related algorithms, personas, and case studies
  const industry = await getStaticContentWithRelationships('industries', resolvedParams.slug) as EnrichedIndustry;

  if (!industry) {
    return <div>Industry not found</div>;
  }

  console.log('Fetching case studies for industry:', industry.name);
  
  // Extract related case studies from the industry data
  const caseStudies: IndustryRelatedCaseStudy[] = industry.case_study_industry_relations?.map((relation: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }) => relation.case_studies ? ({
    id: relation.case_studies.id,
    title: relation.case_studies.title,
    slug: relation.case_studies.slug,
    description: relation.case_studies.description || '',
    published_at: relation.case_studies.published_at,
  }) : null).filter((cs): cs is IndustryRelatedCaseStudy => cs !== null) || [];

  // Preprocess and render industry main content if available
  let processedContent = '';
  if (industry.main_content) {
    const preprocessedContent = preprocessMarkdown(industry.main_content);
    processedContent = md.render(preprocessedContent);
  }

  return (
    <LearningPathLayout 
      title={industry.name}
      backLinkText="Back to Industries"
      backLinkHref="/paths/industry"
    >
      <div className="grid gap-12 md:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <div className="flex flex-col gap-4">
            <p className="text-lg text-muted-foreground">{industry.description}</p>
            {industry.main_content && (
              <div className="prose dark:prose-invert max-w-none mt-8"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            )}
          </div>

          {caseStudies && caseStudies.length > 0 && (
            <>
              <hr className="my-8 border-border" />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Related Case Studies</h2>
                <div className="grid grid-cols-1 gap-6">
                  {caseStudies.map((study) => (
                    <Link key={study.id} href={`/case-study/${study.slug}`} className="block group">
                      <div className="p-6 rounded-lg border border-border bg-card/50 transition-all duration-200 hover:bg-accent/5 hover:border-border-hover">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                          {study.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {study.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          {/* Algorithms Section */}
          {industry.algorithm_industry_relations && (
            <div>
              <h3 className="sidebar-title">Algorithms</h3>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const relations = industry.algorithm_industry_relations || [];
                  if (relations.length === 0) {
                    return <p className="text-sm text-muted-foreground">None</p>;
                  }
                  const naItem = relations.find(rel => rel.algorithms?.slug === 'not-applicable');
                  if (naItem && relations.length === 1) {
                    return <p className="text-sm text-muted-foreground">Not Applicable</p>;
                  }
                  const actualItems = relations.filter(rel => rel.algorithms?.slug !== 'not-applicable');
                  if (actualItems.length === 0) {
                    // Handles case where only 'Not Applicable' was present or other relations were null/invalid
                    return naItem ? <p className="text-sm text-muted-foreground">Not Applicable</p> : <p className="text-sm text-muted-foreground">None</p>;
                  }
                  return actualItems.map((relation) =>
                    relation.algorithms ? (
                      <Link key={relation.algorithms.id} href={`/paths/algorithm/${relation.algorithms?.slug}`} passHref>
                        <Badge
                          variant="outline"
                          className="text-[14px] border-border hover:bg-muted-foreground/20 cursor-pointer"
                        >
                          {relation.algorithms.name}
                        </Badge>
                      </Link>
                    ) : null
                  );
                })()}
              </div>
            </div>
          )}

          {/* Personas Section */}
          {industry.persona_industry_relations && (
            <div>
              <h3 className="sidebar-title">Personas</h3>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const relations = industry.persona_industry_relations || [];
                  if (relations.length === 0) {
                    return <p className="text-sm text-muted-foreground">None</p>;
                  }
                  const naItem = relations.find(rel => rel.personas?.slug === 'not-applicable');
                  if (naItem && relations.length === 1) {
                    return <p className="text-sm text-muted-foreground">Not Applicable</p>;
                  }
                  const actualItems = relations.filter(rel => rel.personas?.slug !== 'not-applicable');
                  if (actualItems.length === 0) {
                     return naItem ? <p className="text-sm text-muted-foreground">Not Applicable</p> : <p className="text-sm text-muted-foreground">None</p>;
                  }
                  return actualItems.map((relation) =>
                    relation.personas ? (
                      <Link key={relation.personas.id} href={`/paths/persona/${relation.personas?.slug}`} passHref>
                        <Badge
                          variant="outline"
                          className="text-[14px] border-border hover:bg-muted-foreground/20 cursor-pointer"
                        >
                          {relation.personas.name}
                        </Badge>
                      </Link>
                    ) : null
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </LearningPathLayout>
  );
}