// src/app/quantum-stack/[id]/page.tsx
import { supabase } from '@/lib/supabase';
import { StackLayer } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

async function getStackLayer(id: string): Promise<StackLayer | null> {
  const { data, error } = await supabase
    .from('stack_layers')
    .select('*')
    .eq('slug', id)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    title: data.title,
    description: data.description,
    color: data.color,
    layer: data.layer,
    slug: data.slug,
    mdx_content: data.mdx_content,
    source: data.source,
    applications: data.applications,
    relatedContent: data.related_content
  };
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function StackLayerPage({ params }: PageProps) {
  const stackLayer = await getStackLayer(params.id);

  if (!stackLayer) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-6">{stackLayer.title}</h1>
            <p className="text-lg mb-8">{stackLayer.description}</p>
          </header>

          {stackLayer.mdx_content && (
            <div className="prose dark:prose-invert max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: stackLayer.mdx_content }} />
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
            <div>
              {stackLayer.applications && stackLayer.applications.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Key Applications</h2>
                  <div className="grid gap-6">
                    {stackLayer.applications.map((app: { title: string; description: string; examples: string[] }, index: number) => (
                      <Card key={index} className="bg-gray-900 border-gray-800">
                        <CardHeader>
                          <CardTitle>{app.title}</CardTitle>
                          <p className="text-gray-300 mt-2">{app.description}</p>
                        </CardHeader>
                        {app.examples && app.examples.length > 0 && (
                          <CardContent>
                            <h4 className="font-medium text-gray-200 mb-2">Examples</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                              {app.examples.map((example: string, idx: number) => (
                                <li key={idx}>{example}</li>
                              ))}
                            </ul>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside>
              {stackLayer.relatedContent && Object.keys(stackLayer.relatedContent).length > 0 && (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Related Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stackLayer.relatedContent?.algorithm && stackLayer.relatedContent.algorithm.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-200 mb-2">Algorithms</h4>
                        <div className="space-y-1">
                          {stackLayer.relatedContent.algorithm.map((algo: string, index: number) => (
                            <Link 
                              key={index}
                              href={`/paths/algorithm/${algo}`}
                              className="block text-gray-400 hover:text-gray-300"
                            >
                              {algo}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {stackLayer.relatedContent?.caseStudy && stackLayer.relatedContent.caseStudy.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-200 mb-2">Case Studies</h4>
                        <div className="space-y-1">
                          {stackLayer.relatedContent.caseStudy.map((study: string, index: number) => (
                            <Link 
                              key={index}
                              href={`/case-study/${study}`}
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
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}