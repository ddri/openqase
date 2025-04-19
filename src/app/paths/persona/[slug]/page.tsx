// src/app/paths/persona/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import ContentCard from '@/components/ui/content-card';
import { cookies } from 'next/headers';
import AuthGate from '@/components/auth/AuthGate';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SupabaseClient } from '@supabase/supabase-js';
import MarkdownIt from 'markdown-it';

// Initialize markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

type Persona = Database['public']['Tables']['personas']['Row'];
type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

interface PageParams {
  params: {
    slug: string;
  };
}

// Get metadata for the page
export async function generateMetadata({ params }: PageParams) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: persona } = await supabase
    .from('personas')
    .select()
    .eq('slug', resolvedParams.slug)
    .single();

  console.log('Metadata query result:', { persona });

  if (!persona) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: persona.name,
    description: persona.description,
  };
}

export default async function PersonaPage({ params }: PageParams) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  // Step 1: Get the persona
  const { data: persona, error: personaError } = await supabase
    .from('personas')
    .select()
    .eq('slug', resolvedParams.slug)
    .single();

  console.log('Fetched persona data:', {
    slug: resolvedParams.slug,
    persona,
    mdxContent: persona?.mdx_content,
    error: personaError
  });

  if (personaError || !persona) {
    console.error('Error fetching persona:', personaError);
    notFound();
  }

  // Step 2: Get related case studies using the API route
  let caseStudies: CaseStudy[] = [];
  
  if (persona.related_case_studies?.length > 0) {
    try {
      // Use the API route instead of direct Supabase query
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/case-studies`,
        { cache: 'no-store' }
      );
      
      if (response.ok) {
        const data = await response.json();
        // Filter case studies to only include those related to this persona
        caseStudies = data.items.filter((cs: CaseStudy) =>
          persona.related_case_studies?.includes(cs.slug)
        );
      } else {
        const error = await response.json();
        console.error('Error fetching case studies:', error);
      }
    } catch (error) {
      console.error('Error fetching case studies:', error);
    }
  }

  // Render markdown content
  const renderedContent = persona.mdx_content ? md.render(persona.mdx_content) : '';

  return (
    <AuthGate
      title="Access Persona Details"
      description="Get exclusive access to detailed quantum computing learning paths."
    >
      <LearningPathLayout
        title={persona.name}
        description={persona.description || ''}
        backLinkText="Back to Personas"
        backLinkHref="/paths/persona"
      >
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* Role and Technical Background */}
          <div className="flex flex-wrap gap-2 mb-8">
            {persona.role && (
              <Badge variant="outline" className="text-base">
                {persona.role}
              </Badge>
            )}
            {persona.technical_level && (
              <Badge variant="outline" className="text-base">
                {persona.technical_level}
              </Badge>
            )}
          </div>

          {/* Main Content */}
          {renderedContent && (
            <div 
              className="mb-8"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
          )}

          {/* Industries */}
          {persona.industry && persona.industry.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Industry Focus</h2>
              <div className="flex flex-wrap gap-2">
                {persona.industry.map((industry: string) => (
                  <Badge key={industry} variant="secondary">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Key Interests */}
          {persona.key_interests && persona.key_interests.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Key Interests</h2>
              <div className="flex flex-wrap gap-2">
                {persona.key_interests.map((interest: string) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Related Case Studies */}
          {caseStudies.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Related Case Studies</h2>
              <div className="grid grid-cols-1 gap-6">
                {caseStudies.map((caseStudy) => (
                  <Link 
                    key={caseStudy.id} 
                    href={`/case-study/${caseStudy.slug}`}
                    className="block group"
                  >
                    <div className="p-6 rounded-lg border border-border bg-card/50 transition-all duration-200 hover:bg-accent/5 hover:border-border-hover">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                        {caseStudy.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {caseStudy.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          ...(caseStudy.industries || []),
                          ...(caseStudy.quantum_hardware || [])
                        ].map((badge) => (
                          <Badge key={badge} variant="outline" className="text-sm">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </LearningPathLayout>
    </AuthGate>
  );
}