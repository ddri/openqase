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
import { KnowledgeConnectors } from '@/components/ui/knowledge-connectors';

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
      
      {/* Resource-Focused Hero Section */}
      <AnimatedBackground variant="particles" className="relative">
        <section className="relative py-24 px-4 min-h-[600px] flex items-center">
          {/* Dynamic floating orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="floating-orb w-64 h-64 bg-gradient-to-br from-[hsl(var(--purple-vivid))]/30 to-primary/20 glow-pulse"
              style={{ 
                left: '5%',
                top: '20%',
                animation: 'float-up 25s infinite ease-in-out',
              }}
            />
            <div 
              className="floating-orb w-96 h-96 bg-gradient-to-tr from-[hsl(var(--yellow-sharp))]/20 to-transparent"
              style={{ 
                right: '10%',
                top: '60%',
                animation: 'float-diagonal 30s infinite ease-in-out',
                animationDelay: '10s'
              }}
            />
            <div 
              className="floating-orb w-48 h-48 bg-gradient-to-bl from-primary/25 to-[hsl(var(--blue-vivid))]/15"
              style={{ 
                left: '70%',
                top: '10%',
                animation: 'float-up 20s infinite ease-in-out',
                animationDelay: '5s'
              }}
            />
          </div>
          <div className="max-w-6xl mx-auto w-full relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-vivid via-primary to-yellow-sharp animate-gradient-shift">
                  OpenQase
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-2">
                Open Source Quantum Computing Case Studies
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A free, community-driven collection of real quantum computing implementations from industry leaders
              </p>
            </div>

            {/* Search Bar with glass effect */}
            <div className="mb-12">
              <div className="glass-premium rounded-xl p-1 max-w-2xl mx-auto">
                <GlobalSearch searchData={searchData} className="w-full" />
              </div>
            </div>

            {/* Quick Browse Categories */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="text-sm text-muted-foreground">Browse by:</span>
              {categoryStats.map((category) => (
                <Link 
                  key={category.title}
                  href={category.href}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 hover:border-[hsl(var(--yellow-sharp))]/50 border border-transparent rounded-full text-sm transition-all duration-200"
                >
                  {category.icon}
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </AnimatedBackground>
      
      <SectionDivider variant="wave" />

      {/* Knowledge Map - Visual Cross-Reference */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-surface-secondary relative overflow-hidden">
        {/* Subtle animated mesh background */}
        <div className="absolute inset-0 mesh-animated opacity-50">
          <div className="absolute inset-0 bg-gradient-mesh" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">How OpenQase Organizes Knowledge</h2>
            <p className="text-muted-foreground">
              Every case study is cross-referenced by algorithm, industry, and professional perspective
            </p>
          </div>

          {/* Interactive Knowledge Map */}
          <div className="relative space-y-6">
            {/* SVG Connector Lines */}
            <KnowledgeConnectors />
            
            {/* Case Studies - Full Width Clickable Box */}
            <Link href="/case-study" className="block group relative z-10">
              <div className="relative overflow-hidden glass-premium p-8 text-center hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-vivid/10 to-transparent opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-purple-vivid/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-3 relative z-10 drop-shadow-lg" />
                <div className="font-bold text-2xl mb-1 relative z-10 text-foreground">Case Studies</div>
                <div className="text-sm text-muted-foreground relative z-10">Real implementations</div>
                <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-vivid/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
              </div>
            </Link>

            {/* Three clickable subsections underneath */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mt-16">
              {/* Algorithms */}
              <Link href="/paths/algorithm" className="block group">
                <div className="glass-premium p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-vivid/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CircuitBoard className="w-8 h-8 mx-auto mb-2 text-primary relative z-10 group-hover:text-[hsl(var(--blue-vivid))] transition-colors" />
                  <div className="font-semibold text-base relative z-10">Algorithms</div>
                  <div className="text-sm text-muted-foreground relative z-10">{algorithms.length} types</div>
                </div>
              </Link>

              {/* Industries */}
              <Link href="/paths/industry" className="block group">
                <div className="glass-premium p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-vivid/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-primary relative z-10 group-hover:text-[hsl(var(--purple-vivid))] transition-colors" />
                  <div className="font-semibold text-base relative z-10">Industries</div>
                  <div className="text-sm text-muted-foreground relative z-10">{industries.length} sectors</div>
                </div>
              </Link>

              {/* Professional Roles */}
              <Link href="/paths/persona" className="block group">
                <div className="glass-premium p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-sharp/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <User className="w-8 h-8 mx-auto mb-2 text-primary relative z-10 group-hover:text-[hsl(var(--yellow-sharp))] transition-colors" />
                  <div className="font-semibold text-base relative z-10">Professional Roles</div>
                  <div className="text-sm text-muted-foreground relative z-10">{personas.length} perspectives</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <SectionDivider variant="angle" />

      {/* Featured Case Studies - Primary Content */}
      <AnimatedBackground variant="mesh" className="py-20 px-4 bg-surface-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Latest Case Studies</h2>
              <p className="text-muted-foreground">
                Recent additions to the quantum computing implementation database
              </p>
            </div>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/case-study">
                View All Case Studies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentCard
              title="Quantinuum & HSBC: Financial Services Enhancement"
              description="How HSBC partnered with Quantinuum to explore quantum computing applications in cybersecurity, fraud detection, and natural language processing for banking."
              badges={["Finance", "Security", "NLP"]}
              href="/case-study/quantinuum-hsbc-financial-services-enhancement"
            />
            
            <ContentCard
              title="Quantinuum & Google DeepMind: AI for Quantum Circuit Optimization"
              description="How Quantinuum and Google DeepMind developed AlphaTensor-Quantum to optimize quantum circuits, reducing T gate counts by up to 47% in cryptography applications."
              badges={["AI/ML", "Optimization", "Cryptography"]}
              href="/case-study/quantinuum-google-deepmind-circuit-optimisation"
            />
            
            <ContentCard
              title="Quantinuum & Mitsui Co: Global Trading Optimization"
              description="How Mitsui & Co. partnered with Quantinuum to apply quantum computing to logistics optimization, commodity trading, and financial risk assessment."
              badges={["Trading", "Logistics", "Risk Management"]}
              href="/case-study/quantinuum-mitsui-trading-co"
            />
          </div>
        </div>
      </AnimatedBackground>

      {/* Community & Open Source Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-surface-secondary to-background relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-vivid/10 via-transparent to-yellow-sharp/10 animated-gradient" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">Open Source & Community Driven</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              OpenQase is built by and for the quantum computing community. All content is freely available and contributions are welcome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center h-full">
              <div className="bg-background rounded-lg p-6 border h-full flex flex-col">
                <Github className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Open Source</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  All code and content freely available on GitHub under open source license
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com/openqase" className="inline-flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>

            <div className="text-center h-full">
              <div className="bg-background rounded-lg p-6 border h-full flex flex-col">
                <Users className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Community Contributions</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  Submit new case studies, corrections, or improvements to help the community learn
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">
                    Contribute Content
                  </Link>
                </Button>
              </div>
            </div>

            <div className="text-center h-full">
              <div className="bg-background rounded-lg p-6 border h-full flex flex-col">
                <Database className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Free Access</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  No paywalls, no subscriptions. All quantum case studies available to everyone
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}