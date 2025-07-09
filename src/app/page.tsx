// src/app/page.tsx
'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    title: "Accessible Knowledge",
    description: "Business-friendly explanations of quantum computing concepts, making complex topics approachable and understandable.",
    icon: <Brain className="w-6 h-6" />,
    focus: "Business-friendly explanations"
  },
  {
    title: "Real-world Case Studies",
    description: "Practical implementations and real-world applications of quantum computing across various industries.",
    icon: <FileText className="w-6 h-6" />,
    focus: "Practical implementations"
  },
  {
    title: "Role-based Learning",
    description: "Tailored learning paths designed for different professional roles and expertise levels.",
    icon: <Users className="w-6 h-6" />,
    focus: "Professional relevance"
  },
  {
    title: "Industry Relevance",
    description: "Sector-specific applications and use cases that demonstrate quantum computing's impact in your industry.",
    icon: <Building2 className="w-6 h-6" />,
    focus: "Sector-specific applications"
  },
  {
    title: "Algorithm Clarity",
    description: "Clear explanations of quantum algorithms and their practical applications in solving real problems.",
    icon: <CircuitBoard className="w-6 h-6" />,
    focus: "Problem-solution mapping"
  },
  {
    title: "Simplified Content",
    description: "Clear, focused information about quantum computing applications without overwhelming technical details.",
    icon: <ArrowRight className="w-6 h-6" />,
    focus: "Accessible information"
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex min-h-screen items-center justify-center bg-background text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="tracking-tight">
            Discover the Business Value of{' '}
            <span className="text-primary block mt-2">
              Quantum Computing
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            OpenQase provides structured learning paths and real-world case studies to help you understand how quantum computing solves business problems.
          </p>

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

      {/* Learning Paths Section */}
      <section className="py-24 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="tracking-tight">Choose Your Learning Path</h2>
            <p className="text-xl text-muted-foreground mt-4">
              Navigate quantum computing knowledge in the way that's most relevant to you, whether by role, industry, or technical approach.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Link href="/paths/persona" className="group block h-full">
              <Card className={cn("h-full card-link-hover-effect", "flex flex-col")}>
                <CardHeader className="flex-grow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Persona Path</CardTitle>
                  <CardDescription className="mb-4">
                    Content tailored to your professional role, from business executives to technical practitioners.
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
                  <CardTitle>Industry Path</CardTitle>
                  <CardDescription className="mb-4">
                    Explore quantum applications specific to your industry, including challenges, opportunities, and success metrics.
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
                  <CardTitle>Algorithm Path</CardTitle>
                  <CardDescription className="mb-4">
                    Discover different quantum algorithms and understand their applications across industries.
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
            <h2 className="mb-4">Why Support OpenQase?</h2>
            <p className="text-muted-foreground">
              A comprehensive platform for learning and implementing quantum computing solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

          <div className="grid gap-8 md:grid-cols-3">
            <Link href="/case-study/quantinuum-hsbc-financial-services-enhancement" className="group block h-full">
              <Card className={cn("h-full card-link-hover-effect", "flex flex-col overflow-hidden bg-card")}>
                <div className="aspect-[2/1] bg-primary/5 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#7c3aed11_0%,transparent_50%)] [mask-image:linear-gradient(to_bottom,white,transparent)] transition-opacity group-hover:opacity-75" />
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,#7c3aed11_50%,transparent_75%)] transition-opacity group-hover:opacity-75" />
                </div>
                <CardHeader>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline" className="bg-card/75 backdrop-blur-sm">Finance</Badge>
                    <Badge variant="outline" className="bg-card/75 backdrop-blur-sm">Cybersecurity</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">Quantinuum & HSBC: Financial Services Enhancement</CardTitle>
                  <CardDescription className="line-clamp-3">
                    How HSBC partnered with Quantinuum to explore quantum computing applications in cybersecurity, fraud detection, and natural language processing for banking.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/case-study/quantinuum-google-deepmind-circuit-optimisation" className="group block h-full">
              <Card className={cn("h-full card-link-hover-effect", "flex flex-col overflow-hidden bg-card")}>
                <div className="aspect-[2/1] bg-primary/5 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#7c3aed11_0%,transparent_50%)] [mask-image:linear-gradient(to_bottom,white,transparent)] transition-opacity group-hover:opacity-75" />
                  <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_25%,#7c3aed11_50%,transparent_75%)] transition-opacity group-hover:opacity-75" />
                </div>
                <CardHeader>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline" className="bg-card/75 backdrop-blur-sm">Technology</Badge>
                    <Badge variant="outline" className="bg-card/75 backdrop-blur-sm">AI Integration</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">Quantinuum & Google DeepMind: AI for Quantum Circuit Optimization</CardTitle>
                  <CardDescription className="line-clamp-3">
                    How Quantinuum and Google DeepMind developed AlphaTensor-Quantum to optimize quantum circuits, reducing T gate counts by up to 47% in cryptography applications.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/case-study/quantinuum-mitsui-trading-co" className="group block h-full">
              <Card className={cn("h-full card-link-hover-effect", "flex flex-col overflow-hidden bg-card")}>
                <div className="aspect-[2/1] bg-primary/5 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#7c3aed11_0%,transparent_50%)] [mask-image:linear-gradient(to_bottom,white,transparent)] transition-opacity group-hover:opacity-75" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,#7c3aed11_50%,transparent_75%)] transition-opacity group-hover:opacity-75" />
                </div>
                <CardHeader>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline" className="bg-card/75 backdrop-blur-sm">Trading</Badge>
                    <Badge variant="outline" className="bg-card/75 backdrop-blur-sm">Optimization</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">Quantinuum & Mitsui Co: Global Trading Optimization</CardTitle>
                  <CardDescription className="line-clamp-3">
                    How Mitsui & Co. partnered with Quantinuum to apply quantum computing to logistics optimization, commodity trading, and financial risk assessment.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}