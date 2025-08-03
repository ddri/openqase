// src/app/paths/persona/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import ContentCard from '@/components/ui/content-card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { processMarkdown } from '@/lib/markdown-server';
import { AutoSchema } from '@/components/AutoSchema';

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

  if (!persona) {
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

  // Process markdown content with server-side processor
  const renderedContent = processMarkdown(persona.main_content);
  const renderedRecommendedReading = processMarkdown(persona.recommended_reading);

  return (
    <>
      {/* Ghost-style automatic course schema */}
      <AutoSchema type="course" data={persona} courseType="persona" />
      
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
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary line-clamp-2">
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
                    <Badge key={item} variant="outline" className="text-[14px] border-border break-words hyphens-auto">
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
                              className="text-[14px] border-border hover:bg-muted-foreground/20 cursor-pointer break-words"
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
    </>
  );
}