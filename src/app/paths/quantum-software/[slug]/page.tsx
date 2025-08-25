import { notFound } from 'next/navigation';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import { Badge } from '@/components/ui/badge';
import { processMarkdown } from '@/lib/markdown-server';
import Link from 'next/link';
import { ExternalLink, Github, FileText, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type EnrichedQuantumSoftware = Database['public']['Tables']['quantum_software']['Row'] & {
  case_study_quantum_software_relations?: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }[];
};

interface QuantumSoftwarePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return generateStaticParamsForContentType('quantum_software');
}

export async function generateMetadata({ params }: QuantumSoftwarePageProps) {
  const resolvedParams = await params;
  
  const quantumSoftware = await getStaticContentWithRelationships<EnrichedQuantumSoftware>(
    'quantum_software',
    resolvedParams.slug
  );
  
  if (!quantumSoftware) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }
  
  return {
    title: `${quantumSoftware.name} - Quantum Software | OpenQase`,
    description: quantumSoftware.description || `Learn about ${quantumSoftware.name}, a quantum software platform featured in OpenQase case studies.`,
  };
}

export default async function QuantumSoftwareDetailPage({ params }: QuantumSoftwarePageProps) {
  const resolvedParams = await params;
  
  const quantumSoftware = await getStaticContentWithRelationships<EnrichedQuantumSoftware>(
    'quantum_software',
    resolvedParams.slug
  );

  if (!quantumSoftware) {
    notFound();
  }

  // Process markdown content
  const processedContent = quantumSoftware.main_content 
    ? await processMarkdown(quantumSoftware.main_content)
    : null;

  // Extract related case studies
  const relatedCaseStudies = quantumSoftware.case_study_quantum_software_relations
    ?.map(relation => relation.case_studies)
    .filter((cs): cs is NonNullable<typeof cs> => cs !== null) || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4">
          <Link href="/paths/quantum-software" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Quantum Software
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{quantumSoftware.name}</h1>
        
        {quantumSoftware.vendor && (
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">by {quantumSoftware.vendor}</span>
          </div>
        )}

        {quantumSoftware.description && (
          <p className="text-xl text-muted-foreground mb-6">
            {quantumSoftware.description}
          </p>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-6">
          {quantumSoftware.website_url && (
            <a
              href={quantumSoftware.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </a>
          )}
          {quantumSoftware.documentation_url && (
            <a
              href={quantumSoftware.documentation_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/80 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Documentation
            </a>
          )}
          {quantumSoftware.github_url && (
            <a
              href={quantumSoftware.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/80 transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>

        {/* Metadata badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {quantumSoftware.license_type && (
            <Badge variant="outline">
              License: {quantumSoftware.license_type}
            </Badge>
          )}
          {quantumSoftware.pricing_model && (
            <Badge variant="outline">
              {quantumSoftware.pricing_model}
            </Badge>
          )}
          {quantumSoftware.programming_languages && quantumSoftware.programming_languages.length > 0 && (
            quantumSoftware.programming_languages.map(lang => (
              <Badge key={lang} variant="secondary">
                {lang}
              </Badge>
            ))
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

      {/* Supported Hardware */}
      {quantumSoftware.supported_hardware && quantumSoftware.supported_hardware.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Supported Hardware</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {quantumSoftware.supported_hardware.map(hardware => (
                <Badge key={hardware} variant="outline">
                  {hardware}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Related Case Studies</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            These case studies demonstrate real-world applications and implementations using {quantumSoftware.name} in quantum computing projects.
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