// src/app/page.tsx
'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
            Welcome to openQase
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive platform for learning quantum computing through practical case studies, 
            tailored learning paths, and real-world applications.
          </p>
        </div>

        {/* Main Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 md:mb-16">
          <Link href="/paths" className="group">
            <Card className={cn(
              "h-full transition-all duration-200",
              "hover:shadow-sm hover:border-border-hover hover:bg-accent/5"
            )}>
              <CardHeader>
                <Badge className="w-fit mb-2">Learning Paths</Badge>
                <CardTitle className="text-xl sm:text-2xl mb-2">Personalized Learning Experience</CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Choose your path based on your role, industry, or specific algorithms. 
                  Whether you're a researcher, developer, or business professional, we have 
                  content tailored for your needs.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/case-study" className="group">
            <Card className={cn(
              "h-full transition-all duration-200",
              "hover:shadow-sm hover:border-border-hover hover:bg-accent/5"
            )}>
              <CardHeader>
                <Badge className="w-fit mb-2">Case Studies</Badge>
                <CardTitle className="text-xl sm:text-2xl mb-2">Real-World Applications</CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Explore how organizations are implementing quantum computing solutions across 
                  various industries, from finance to healthcare and beyond.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Secondary Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 md:mb-16">
          <Link href="/quantum-stack" className="group">
            <Card className={cn(
              "h-full transition-all duration-200",
              "hover:shadow-sm hover:border-border-hover hover:bg-accent/5"
            )}>
              <CardHeader>
                <Badge className="w-fit mb-2">Quantum Stack</Badge>
                <CardTitle className="text-xl sm:text-2xl mb-2">Technical Infrastructure</CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Understand the complete quantum computing stack, from quantum hardware to 
                  application layers. Learn how different components work together in quantum systems.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/paths/algorithm" className="group">
            <Card className={cn(
              "h-full transition-all duration-200",
              "hover:shadow-sm hover:border-border-hover hover:bg-accent/5"
            )}>
              <CardHeader>
                <Badge className="w-fit mb-2">Algorithm Library</Badge>
                <CardTitle className="text-xl sm:text-2xl mb-2">Quantum Algorithms</CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Access a comprehensive library of quantum algorithms, complete with 
                  explanations, implementations, and use cases. From basic to advanced algorithms.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Call to Action */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card/50">
            <CardHeader className="text-center">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Ready to Start Your Quantum Journey?
              </h2>
              <p className="text-muted-foreground mb-6">
                Begin with our personalized learning paths to get content tailored to your background and goals.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/paths">
                  Explore Learning Paths
                </Link>
              </Button>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}