// src/app/quantum-stack/[id]/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
    const contentDirectory = path.join(process.cwd(), 'content', 'stack-layers');
    const files = await fs.readdir(contentDirectory);
    
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        id: file.replace('.mdx', ''),  // Changed from 'layer' to 'id'
      }));
  }

  async function getStackLayer(id: string) {  // Changed from 'slug' to 'id'
    try {
      const filePath = path.join(process.cwd(), 'content', 'stack-layers', `${id}.mdx`);
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

  export default async function StackLayerPage({ params }: { params: { id: string } }) {  // Changed from 'layer' to 'id'
    const stackLayer = await getStackLayer(params.id);  // Changed from 'params.layer' to 'params.id'
  

  if (!stackLayer) {
    notFound();
  }

  const { frontmatter, content } = stackLayer;

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/quantum-stack"
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            ← Back to Quantum Stack
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Layer Info */}
          <div className="col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Badge className={`bg-${frontmatter.color}-900 text-${frontmatter.color}-200 mb-2`}>
                  Layer {frontmatter.layer}
                </Badge>
                <CardTitle className="text-gray-100">{frontmatter.title}</CardTitle>
              </CardHeader>
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
            <div className="sticky top-8 space-y-6">
              {frontmatter.applications && (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {frontmatter.applications.map((app: any) => (
                        <div key={app.title}>
                          <h4 className="font-medium text-gray-200 mb-2">{app.title}</h4>
                          <p className="text-sm text-gray-400 mb-2">{app.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {app.examples.map((example: string) => (
                              <Badge key={example} variant="outline">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {frontmatter.relatedContent && (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Related Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {frontmatter.relatedContent.algorithms && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-200 mb-2">Algorithms</h4>
                        <div className="space-y-1">
                          {frontmatter.relatedContent.algorithms.map((algo: string) => (
                            <Link 
                              key={algo}
                              href={`/paths/algorithms/${algo}`}
                              className="block text-gray-400 hover:text-gray-300"
                            >
                              {algo}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {frontmatter.relatedContent.caseStudies && (
                      <div>
                        <h4 className="font-medium text-gray-200 mb-2">Case Studies</h4>
                        <div className="space-y-1">
                          {frontmatter.relatedContent.caseStudies.map((study: string) => (
                            <Link 
                              key={study}
                              href={`/case-studies/${study}`}
                              className="block text-gray-400 hover:text-gray-300"
                            >
                              {study}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}