// src/app/paths/algorithm/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
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

interface AlgorithmPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
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

  // Fetch related case studies using the API route
  console.log('Fetching case studies for algorithm:', algorithm.name);
  
  let caseStudies = [];
  let caseStudiesError = null;
  
  try {
    // Use the API route instead of direct Supabase query
    // Use the algorithm's slug instead of name for the query
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/case-studies?algorithm=${encodeURIComponent(algorithm.slug)}`,
      { cache: 'no-store' }
    );
    
    if (response.ok) {
      const data = await response.json();
      caseStudies = data.items;
    } else {
      caseStudiesError = await response.json();
      console.error('Error fetching case studies:', caseStudiesError);
    }
  } catch (error) {
    caseStudiesError = error;
    console.error('Error fetching case studies:', error);
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