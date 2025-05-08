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

// Enhanced markdown rendering with standard typography classes
const enhanceTypography = (htmlContent: string): string => {
  // Add typography enhancements for headings
  htmlContent = htmlContent
    .replace(/<h1([^>]*)>/g, '<h1$1 class="mt-10 scroll-m-20 text-4xl font-bold tracking-tight">')
    .replace(/<h2([^>]*)>/g, '<h2$1 class="mt-10 scroll-m-20 border-b border-[var(--border)] pb-2 text-3xl font-semibold tracking-tight">')
    .replace(/<h3([^>]*)>/g, '<h3$1 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">')
    .replace(/<h4([^>]*)>/g, '<h4$1 class="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">')
    .replace(/<p([^>]*)>/g, '<p$1 class="leading-7 [&:not(:first-child)]:mt-6">')
    .replace(/<ul([^>]*)>/g, '<ul$1 class="my-6 ml-6 list-disc">')
    .replace(/<ol([^>]*)>/g, '<ol$1 class="my-6 ml-6 list-decimal">')
    .replace(/<li([^>]*)>/g, '<li$1 class="mt-2">')
    .replace(/<blockquote([^>]*)>/g, '<blockquote$1 class="mt-6 border-l-2 pl-6 italic text-[var(--text-secondary)]">')
    .replace(/<pre([^>]*)>/g, '<pre$1 class="mb-4 mt-6 overflow-x-auto rounded-lg border bg-[var(--muted)] p-4">')
    .replace(/<code([^>]*)>/g, '<code$1 class="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm bg-[var(--muted)] text-[var(--text-primary)]">');
  
  return htmlContent;
};

type Algorithm = Database['public']['Tables']['algorithms']['Row'] & {
  steps?: string;
  academic_references?: string;
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
  const { data: algorithm, error } = await supabase
    .from('algorithms')
    .select()
    .eq('slug', resolvedParams.slug)
    .eq('published', true)  // Only fetch published algorithms
    .single();

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
    // Finally enhance the typography
    processedContent = enhanceTypography(contentWithReferences);
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-9">
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
                dangerouslySetInnerHTML={{ __html: processedContent }} 
                className="prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)] prose-a:text-[var(--primary)] prose-a:font-medium prose-a:no-underline prose-a:hover:underline"
              />
              
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
            </article>
          </div>
          
          <div className="lg:col-span-3">
            <div className="sticky top-8 space-y-8">
              {caseStudies.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Related Case Studies</h3>
                  <div className="space-y-4">
                    {caseStudies.map((cs) => (
                      <div
                        key={cs.id}
                        className="rounded-lg border border-[var(--border)] p-4 hover:bg-[var(--surface-secondary)] transition-colors"
                      >
                        <p className="font-medium text-[var(--text-primary)]">{cs.title}</p>
                        <p className="text-sm text-[var(--text-tertiary)] mt-2 line-clamp-2">{cs.description}</p>
                      </div>
                    ))}
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