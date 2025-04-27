import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '../../../lib/supabase-server';
import type { Database } from '@/types/supabase';
import { Badge } from '@/components/ui/badge';
import Link from "next/link";
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';

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
              <span className="mr-4">{new Date(blogPost.published_at).toLocaleDateString()}</span>
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
      </div>
    </div>
  );
}