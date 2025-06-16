// src/app/case-study/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { createServerSupabaseClient, createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import type { Database } from '@/types/supabase'; // Using the main Database type
import LearningPathLayout from '@/components/ui/learning-path-layout';
import { Badge } from '@/components/ui/badge';
import MarkdownIt from 'markdown-it';
import { ReferencesRenderer, processContentWithReferences } from '@/components/ui/ReferencesRenderer';
import Link from 'next/link';

// export const dynamic = 'force-dynamic'; // REMOVED - Restore default caching

// Define a more accurate type for the case study data we expect after fetching relations
type EnrichedCaseStudy = Database['public']['Tables']['case_studies']['Row'] & {
  case_study_industry_relations?: { industries: { id: string; name: string; slug?: string | null } | null }[];
  algorithm_case_study_relations?: { algorithms: { id: string; name: string; slug?: string | null } | null }[];
  case_study_persona_relations?: { personas: { id: string; name: string; slug?: string | null } | null }[];
  // quantum_software is assumed to be a direct TEXT[] field as previously discussed
};

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

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

// Get metadata for the page
export async function generateMetadata({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  const supabase = await createServerSupabaseClient();
  
  const { data: caseStudy } = await supabase
    .from('case_studies')
    .select('title, description')
    .eq('slug', resolvedParams.slug)
    .eq('published', true)
    .single();

  if (!caseStudy) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.description || '',
  };
}

// Generate static params for all published case studies
export async function generateStaticParams() {
  const supabase = createServiceRoleSupabaseClient();
  
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('slug')
    .eq('published', true);

  return caseStudies?.map((caseStudy) => ({
    slug: caseStudy.slug,
  })) || [];
}

// Revalidate the page every 5 minutes for more frequent content updates
export const revalidate = 300;

// No longer using the commented out LocalCaseStudyType alias here

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  // console.log('Fetching case study with slug:', slug); // REMOVED

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('case_studies')
    .select(`
      *,
      case_study_industry_relations(industries(id, name, slug)),
      algorithm_case_study_relations(algorithms(id, name, slug)),
      case_study_persona_relations(personas(id, name, slug))
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single();

  const caseStudy = data as EnrichedCaseStudy | null; // Cast to our enriched type

  // console.log('Case study query result (with relations):', JSON.stringify(caseStudy, null, 2)); // REMOVED
  // console.log('Industries from DB relations:', caseStudy?.case_study_industry_relations); // REMOVED
  // console.log('Personas from DB relations:', caseStudy?.case_study_persona_relations); // REMOVED
  // console.log('Algorithms from DB relations:', caseStudy?.algorithm_case_study_relations); // REMOVED
  // console.log('Quantum Software (direct field):', caseStudy?.quantum_software); // REMOVED

  if (error || !caseStudy) {
    // console.error('Error fetching case study:', error); // REMOVED - Let notFound() handle it
    return notFound();
  }

  // Process content with references if available
  let processedContent = '';
  if (caseStudy.main_content) {
    // Preprocess the markdown content to fix list formatting
    const preprocessedContent = preprocessMarkdown(caseStudy.main_content);
    
    // Process citations in content if there are references
    if (caseStudy.academic_references) {
      const processedMarkdown = processContentWithReferences(preprocessedContent);
      processedContent = md.render(processedMarkdown);
    } else {
      processedContent = md.render(preprocessedContent);
    }
  }

  return (
    <LearningPathLayout
      title={caseStudy.title}
      description={caseStudy.description || ''}
      backLinkText="Back to Case Studies"
      backLinkHref="/case-study"
    >
      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="prose dark:prose-invert max-w-none">
          <div>
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
            
            {/* Display References Section if available */}
            {caseStudy.academic_references && (
              <>
                <hr className="my-8 border-border" />
                <ReferencesRenderer referencesMarkup={caseStudy.academic_references} />
              </>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {caseStudy.partner_companies && caseStudy.partner_companies.length > 0 && (
            <div>
              <h3 className="sidebar-title">Partner Companies</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.partner_companies.map((company: string) => (
                  <Badge key={company} variant="outline" className="text-[14px] border-border">
                    {company}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {caseStudy.quantum_companies && caseStudy.quantum_companies.length > 0 && (
            <div>
              <h3 className="sidebar-title">Quantum Companies</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.quantum_companies.map((company: string) => (
                  <Badge key={company} variant="outline" className="text-[14px] border-border">
                    {company}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {caseStudy.quantum_hardware && caseStudy.quantum_hardware.length > 0 && (
            <div>
              <h3 className="sidebar-title">Quantum Hardware</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.quantum_hardware.map((hardware: string) => (
                  <Badge key={hardware} variant="outline" className="text-[14px] border-border">
                    {hardware}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {caseStudy.quantum_software && caseStudy.quantum_software.length > 0 && (
            <div>
              <h3 className="sidebar-title">Quantum Software</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.quantum_software.map((software: string) => (
                  <Badge key={software} variant="outline" className="text-[14px] border-border">
                    {software}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="sidebar-title">Industries</h3>
            <div className="flex flex-wrap gap-2">
              {(() => {
                if (caseStudy.case_study_industry_relations && caseStudy.case_study_industry_relations.length > 0) {
                  const naIndustry = caseStudy.case_study_industry_relations.find(rel => rel.industries?.slug === 'not-applicable');
                  if (naIndustry && naIndustry.industries) {
                    return <p className="text-sm text-muted-foreground">Not Applicable</p>;
                  }
                  const actualIndustries = caseStudy.case_study_industry_relations.filter(rel => rel.industries?.slug !== 'not-applicable');
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
                }
                return <p className="text-sm text-muted-foreground">None</p>;
              })()}
            </div>
          </div>
          <div>
            <h3 className="sidebar-title">Algorithms</h3>
            <div className="flex flex-wrap gap-2">
              {(() => {
                if (caseStudy.algorithm_case_study_relations && caseStudy.algorithm_case_study_relations.length > 0) {
                  const naAlgorithm = caseStudy.algorithm_case_study_relations.find(rel => rel.algorithms?.slug === 'not-applicable');
                  if (naAlgorithm && naAlgorithm.algorithms) {
                    return <p className="text-sm text-muted-foreground">Not Applicable</p>;
                  }
                  const actualAlgorithms = caseStudy.algorithm_case_study_relations.filter(rel => rel.algorithms?.slug !== 'not-applicable');
                  if (actualAlgorithms.length > 0) {
                    return actualAlgorithms.map((relation) =>
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
                  }
                }
                return <p className="text-sm text-muted-foreground">None</p>;
              })()}
            </div>
          </div>
          <div>
            <h3 className="sidebar-title">Personas</h3>
            <div className="flex flex-wrap gap-2">
              {(() => {
                if (caseStudy.case_study_persona_relations && caseStudy.case_study_persona_relations.length > 0) {
                  const naPersona = caseStudy.case_study_persona_relations.find(rel => rel.personas?.slug === 'not-applicable');
                  if (naPersona && naPersona.personas) {
                    return <p className="text-sm text-muted-foreground">Not Applicable</p>;
                  }
                  const actualPersonas = caseStudy.case_study_persona_relations.filter(rel => rel.personas?.slug !== 'not-applicable');
                  if (actualPersonas.length > 0) {
                    return actualPersonas.map((relation) =>
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
                  }
                }
                return <p className="text-sm text-muted-foreground">None</p>;
              })()}
            </div>
          </div>
          
          {caseStudy.resource_links && Array.isArray(caseStudy.resource_links) && caseStudy.resource_links.length > 0 && (
            <div>
              <h3 className="sidebar-title">Resource Links</h3>
              <div className="flex flex-col space-y-2">
                {(caseStudy.resource_links as Array<{url: string, label?: string, order: number}>) // Type assertion for safety within map
                  .sort((a, b) => a.order - b.order)
                  .map((link, index) => (
                    <a 
                      key={index} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center"
                    >
                      {link.label || link.url}
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </LearningPathLayout>
  );
}