// src/app/case-study/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import { Badge } from '@/components/ui/badge';
import MarkdownIt from 'markdown-it';

// Initialize markdown-it with GFM features enabled
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  console.log('Fetching case study with slug:', slug);

  const { data: caseStudy, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  console.log('Case study query result:', { caseStudy, error });

  if (error || !caseStudy) {
    console.error('Error fetching case study:', error);
    return notFound();
  }

  const content = caseStudy.main_content ? md.render(caseStudy.main_content) : '';

  return (
    <LearningPathLayout
      title={caseStudy.title}
      description={caseStudy.description || ''}
      backLinkText="Back to Case Studies"
      backLinkHref="/case-study"
    >
      <div className="prose dark:prose-invert max-w-none">
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <div className="space-y-6">
            {caseStudy.partner_companies && caseStudy.partner_companies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.partner_companies.map((company: string) => (
                    <Badge key={company} variant="outline">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {caseStudy.quantum_hardware && caseStudy.quantum_hardware.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Quantum Hardware</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.quantum_hardware.map((hardware: string) => (
                    <Badge key={hardware} variant="outline">
                      {hardware}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {caseStudy.industries && caseStudy.industries.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.industries.map((industry: string) => (
                    <Badge key={industry} variant="outline">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {caseStudy.algorithms && caseStudy.algorithms.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Algorithms</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.algorithms.map((algorithm: string) => (
                    <Badge key={algorithm} variant="outline">
                      {algorithm}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LearningPathLayout>
  );
}