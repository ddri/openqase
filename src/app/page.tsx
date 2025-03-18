// src/app/page.tsx
'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function HomePage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-background text-center px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Explore the World of{' '}
          <span className="text-primary block mt-2">
            Quantum Computing
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          A comprehensive educational resource for understanding quantum computing principles, applications, and algorithms.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/paths">
              Explore Learning Paths
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8"
          >
            <Link href="/case-study">
              Browse Resources
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}