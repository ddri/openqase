import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Link from "next/link";
import { Metadata } from 'next';
import { format } from 'date-fns';
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import { EnrichedBlogPost } from '@/lib/types';
import { processMarkdown } from '@/lib/markdown-server';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return generateStaticParamsForContentType('blog_posts');
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  const blogPost = await getStaticContentWithRelationships<EnrichedBlogPost>('blog_posts', resolvedParams.slug);
    
  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${blogPost.title} - OpenQASE Blog`,
    description: blogPost.description || 'Blog post from OpenQASE',
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  
  const blogPost = await getStaticContentWithRelationships<EnrichedBlogPost>('blog_posts', resolvedParams.slug);
    
  if (!blogPost) {
    notFound();
  }

  // Process content with server-side markdown
  const processedContent = blogPost.content ? await processMarkdown(blogPost.content) : '';

  // Extract related blog posts from the relationships
  const relatedPosts = blogPost.blog_post_relations?.map(relation => relation.related_blog_posts) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/blog" className="text-muted-foreground hover:text-primary">
            ← Back to Blog
          </Link>
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
          
          <div className="flex items-center text-muted-foreground mb-4">
            {blogPost.published_at && (
              <span className="mr-4">{format(new Date(blogPost.published_at), 'dd/MM/yyyy')}</span>
            )}
            {blogPost.author && (
              <span>By {blogPost.author}</span>
            )}
          </div>
          
          {blogPost.category && (
            <Badge variant="outline" className="mr-2">
              {blogPost.category}
            </Badge>
          )}
          
          {blogPost.tags && blogPost.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="mr-2">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {processedContent && (
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
          )}
        </div>
        
        {/* Related Blog Posts Section */}
        {relatedPosts.length > 0 && (
          <>
            <hr className="my-8 border-border" />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Related Blog Posts</h2>
              <div className="grid grid-cols-1 gap-6">
                {relatedPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                    <div className="p-6 rounded-lg border border-border bg-card/50 transition-all duration-200 hover:bg-accent/5 hover:border-border-hover">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}