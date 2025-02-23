// src/app/paths/personas/page.tsx
import { getAllContent } from '@/lib/mdx';
import { PersonaFrontmatter } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata = {
  title: 'Learning Paths by Persona | OpenQase',
  description: 'Choose your quantum computing learning path based on your role and experience'
};

export default async function PersonasPage() {
  const personas = await getAllContent<PersonaFrontmatter>('personas');

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-100 mb-8">Learning Paths by Persona</h1>
        <p className="text-xl text-gray-400 mb-8">Choose your path based on your role and experience</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <Link key={persona.frontmatter.slug} href={`/paths/personas/${persona.frontmatter.slug}`}>
              <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      className={persona.frontmatter.type === 'Technical' 
                        ? 'bg-blue-900 text-blue-200' 
                        : 'bg-green-900 text-green-200'}
                    >
                      {persona.frontmatter.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 text-gray-100">
                    {persona.frontmatter.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {persona.frontmatter.description}
                  </CardDescription>
                  {persona.frontmatter.expertise && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Key expertise:</p>
                      <div className="flex flex-wrap gap-2">
                        {persona.frontmatter.expertise.slice(0, 3).map((item) => (
                          <Badge key={item} variant="outline">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}