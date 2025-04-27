// src/app/paths/industry/[slug]/page.tsx
import { cookies } from 'next/headers';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import MarkdownIt from 'markdown-it';
import { SupabaseClient } from '@supabase/supabase-js';

const md = new MarkdownIt();

interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  industries: string[];
}

export async function generateMetadata({ params }: PageParams) {
  const resolvedParams = await params;
  const supabase = await createServerSupabaseClient();
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
  const supabase = await createServerSupabaseClient();
  
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
  
  // Fetch case studies directly using Supabase
  let caseStudies: CaseStudy[] = [];
  let caseStudiesError = null;
  
  try {
    // First get the industry ID
    const { data: industryData, error: industryError } = await supabase
      .from('industries')
      .select('id, name')
      .eq('name', industry.name)
      .single();
    
    if (industryError || !industryData) {
      console.error('Error finding industry:', industryError);
      caseStudiesError = { error: 'Industry not found' };
    } else {
      // Get case studies related to this industry using the junction table
      const { data: relations, error: relationsError } = await supabase
        .from('case_study_industry_relations' as any)
        .select('case_study_id')
        .eq('industry_id', industryData.id);
        
      if (relationsError) {
        console.error('Error finding case study relations:', relationsError);
        caseStudiesError = { error: 'Error fetching case studies' };
      } else if (relations && relations.length > 0) {
        const caseStudyIds = relations.map((relation: any) => relation.case_study_id);
        
        // Fetch the actual case studies
        const { data: caseStudyData, error: caseStudyError } = await supabase
          .from('case_studies')
          .select('*')
          .in('id', caseStudyIds)
          .eq('published', true);
          
        if (caseStudyError) {
          console.error('Error fetching case studies:', caseStudyError);
          caseStudiesError = { error: 'Error fetching case studies' };
        } else {
          // Map the database results to the expected CaseStudy type
          caseStudies = (caseStudyData || []).map(cs => ({
            id: cs.id,
            title: cs.title,
            slug: cs.slug,
            description: cs.description || '',
            industries: cs.industries || []
          }));
        }
      }
    }
  } catch (error) {
    console.error('Error fetching case studies:', error);
    caseStudiesError = { error: 'Failed to fetch case studies' };
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
          {industry.main_content && (
            <div className="prose dark:prose-invert max-w-none mt-8"
              dangerouslySetInnerHTML={{ __html: md.render(industry.main_content) }}
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