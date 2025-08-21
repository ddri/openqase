// src/app/case-study/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import ProfessionalCaseStudyLayout from '@/components/ui/professional-case-study-layout';
import { Badge } from '@/components/ui/badge';
import { ReferencesRenderer, processContentWithReferences } from '@/components/ui/ReferencesRenderer';
import { processMarkdown } from '@/lib/markdown-server';
import Link from 'next/link';
import { AutoSchema } from '@/components/AutoSchema';

// export const dynamic = 'force-dynamic'; // REMOVED - Restore default caching

// Define a more accurate type for the case study data we expect after fetching relations
// MIGRATION NOTE: This type includes both new relationship data and legacy TEXT[] fields
// Legacy fields (quantum_software, quantum_hardware, etc.) are kept for backward compatibility
// and will be removed after production verification - see cleanup-legacy-fields-migration.sql
type EnrichedCaseStudy = Database['public']['Tables']['case_studies']['Row'] & {
  case_study_industry_relations?: { industries: { id: string; name: string; slug?: string | null } | null }[];
  algorithm_case_study_relations?: { algorithms: { id: string; name: string; slug?: string | null } | null }[];
  case_study_persona_relations?: { personas: { id: string; name: string; slug?: string | null } | null }[];
  // NEW CONTENT TYPE RELATIONSHIPS (preferred):
  case_study_quantum_software_relations?: { quantum_software: { id: string; name: string; slug?: string | null } | null }[];
  case_study_quantum_hardware_relations?: { quantum_hardware: { id: string; name: string; slug?: string | null } | null }[];
  case_study_quantum_company_relations?: { quantum_companies: { id: string; name: string; slug?: string | null } | null }[];
  case_study_partner_company_relations?: { partner_companies: { id: string; name: string; slug?: string | null } | null }[];
  // DEPRECATED: Legacy TEXT[] fields are still in Database type but will be removed
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
      
      <ProfessionalCaseStudyLayout
        title={caseStudy.title}
        description={caseStudy.description || ''}
        backLinkText="Back to Case Studies"
        backLinkHref="/case-study"
        caseStudy={caseStudy}
      >
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
        
        {/* Display References Section if available */}
        {caseStudy.academic_references && (
          <>
            <hr className="my-12 border-border/50" />
            <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
              <ReferencesRenderer referencesMarkup={caseStudy.academic_references} />
            </div>
          </>
        )}
      </ProfessionalCaseStudyLayout>
    </>
  );
}