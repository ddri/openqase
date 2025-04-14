import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import type { Database } from '@/types/supabase';
import { Badge } from '@/components/ui/badge';
import Link from "next/link"

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const supabase = createServerClient();
  
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back to blog link */}
        <Link href="/blog" className="text-accent hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        {/* Blog post header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-muted-foreground">
            <time dateTime={post.published_at}>{new Date(post.published_at).toLocaleDateString()}</time>
            <Badge variant="outline">{post.category}</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground">{post.description}</p>
        </header>

        {/* Blog post content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>

        {/* Newsletter signup */}
        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-4">
            Subscribe to our newsletter for the latest quantum computing insights and updates.
          </p>
          <form className="flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 border rounded-md bg-background"
            />
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 