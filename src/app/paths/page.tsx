// src/app/paths/page.tsx

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Users, Building2, Atom } from 'lucide-react';
import AuthGate from '@/components/auth/AuthGate';

export default async function LearningPathsPage() {

  const paths = [
    {
      title: "By Persona",
      description: "Choose your learning path based on your role and experience level.",
      href: "/paths/persona",
      Icon: Users
    },
    {
      title: "By Industry",
      description: "Explore quantum computing applications in your industry.",
      href: "/paths/industry",
      Icon: Building2
    },
    {
      title: "By Algorithm",
      description: "Learn specific quantum algorithms and their applications.",
      href: "/paths/algorithm",
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
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <path.Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <CardTitle className="text-lg sm:text-xl mb-2">
                        {path.title}
                      </CardTitle>
                      <CardDescription className="mb-4">
                        {path.description}
                      </CardDescription>
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