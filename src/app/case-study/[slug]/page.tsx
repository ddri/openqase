// src/app/case-study/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import { Badge } from '@/components/ui/badge';
import { ReferencesRenderer, processContentWithReferences } from '@/components/ui/ReferencesRenderer';
import { processMarkdown } from '@/lib/markdown-server';
import Link from 'next/link';
import { AutoSchema } from '@/components/AutoSchema';

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


// Get metadata for the page
export async function generateMetadata({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  
  const caseStudy = await getStaticContentWithRelationships<{ title: string; description: string | null }>(
    'case_studies',
    resolvedParams.slug
  );

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
  return await generateStaticParamsForContentType('case_studies');
}

// Static generation - no revalidation needed

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const caseStudy = await getStaticContentWithRelationships<EnrichedCaseStudy>(
    'case_studies',
    slug
  );

  if (!caseStudy) {
    return notFound();
  }

  // Process content with references if available
  let processedContent = '';
  if (caseStudy.main_content) {
    // Process citations in content if there are references
    if (caseStudy.academic_references) {
      const processedMarkdown = processContentWithReferences(caseStudy.main_content);
      processedContent = processMarkdown(processedMarkdown);
    } else {
      processedContent = processMarkdown(caseStudy.main_content);
    }
  }

  return (
    <>
      {/* Ghost-style automatic case study schema */}
      <AutoSchema type="case-study" data={caseStudy} />
      
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
          <div>
            <h3 className="sidebar-title">Year</h3>
            <div className="flex items-center">
              <Badge variant="outline" className="text-[14px] border-border">
                {caseStudy.year}
              </Badge>
            </div>
          </div>
          
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
    </>
  );
}