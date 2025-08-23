import { notFound } from 'next/navigation';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import { Badge } from '@/components/ui/badge';
import { processMarkdown } from '@/lib/markdown-server';
import Link from 'next/link';
import { ExternalLink, HandHeart, Users, MapPin, Building, Code, Cpu, Factory } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createServerSupabaseClient } from '@/lib/supabase-server';

type EnrichedPartnerCompany = Database['public']['Tables']['partner_companies']['Row'] & {
  case_study_partner_company_relations?: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }[];
};

interface PartnerCompanyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Helper functions to fetch related entities through case studies
async function getRelatedQuantumSoftware(caseStudyIds: string[]) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('case_study_quantum_software_relations')
    .select('quantum_software(id, name, slug)')
    .in('case_study_id', caseStudyIds);
  
  return data?.map(rel => rel.quantum_software).filter(Boolean) || [];
}

async function getRelatedQuantumHardware(caseStudyIds: string[]) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('case_study_quantum_hardware_relations')
    .select('quantum_hardware(id, name, slug)')
    .in('case_study_id', caseStudyIds);
  
  return data?.map(rel => rel.quantum_hardware).filter(Boolean) || [];
}

async function getRelatedQuantumCompanies(caseStudyIds: string[]) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('case_study_quantum_company_relations')
    .select('quantum_companies(id, name, slug)')
    .in('case_study_id', caseStudyIds);
  
  return data?.map(rel => rel.quantum_companies).filter(Boolean) || [];
}

export async function generateStaticParams() {
  return generateStaticParamsForContentType('partner_companies');
}

export async function generateMetadata({ params }: PartnerCompanyPageProps) {
  const resolvedParams = await params;
  
  const partnerCompany = await getStaticContentWithRelationships<EnrichedPartnerCompany>(
    'partner_companies',
    resolvedParams.slug
  );
  
  if (!partnerCompany) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }
  
  return {
    title: `${partnerCompany.name} - Partner Companies | OpenQase`,
    description: partnerCompany.description || `Learn about ${partnerCompany.name}, a partner organization featured in OpenQase case studies.`,
  };
}

export default async function PartnerCompanyDetailPage({ params }: PartnerCompanyPageProps) {
  const resolvedParams = await params;
  
  const partnerCompany = await getStaticContentWithRelationships<EnrichedPartnerCompany>(
    'partner_companies',
    resolvedParams.slug
  );

  if (!partnerCompany) {
    notFound();
  }

  // Process markdown content
  const processedContent = partnerCompany.main_content 
    ? await processMarkdown(partnerCompany.main_content)
    : null;

  // Extract related case studies
  const relatedCaseStudies = partnerCompany.case_study_partner_company_relations
    ?.map(relation => relation.case_studies)
    .filter((cs): cs is NonNullable<typeof cs> => cs !== null) || [];

  // Get case study IDs for finding related technologies and companies
  const caseStudyIds = relatedCaseStudies.map(cs => cs.id);

  // Fetch related quantum software through shared case studies
  const relatedSoftware = caseStudyIds.length > 0 ? 
    await getRelatedQuantumSoftware(caseStudyIds) : [];

  // Fetch related quantum hardware through shared case studies
  const relatedHardware = caseStudyIds.length > 0 ? 
    await getRelatedQuantumHardware(caseStudyIds) : [];

  // Fetch related quantum companies through shared case studies
  const relatedQuantumCompanies = caseStudyIds.length > 0 ? 
    await getRelatedQuantumCompanies(caseStudyIds) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4">
          <Link href="/paths/partner-companies" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Partner Companies
          </Link>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <HandHeart className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">{partnerCompany.name}</h1>
        </div>
        
        {partnerCompany.headquarters && (
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{partnerCompany.headquarters}</span>
          </div>
        )}

        {partnerCompany.description && (
          <p className="text-xl text-muted-foreground mb-6">
            {partnerCompany.description}
          </p>
        )}

        {/* Company stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {partnerCompany.industry && (
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Industry</div>
              <div className="font-semibold">{partnerCompany.industry}</div>
            </div>
          )}
          {partnerCompany.company_size && (
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Size</div>
              <div className="font-semibold">{partnerCompany.company_size}</div>
            </div>
          )}
          {partnerCompany.partnership_type && (
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Partnership</div>
              <div className="font-semibold">{partnerCompany.partnership_type}</div>
            </div>
          )}
          {partnerCompany.quantum_initiatives && (
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Quantum Initiatives</div>
              <div className="font-semibold text-xs">{partnerCompany.quantum_initiatives}</div>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-6">
          {partnerCompany.website_url && (
            <a
              href={partnerCompany.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </a>
          )}
          {partnerCompany.linkedin_url && (
            <a
              href={partnerCompany.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/80 transition-colors"
            >
              <Users className="h-4 w-4" />
              LinkedIn
            </a>
          )}
        </div>

        {/* Metadata badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {partnerCompany.industry && (
            <Badge variant="outline">
              {partnerCompany.industry}
            </Badge>
          )}
          {partnerCompany.company_size && (
            <Badge variant="secondary">
              {partnerCompany.company_size}
            </Badge>
          )}
        </div>
      </div>

      {/* Main Content */}
      {processedContent && (
        <div className="mb-12">
          <div 
            className="prose dark:prose-invert max-w-none prose-a:text-primary prose-a:hover:underline"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>
      )}

      {/* Technology Ecosystem */}
      <div className="space-y-8 mb-8">
        {/* Related Quantum Software */}
        {relatedSoftware.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Quantum Software & Frameworks</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              These quantum software platforms and frameworks are utilized in collaborative projects and research initiatives involving {partnerCompany.name}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedSoftware.map(software => (
                <Link 
                  key={software.id} 
                  href={`/paths/quantum-software/${software.slug}`}
                  className="block p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="font-medium text-sm">{software.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">Quantum Software Platform</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Quantum Hardware */}
        {relatedHardware.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Quantum Hardware & Systems</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              These quantum computing hardware platforms are featured in joint research and collaboration projects with {partnerCompany.name}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedHardware.map(hardware => (
                <Link 
                  key={hardware.id} 
                  href={`/paths/quantum-hardware/${hardware.slug}`}
                  className="block p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="font-medium text-sm">{hardware.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">Quantum Hardware Platform</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Quantum Companies */}
        {relatedQuantumCompanies.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Factory className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Quantum Computing Partners</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              These quantum computing companies work directly with {partnerCompany.name} on joint quantum research projects and strategic partnerships.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedQuantumCompanies.map(company => (
                <Link 
                  key={company.id} 
                  href={`/paths/quantum-companies/${company.slug}`}
                  className="block p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="font-medium text-sm">{company.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">Quantum Computing Company</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Related Case Studies</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            These case studies highlight collaborative quantum computing projects and partnerships involving {partnerCompany.name}.
          </p>
          <div className="grid grid-cols-1 gap-3">
            {relatedCaseStudies.map(caseStudy => (
              <Link 
                key={caseStudy.id} 
                href={`/case-study/${caseStudy.slug}`}
                className="block p-4 border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="font-medium text-sm mb-2">{caseStudy.title}</div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {caseStudy.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  {new Date(caseStudy.published_at).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit', 
                    year: 'numeric'
                  })}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}