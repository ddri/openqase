// src/app/paths/persona/page.tsx
import { getAllContent } from '@/lib/mdx';
import { Persona } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata = {
  title: 'Learning Path by Persona | OpenQase',
  description: 'Choose your quantum computing learning path based on your role and experience'
};

export default async function PersonaPage() {
  const personaList = await getAllContent<Persona>('persona');

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Learning Path by Persona</h1>
        <p className="text-xl text-text-secondary mb-8">Choose your path based on your role and experience</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personaList.map((persona) => (
            <Link key={persona.slug} href={`/paths/persona/${persona.slug}`}>
              <Card className="hover:bg-accent/5 transition-all h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-accent text-white border-0">
                      {persona.frontmatter.role}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {persona.frontmatter.title}
                  </CardTitle>
                  <CardDescription>
                    {persona.frontmatter.description}
                  </CardDescription>
                  {persona.frontmatter.expertise && (
                    <div className="mt-4">
                      <p className="text-sm text-text-secondary mb-2">Key expertise:</p>
                      <div className="flex flex-wrap gap-2">
                        {persona.frontmatter.expertise.slice(0, 3).map((item: string) => (
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