import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { getAllContent } from "@/lib/mdx"
import { BlogPost } from "@/lib/types"

// Fetch blog posts from MDX files
async function getBlogPosts() {
  try {
    const posts = await getAllContent<BlogPost>('blog');
    return posts.filter(post => post.frontmatter.published);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

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
            <Card className="h-full hover:bg-accent/5 transition-colors">
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                  {post.frontmatter.category} • {post.frontmatter.date}
                </div>
                <CardTitle className="text-xl mb-2">{post.frontmatter.title}</CardTitle>
                <CardDescription>{post.frontmatter.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-accent hover:underline">
                  Read more →
                </div>
              </CardContent>
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