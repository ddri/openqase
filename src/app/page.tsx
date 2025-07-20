// src/app/page.tsx
'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ContentCard from '@/components/ui/content-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User, Building2, CircuitBoard, ArrowRight, Brain, FileText, Users } from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  focus: string;
}

const features: FeatureCard[] = [
  {
    title: "Real Business Applications",
    description: "See actual quantum computing implementations from companies like HSBC, Google DeepMind, and Mitsui. Learn from proven use cases with measurable outcomes.",
    icon: <FileText className="w-6 h-6" />,
    focus: "Proven implementations"
  },
  {
    title: "No Technical Background Required",
    description: "Business-focused explanations that skip academic theory. Understand quantum value without getting lost in complex mathematics or physics.",
    icon: <Brain className="w-6 h-6" />,
    focus: "Accessible insights"
  },
  {
    title: "Tailored to Your Context",
    description: "Content organized by your professional role and industry sector. Get relevant insights for your specific responsibilities and business challenges.",
    icon: <Users className="w-6 h-6" />,
    focus: "Personal relevance"
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex min-h-screen items-center justify-center bg-background text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="tracking-tight">
            Understand Quantum Computing{' '}
            <span className="text-primary block mt-2">
              Without the Technical Complexity
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Get practical insights from real quantum computing implementations. See how companies like HSBC and Google apply quantum algorithms to solve actual business challenges.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/case-study">
                See Real Applications
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8"
            >
              <Link href="/paths">
                Find Your Learning Path
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-24 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="tracking-tight">Get Relevant Quantum Insights</h2>
            <p className="text-xl text-muted-foreground mt-4">
              Skip the theory. Focus on quantum applications that matter to your role, industry, and business objectives.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Link href="/paths/persona" className="group block h-full">
              <Card className={cn("h-full card-link-hover-effect", "flex flex-col")}>
                <CardHeader className="flex-grow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>By Your Role</CardTitle>
                  <CardDescription className="mb-4">
                    See quantum applications relevant to CEOs, CTOs, engineers, and consultants. Focus on your responsibilities and decision-making needs.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/paths/industry" className="group block h-full">
              <Card className={cn("h-full card-link-hover-effect", "flex flex-col")}>
                <CardHeader className="flex-grow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>By Your Industry</CardTitle>
                  <CardDescription className="mb-4">
                    Discover quantum solutions in finance, healthcare, energy, and manufacturing. See sector-specific implementations and ROI potential.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/paths/algorithm" className="group block h-full">
              <Card className={cn("h-full card-link-hover-effect", "flex flex-col")}>
                <CardHeader className="flex-grow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <CircuitBoard className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>By Solution Type</CardTitle>
                  <CardDescription className="mb-4">
                    Understand quantum algorithms through their business applications. From optimization to machine learning and security solutions.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose OpenQASE Section */}
      <section className="py-24">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4">Why Business Leaders Choose OpenQase</h2>
            <p className="text-xl text-muted-foreground">
              The practical approach to understanding quantum computing's business impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-sm"
              >
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 px-4 bg-muted/50">
        <div className="container max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="tracking-tight">Featured Case Studies</h2>
              <p className="text-xl text-muted-foreground mt-4">
                Real-world examples of quantum computing solving business problems across industries.
              </p>
            </div>
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/case-study">
                View All Case Studies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentCard
              title="Quantinuum & HSBC: Financial Services Enhancement"
              description="How HSBC partnered with Quantinuum to explore quantum computing applications in cybersecurity, fraud detection, and natural language processing for banking."
              badges={[]}
              href="/case-study/quantinuum-hsbc-financial-services-enhancement"
            />
            
            <ContentCard
              title="Quantinuum & Google DeepMind: AI for Quantum Circuit Optimization"
              description="How Quantinuum and Google DeepMind developed AlphaTensor-Quantum to optimize quantum circuits, reducing T gate counts by up to 47% in cryptography applications."
              badges={[]}
              href="/case-study/quantinuum-google-deepmind-circuit-optimisation"
            />
            
            <ContentCard
              title="Quantinuum & Mitsui Co: Global Trading Optimization"
              description="How Mitsui & Co. partnered with Quantinuum to apply quantum computing to logistics optimization, commodity trading, and financial risk assessment."
              badges={[]}
              href="/case-study/quantinuum-mitsui-trading-co"
            />
          </div>
        </div>
      </section>

    </div>
  );
}