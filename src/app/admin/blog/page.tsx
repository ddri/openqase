import { BlogPostsList } from './client';
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';

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