// src/app/case-study/[slug]/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Custom components for MDX rendering
const components = {
  // Add any custom components here
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mb-6" {...props} />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="mb-4" {...props} />
  ),
};

// Generate static params for all case studies
export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), 'content', 'case-study');
  const files = await fs.readdir(contentDirectory);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace('.mdx', ''),
    }));
}

// Custom function to get case study content directly
async function getCaseStudy(slug: string) {
  try {
    console.log(`Fetching case study: ${slug}`);
    const filePath = path.join(process.cwd(), 'content', 'case-study', `${slug}.mdx`);
    console.log(`File path: ${filePath}`);
    
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    console.log(`Successfully processed frontmatter for ${slug}`);
    console.log(`Frontmatter keys: ${Object.keys(data).join(', ')}`);
    
    return {
      frontmatter: data,
      content,
    };
  } catch (error) {
    console.error(`Error fetching case study ${slug}:`, error);
    return null;
  }
}

// Updated the page component to handle params as a Promise
export default async function CaseStudyPage(props: { params: Promise<{ slug: string }> }) {
  // Await the params object before using it
  const resolvedParams = await props.params;
  console.log("Received params:", resolvedParams);
  
  const slug = resolvedParams.slug;
  const caseStudy = await getCaseStudy(slug);
  
  if (!caseStudy) {
    console.log(`Case study not found: ${slug}`);
    notFound();
  }
  
  const { frontmatter, content } = caseStudy;
  
  return (
    <main className="container mx-auto p-8">
      <Link 
        href="/case-study"
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
            
            {/* Pass raw content directly to MDXRemote */}
            <MDXRemote 
              source={content} 
              components={components}
            />
          </article>
        </div>

        {/* Sidebar */}
        <div className="col-span-4">
          <div className="sticky top-8">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Case Study Details</h3>
              
              <div className="space-y-4">
                {frontmatter.difficulty && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Difficulty</h4>
                    <Badge>{frontmatter.difficulty}</Badge>
                  </div>
                )}

                {frontmatter.technologies?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {frontmatter.technologies.map((tech: string) => (
                        <Badge key={tech} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {frontmatter.persona?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Related Content</h4>
                    <div className="mt-2 space-y-2">
                      {frontmatter.persona.map((p: string) => (
                        <Link
                          key={p}
                          href={`/paths/persona/${p}`}
                          className="block text-sm hover:text-primary"
                        >
                          {p}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {frontmatter.metrics && Object.keys(frontmatter.metrics).length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Key Metrics</h4>
                    <div className="mt-2 space-y-1">
                      {Object.entries(frontmatter.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{String(value)}</span>
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