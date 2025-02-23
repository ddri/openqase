// src/app/case-study/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

async function getCaseStudies() {
  const contentDirectory = path.join(process.cwd(), 'content', 'case-study');
  const files = await fs.readdir(contentDirectory);
  
  const caseStudies = await Promise.all(
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

  return caseStudies;
}

export default async function CaseStudyPage() {
  const caseStudies = await getCaseStudies();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Case Studies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study: any) => (
          <Link key={study.slug} href={`/case-study/${study.slug}`}>
            <Card className="hover:bg-accent/5 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge>{study.difficulty}</Badge>
                </div>
                <CardTitle className="text-xl mb-2">{study.title}</CardTitle>
                <CardDescription>{study.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {study.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}