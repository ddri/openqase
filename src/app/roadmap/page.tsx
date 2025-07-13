import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Roadmap - OpenQase',
  description: 'Explore OpenQase\'s product roadmap and see what we\'re building for the future of quantum computing business applications.',
}

export default function RoadmapPage() {
  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="mb-6">
            Product Roadmap
          </h1>
          <p className="text-xl text-muted-foreground">
            Our vision for the future of quantum computing business applications. 
            See what we're building and what's coming next.
          </p>
        </div>

        {/* Roadmap Content */}
        <div className="max-w-4xl mx-auto">
          {/* Current Release */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <h2 className="text-2xl font-semibold">Recently Released</h2>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Version 0.4.0 - Static Site Generation</h3>
                <span className="text-sm text-muted-foreground">July 2025</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">🚀 Performance & Architecture</h4>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Complete SSG implementation</li>
                    <li>• Unified content fetching system</li>
                    <li>• Enhanced admin workflows</li>
                    <li>• Security improvements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🎨 User Experience</h4>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Redesigned About & Contact pages</li>
                    <li>• Custom branding & favicon</li>
                    <li>• Improved mobile experience</li>
                    <li>• Single-column layouts</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* In Progress */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <h2 className="text-2xl font-semibold">In Development</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Enhanced Content Management</h3>
                  <span className="text-sm text-muted-foreground">Q3 2025</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Improving the content creation and management experience for administrators and contributors.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">🔧 Admin Tools</h4>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Advanced relationship management</li>
                      <li>• Bulk content operations</li>
                      <li>• Content validation workflows</li>
                      <li>• Preview and staging systems</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">📊 Analytics & Insights</h4>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Content performance metrics</li>
                      <li>• User engagement tracking</li>
                      <li>• Search analytics</li>
                      <li>• Content recommendation engine</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <h2 className="text-2xl font-semibold">Planned Features</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Community Features</h3>
                  <span className="text-sm text-muted-foreground">Q4 2025</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Building stronger community engagement and collaboration tools.
                </p>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• User profiles and contribution tracking</li>
                  <li>• Community-driven content rating and reviews</li>
                  <li>• Discussion forums for case studies</li>
                  <li>• Expert contributor program</li>
                  <li>• Community newsletter and updates</li>
                </ul>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Advanced Search & Discovery</h3>
                  <span className="text-sm text-muted-foreground">Q1 2026</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Making it easier to find relevant quantum computing applications and insights.
                </p>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• AI-powered content recommendations</li>
                  <li>• Advanced filtering and faceted search</li>
                  <li>• Personalized learning path suggestions</li>
                  <li>• Industry-specific content discovery</li>
                  <li>• Semantic search capabilities</li>
                </ul>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Interactive Learning Tools</h3>
                  <span className="text-sm text-muted-foreground">Q2 2026</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Enhanced educational resources and interactive content for quantum computing concepts.
                </p>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• Interactive algorithm visualizations</li>
                  <li>• Step-by-step implementation guides</li>
                  <li>• ROI calculators for business applications</li>
                  <li>• Decision trees for technology selection</li>
                  <li>• Virtual quantum computing simulations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Future Vision */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <h2 className="text-2xl font-semibold">Future Vision</h2>
            </div>
            
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">The Ultimate Quantum Business Platform</h3>
              <p className="text-muted-foreground mb-6">
                Our long-term vision is to create the definitive platform for quantum computing business applications, 
                serving as the bridge between cutting-edge research and practical implementation.
              </p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-3">🌐 Global Ecosystem</h4>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• Multi-language support and localization</li>
                    <li>• Regional quantum computing insights</li>
                    <li>• Global expert network integration</li>
                    <li>• Cross-industry collaboration tools</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">🔬 Advanced Capabilities</h4>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• Real-time quantum hardware integration</li>
                    <li>• Predictive business impact modeling</li>
                    <li>• Automated case study generation</li>
                    <li>• AI-powered research synthesis</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Feedback Section */}
          <section>
            <div className="bg-card border rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Shape Our Roadmap</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your feedback and suggestions help us prioritize features and improvements. 
                Let us know what matters most to you and your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Share Feedback
                </a>
                <a 
                  href="https://github.com/ddri/openqase" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-background border border-border hover:bg-muted px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 