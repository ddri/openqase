// src/app/paths/industry/[slug]/page.tsx
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase-server';
import { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import MarkdownIt from 'markdown-it';
import { SupabaseClient } from '@supabase/supabase-js';

const md = new MarkdownIt();

interface PageParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageParams) {
  const resolvedParams = await params;
  const supabase = createServerClient() as SupabaseClient<Database>;
  const { data: industry } = await supabase
    .from('industries')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  return {
    title: industry?.name || 'Industry Not Found',
    description: industry?.description || '',
  };
}

export default async function IndustryPage({ params }: PageParams) {
  const resolvedParams = await params;
  const supabase = createServerClient() as SupabaseClient<Database>;
  
  console.log('Fetching industry with slug:', resolvedParams.slug);
  const { data: industry, error: industryError } = await supabase
    .from('industries')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (industryError) {
    console.error('Error fetching industry:', industryError);
    return <div>Error loading industry</div>;
  }

  if (!industry) {
    return <div>Industry not found</div>;
  }

  console.log('Fetching case studies for industry:', industry.name);
  const { data: caseStudies, error: caseStudiesError } = await supabase
    .from('case_studies')
    .select('*')
    .contains('industries', [industry.name]);

  if (caseStudiesError) {
    console.error('Error fetching case studies:', caseStudiesError);
  }

  return (
    <LearningPathLayout 
      title={industry.name}
      backLinkText="Back to Industries"
      backLinkHref="/paths/industry"
    >
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <p className="text-lg text-muted-foreground">{industry.description}</p>
          {industry.mdx_content && (
            <div 
              className="prose dark:prose-invert max-w-none" 
              dangerouslySetInnerHTML={{ __html: md.render(industry.mdx_content) }}
            />
          )}
        </div>

        {caseStudies && caseStudies.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Related Case Studies</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <Card key={study.id} className="p-4">
                  <Link href={`/case-study/${study.slug}`} className="hover:underline">
                    <h3 className="font-semibold">{study.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-2">{study.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </LearningPathLayout>
  );
}