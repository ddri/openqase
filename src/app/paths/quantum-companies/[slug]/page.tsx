import { notFound } from 'next/navigation';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import { Badge } from '@/components/ui/badge';
import { processMarkdown } from '@/lib/markdown-server';
import Link from 'next/link';
import { ExternalLink, Building2, Users, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type EnrichedQuantumCompany = Database['public']['Tables']['quantum_companies']['Row'] & {
  case_study_quantum_company_relations?: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }[];
};

interface QuantumCompanyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return generateStaticParamsForContentType('quantum_companies');
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

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Case Studies</CardTitle>
            <p className="text-sm text-muted-foreground">
              Case studies featuring {quantumCompany.name}
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