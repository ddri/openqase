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
import GlobalSearch from '@/components/GlobalSearch';
import { getBuildTimeContentList, fetchSearchData } from '@/lib/content-fetchers';
import { AnimatedBackground, SectionDivider } from '@/components/ui/animated-background';
import { InteractiveKnowledgeMap } from '@/components/ui/interactive-knowledge-map';

interface CategoryStats {
  title: string;
  count: number;
  description: string;
  icon: React.ReactNode;
  href: string;
}


export default async function HomePage() {
  // Fetch optimized search data (streamlined payload for performance)
  const searchData = await fetchSearchData();

  // Get actual content counts from database (published only)
  const [caseStudies, algorithms, industries, personas] = await Promise.all([
    getBuildTimeContentList('case_studies', { filters: { published: true } }),
    getBuildTimeContentList('algorithms', { filters: { published: true } }), 
    getBuildTimeContentList('industries', { filters: { published: true } }),
    getBuildTimeContentList('personas', { filters: { published: true } })
  ]);

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
      {/* Automatic FAQ schema for landing page */}
      <AutoSchema type="faq" />
      
      {/* Modern Magazine-Style Hero Section */}
      <section className="relative bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-black font-bold text-xl">Q</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                OpenQase
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Real Quantum Computing Case Studies — A free, open-source collection of quantum implementations from industry leaders
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Search & Stats */}
            <div className="lg:col-span-2 space-y-8">
              {/* Search Bar */}
              <div className="bg-card border border-border p-6">
                <h2 className="text-xl font-semibold mb-4 text-foreground">Search Case Studies</h2>
                <GlobalSearch searchData={searchData} className="w-full" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categoryStats.map((category) => (
                  <Link 
                    key={category.title}
                    href={category.href}
                    className="bg-card border border-border p-4 hover:border-primary transition-colors group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {category.icon}
                      <span className="font-semibold text-primary text-2xl">{category.count}</span>
                    </div>
                    <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column - Featured */}
            <div className="space-y-6">
              <div className="bg-card border border-border p-6">
                <h2 className="text-xl font-semibold mb-4 text-foreground">Latest Addition</h2>
                <div className="space-y-3">
                  <div className="w-full h-32 bg-muted border"></div>
                  <h3 className="font-semibold text-foreground">Quantinuum & HSBC</h3>
                  <p className="text-sm text-muted-foreground">Financial services enhancement through quantum computing applications in cybersecurity and fraud detection.</p>
                  <Link href="/case-study/quantinuum-hsbc-financial-services-enhancement" className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                    Read case study →
                  </Link>
                </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 p-6">
                <h3 className="font-semibold text-foreground mb-2">Open Source</h3>
                <p className="text-sm text-muted-foreground mb-4">All content and code freely available under open source license.</p>
                <Link href="/about" className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Knowledge Organization */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How We Organize Knowledge</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Every case study is systematically cross-referenced by algorithm, industry, and professional perspective to create a comprehensive knowledge base.
            </p>
          </div>

          {/* Modern Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Case Studies Hub */}
            <Link href="/case-study" className="md:col-span-2 lg:col-span-2 group">
              <div className="bg-card border border-border p-8 h-full hover:border-primary transition-colors">
                <BookOpen className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Case Studies</h3>
                <p className="text-muted-foreground mb-4">Real quantum computing implementations from industry leaders, documented with technical details and business outcomes.</p>
                <div className="flex items-center text-primary font-medium group-hover:underline">
                  Browse all {caseStudies.length} case studies →
                </div>
              </div>
            </Link>

            {/* Algorithms */}
            <Link href="/paths/algorithm" className="group">
              <div className="bg-card border border-border p-6 h-full hover:border-primary transition-colors">
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
              <div className="bg-card border border-border p-6 h-full hover:border-primary transition-colors">
                <Building2 className="w-6 h-6 text-primary mb-3" />
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Industries</h3>
                  <span className="text-2xl font-bold text-primary">{industries.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Sectors actively implementing quantum solutions</p>
              </div>
            </Link>

            {/* Professional Roles - Full Width */}
            <Link href="/paths/persona" className="md:col-span-2 lg:col-span-2 group">
              <div className="bg-card border border-border p-6 hover:border-primary transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <User className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Professional Perspectives</h3>
                      <p className="text-sm text-muted-foreground">Case studies organized by career function and role</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-primary">{personas.length}</span>
                </div>
              </div>
            </Link>

            {/* Research Focus */}
            <div className="md:col-span-2 lg:col-span-2 bg-primary/5 border border-primary/20 p-6">
              <h3 className="font-semibold text-foreground mb-2">Research Focus</h3>
              <p className="text-sm text-muted-foreground mb-4">OpenQase focuses on practical quantum computing applications with measurable business impact, not theoretical research.</p>
              <div className="flex gap-4 text-xs text-primary font-medium">
                <span>• Business Applications</span>
                <span>• Technical Implementation</span>
                <span>• Real Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Latest Case Studies</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Recent additions to our database of real quantum computing implementations
              </p>
            </div>
            <Link href="/case-study" className="inline-flex items-center text-primary hover:underline font-medium">
              View all case studies
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Case Study - Large */}
            <div className="lg:col-span-2">
              <Link href="/case-study/quantinuum-hsbc-financial-services-enhancement" className="block group">
                <div className="bg-card border border-border overflow-hidden hover:border-primary transition-colors">
                  <div className="w-full h-48 bg-muted border-b"></div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium">Finance</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium">Security</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      Quantinuum & HSBC: Financial Services Enhancement
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      How HSBC partnered with Quantinuum to explore quantum computing applications in cybersecurity, fraud detection, and natural language processing for banking operations.
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:underline">
                      Read case study →
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Two smaller case studies */}
            <div className="space-y-8">
              <Link href="/case-study/quantinuum-google-deepmind-circuit-optimisation" className="block group">
                <div className="bg-card border border-border overflow-hidden hover:border-primary transition-colors">
                  <div className="w-full h-32 bg-muted border-b"></div>
                  <div className="p-4">
                    <div className="flex gap-1 mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium">AI/ML</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Quantinuum & Google DeepMind
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      AI-powered quantum circuit optimization reducing gate counts by up to 47%.
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium group-hover:underline">
                      Read more →
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/case-study/quantinuum-mitsui-trading-co" className="block group">
                <div className="bg-card border border-border overflow-hidden hover:border-primary transition-colors">
                  <div className="w-full h-32 bg-muted border-b"></div>
                  <div className="p-4">
                    <div className="flex gap-1 mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium">Trading</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Quantinuum & Mitsui Co
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Global trading optimization through quantum computing applications.
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium group-hover:underline">
                      Read more →
                    </div>
                  </div>
                </div>
              </Link>
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
            <div className="bg-card border border-border p-6">
              <Github className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Open Source</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All code and content freely available on GitHub under open source license
              </p>
              <Link href="https://github.com/openqase" className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                <ExternalLink className="w-4 h-4 mr-1" />
                View on GitHub →
              </Link>
            </div>

            <div className="bg-card border border-border p-6">
              <Users className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Community Contributions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Submit new case studies, corrections, or improvements to help the community learn
              </p>
              <Link href="/contact" className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                Contribute content →
              </Link>
            </div>

            <div className="bg-card border border-border p-6">
              <Database className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Free Access</h3>
              <p className="text-sm text-muted-foreground mb-4">
                No paywalls, no subscriptions. All quantum case studies available to everyone
              </p>
              <Link href="/about" className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}