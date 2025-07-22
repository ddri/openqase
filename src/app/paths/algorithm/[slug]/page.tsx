// src/app/paths/algorithm/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import { Badge } from '@/components/ui/badge';
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
  algorithm_case_study_relations?: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }[];
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

// Get metadata for the page
export async function generateMetadata({ params }: AlgorithmPageProps) {
  const resolvedParams = await params;
  
  const algorithm = await getStaticContentWithRelationships('algorithms', resolvedParams.slug) as EnrichedAlgorithm;
  
  if (!algorithm) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: algorithm.name,
    description: algorithm.description,
  };
}

// Generate static params for all published algorithms
export async function generateStaticParams() {
  return generateStaticParamsForContentType('algorithms');
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const resolvedParams = await params;
  
  console.log('Fetching algorithm with slug:', resolvedParams.slug);
  const algorithm = await getStaticContentWithRelationships('algorithms', resolvedParams.slug) as EnrichedAlgorithm;
  
  console.log('Algorithm query result:', { algorithm });

  if (!algorithm) {
    console.error('Failed to fetch algorithm');
    notFound();
  }

  // Extract related case studies from the algorithm data
  const caseStudies: CaseStudy[] = algorithm.algorithm_case_study_relations?.map((relation: any) => ({
    id: relation.case_studies.id,
    title: relation.case_studies.title,
    slug: relation.case_studies.slug,
    description: relation.case_studies.description || '',
    industries: [] // Case study industries aren't fetched in the algorithm relationship query
  })) || [];

  console.log('Case studies query result:', { caseStudies });

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
              <div className="mt-12">
                <hr className="my-8 border-border" />
                <h2 className="text-2xl font-bold mb-6">Related Case Studies</h2>
                <div className="grid grid-cols-1 gap-6">
                  {caseStudies.map((cs) => (
                    <Link key={cs.id} href={`/case-study/${cs.slug}`} className="block group">
                      <div className="p-6 rounded-lg border border-border bg-card/50 transition-all duration-200 hover:bg-accent/5 hover:border-border-hover">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                          {cs.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {cs.description}
                        </p>
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
  );
}