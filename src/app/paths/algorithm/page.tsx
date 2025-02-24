// src/app/paths/algorithm/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getAllContent } from '@/lib/mdx';
import type { Algorithm } from '@/lib/types';

export default async function AlgorithmPage() {
  const algorithmList = await getAllContent<Algorithm>('algorithm');

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-100 mb-8">Quantum Algorithms</h1>
        <p className="text-xl text-gray-400 mb-8">
          Explore quantum algorithms from fundamental protocols to complex applications
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithmList.map((algorithm) => (
            <Link key={algorithm.slug} href={`/paths/algorithm/${algorithm.slug}`}>
              <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{algorithm.frontmatter.complexity}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 text-gray-100">
                    {algorithm.frontmatter.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {algorithm.frontmatter.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {algorithm.frontmatter.applications.slice(0, 3).map((app: string) => (
                      <Badge key={app} variant="outline">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}