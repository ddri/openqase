// src/app/paths/persona/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import ContentCard from '@/components/ui/content-card';
import AuthGate from '@/components/auth/AuthGate';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import MarkdownIt from 'markdown-it';
import { AutoSchema } from '@/components/AutoSchema';

// Initialize markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});

// Define enriched types that match the actual relationship queries
type EnrichedPersona = Database['public']['Tables']['personas']['Row'] & {
  persona_industry_relations?: { industries: { id: string; name: string; slug?: string | null } | null }[];
  case_study_persona_relations?: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }[];
};

// Simple type for case studies from persona relations (only includes fetched fields)
type PersonaRelatedCaseStudy = {
  id: string;
  title: string;
  slug: string;
  description: string;
  published_at: string;
};

// Define an enriched type for CaseStudy that includes relations
type EnrichedCaseStudyForPersonaPage = Database['public']['Tables']['case_studies']['Row'] & {
  case_study_industry_relations?: { industries: { id: string; name: string; slug?: string | null } | null }[];
  // Add other relations here if fetched in the future, e.g., for algorithms
};

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

type Persona = Database['public']['Tables']['personas']['Row'];
type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

// Get metadata for the page
export async function generateMetadata({ params }: PageParams) {
  const resolvedParams = await params;
  
  const persona = await getStaticContentWithRelationships('personas', resolvedParams.slug) as EnrichedPersona;

  console.log('Metadata query result:', { persona });

  if (!persona) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: persona.name,
    description: persona.description,
  };
}

// Generate static params for all published personas
export async function generateStaticParams() {
  return generateStaticParamsForContentType('personas');
}

export default async function PersonaPage({ params }: PageParams) {
  const resolvedParams = await params;
  
  // Get the persona and its related industries and case studies
  const persona = await getStaticContentWithRelationships('personas', resolvedParams.slug) as EnrichedPersona;

  console.log('Fetched persona data:', {
    slug: resolvedParams.slug,
    persona,
    mdxContent: persona?.main_content,
    industryRelations: persona?.persona_industry_relations,
    industryRelationsLength: persona?.persona_industry_relations?.length,
    caseStudyRelations: persona?.case_study_persona_relations,
    caseStudyRelationsLength: persona?.case_study_persona_relations?.length,
  });

  if (!persona) {
    console.error('Error fetching persona');
    notFound();
  }

  // Extract related case studies from the persona data
  const caseStudies: PersonaRelatedCaseStudy[] = persona.case_study_persona_relations?.map((relation: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }) => relation.case_studies ? ({
    id: relation.case_studies.id,
    title: relation.case_studies.title,
    slug: relation.case_studies.slug,
    description: relation.case_studies.description || '',
    published_at: relation.case_studies.published_at,
  }) : null).filter((cs): cs is PersonaRelatedCaseStudy => cs !== null) || [];

  console.log(`[PersonaPage] Extracted ${caseStudies.length} case studies from persona relations`);

  // Preprocess and render markdown content
  let renderedContent = '';
  let renderedRecommendedReading = '';
  
  if (persona.main_content) {
    const preprocessedContent = preprocessMarkdown(persona.main_content);
    renderedContent = md.render(preprocessedContent);
  }
  
  if (persona.recommended_reading) {
    const preprocessedReading = preprocessMarkdown(persona.recommended_reading);
    renderedRecommendedReading = md.render(preprocessedReading);
  }

  return (
    <>
      {/* Ghost-style automatic course schema */}
      <AutoSchema type="course" data={persona} courseType="persona" />
      
      <AuthGate
        title="Access Persona Details"
        description="Get exclusive access to detailed quantum computing learning paths."
      >
      <LearningPathLayout
        title={persona.name}
        description={persona.description || ''}
        backLinkText="Back to Personas"
        backLinkHref="/paths/persona"
      >
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="space-y-8">
            {renderedContent && (
              <div
                className="prose prose-gray dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: renderedContent }}
              />
            )}

            {/* Recommended Reading Section */}
            {persona.recommended_reading && (
              <div>
                <hr className="my-8 border-border" />
                <h2 className="text-xl font-semibold mb-4">Recommended Reading</h2>
                <div
                  className="prose-a:text-[var(--primary)] prose-a:hover:underline"
                  dangerouslySetInnerHTML={{ __html: renderedRecommendedReading }}
                />
              </div>
            )}

            {/* Related Case Studies */}
            {caseStudies.length > 0 && (
              <div>
                <hr className="my-8 border-border" />
                <h2 className="text-xl font-semibold mb-4">Related Case Studies</h2>
                <div className="grid grid-cols-1 gap-6">
                  {caseStudies.map((caseStudy) => (
                    <Link
                      key={caseStudy.id}
                      href={`/case-study/${caseStudy.slug}`}
                      className="block group"
                    >
                      <div className="p-6 rounded-lg border border-border bg-card/50 transition-all duration-200 hover:bg-accent/5 hover:border-border-hover">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                          {caseStudy.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {caseStudy.description}
                        </p>
                        {/* Note: Industry and quantum hardware info not available in persona->case_study relationship */}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Expertise Badges */}
            {persona.expertise && persona.expertise.length > 0 && (
              <div>
                <h3 className="sidebar-title">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {persona.expertise.map((item: string) => (
                    <Badge key={item} variant="outline" className="text-[14px] border-border">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {/* Industries Section */}
            {persona.persona_industry_relations && (
              <div>
                <h3 className="sidebar-title">Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const relations = persona.persona_industry_relations || [];
                    if (relations.length === 0) {
                      return <p className="text-sm text-muted-foreground">None</p>;
                    }
                    const naIndustry = relations.find(rel => rel.industries?.slug === 'not-applicable');
                    if (naIndustry && relations.length === 1) {
                      return <p className="text-sm text-muted-foreground">Not Applicable</p>;
                    }
                    const actualIndustries = relations.filter(rel => rel.industries?.slug !== 'not-applicable');
                    if (actualIndustries.length === 0 && relations.length > 0 && !naIndustry) {
                        return <p className="text-sm text-muted-foreground">None</p>;
                    } 
                    if (actualIndustries.length > 0) {
                        return actualIndustries.map((relation) =>
                        relation.industries ? (
                          <Link key={relation.industries.id} href={`/paths/industry/${relation.industries?.slug}`} passHref>
                            <Badge
                              variant="outline"
                              className="text-[14px] border-border hover:bg-muted-foreground/20 cursor-pointer"
                            >
                              {relation.industries.name}
                            </Badge>
                          </Link>
                        ) : null
                      );
                    }
                    if (naIndustry) {
                        return <p className="text-sm text-muted-foreground">Not Applicable</p>;
                    }
                    return <p className="text-sm text-muted-foreground">None</p>;
                  })()}
                </div>
              </div>
            )}
            {/* Other sidebar content will go here */}
          </div>
        </div>
      </LearningPathLayout>
      </AuthGate>
    </>
  );
}