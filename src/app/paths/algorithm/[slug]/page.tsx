// src/app/paths/algorithm/[slug]/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Steps, Step } from '@/components/ui/steps';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const components = {
  Steps,
  Step,
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-6">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold text-[var(--text-primary)] mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">{children}</h3>
  ),
  p: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <p className={cn("text-[var(--text-secondary)] mb-4 leading-relaxed", className)}>{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] mb-6 ml-4">{children}</ul>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-[var(--text-secondary)]">{children}</li>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-[var(--muted)] rounded px-2 py-1 text-sm font-mono text-[var(--primary)]">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-[var(--muted)] rounded-lg p-4 overflow-x-auto mb-6 text-sm font-mono text-[var(--primary)]">
      {children}
    </pre>
  ),
  sup: ({ children }: { children: React.ReactNode }) => (
    <sup className="text-xs">{children}</sup>
  ),
  a: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a 
      href={href} 
      className="text-[hsl(var(--primary))] hover:underline scroll-smooth"
    >
      {children}
    </a>
  ),
  div: ({ className, children, id }: { className?: string; children: React.ReactNode; id?: string }) => {
    switch (className) {
      case 'references-section':
        return (
          <div className="mt-12 pt-8 border-t border-[var(--border)] bg-[var(--muted)] rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">References</h2>
            {children}
          </div>
        );
      case 'reference-item':
        return (
          <div id={id} className="mb-4 pl-8 -indent-8 text-[var(--text-secondary)]">
            {children}
          </div>
        );
      default:
        return <div className={className}>{children}</div>;
    }
  }
};

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), 'content', 'algorithm');
  const files = await fs.readdir(contentDirectory);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace('.mdx', ''),
    }));
}

async function getAlgorithm(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'algorithm', `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      frontmatter: data,
      content,
    };
  } catch (error) {
    return null;
  }
}

// Updated to handle params as a Promise
export default async function AlgorithmPage(props: { params: Promise<{ slug: string }> }) {
  // Await the params before using
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;
  const algorithm = await getAlgorithm(slug);  

  if (!algorithm) {
    notFound();
  }

  const { frontmatter, content } = algorithm;

  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        {/* Back link */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/paths/algorithm"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>←</span>
            <span>Back to Algorithms</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            {frontmatter.title}
          </h1>
          {frontmatter.complexity && (
            <p className="text-base sm:text-lg text-muted-foreground">
              Complexity: <code className="text-primary">{frontmatter.complexity}</code>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote 
                source={content} 
                components={components} 
              />
            </article>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Prerequisites Card */}
              <Card>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Prerequisites
                  </h3>
                  <div className="space-y-2">
                    {frontmatter.prerequisites.map((prereq: string) => (
                      <div key={prereq} className="flex items-start gap-2 text-muted-foreground">
                        <span>•</span>
                        <span>{prereq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Applications Card */}
              <Card>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Applications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {frontmatter.applications.map((app: string) => (
                      <Badge 
                        key={app} 
                        variant="secondary"
                        className="text-sm"
                      >
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Related Case Studies Card */}
              {frontmatter.relatedCaseStudies && frontmatter.relatedCaseStudies.length > 0 && (
                <Card>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Related Case Studies
                    </h3>
                    <div className="grid gap-2">
                      {frontmatter.relatedCaseStudies.map((study: string) => (
                        <Link 
                          key={study}
                          href={`/case-study/${study}`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {study}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}