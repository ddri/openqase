import { getContentBySlug } from "@/lib/mdx"
import { BlogPost } from "@/lib/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"
import Link from "next/link"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    // Await the params object before accessing its properties
    const { slug } = await params
    const post = await getContentBySlug<BlogPost>('blog', slug)

    // If the post doesn't exist or isn't published, return 404
    if (!post || !post.frontmatter.published) {
      return notFound()
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
            <div className="text-sm text-muted-foreground mb-2">
              {post.frontmatter.category} • {post.frontmatter.date}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
            <p className="text-xl text-muted-foreground">{post.frontmatter.description}</p>
          </header>

          {/* Blog post content */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote source={post.source} />
          </article>

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
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return notFound()
  }
} 