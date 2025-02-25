// src/app/paths/industry/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getAllContent } from '@/lib/mdx';
import type { Industry } from '@/lib/types';

export default async function IndustryPage() {
  const industryList = await getAllContent<Industry>('industry');

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-text-primary mb-8">Industries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industryList.map((industry) => (
          <Link key={industry.slug} href={`/paths/industry/${industry.slug}`}>
            <Card className="hover:bg-accent/5 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-accent text-white border-0">
                    {industry.frontmatter.sector}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{industry.frontmatter.title}</CardTitle>
                <CardDescription>{industry.frontmatter.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}