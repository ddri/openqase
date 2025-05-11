import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '../../../lib/supabase-server';
import type { Database } from '@/types/supabase';
import { Badge } from '@/components/ui/badge';
import Link from "next/link";
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  author?: string;
  category?: string;
  tags?: string[];
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createServerSupabaseClient();
  
  const { data: blogPost } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .eq('published', true)
    .single();
    
  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${blogPost.title} - OpenQASE Blog`,
    description: blogPost.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const supabase = await createServerSupabaseClient();
  
  const { data: blogPost, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .eq('published', true)
    .single();
    
  if (!blogPost || error) {
    notFound();
  }

  // Fetch related blog posts
  let relatedPosts: BlogPost[] = [];
  if (blogPost.id) {
    // Get related_blog_post_id values from blog_post_relations
    const { data: relations } = await supabase
      .from('blog_post_relations')
      .select('related_blog_post_id')
      .eq('blog_post_id', blogPost.id)
      .eq('relation_type', 'related');
    if (relations && relations.length > 0) {
      const relatedIds = relations.map((rel: any) => rel.related_blog_post_id);
      if (relatedIds.length > 0) {
        const { data: relatedData } = await supabase
          .from('blog_posts')
          .select('*')
          .in('id', relatedIds)
          .eq('published', true);
        if (relatedData) {
          // Ensure description is always a string
          relatedPosts = relatedData.map((post: any) => ({
            ...post,
            description: post.description ?? '',
          }));
        }
      }
    }
  }

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
          {blogPost.content && (
            <ReactMarkdown>{blogPost.content}</ReactMarkdown>
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