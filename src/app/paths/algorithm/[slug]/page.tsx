// src/app/paths/algorithm/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import { Badge } from '@/components/ui/badge';
import AuthGate from '@/components/auth/AuthGate';
import MarkdownIt from 'markdown-it';
import { StepsRenderer } from '@/components/ui/StepsRenderer';
import { ReferencesRenderer, processContentWithReferences } from '@/components/ui/ReferencesRenderer';
import Link from 'next/link';

// Initialize markdown-it with GFM features enabled
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
type EnrichedAlgorithm = Database['public']['Tables']['algorithms']['Row'] & {
  steps?: string;
  academic_references?: string;
  algorithm_industry_relations?: { industries: { id: string; name: string; slug?: string | null } | null }[];
  persona_algorithm_relations?: { personas: { id: string; name: string; slug?: string | null } | null }[];
};

type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  description: string;
  industries: string[];
};

// Define an enriched type for CaseStudy that includes relations
type EnrichedCaseStudyForAlgorithmPage = Database['public']['Tables']['case_studies']['Row'] & {
  case_study_industry_relations?: { industries: { id: string; name: string; slug?: string | null } | null }[];
};

interface AlgorithmPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const resolvedParams = await params;
  const supabase = await createServerSupabaseClient();
  
  console.log('Fetching algorithm with slug:', resolvedParams.slug);
  const { data: algorithmData, error } = await supabase
    .from('algorithms')
    .select(`
      *,
      algorithm_industry_relations(industries(id, name, slug)),
      persona_algorithm_relations(personas(id, name, slug))
    `)
    .eq('slug', resolvedParams.slug)
    .eq('published', true)  // Only fetch published algorithms
    .single();

  const algorithm = algorithmData as EnrichedAlgorithm | null; // Cast to enriched type

  console.log('Algorithm query result:', { algorithm, error });

  if (error || !algorithm) {
    console.error('Failed to fetch algorithm:', error);
    notFound();
  }

  // Fetch related case studies directly using Supabase
  console.log('Fetching case studies for algorithm:', algorithm.name);
  
  let caseStudies: CaseStudy[] = [];
  let caseStudiesError = null;
  
  try {
    // First get the algorithm ID
    const { data: algorithmData, error: algorithmError } = await supabase
      .from('algorithms')
      .select('id, name')
      .eq('slug', algorithm.slug)
      .single();
    
    if (algorithmError || !algorithmData) {
      console.error('Error finding algorithm:', algorithmError);
      caseStudiesError = { error: 'Algorithm not found' };
    } else {
      // Get case studies related to this algorithm using the junction table
      const { data: relations, error: relationsError } = await supabase
        .from('algorithm_case_study_relations' as any)
        .select('case_study_id')
        .eq('algorithm_id', algorithmData.id);
        
      if (relationsError) {
        console.error('Error finding case study relations:', relationsError);
        caseStudiesError = { error: 'Error fetching case studies' };
      } else if (relations && relations.length > 0) {
        const caseStudyIds = relations.map((relation: any) => relation.case_study_id);
        
        // Fetch the actual case studies
        const { data: caseStudyData, error: caseStudyError } = await supabase
          .from('case_studies')
          .select('*, case_study_industry_relations(industries(id, name, slug))')
          .in('id', caseStudyIds)
          .eq('published', true);
          
        if (caseStudyError) {
          console.error('Error fetching case studies:', caseStudyError);
          caseStudiesError = { error: 'Error fetching case studies' };
        } else {
          // Map the database results to the expected CaseStudy type
          caseStudies = (caseStudyData as EnrichedCaseStudyForAlgorithmPage[] || []).map(cs => ({
            id: cs.id,
            title: cs.title,
            slug: cs.slug,
            description: cs.description || '',
            industries: cs.case_study_industry_relations?.map(rel => rel.industries?.name).filter(Boolean) as string[] || []
          }));
        }
      }
    }
  } catch (error) {
    console.error('Error fetching case studies:', error);
    caseStudiesError = { error: 'Failed to fetch case studies' };
  }

  console.log('Case studies query result:', { caseStudies, error: caseStudiesError });

  // Process content with enhanced typography and references
  let processedContent = '';
  if (algorithm.main_content) {
    // Preprocess the markdown content to fix list formatting
    const preprocessedContent = preprocessMarkdown(algorithm.main_content);
    
    // First render markdown to HTML
    const htmlContent = md.render(preprocessedContent);
    // Then process references 
    const contentWithReferences = processContentWithReferences(htmlContent);
    // Assign directly without enhancing typography
    processedContent = contentWithReferences;
  }

  return (
    <AuthGate
      title="Access Algorithm Details"
      description="Get exclusive access to detailed quantum algorithm explanations and implementations."
    >
      <LearningPathLayout 
        title={algorithm.name}
        backLinkText="Back to Algorithms"
        backLinkHref="/paths/algorithm"
      >
        <div className="grid gap-12 md:grid-cols-[2fr,1fr]">
          <div>
            <article className="max-w-none text-[var(--text-secondary)]">
              <p className="text-lg text-[var(--text-primary)] mb-8 leading-7">{algorithm.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {algorithm.use_cases?.map((app: string) => (
                  <Badge key={app} variant="outline" className="bg-[var(--surface-secondary)] border-[var(--border)] text-[var(--text-secondary)]">
                    {app}
                  </Badge>
                ))}
              </div>
              
              <div 
                className="prose dark:prose-invert max-w-none prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)] prose-a:text-[var(--primary)] prose-a:font-medium prose-a:no-underline prose-a:hover:underline"
                dangerouslySetInnerHTML={{ __html: processedContent }} 
              />
            </article>
            
            {algorithm.steps && (
              <div className="my-12">
                <hr className="my-8 border-border" /> 
                <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">Implementation Steps</h2> 
                <StepsRenderer stepsMarkup={algorithm.steps} />
              </div>
            )}
            
            {algorithm.academic_references && (
              <div className="my-12">
                <hr className="my-8 border-border" /> 
                <ReferencesRenderer referencesMarkup={algorithm.academic_references} />
              </div>
            )}

            {/* Related Case Studies Section (at the bottom of main content) */}
            {caseStudies.length > 0 && (
              <div className="mt-12"> {/* Add margin top */}
                <hr className="my-8 border-border" />
                <h2 className="text-2xl font-bold mb-6">Related Case Studies</h2> {/* Consistent H2 style */}
                <div className="grid grid-cols-1 gap-6">
                  {caseStudies.map((cs) => (
                    <Link key={cs.id} href={`/case-study/${cs.slug}`} className="block group">
                      <div className="p-6 rounded-lg border border-border bg-card/50 transition-all duration-200 hover:bg-accent/5 hover:border-border-hover">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                          {cs.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3"> {/* Added line-clamp */}
                          {cs.description}
                        </p>
                        {/* Display Industries if available */}
                        {cs.industries && cs.industries.length > 0 && (
                           <div className="flex flex-wrap gap-2">
                              {cs.industries.map((industryName) => (
                                 <Badge key={industryName} variant="outline" className="text-sm">
                                    {industryName}
                                 </Badge>
                              ))}
                           </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="sticky top-8 space-y-8">
              {/* Related Industries Section */}
              {algorithm.algorithm_industry_relations && (
                <div>
                  <h3 className="sidebar-title">Related Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const relations = algorithm.algorithm_industry_relations || [];
                      if (relations.length === 0) {
                        return <p className="text-sm text-muted-foreground">None</p>;
                      }
                      const naItem = relations.find(rel => rel.industries?.slug === 'not-applicable');
                      if (naItem && relations.length === 1) {
                        return <p className="text-sm text-muted-foreground">Not Applicable</p>;
                      }
                      const actualItems = relations.filter(rel => rel.industries?.slug !== 'not-applicable');
                      if (actualItems.length === 0) {
                        return naItem ? <p className="text-sm text-muted-foreground">Not Applicable</p> : <p className="text-sm text-muted-foreground">None</p>;
                      }
                      return actualItems.map((relation) =>
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
                    })()}
                  </div>
                </div>
              )}

              {/* Related Personas Section */}
              {algorithm.persona_algorithm_relations && (
                <div>
                  <h3 className="sidebar-title">Related Personas</h3>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const relations = algorithm.persona_algorithm_relations || [];
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
        </div>
      </LearningPathLayout>
    </AuthGate>
  );
}