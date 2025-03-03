// src/app/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto p-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-text-primary mb-6">
          Welcome to openQase
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Your comprehensive platform for learning quantum computing through practical case studies, 
          tailored learning paths, and real-world applications.
        </p>
      </div>

      {/* Main Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="hover:bg-accent/5 transition-colors">
          <CardHeader>
            <Badge className="w-fit mb-2">Learning Paths</Badge>
            <CardTitle className="text-xl mb-2">Personalized Learning Experience</CardTitle>
            <CardDescription>
              Choose your path based on your role, industry, or specific algorithms. 
              Whether you're a researcher, developer, or business professional, we have 
              content tailored for your needs.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:bg-accent/5 transition-colors">
          <CardHeader>
            <Badge className="w-fit mb-2">Case Studies</Badge>
            <CardTitle className="text-xl mb-2">Real-World Applications</CardTitle>
            <CardDescription>
              Explore how organizations are implementing quantum computing solutions across 
              various industries, from finance to healthcare and beyond.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Secondary Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="hover:bg-accent/5 transition-colors">
          <CardHeader>
            <Badge className="w-fit mb-2">Quantum Stack</Badge>
            <CardTitle className="text-xl mb-2">Technical Infrastructure</CardTitle>
            <CardDescription>
              Understand the complete quantum computing stack, from quantum hardware to 
              application layers. Learn how different components work together in quantum systems.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:bg-accent/5 transition-colors">
          <CardHeader>
            <Badge className="w-fit mb-2">Algorithm Library</Badge>
            <CardTitle className="text-xl mb-2">Quantum Algorithms</CardTitle>
            <CardDescription>
              Access a comprehensive library of quantum algorithms, complete with 
              explanations, implementations, and use cases. From basic to advanced algorithms.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Ready to Start Your Quantum Journey?
        </h2>
        <p className="text-text-secondary mb-8">
          Begin with our personalized learning paths to get content tailored to your background and goals.
        </p>
        <Link 
          href="/paths"
          className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg transition-colors"
        >
          Explore Learning Paths
        </Link>
      </div>
    </main>
  );
}