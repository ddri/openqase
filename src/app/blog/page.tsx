import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { format } from 'date-fns';
import { getStaticContentList } from '@/lib/content-fetchers';
import { DbBlogPost } from '@/lib/types';

export default async function BlogPage() {
  const posts = await getStaticContentList<DbBlogPost>('blog_posts', {
    orderBy: 'published_at',
    orderDirection: 'desc'
  });
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Insights, tutorials, and updates from the quantum computing community.
        </p>
      </div>
      
      {/* Blog Posts */}
      {posts.length === 0 ? (
        <div className="max-w-3xl mx-auto text-center mb-16 p-8 border rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
            Our blog is currently under development. Check back soon for articles, tutorials, and case studies.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group">
              <Card className="h-full card-link-hover-effect">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>
                    {post.published_at && format(new Date(post.published_at), 'dd/MM/yyyy')}
                    {post.category && ` • ${post.category}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.description}
                  </p>
                  {post.author && (
                    <p className="text-sm mt-4">By {post.author}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
      
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
  );
}