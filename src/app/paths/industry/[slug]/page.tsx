// src/app/paths/industry/[slug]/page.tsx
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
    <h1 className="text-4xl font-bold text-gray-100 mb-6">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold text-gray-100 mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-gray-100 mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6 ml-4">{children}</ul>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-gray-300">{children}</li>
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
    return null;
  }
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = await getIndustry(slug);

  if (!industry) {
    notFound();
  }

  const { frontmatter, content } = industry;

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/paths/industry"
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            ← Back to Industries
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Industry Card */}
          <div className="col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <div className="aspect-[3/2] bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">{frontmatter.title}</span>
              </div>
              <div className="p-3">
                <div className="mb-1.5">
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] bg-blue-900 text-blue-200">
                    {frontmatter.type}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-7">
            <article className="prose prose-invert max-w-none">
              <MDXRemote 
                source={content} 
                components={components} 
              />
            </article>
          </div>

          {/* Right Column - Applications & Related */}
          <div className="col-span-3">
            <div className="sticky top-8">
              <Card className="bg-gray-900 border-gray-800 mb-6">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-100 mb-3">
                    Key Applications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {frontmatter.keyApplications.map((app: string) => (
                      <Badge key={app} variant="outline">{app}</Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {frontmatter.relatedCaseStudies && frontmatter.relatedCaseStudies.length > 0 && (
                <Card className="bg-gray-900 border-gray-800">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-100 mb-3">
                      Related Case Studies
                    </h3>
                    <div className="space-y-2">
                      {frontmatter.relatedCaseStudies.map((study: string) => (
                        <Link 
                          key={study}
                          href={`/case-study/${study}`}
                          className="block text-gray-400 hover:text-gray-300 transition-colors"
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