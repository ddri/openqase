// src/app/paths/industries/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

async function getIndustries() {
  const contentDirectory = path.join(process.cwd(), 'content', 'industries');
  const files = await fs.readdir(contentDirectory);
  
  const industries = await Promise.all(
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

  return industries;
}

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Industries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((industry: any) => (
          <Link key={industry.slug} href={`/paths/industries/${industry.slug}`}>
            <Card className="hover:bg-accent/5 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge>{industry.sector}</Badge>
                </div>
                <CardTitle className="text-xl mb-2">{industry.title}</CardTitle>
                <CardDescription>{industry.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}