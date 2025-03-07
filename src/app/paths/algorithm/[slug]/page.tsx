// src/app/paths/algorithm/[slug]/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-6">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold text-[var(--text-primary)] mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">{children}</p>
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
    if (className === 'references-section') {
      return (
        <div className="mt-12 pt-8 border-t border-[var(--border)] bg-[var(--muted)] rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">References</h2>
          {children}
        </div>
      );
    }
    if (className === 'reference-item') {
      return (
        <div id={id} className="mb-4 pl-8 -indent-8 text-[var(--text-secondary)]">
          {children}
        </div>
      );
    }
    return <div className={className}>{children}</div>;
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
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/paths/algorithm"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            ← Back to Algorithms
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[hsl(var(--primary))] mb-4">
            {frontmatter.title}
          </h1>
          {frontmatter.complexity && (
            <p className="text-sm text-[var(--text-secondary)]">
              Complexity: <code className="text-[var(--primary)]">{frontmatter.complexity}</code>
            </p>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-9">
            <article className="prose max-w-none">
              <MDXRemote 
                source={content} 
                components={components} 
              />
            </article>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <div className="sticky top-8 space-y-6">
              {/* Prerequisites Card */}
              <Card className="bg-[var(--card)] border">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                    Prerequisites
                  </h3>
                  <div className="space-y-2">
                    {frontmatter.prerequisites.map((prereq: string) => (
                      <div key={prereq} className="text-[var(--text-secondary)]">
                        • {prereq}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Applications Card */}
              <Card className="bg-[var(--card)] border">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                    Applications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {frontmatter.applications.map((app: string) => (
                      <Badge key={app} variant="outline" className="text-[var(--text-secondary)] border-[var(--border)]">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Related Case Studies Card */}
              {frontmatter.relatedCaseStudies && frontmatter.relatedCaseStudies.length > 0 && (
                <Card className="bg-[var(--card)] border">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                      Related Case Studies
                    </h3>
                    <div className="space-y-2">
                      {frontmatter.relatedCaseStudies.map((study: string) => (
                        <Link 
                          key={study}
                          href={`/case-study/${study}`}
                          className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          {study}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}