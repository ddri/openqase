import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createServerClient } from '@/lib/supabase-server'
import type { Database } from '@/types/supabase'
import { notFound } from 'next/navigation'

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  category?: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

// Fetch blog posts from database
async function getBlogPosts() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select()
    .match({ published: true })
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data as BlogPost[]
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Insights, tutorials, and updates from the quantum computing community.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="flex gap-4 items-center">
          <Input 
            placeholder="Search articles..." 
            className="max-w-sm"
          />
          <select className="border rounded-md px-3 py-2 bg-background">
            <option value="">All Categories</option>
            <option value="tutorial">Tutorials</option>
            <option value="news">News</option>
            <option value="case-study">Case Studies</option>
            <option value="community">Community</option>
          </select>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-md transition-all">
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                  {post.category} • {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
                </div>
                <CardTitle className="mb-2">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <Card>
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>
              Subscribe to our newsletter for the latest quantum computing insights and updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-grow"
              />
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors">
                Subscribe
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 