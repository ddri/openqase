import { notFound } from 'next/navigation';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import { Badge } from '@/components/ui/badge';
import { processMarkdown } from '@/lib/markdown-server';
import Link from 'next/link';
import { ExternalLink, FileText, Building2, Cpu, Factory, Handshake } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createServerSupabaseClient } from '@/lib/supabase-server';

type EnrichedQuantumHardware = Database['public']['Tables']['quantum_hardware']['Row'] & {
  case_study_quantum_hardware_relations?: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }[];
};

interface QuantumHardwarePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Helper functions to fetch related entities through case studies
async function getRelatedQuantumCompanies(caseStudyIds: string[]) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('case_study_quantum_company_relations')
    .select('quantum_companies(id, name, slug)')
    .in('case_study_id', caseStudyIds);
  
  return data?.map(rel => rel.quantum_companies).filter(Boolean) || [];
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
  return generateStaticParamsForContentType('quantum_hardware');
}

export async function generateMetadata({ params }: QuantumHardwarePageProps) {
  const resolvedParams = await params;
  
  const quantumHardware = await getStaticContentWithRelationships<EnrichedQuantumHardware>(
    'quantum_hardware',
    resolvedParams.slug
  );
  
  if (!quantumHardware) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }
  
  return {
    title: `${quantumHardware.name} - Quantum Hardware | OpenQase`,
    description: quantumHardware.description || `Learn about ${quantumHardware.name}, a quantum hardware platform featured in OpenQase case studies.`,
  };
}

export default async function QuantumHardwareDetailPage({ params }: QuantumHardwarePageProps) {
  const resolvedParams = await params;
  
  const quantumHardware = await getStaticContentWithRelationships<EnrichedQuantumHardware>(
    'quantum_hardware',
    resolvedParams.slug
  );

  if (!quantumHardware) {
    notFound();
  }

  // Process markdown content
  const processedContent = quantumHardware.main_content 
    ? await processMarkdown(quantumHardware.main_content)
    : null;

  // Extract related case studies
  const relatedCaseStudies = quantumHardware.case_study_quantum_hardware_relations
    ?.map(relation => relation.case_studies)
    .filter((cs): cs is NonNullable<typeof cs> => cs !== null) || [];

  // Get case study IDs for finding related companies
  const caseStudyIds = relatedCaseStudies.map(cs => cs.id);

  // Fetch related quantum companies through shared case studies
  const relatedQuantumCompanies = caseStudyIds.length > 0 ? 
    await getRelatedQuantumCompanies(caseStudyIds) : [];

  // Fetch related partner companies through shared case studies
  const relatedPartners = caseStudyIds.length > 0 ? 
    await getRelatedPartnerCompanies(caseStudyIds) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4">
          <Link href="/paths/quantum-hardware" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Quantum Hardware
          </Link>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">{quantumHardware.name}</h1>
        </div>
        
        {quantumHardware.vendor && (
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">by {quantumHardware.vendor}</span>
          </div>
        )}

        {quantumHardware.description && (
          <p className="text-xl text-muted-foreground mb-6">
            {quantumHardware.description}
          </p>
        )}

        {/* Technical specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {quantumHardware.technology_type && (
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Technology</div>
              <div className="font-semibold">{quantumHardware.technology_type}</div>
            </div>
          )}
          {quantumHardware.qubit_count && (
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Qubits</div>
              <div className="font-semibold">{quantumHardware.qubit_count}</div>
            </div>
          )}
          {quantumHardware.gate_fidelity && (
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Gate Fidelity</div>
              <div className="font-semibold">{quantumHardware.gate_fidelity}%</div>
            </div>
          )}
          {quantumHardware.coherence_time && (
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Coherence Time</div>
              <div className="font-semibold">{quantumHardware.coherence_time}</div>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-6">
          {quantumHardware.website_url && (
            <a
              href={quantumHardware.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </a>
          )}
          {quantumHardware.documentation_url && (
            <a
              href={quantumHardware.documentation_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/80 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Documentation
            </a>
          )}
        </div>

        {/* Metadata badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {quantumHardware.availability && (
            <Badge variant="outline">
              {quantumHardware.availability}
            </Badge>
          )}
          {quantumHardware.access_model && (
            <Badge variant="outline">
              {quantumHardware.access_model}
            </Badge>
          )}
          {quantumHardware.connectivity && (
            <Badge variant="secondary">
              {quantumHardware.connectivity}
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

      {/* Related Companies */}
      {(relatedQuantumCompanies.length > 0 || relatedPartners.length > 0) && (
        <div className="space-y-8 mb-8">
          {/* Related Quantum Companies */}
          {relatedQuantumCompanies.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Factory className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Quantum Companies</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                These quantum computing companies utilize {quantumHardware.name} hardware in their quantum research, development projects, and commercial applications.
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

          {/* Related Partner Companies */}
          {relatedPartners.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Handshake className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Partner Organizations</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                These partner organizations collaborate on quantum computing projects and research initiatives that leverage {quantumHardware.name} hardware capabilities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedPartners.map(partner => (
                  <Link 
                    key={partner.id} 
                    href={`/paths/partner-companies/${partner.slug}`}
                    className="block p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="font-medium text-sm">{partner.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">Strategic Partner</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Related Case Studies</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            These case studies showcase practical implementations and research projects utilizing {quantumHardware.name} hardware platforms.
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
    </div>
  );
}