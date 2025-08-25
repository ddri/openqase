import { notFound } from 'next/navigation';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import { Badge } from '@/components/ui/badge';
import { processMarkdown } from '@/lib/markdown-server';
import Link from 'next/link';
import { ExternalLink, Building2, Users, MapPin, Calendar, Code, Cpu, Handshake, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createServerSupabaseClient } from '@/lib/supabase-server';

type EnrichedQuantumCompany = Database['public']['Tables']['quantum_companies']['Row'] & {
  case_study_quantum_company_relations?: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }[];
};

interface QuantumCompanyPageProps {
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

async function getRelatedPartnerCompanies(caseStudyIds: string[]) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('case_study_partner_company_relations')
    .select('partner_companies(id, name, slug)')
    .in('case_study_id', caseStudyIds);
  
  return data?.map(rel => rel.partner_companies).filter(Boolean) || [];
}

export async function generateStaticParams() {
  return generateStaticParamsForContentType('quantum_companies');
}

export async function generateMetadata({ params }: QuantumCompanyPageProps) {
  const resolvedParams = await params;
  
  const quantumCompany = await getStaticContentWithRelationships<EnrichedQuantumCompany>(
    'quantum_companies',
    resolvedParams.slug
  );
  
  if (!quantumCompany) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }
  
  return {
    title: `${quantumCompany.name} - Quantum Companies | OpenQase`,
    description: quantumCompany.description || `Learn about ${quantumCompany.name}, a quantum computing company featured in OpenQase case studies.`,
  };
}

export default async function QuantumCompanyDetailPage({ params }: QuantumCompanyPageProps) {
  const resolvedParams = await params;
  
  const quantumCompany = await getStaticContentWithRelationships<EnrichedQuantumCompany>(
    'quantum_companies',
    resolvedParams.slug
  );

  if (!quantumCompany) {
    notFound();
  }

  // Process markdown content
  const processedContent = quantumCompany.main_content 
    ? await processMarkdown(quantumCompany.main_content)
    : null;

  // Extract related case studies
  const relatedCaseStudies = quantumCompany.case_study_quantum_company_relations
    ?.map(relation => relation.case_studies)
    .filter((cs): cs is NonNullable<typeof cs> => cs !== null) || [];

  // Get case study IDs for finding related technologies and partners
  const caseStudyIds = relatedCaseStudies.map(cs => cs.id);

  // Fetch related quantum software through shared case studies
  const relatedSoftware = caseStudyIds.length > 0 ? 
    await getRelatedQuantumSoftware(caseStudyIds) : [];

  // Fetch related quantum hardware through shared case studies
  const relatedHardware = caseStudyIds.length > 0 ? 
    await getRelatedQuantumHardware(caseStudyIds) : [];

  // Fetch related partner companies through shared case studies
  const relatedPartners = caseStudyIds.length > 0 ? 
    await getRelatedPartnerCompanies(caseStudyIds) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4">
          <Link href="/paths/quantum-companies" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Quantum Companies
          </Link>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">{quantumCompany.name}</h1>
        </div>
        
        {quantumCompany.headquarters && (
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{quantumCompany.headquarters}</span>
          </div>
        )}

        {quantumCompany.description && (
          <p className="text-xl text-muted-foreground mb-6">
            {quantumCompany.description}
          </p>
        )}

        {/* Company stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {quantumCompany.founded_year && (
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Founded</div>
              <div className="font-semibold">{quantumCompany.founded_year}</div>
            </div>
          )}
          {quantumCompany.funding_stage && (
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Funding</div>
              <div className="font-semibold">{quantumCompany.funding_stage}</div>
            </div>
          )}
          {quantumCompany.company_type && (
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Type</div>
              <div className="font-semibold">{quantumCompany.company_type}</div>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-6">
          {quantumCompany.website_url && (
            <a
              href={quantumCompany.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </a>
          )}
          {quantumCompany.linkedin_url && (
            <a
              href={quantumCompany.linkedin_url}
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
          {quantumCompany.company_type && (
            <Badge variant="outline">
              {quantumCompany.company_type}
            </Badge>
          )}
          {quantumCompany.funding_stage && (
            <Badge variant="secondary">
              {quantumCompany.funding_stage}
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
              {quantumCompany.name} uses these quantum software platforms and frameworks in their research and development projects, as documented in case studies.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedSoftware.map(software => (
                <Link 
                  key={software.id} 
                  href={`/paths/quantum-software/${software.slug}`}
                  className="block p-3 border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all"
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
              These quantum computing hardware platforms and systems are utilized by {quantumCompany.name} in their quantum computing initiatives and research collaborations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedHardware.map(hardware => (
                <Link 
                  key={hardware.id} 
                  href={`/paths/quantum-hardware/${hardware.slug}`}
                  className="block p-3 border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all"
                >
                  <div className="font-medium text-sm">{hardware.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">Quantum Hardware Platform</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Partner Companies */}
        {relatedPartners.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Handshake className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Collaboration Partners</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              These organizations actively collaborate with {quantumCompany.name} on quantum computing projects, joint research initiatives, and strategic partnerships.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedPartners.map(partner => (
                <Link 
                  key={partner.id} 
                  href={`/paths/partner-companies/${partner.slug}`}
                  className="block p-3 border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all"
                >
                  <div className="font-medium text-sm">{partner.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">Strategic Partner</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Related Case Studies</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            These case studies feature {quantumCompany.name} and showcase their quantum computing initiatives and collaborative research projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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