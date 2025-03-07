// src/app/paths/industry/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getAllContent } from '@/lib/mdx';
import type { Industry } from '@/lib/types';

export default async function IndustryPage() {
  const industryList = await getAllContent<Industry>('industry');

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[hsl(var(--primary))] mb-8">
          Quantum Industries
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryList.map((industry) => (
            <Link key={industry.slug} href={`/paths/industry/${industry.slug}`}>
              <Card fixedHeight height={190} className="hover:bg-accent/15 hover:shadow-lg transition-all">
                <CardHeader flexGrow>
                  <div className="flex items-center justify-between mb-2">
                  </div>
                  <CardTitle className="text-xl mb-2">{industry.frontmatter.title}</CardTitle>
                  <CardDescription>{industry.frontmatter.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}