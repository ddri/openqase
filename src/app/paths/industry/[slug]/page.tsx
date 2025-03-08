// src/app/paths/industry/[slug]/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

// Components for MDX
const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-6">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold text-[var(--text-primary)] mt-8 mb-4">{children}</h2>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-[var(--text-secondary)] mb-4">{children}</p>
  ),
};

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), 'content', 'industry');
  const files = await fs.readdir(contentDirectory);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace('.mdx', ''),
    }));
}

async function getIndustry(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'industry', `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      frontmatter: data,
      content,
    };
  } catch (error) {
    console.error('Error loading industry:', error);
    return null;
  }
}

// Updated to handle params as a Promise
export default async function IndustryPage(props: { params: Promise<{ slug: string }> }) {
  // Await the params before using
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;
  const industry = await getIndustry(slug);
  
  if (!industry) {
    notFound();
  }
  
  const { frontmatter, content } = industry;
  
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/paths/industry"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            ← Back to Industries
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[hsl(var(--primary))] mb-4">
            {frontmatter.title}
          </h1>
          <Badge className="bg-[#2A9D8F] text-white border-0">
            {frontmatter.sector}
          </Badge>
        </div>
        
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-9">
            <article className="prose max-w-none">
              <MDXRemote source={content} components={components} />
            </article>
          </div>
          
          {/* Right Sidebar */}
          <div className="col-span-3">
            <div className="sticky top-8 space-y-6">
              {frontmatter.keyApplications && frontmatter.keyApplications.length > 0 && (
                <Card className="bg-[var(--card)] border">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                      Key Applications
                    </h3>
                    <div className="space-y-4">
                      {frontmatter.keyApplications.map((app: any, index: number) => (
                        <div key={index}>
                          <h4 className="font-medium text-[var(--text-primary)]">
                            {app.title}
                          </h4>
                          <p className="text-sm text-[var(--text-secondary)] mb-2">
                            {app.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {app.examples && Array.isArray(app.examples) && app.examples.map((example: string) => (
                              <Badge key={example} variant="outline" className="text-[var(--text-secondary)] border-[var(--border)]">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
              
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
                          {study.replace(/-/g, ' ')}
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