// src/app/paths/personas/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

async function getPersonas() {
  const contentDirectory = path.join(process.cwd(), 'content', 'personas');
  const files = await fs.readdir(contentDirectory);
  
  const personas = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async file => {
        const fullPath = path.join(contentDirectory, file);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return {
          ...data,
          slug: file.replace('.mdx', ''),
        };
      })
  );

  return personas;
}

export default async function PersonasPage() {
  const personas = await getPersonas();

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-100 mb-8">Learning Paths by Persona</h1>
        <p className="text-xl text-gray-400 mb-8">Choose your path based on your role and experience</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona: any) => (
            <Link key={persona.slug} href={`/paths/personas/${persona.slug}`}>
              <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={persona.type === 'Technical' ? 'bg-blue-900 text-blue-200' : 'bg-green-900 text-green-200'}>
                      {persona.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 text-gray-100">{persona.title}</CardTitle>
                  <CardDescription className="text-gray-400">{persona.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}