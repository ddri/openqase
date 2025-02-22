// src/app/paths/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

async function getContentCounts() {
  const counts = {
    personas: 0,
    industries: 0,
    algorithms: 0,
  };

  try {
    const personasDir = path.join(process.cwd(), 'content', 'personas');
    const industriesDir = path.join(process.cwd(), 'content', 'industries');
    const algorithmsDir = path.join(process.cwd(), 'content', 'algorithms');

    const [personaFiles, industryFiles, algorithmFiles] = await Promise.all([
      fs.readdir(personasDir),
      fs.readdir(industriesDir),
      fs.readdir(algorithmsDir),
    ]);

    counts.personas = personaFiles.filter(f => f.endsWith('.mdx')).length;
    counts.industries = industryFiles.filter(f => f.endsWith('.mdx')).length;
    counts.algorithms = algorithmFiles.filter(f => f.endsWith('.mdx')).length;
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
      href: "/paths/personas",
      count: counts.personas,
      examples: ["Software Engineer", "Financial Analyst", "Research Scientist"],
      color: "blue"
    },
    {
      title: "By Industry",
      description: "Explore quantum computing applications in your industry",
      href: "/paths/industries",
      count: counts.industries,
      examples: ["Finance", "Healthcare", "Smart Cities"],
      color: "green"
    },
    {
      title: "By Algorithm",
      description: "Learn specific quantum algorithms and their applications",
      href: "/paths/algorithms",
      count: counts.algorithms,
      examples: ["Grover's", "QAOA", "VQE"],
      color: "purple"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-100 mb-6">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore quantum computing through different perspectives, tailored to your interests and needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paths.map((path) => (
            <Link key={path.title} href={path.href}>
              <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`bg-${path.color}-900 text-${path.color}-200`}>
                      {counts[path.title.toLowerCase().split(' ')[1] as keyof typeof counts]} Paths
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-gray-100 mb-4">
                    {path.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mb-6">
                    {path.description}
                  </CardDescription>
                  <div className="text-sm text-gray-500">
                    Examples:
                    <div className="flex flex-wrap gap-2 mt-2">
                      {path.examples.map((example) => (
                        <Badge key={example} variant="outline">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gray-900 border border-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-gray-400 mb-6">
            We recommend starting with the Persona-based learning path to get content tailored to your role and experience level.
          </p>
          <Link 
            href="/paths/personas" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Explore Personas
          </Link>
        </div>
      </div>
    </main>
  );
}