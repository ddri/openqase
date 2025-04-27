// src/app/paths/algorithm/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import { Badge } from '@/components/ui/badge';
import AuthGate from '@/components/auth/AuthGate';
import MarkdownIt from 'markdown-it';

// Initialize markdown-it with GFM features enabled
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});

type Algorithm = Database['public']['Tables']['algorithms']['Row'];
type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  description: string;
  industries: string[];
};

interface AlgorithmPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const resolvedParams = await params;
  const supabase = await createServerSupabaseClient();
  
  console.log('Fetching algorithm with slug:', resolvedParams.slug);
  const { data: algorithm, error } = await supabase
    .from('algorithms')
    .select()
    .eq('slug', resolvedParams.slug)
    .eq('published', true)  // Only fetch published algorithms
    .single();

  console.log('Algorithm query result:', { algorithm, error });

  if (error || !algorithm) {
    console.error('Failed to fetch algorithm:', error);
    notFound();
  }

  // Fetch related case studies directly using Supabase
  console.log('Fetching case studies for algorithm:', algorithm.name);
  
  let caseStudies: CaseStudy[] = [];
  let caseStudiesError = null;
  
  try {
    // First get the algorithm ID
    const { data: algorithmData, error: algorithmError } = await supabase
      .from('algorithms')
      .select('id, name')
      .eq('slug', algorithm.slug)
      .single();
    
    if (algorithmError || !algorithmData) {
      console.error('Error finding algorithm:', algorithmError);
      caseStudiesError = { error: 'Algorithm not found' };
    } else {
      // Get case studies related to this algorithm using the junction table
      const { data: relations, error: relationsError } = await supabase
        .from('algorithm_case_study_relations' as any)
        .select('case_study_id')
        .eq('algorithm_id', algorithmData.id);
        
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

  console.log('Case studies query result:', { caseStudies, error: caseStudiesError });

  const content = algorithm.main_content ? md.render(algorithm.main_content) : '';
  console.log('Rendered content length:', content.length);

  return (
    <AuthGate
      title="Access Algorithm Details"
      description="Get exclusive access to detailed quantum algorithm explanations and implementations."
    >
      <LearningPathLayout 
        title={algorithm.name}
        backLinkText="Back to Algorithms"
        backLinkHref="/paths/algorithm"
      >
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">{algorithm.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {algorithm.use_cases?.map((app: string) => (
              <Badge key={app} variant="outline">
                {app}
              </Badge>
            ))}
          </div>

          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </LearningPathLayout>
    </AuthGate>
  );
}