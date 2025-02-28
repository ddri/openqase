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
            <Card fixedHeight height={260} className="hover:bg-accent/5 transition-colors relative">
              <CardHeader flexGrow>
                <CardTitle className="text-xl mb-2">{study.title}</CardTitle>
                {/* Description with max height to prevent overflow */}
                <CardDescription className="mb-12"> {/* Extra bottom margin to make room for badges */}
                  {study.description}
                </CardDescription>
              </CardHeader>
              
              {/* Fixed position badge container at bottom of card */}
              <div className="absolute bottom-4 left-6 right-6">
                {study.tags && study.tags.length > 0 && (
                  <div className="flex overflow-x-auto pb-1 scrollbar-none"> {/* Horizontal scrolling container */}
                    <div className="flex gap-2 flex-nowrap">
                      {study.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="whitespace-nowrap">
                          {tag}
                        </Badge>
                      ))}
                      {study.tags.length > 3 && (
                        <Badge variant="outline" className="whitespace-nowrap">
                          +{study.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}