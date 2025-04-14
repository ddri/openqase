// src/app/paths/algorithm/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
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
  params: {
    slug: string;
  };
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const supabase = createServerClient();
  
  console.log('Fetching algorithm with slug:', params.slug);
  const { data: algorithm, error } = await supabase
    .from('algorithms')
    .select()
    .eq('slug', params.slug)
    .single();

  console.log('Algorithm query result:', { algorithm, error });

  if (error || !algorithm) {
    console.error('Failed to fetch algorithm:', error);
    notFound();
  }

  // Fetch related case studies
  console.log('Fetching case studies for algorithm:', algorithm.name);
  const { data: caseStudies, error: caseStudiesError } = await supabase
    .from('case_studies')
    .select()
    .contains('algorithms', [algorithm.name])
    .eq('published', true);

  console.log('Case studies query result:', { caseStudies, error: caseStudiesError });

  const content = algorithm.mdx_content ? md.render(algorithm.mdx_content) : '';
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
            {algorithm.use_cases?.map((app) => (
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