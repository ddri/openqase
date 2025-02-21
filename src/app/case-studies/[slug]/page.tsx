// src/app/case-studies/[slug]/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface CaseStudyFrontmatter {
  title: string;
  description: string;
  difficulty: string;
  technologies: string[];
  personas: string[];
  metrics?: Record<string, string | number>;
}

// Generate static params for all case studies
export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), 'content', 'case-studies');
  const files = await fs.readdir(contentDirectory);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace('.mdx', ''),
    }));
}

async function getCaseStudy(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'case-studies', `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      frontmatter: data as CaseStudyFrontmatter,
      content: content as string,
    };
  } catch (error) {
    return null;
  }
}

const components = {
  // Add any custom components here
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mb-6" {...props} />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="mb-4" {...props} />
  ),
};

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const { frontmatter, content } = caseStudy;

  return (
    <main className="container mx-auto p-8">
      <Link 
        href="/case-studies"
        className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block"
      >
        ← Back to Case Studies
      </Link>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-8">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1>{frontmatter.title}</h1>
            <p className="text-xl text-muted-foreground">{frontmatter.description}</p>
            
            <MDXRemote 
              source={content} 
              components={components}
              options={{
                parseFrontmatter: false,
                mdxOptions: {
                  development: process.env.NODE_ENV === 'development'
                }
              }}
            />
          </article>
        </div>

        {/* Sidebar */}
        <div className="col-span-4">
          <div className="sticky top-8">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Case Study Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Difficulty</h4>
                  <Badge>{frontmatter.difficulty}</Badge>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {frontmatter.technologies.map((tech: string) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Related Content</h4>
                  <div className="mt-2 space-y-2">
                    {frontmatter.personas.map((persona: string) => (
                      <Link 
                        key={persona}
                        href={`/paths/persona/${persona}`}
                        className="block text-sm hover:text-primary"
                      >
                        {persona}
                      </Link>
                    ))}
                  </div>
                </div>

                {frontmatter.metrics && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Key Metrics</h4>
                    <div className="mt-2 space-y-1">
                      {Object.entries(frontmatter.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}