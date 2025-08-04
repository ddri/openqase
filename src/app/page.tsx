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
import { fetchSearchData, getBuildTimeContentList } from '@/lib/content-fetchers';

interface CategoryStats {
  title: string;
  count: number;
  description: string;
  icon: React.ReactNode;
  href: string;
}


export default async function HomePage() {
  // Fetch search data for client-side search
  const searchData = await fetchSearchData();

  // Get actual content counts from database
  const [caseStudies, algorithms, industries, personas] = await Promise.all([
    getBuildTimeContentList('case_studies'),
    getBuildTimeContentList('algorithms'), 
    getBuildTimeContentList('industries'),
    getBuildTimeContentList('personas')
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
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              OpenQase
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              Open Source Quantum Computing Case Studies
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A free, community-driven collection of real quantum computing implementations from industry leaders
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <GlobalSearch searchData={searchData} className="mx-auto" />
          </div>

          {/* Quick Browse Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="text-sm text-muted-foreground">Browse by:</span>
            {categoryStats.map((category) => (
              <Link 
                key={category.title}
                href={category.href}
                className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/50 hover:bg-secondary rounded-full text-sm transition-colors"
              >
                {category.icon}
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Map - Visual Cross-Reference */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">How OpenQase Organizes Knowledge</h2>
            <p className="text-muted-foreground">
              Every case study is cross-referenced by algorithm, industry, and professional perspective
            </p>
          </div>

          {/* Visual Knowledge Map */}
          <div className="space-y-6">
            {/* Case Studies - Full Width Green Box */}
            <div className="bg-primary/10 rounded-lg p-6 border-2 border-primary/20 text-center">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="font-semibold text-lg">Case Studies</div>
              <div className="text-sm text-muted-foreground">Real implementations</div>
            </div>

            {/* Three subsections underneath */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Algorithms */}
              <div className="bg-secondary/50 rounded-lg p-4 border text-center">
                <CircuitBoard className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="font-medium text-sm">Algorithms</div>
                <div className="text-xs text-muted-foreground">{algorithms.length} types</div>
              </div>

              {/* Industries */}
              <div className="bg-secondary/50 rounded-lg p-4 border text-center">
                <Building2 className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="font-medium text-sm">Industries</div>
                <div className="text-xs text-muted-foreground">{industries.length} sectors</div>
              </div>

              {/* Professional Roles */}
              <div className="bg-secondary/50 rounded-lg p-4 border text-center">
                <User className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="font-medium text-sm">Professional Roles</div>
                <div className="text-xs text-muted-foreground">{personas.length} perspectives</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category - Wikipedia Style */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Browse Knowledge Base</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryStats.map((category) => (
              <Link key={category.title} href={category.href} className="group">
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-3">
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <div className="text-2xl font-bold text-primary">{category.count}</div>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies - Primary Content */}
      <section className="py-16 px-4">
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
      </section>

      {/* Community & Open Source Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
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
                  <Link href="/contribute">
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