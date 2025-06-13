// src/app/paths/page.tsx

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Users, Building2, Atom } from 'lucide-react';
import AuthGate from '@/components/auth/AuthGate';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getContentCounts() {
  const counts = {
    persona: 0,
    industry: 0,
    algorithm: 0,
  };

  try {
    const [personaCount, industryCount, algorithmCount] = await Promise.all([
      supabase.from('personas').select('id', { count: 'exact', head: true }).eq('published', true),
      supabase.from('industries').select('id', { count: 'exact', head: true }).eq('published', true),
      supabase.from('algorithms').select('id', { count: 'exact', head: true }).eq('published', true)
    ]);

    counts.persona = personaCount.count || 0;
    counts.industry = industryCount.count || 0;
    counts.algorithm = algorithmCount.count || 0;
  } catch (error) {
    console.error('Error counting content:', error);
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
    <AuthGate
      title="Get Personalized Learning Paths"
      description="Sign up to unlock progress tracking, personalized recommendations, and curated content based on your interests and goals."
    >
      <main className="min-h-screen">
        <div className="container-outer section-spacing">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="mb-6">
              Choose Your Learning Path
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Explore quantum computing through different perspectives, tailored to your interests and needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 md:mb-16">
            {paths.map((path) => (
              <Link key={path.title} href={path.href} className="group">
                <Card className={cn(
                  "h-full card-link-hover-effect"
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
        </div>
      </main>
    </AuthGate>
  );
}