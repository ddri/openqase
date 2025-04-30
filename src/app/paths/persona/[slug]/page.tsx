// src/app/paths/persona/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import ContentCard from '@/components/ui/content-card';
import { cookies } from 'next/headers';
import AuthGate from '@/components/auth/AuthGate';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SupabaseClient } from '@supabase/supabase-js';
import MarkdownIt from 'markdown-it';
import { RecommendedReadingRenderer } from '@/components/ui/RecommendedReadingRenderer';
import { processContentWithLinks } from '@/utils/contentProcessing';

// Initialize markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

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
  const supabase = await createServerSupabaseClient();
  
  const { data: persona } = await supabase
    .from('personas')
    .select()
    .eq('slug', resolvedParams.slug)
    .single();

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

export default async function PersonaPage({ params }: PageParams) {
  const resolvedParams = await params;
  const supabase = await createServerSupabaseClient();
  
  // Step 1: Get the persona
  const { data: persona, error: personaError } = await supabase
    .from('personas')
    .select()
    .eq('slug', resolvedParams.slug)
    .single();

  console.log('Fetched persona data:', {
    slug: resolvedParams.slug,
    persona,
    mdxContent: persona?.main_content,
    error: personaError
  });

  if (personaError || !persona) {
    console.error('Error fetching persona:', personaError);
    notFound();
  }

  // Step 2: Get related case studies using the join table
  let caseStudies: CaseStudy[] = [];
  
  try {
    // Get relations from the join table
    console.log(`[PersonaPage] Checking relations for persona ID: ${persona.id}`);
    const { data: relations, error: relationsError } = await supabase
      .from('case_study_persona_relations')
      .select('case_study_id')
      .eq('persona_id', persona.id);

    if (relationsError) {
      console.error('Error fetching case study relations for persona:', relationsError);
    } else if (relations && relations.length > 0) {
      console.log(`[PersonaPage] Found ${relations.length} relations:`, relations);
      const caseStudyIds = relations.map((relation: any) => relation.case_study_id);
      console.log(`[PersonaPage] Extracted case study IDs:`, caseStudyIds);
      
      // Fetch the actual published case studies using the IDs
      const { data: caseStudyData, error: caseStudyError } = await supabase
        .from('case_studies')
        .select('*')
        .in('id', caseStudyIds)
        .eq('published', true);

      if (caseStudyError) {
        console.error('Error fetching related case studies:', caseStudyError);
      } else {
        console.log(`[PersonaPage] Fetched ${caseStudyData?.length ?? 0} published case studies:`, caseStudyData);
        caseStudies = caseStudyData || [];
      }
    } else {
      console.log(`[PersonaPage] No relations found for persona ID: ${persona.id}`);
    }
  } catch (error) {
    console.error('Error processing related case studies fetch:', error);
  }

  // Render markdown content, processing links for recommended reading
  const renderedContent = persona.main_content 
    ? processContentWithLinks(md.render(persona.main_content), 'reading-')
    : '';

  return (
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
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* Expertise Badges (previously Role) */}
          {persona.expertise && persona.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {persona.expertise.map((item: string) => (
                <Badge key={item} variant="outline" className="text-base">
                  {item}
                </Badge>
              ))}
            </div>
          )}

          {/* Main Content */}
          {renderedContent && (
            <div 
              className="mb-8"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
          )}

          {/* Recommended Reading Section Wrapper for spacing */}
          {persona.recommended_reading && (
            <div className="mb-8">
              <RecommendedReadingRenderer readingMarkup={persona.recommended_reading} />
            </div>
          )}

          {/* Industries Section - REMOVED as industry field was dropped from personas table */}
          {/* {persona.industry && persona.industry.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Industry Focus</h2>
              <div className="flex flex-wrap gap-2">
                {persona.industry.map((industry: string) => (
                  <Badge key={industry} variant="secondary">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          )} */}

          {/* Related Case Studies */}
          {caseStudies.length > 0 && (
            <div>
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
                      <div className="flex flex-wrap gap-2">
                        {[
                          ...(caseStudy.industries || []),
                          ...(caseStudy.quantum_hardware || [])
                        ].map((badge) => (
                          <Badge key={badge} variant="outline" className="text-sm">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </LearningPathLayout>
    </AuthGate>
  );
}