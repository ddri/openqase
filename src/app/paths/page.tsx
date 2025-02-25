// src/app/paths/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

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
      description: "Choose your learning path based on your role and experience level",
      href: "/paths/persona",
      count: counts.persona,
      examples: ["Software Engineer", "Financial Analyst", "Research Scientist", "Another", "Something Else"],
      badgeClass: "bg-accent/10 text-accent"
    },
    {
      title: "By Industry",
      description: "Explore quantum computing applications in your industry",
      href: "/paths/industry",
      count: counts.industry,
      examples: ["Finance", "Healthcare", "Smart Cities"],
      badgeClass: "bg-accent/10 text-accent"
    },
    {
      title: "By Algorithm",
      description: "Learn specific quantum algorithms and their applications",
      href: "/paths/algorithm",
      count: counts.algorithm,
      examples: ["Grover's", "QAOA", "VQE"],
      badgeClass: "bg-accent/10 text-accent"
    }
  ];

  return (
    <main className="container mx-auto p-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-text-primary mb-6">
          Choose Your Learning Path
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Explore quantum computing through different perspectives, tailored to your interests and needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {paths.map((path) => (
          <Link key={path.title} href={path.href}>
            <Card className="hover:bg-accent/5 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={path.badgeClass}>
                    {counts[path.title.toLowerCase().split(' ')[1] as keyof typeof counts]} Paths
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                <CardDescription>{path.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {path.examples.map((example) => (
                    <Badge key={example} variant="outline">
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>


      <div className="mt-16 p-8 bg-card border border-card-border rounded-lg">
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Not Sure Where to Start?
        </h2>
        <p className="text-text-secondary mb-6">
          We recommend starting with the Persona-based learning path to get content tailored to your role and experience level.
        </p>
        <Link 
          href="/paths/persona"
          className="inline-block bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-lg transition-colors"
        >
          Explore Persona
        </Link>
      </div>
</main>
);
}