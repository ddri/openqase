'use client'

import { createClient } from '../../../../utils/supabase/client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { Database } from '@/types/supabase';

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

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

export default function BlogPostsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogPosts() {
      const supabase = createClient();
      
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });
      
      setBlogPosts(data || [])
      setLoading(false)
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2">Loading...</span>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-8">
      <BlogPostsList initialBlogPosts={blogPosts} />
    </div>
  );
}