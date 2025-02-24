// src/app/case-study/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getContentBySlug, getAllContent } from '@/lib/mdx';
import type { CaseStudy } from '@/lib/types';
import type { MDXContent } from '@/lib/mdx';

// Generate static params for all case studies
export async function generateStaticParams() {
  const caseStudies = await getAllContent<CaseStudy>('case-study');
  return caseStudies.map(study => ({ slug: study.slug }));
}

const components = {
  // Add any custom components here
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mb-6" {...props} />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="mb-4" {...props} />
  ),
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await getContentBySlug<CaseStudy>('case-study', slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="container mx-auto p-8">
      <Link 
        href="/case-study"
        className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block"
      >
        ← Back to Case Studies
      </Link>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-8">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1>{caseStudy.frontmatter.title}</h1>
            <p className="text-xl text-muted-foreground">{caseStudy.frontmatter.description}</p>
            
            <MDXRemote 
              source={caseStudy.source} 
              components={components}
              options={{
                parseFrontmatter: false,
                mdxOptions: {
                  development: process.env.NODE_ENV === 'development'
                }
              }}
            />
          </article>
        </div>

        {/* Sidebar */}
        <div className="col-span-4">
          <div className="sticky top-8">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Case Study Details</h3>
              
              <div className="space-y-4">
                {caseStudy.frontmatter.difficulty && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Difficulty</h4>
                    <Badge>{caseStudy.frontmatter.difficulty}</Badge>
                  </div>
                )}

                {caseStudy.frontmatter.technologies?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {caseStudy.frontmatter.technologies.map((tech: string) => (
                        <Badge key={tech} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {caseStudy.frontmatter.persona?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Related Content</h4>
                    <div className="mt-2 space-y-2">
                      {caseStudy.frontmatter.persona.map((p: string) => (
                        <Link
                          key={p}
                          href={`/paths/persona/${p}`}
                          className="block text-sm hover:text-primary"
                        >
                          {p}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {caseStudy.frontmatter.metrics && Object.keys(caseStudy.frontmatter.metrics).length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Key Metrics</h4>
                    <div className="mt-2 space-y-1">
                      {Object.entries(caseStudy.frontmatter.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}