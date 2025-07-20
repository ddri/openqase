import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import dynamic from 'next/dynamic';

// Dynamic import for heavy admin component
const BlogPostsList = dynamic(() => import('./client').then(mod => ({ default: mod.BlogPostsList })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      <span className="ml-2">Loading blog posts...</span>
    </div>
  )
});

export default async function BlogPostsPage() {
  // Create Supabase client
  const supabase = createServiceRoleSupabaseClient();
  
  // Fetch all blog posts
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });
  
  return (
    <div className="container mx-auto py-8">
      <BlogPostsList initialBlogPosts={blogPosts || []} />
    </div>
  );
}