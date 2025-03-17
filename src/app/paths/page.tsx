// src/app/paths/page.tsx

import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Users, Building2, Atom } from 'lucide-react';

async function getContentCounts() {
  const counts = {
    persona: 0,
    industry: 0,
    algorithm: 0,
  };

  try {
    const personaDir = path.join(process.cwd(), 'content', 'persona');
    const industryDir = path.join(process.cwd(), 'content', 'industry');
    const algorithmDir = path.join(process.cwd(), 'content', 'algorithm');

    const [personaFiles, industryFiles, algorithmFiles] = await Promise.all([
      fs.readdir(personaDir),
      fs.readdir(industryDir),
      fs.readdir(algorithmDir),
    ]);

    counts.persona = personaFiles.filter(f => f.endsWith('.mdx')).length;
    counts.industry = industryFiles.filter(f => f.endsWith('.mdx')).length;
    counts.algorithm = algorithmFiles.filter(f => f.endsWith('.mdx')).length;
  } catch (error) {
    console.error('Error counting content files:', error);
  }

  return counts;
}

export default async function LearningPathsPage() {
  const counts = await getContentCounts();

  const paths = [
    {
      title: "By Persona",
      description: "Choose your learning path based on your role and experience level.",
      href: "/paths/persona",
      count: counts.persona,
      examples: ["Software Engineer", "Financial Analyst"],
      Icon: Users
    },
    {
      title: "By Industry",
      description: "Explore quantum computing applications in your industry.",
      href: "/paths/industry",
      count: counts.industry,
      examples: ["Finance", "Healthcare", "Smart Cities"],
      Icon: Building2
    },
    {
      title: "By Algorithm",
      description: "Learn specific quantum algorithms and their applications.",
      href: "/paths/algorithm",
      count: counts.algorithm,
      examples: ["Grover's", "QAOA", "VQE"],
      Icon: Atom
    }
  ];

  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Explore quantum computing through different perspectives, tailored to your interests and needs
          </p>
        </div>

        {/* Path Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 md:mb-16">
          {paths.map((path) => (
            <Link key={path.title} href={path.href} className="group">
              <Card className={cn(
                "h-full transition-all duration-200",
                "hover:shadow-sm hover:border-border-hover hover:bg-accent/5"
              )}>
                <CardHeader className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <path.Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {path.count} Paths
                    </Badge>
                  </div>
                  
                  <div className="flex-grow">
                    <CardTitle className="text-lg sm:text-xl mb-2">
                      {path.title}
                    </CardTitle>
                    <CardDescription className="mb-4">
                      {path.description}
                    </CardDescription>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {path.examples.map((example) => (
                      <Badge key={example} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card/50">
            <CardHeader>
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                  Not Sure Where to Start?
                </h2>
                <p className="text-muted-foreground mb-6">
                  We recommend starting with the Persona-based learning path to get content tailored to your role and experience level.
                </p>
                <Button asChild size="lg">
                  <Link href="/paths/persona">
                    Explore Persona Paths
                  </Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}