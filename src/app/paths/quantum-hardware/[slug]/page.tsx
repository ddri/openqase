import { notFound } from 'next/navigation';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import { Badge } from '@/components/ui/badge';
import { processMarkdown } from '@/lib/markdown-server';
import Link from 'next/link';
import { ExternalLink, FileText, Building2, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type EnrichedQuantumHardware = Database['public']['Tables']['quantum_hardware']['Row'] & {
  case_study_quantum_hardware_relations?: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }[];
};

interface QuantumHardwarePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return generateStaticParamsForContentType('quantum_hardware');
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

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Case Studies</CardTitle>
            <p className="text-sm text-muted-foreground">
              Case studies featuring {quantumHardware.name}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {relatedCaseStudies.map(caseStudy => (
                <div key={caseStudy.id} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                  <h3 className="font-semibold mb-2">
                    <Link 
                      href={`/case-study/${caseStudy.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {caseStudy.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {caseStudy.description}
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {new Date(caseStudy.published_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}