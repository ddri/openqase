// src/app/paths/personas/[slug]/page.tsx
import { getContentBySlug, getAllContent } from '@/lib/mdx';
import { PersonaFrontmatter, CaseStudyFrontmatter } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

// Components for MDX
const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold text-gray-100 mb-6">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold text-gray-100 mt-8 mb-4">{children}</h2>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-300 mb-4">{children}</p>
  ),
};

// Generate static paths
export async function generateStaticParams() {
  const personas = await getAllContent<PersonaFrontmatter>('personas');
  return personas.map((persona) => ({
    slug: persona.slug,
  }));
}

// Get metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const persona = await getContentBySlug<PersonaFrontmatter>('personas', params.slug);
  
  return {
    title: `${persona.frontmatter.title} | OpenQase Quantum Computing`,
    description: persona.frontmatter.description,
    keywords: persona.frontmatter.keywords,
  };
}

export default async function PersonaPage({ params }: { params: { slug: string } }) {
  const persona = await getContentBySlug<PersonaFrontmatter>('personas', params.slug);
  
  // Get related case studies
  const caseStudies = await Promise.all(
    persona.frontmatter.relatedCaseStudies.map(async (studySlug) => {
      return await getContentBySlug<CaseStudyFrontmatter>('case-studies', studySlug);
    })
  );

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Persona Card */}
          <div className="col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <div className="aspect-[3/2] bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">{persona.frontmatter.title}</span>
              </div>
              <div className="p-3">
                <Badge className="bg-blue-900 text-blue-200">
                  {persona.frontmatter.type}
                </Badge>
              </div>
            </Card>
            <Link 
              href="/paths/personas"
              className="inline-block mt-4 text-sm text-gray-400 hover:text-gray-300"
            >
              ← Back to Personas
            </Link>
          </div>

          {/* Main Content */}
          <div className="col-span-7">
            <article className="prose prose-invert max-w-none">
              <MDXRemote source={persona.source} components={components} />
            </article>
          </div>

          {/* Right Column - Case Studies */}
          <div className="col-span-3">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Related Case Studies
            </h2>
            <div className="space-y-4">
              {caseStudies.map((study) => (
                <Link 
                  key={study.frontmatter.slug}
                  href={`/case-studies/${study.frontmatter.slug}`}
                  className="block p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700"
                >
                  <h3 className="font-medium text-gray-100 mb-2">
                    {study.frontmatter.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {study.frontmatter.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {study.frontmatter.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}