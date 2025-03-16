// src/app/paths/algorithm/[slug]/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Steps, Step } from '@/components/ui/steps';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const components = {
  Steps,
  Step,
  h1: ({ className, ...props }: ComponentProps) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentProps) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentProps) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ComponentProps) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: ComponentProps) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: ComponentProps) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentProps) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentProps) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentProps) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentProps) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground',
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn('rounded-md border', className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: ComponentProps) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentProps) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps) => (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentProps) => (
    <code
      className={cn(
        'relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className
      )}
      {...props}
    />
  ),
  References: ({ className, ...props }: ComponentProps) => (
    <div className="mt-8 space-y-4 text-sm" {...props} />
  ),
  Reference: ({ className, id, ...props }: ComponentProps & { id: string }) => (
    <div id={id} className="reference-item" {...props} />
  ),
  a: ({ className, ...props }: ComponentProps) => (
    <a
      className={cn(
        'font-medium underline underline-offset-4',
        className
      )}
      {...props}
    />
  ),
  div: ({ className, children, id }: { className?: string; children: React.ReactNode; id?: string }) => {
    switch (className) {
      case 'references-section':
        return (
          <div className="mt-12 pt-8 border-t border-[var(--border)] bg-[var(--muted)] rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">References</h2>
            {children}
          </div>
        );
      case 'reference-item':
        return (
          <div id={id} className="mb-4 pl-8 -indent-8 text-[var(--text-secondary)]">
            {children}
          </div>
        );
      default:
        return <div className={className}>{children}</div>;
    }
  }
};

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), 'content', 'algorithm');
  const files = await fs.readdir(contentDirectory);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace('.mdx', ''),
    }));
}

async function getAlgorithm(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'algorithm', `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      frontmatter: data,
      content,
    };
  } catch (error) {
    return null;
  }
}

export default async function AlgorithmPage({
  params,
}: {
  params: { slug: string }
}) {
  const algorithm = await getAlgorithm(params.slug)

  if (!algorithm) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        <div className="mb-8">
          <Link
            href="/paths/algorithm"
            className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Algorithms</span>
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">{algorithm.frontmatter.title}</h1>
          <div className="mt-2">
            <Badge variant="outline">Complexity: {algorithm.frontmatter.complexity}</Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <MDXRemote source={algorithm.content} components={components} />
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Prerequisites</h3>
                <div className="space-y-2">
                  {algorithm.frontmatter.prerequisites.map((prerequisite: string) => (
                    <div
                      key={prerequisite}
                      className="rounded-lg border p-4 hover:bg-muted/50"
                    >
                      <p className="text-sm">{prerequisite}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold">Applications</h3>
                <div className="space-y-2">
                  {algorithm.frontmatter.applications.map((application: string) => (
                    <div
                      key={application}
                      className="rounded-lg border p-4 hover:bg-muted/50"
                    >
                      <p className="text-sm">{application}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}