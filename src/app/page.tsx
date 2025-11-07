// src/app/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ContentCard from '@/components/ui/content-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  User, 
  Building2, 
  CircuitBoard, 
  ArrowRight, 
  Github,
  Users,
  BookOpen,
  Database,
  ExternalLink
} from 'lucide-react';
import { AutoSchema } from '@/components/AutoSchema';
import SearchCard from '@/components/SearchCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { getBuildTimeContentList, fetchSearchData, getStaticContentList } from '@/lib/content-fetchers';
import type { BlogPost } from '@/lib/types';
import { InteractiveKnowledgeMap } from '@/components/ui/interactive-knowledge-map';
import { draftMode } from 'next/headers';

// Force this page to be statically generated at build time
export const dynamic = 'force-static'

interface CategoryStats {
  title: string;
  count: number;
  description: string;
  icon: React.ReactNode;
  href: string;
}


export default async function HomePage() {
  // Check if we're in preview mode
  const { isEnabled: isPreview } = await draftMode();
  
  // Fetch optimized search data (streamlined payload for performance)
  const searchData = await fetchSearchData();

  // Get actual content counts from database
  // In preview mode, show all content including drafts
  const publishedFilter = isPreview ? {} : { published: true };
  const featuredFilter = isPreview ? { featured: true } : { published: true, featured: true };
  
  const [caseStudies, algorithms, industries, personas, blogPostsData, featuredCaseStudiesData] = await Promise.all([
    getBuildTimeContentList('case_studies', { filters: publishedFilter }),
    getBuildTimeContentList('algorithms', { filters: publishedFilter }), 
    getBuildTimeContentList('industries', { filters: publishedFilter }),
    getBuildTimeContentList('personas', { filters: publishedFilter }),
    getBuildTimeContentList('blog_posts', { filters: publishedFilter, limit: 2 }),
    getBuildTimeContentList('case_studies', { filters: featuredFilter, limit: 2 })
  ]);

  // Type the blog posts and featured case studies properly
  const blogPosts = blogPostsData as BlogPost[];
  const featuredCaseStudies = featuredCaseStudiesData as any[];

  // Create dynamic category stats with real counts
  const categoryStats: CategoryStats[] = [
    {
      title: "Case Studies",
      count: caseStudies.length,
      description: "Real quantum implementations from leading companies",
      icon: <BookOpen className="w-5 h-5" />,
      href: "/case-study"
    },
    {
      title: "Algorithms", 
      count: algorithms.length,
      description: "Quantum algorithms with business applications",
      icon: <CircuitBoard className="w-5 h-5" />,
      href: "/paths/algorithm"
    },
    {
      title: "Industries",
      count: industries.length,
      description: "Sectors applying quantum computing",
      icon: <Building2 className="w-5 h-5" />,
      href: "/paths/industry"
    },
    {
      title: "Professional Roles",
      count: personas.length,
      description: "Perspectives by career function",
      icon: <User className="w-5 h-5" />,
      href: "/paths/persona"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Automatic schema markup for SEO */}
      <AutoSchema type="organization" />
      <AutoSchema type="website" />
      <AutoSchema type="faq" />
      
      {/* Modern Magazine-Style Hero Section */}
      <section className="relative bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
              Real-World Quantum Computing Implementations
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
              From BMW to Goldman Sachs — See how industry leaders deploy quantum computing 
              to solve real business challenges. Open-source case studies with technical details and outcomes.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Search & Stats */}
            <div className="lg:col-span-2 space-y-8">
              {/* Search Bar */}
              <SearchCard searchData={searchData} />

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {categoryStats.map((category) => (
                  <Link 
                    key={category.title}
                    href={category.href}
                    className="bg-card border border-border p-3 sm:p-4 elevation-interactive hover:border-primary group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      {category.icon}
                      <span className="font-semibold text-primary text-xl sm:text-2xl">{category.count}</span>
                    </div>
                    <h3 className="font-medium text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                      {category.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column - Newsletter CTA */}
            <div>
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>

      {/* Modern Knowledge Organization */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How We Organize Knowledge</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Every case study is systematically cross-referenced by algorithm, industry, and professional perspective to create a comprehensive knowledge base.
            </p>
          </div>

          {/* Modern Grid Layout */}
          <div className="space-y-6">
            {/* Case Studies - Full Width Row */}
            <Link href="/case-study" className="block group">
              <div className="bg-card border border-border p-8 elevation-interactive hover:border-primary">
                <BookOpen className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Case Studies</h3>
                <p className="text-muted-foreground mb-4">Real quantum computing implementations from industry leaders, documented with technical details and business outcomes.</p>
                <div className="flex items-center text-primary font-medium group-hover:underline">
                  Browse all {caseStudies.length} case studies →
                </div>
              </div>
            </Link>

            {/* Three Child Boxes Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Algorithms */}
              <Link href="/paths/algorithm" className="group">
                <div className="bg-card rounded-lg border border-border p-6 h-full elevation-interactive hover:border-primary">
                  <CircuitBoard className="w-6 h-6 text-primary mb-3" />
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Algorithms</h3>
                    <span className="text-2xl font-bold text-primary">{algorithms.length}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Quantum algorithms with proven business applications</p>
                </div>
              </Link>

              {/* Industries */}
              <Link href="/paths/industry" className="group">
                <div className="bg-card rounded-lg border border-border p-6 h-full elevation-interactive hover:border-primary">
                  <Building2 className="w-6 h-6 text-primary mb-3" />
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Industries</h3>
                    <span className="text-2xl font-bold text-primary">{industries.length}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Sectors actively implementing quantum solutions</p>
                </div>
              </Link>

              {/* Professional Perspectives */}
              <Link href="/paths/persona" className="group">
                <div className="bg-card rounded-lg border border-border p-6 h-full elevation-interactive hover:border-primary">
                  <User className="w-6 h-6 text-primary mb-3" />
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Professional Roles</h3>
                    <span className="text-2xl font-bold text-primary">{personas.length}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Case studies organized by career function and role</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Content - Case Studies & Blog Posts */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Latest Content</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Recent case studies and insights from the quantum computing community
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Latest Case Studies Column */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-foreground">Featured Case Studies</h3>
                <Link href="/case-study" className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                  View all
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              
              <div className="space-y-6">
                {featuredCaseStudies.length > 0 ? (
                  featuredCaseStudies.map((caseStudy, index) => (
                    <Link key={caseStudy.id} href={`/case-study/${caseStudy.slug}`} className="block group">
                      <div className="bg-card rounded-lg border border-border p-6 elevation-interactive hover:border-primary">
                        {/* Legacy company tags removed - entities now managed separately */}
                        <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {caseStudy.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {caseStudy.description || 'Read more about this quantum computing case study.'}
                        </p>
                        <div className="flex items-center text-primary text-sm font-medium group-hover:underline">
                          Read case study →
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  /* Fallback content when no featured case studies exist */
                  <>
                    <div className="bg-card border border-border p-6">
                      <div className="flex gap-2 mb-3">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium">Coming Soon</span>
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-2">
                        Featured Case Studies
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Premium case studies will be featured here. Contact us to promote your quantum computing success story.
                      </p>
                      <Link href="/contact" className="text-primary text-sm font-medium hover:underline">
                        Promote your case study →
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Latest Blog Posts Column */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-foreground">Latest Blog Posts</h3>
                <Link href="/blog" className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                  View all
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              
              <div className="space-y-6">
                {blogPosts.length > 0 ? (
                  blogPosts.map((blogPost, index) => (
                    <Link key={blogPost.id} href={`/blog/${blogPost.slug}`} className="block group">
                      <div className="bg-card rounded-lg border border-border p-6 elevation-interactive hover:border-primary">
                        {blogPost.tags && Array.isArray(blogPost.tags) && blogPost.tags.length > 0 && (
                          <div className="flex gap-2 mb-3">
                            {blogPost.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium capitalize">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {blogPost.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {blogPost.description || 'Read more about this quantum computing topic.'}
                        </p>
                        <div className="flex items-center text-primary text-sm font-medium group-hover:underline">
                          Read article →
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  /* Fallback content when no blog posts exist */
                  <>
                    <div className="bg-card border border-border p-6">
                      <div className="flex gap-2 mb-3">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium">Coming Soon</span>
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-2">
                        Blog Posts Coming Soon
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        We're working on adding insightful blog posts about quantum computing industry trends and enterprise readiness guides.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source & Community */}
      <section className="py-20 px-4 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Open Source & Community Driven</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              OpenQase is built by and for the quantum computing community. All content is freely available and contributions are welcome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border border-border p-6 elevation-interactive hover:border-primary">
              <Github className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Open Source</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All code and content freely available on GitHub under open source license
              </p>
              <Link href="https://github.com/ddri/openqase" className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm font-medium">
                <ExternalLink className="w-4 h-4 mr-1" />
                View on GitHub →
              </Link>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 elevation-interactive hover:border-primary">
              <Users className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Community Contributions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Submit new case studies, corrections, or improvements to help the community learn
              </p>
              <Link href="/contact" className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm font-medium">
                Contribute content →
              </Link>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 elevation-interactive hover:border-primary">
              <Database className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Free Access</h3>
              <p className="text-sm text-muted-foreground mb-4">
                No paywalls, no subscriptions. All quantum case studies available to everyone
              </p>
              <Link href="/about" className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm font-medium">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}