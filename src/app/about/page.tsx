import { NewsletterSignup } from '@/components/ui/newsletter-signup'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="mb-6">
            About OpenQase
          </h1>
          <p className="text-xl text-muted-foreground">
            OpenQASE is a comprehensive knowledge platform dedicated to documenting and sharing quantum computing business case studies and applications.
          </p>
        </div>

        {/* Main Content - Single Column */}
        <div className="max-w-4xl mx-auto">
          {/* Mission Section */}
          <section className="mb-16">
            <h2 className="mb-6">Our Mission</h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                OpenQase aims to become the definitive resource for quantum computing business applications by bridging the gap between theoretical quantum research and practical business implementation.
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6 border-l-4 border-primary">
                <p className="text-muted-foreground">
                  Despite significant advances in quantum computing technology, there remains a substantial gap between theoretical quantum research and practical business applications. Many organizations and professionals struggle to understand how quantum computing can solve real-world business problems.
                </p>
              </div>
              
              <p className="text-muted-foreground">
                OpenQase addresses these challenges through a structured, accessible platform that connects quantum computing concepts with tangible business applications through community curated content and related concept navigation.
              </p>
            </div>
          </section>

          {/* Our Approach Section */}
          <section className="mb-16">
            <h2 className="mb-6">Our Approach</h2>
            <p className="text-lg text-muted-foreground mb-8">
              The Learning Paths concept is central to OpenQase's approach to making quantum computing accessible to diverse audiences. The platform offers three distinct navigation journeys:
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                  </div>
                  <h3>Persona Path</h3>
                </div>
                <p className="text-muted-foreground">
                  Content tailored to your professional role, ensuring business leaders receive strategic insights while technical practitioners get implementation details.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                  </div>
                  <h3>Industry Path</h3>
                </div>
                <p className="text-muted-foreground">
                  Content organized around specific business sectors, helping professionals understand quantum computing applications relevant to their industry.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                  </div>
                  <h3>Algorithm Path</h3>
                </div>
                <p className="text-muted-foreground">
                  Content organized around quantum algorithms and techniques, helping match business problems with appropriate quantum solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Case Studies Section */}
          <section className="mb-16">
            <h2 className="mb-6">Case Studies: Our Core Content</h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                The Case Studies section forms the core content foundation of OpenQase, providing documented examples of real-world quantum computing implementations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">What We Document</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Business context and problem description</li>
                    <li>• Implementation approach and outcomes</li>
                    <li>• Industries served and algorithms used</li>
                    <li>• Partner companies and collaborations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Our Focus</h4>
                  <p className="text-muted-foreground">
                    All case studies are structured to balance technical depth with business relevance, ensuring they serve both decision-makers and implementers while providing concrete examples of quantum computing's practical value.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Vision Section */}
          <section className="mb-16">
            <h2 className="mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground mb-8">
              OpenQase aims to become the definitive resource for quantum computing business applications by:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span className="font-semibold">Democratizing Knowledge</span>
                    <p className="text-muted-foreground mt-1">Making quantum computing concepts accessible to diverse business stakeholders through clear, practical examples.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span className="font-semibold">Bridging Theory and Practice</span>
                    <p className="text-muted-foreground mt-1">Connecting theoretical quantum concepts with practical business applications to accelerate adoption.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span className="font-semibold">Supporting Informed Decision-Making</span>
                    <p className="text-muted-foreground mt-1">Providing organizations with the knowledge needed to evaluate quantum computing's potential value.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span className="font-semibold">Accelerating Skill Development</span>
                    <p className="text-muted-foreground mt-1">Offering clear learning paths for professionals seeking to develop quantum computing expertise.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span className="font-semibold">Building Community</span>
                    <p className="text-muted-foreground mt-1">Creating an accessible community for curating and sharing implementation experiences, best practices, and outcomes.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Team Section - Integrated from sidebar */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="mb-4">Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                OpenQase is developed by a multidisciplinary team bringing together expertise from quantum computing, business strategy, and knowledge sharing.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                </div>
                <h4 className="font-semibold mb-2">Quantum Computing</h4>
                <p className="text-sm text-muted-foreground">Technical expertise in quantum algorithms and implementations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                </div>
                <h4 className="font-semibold mb-2">Business Strategy</h4>
                <p className="text-sm text-muted-foreground">Understanding of enterprise needs and quantum applications</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                </div>
                <h4 className="font-semibold mb-2">Education & Knowledge Sharing</h4>
                <p className="text-sm text-muted-foreground">Making complex concepts accessible and actionable</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                </div>
                <h4 className="font-semibold mb-2">Content Development</h4>
                <p className="text-sm text-muted-foreground">Curating and structuring case studies and learning materials</p>
              </div>
            </div>
          </section>

          {/* Join Our Community Section - Integrated from sidebar */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8 text-center">
              <h2 className="mb-4">Join Our Community</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect with other professionals exploring quantum computing applications in business contexts. Stay updated with the latest case studies, insights, and community discussions.
              </p>
              <div className="space-y-4">
                <NewsletterSignup 
                  buttonText="Subscribe to Updates"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
                  variant="inline"
                />
                <div className="flex justify-center">
                  <button className="bg-background border border-border hover:bg-muted px-6 py-3 rounded-lg font-medium transition-colors">
                    Explore Learning Paths
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Get Involved Section - Enhanced contact */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="mb-4">Get Involved</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions, want to contribute a case study, or share your quantum computing implementation experience? We'd love to hear from you!
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-card border rounded-lg p-6 text-center">
                <h4 className="font-semibold mb-3">Contribute Content</h4>
                <p className="text-muted-foreground mb-4">Share your quantum computing case study or implementation experience with our community.</p>
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors">
                  Submit Case Study
                </button>
              </div>
              <div className="bg-card border rounded-lg p-6 text-center">
                <h4 className="font-semibold mb-3">Ask Questions</h4>
                <p className="text-muted-foreground mb-4">Get help understanding quantum applications for your specific industry or use case.</p>
                <button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md transition-colors">
                  Get in Touch
                </button>
              </div>
              <div className="bg-card border rounded-lg p-6 text-center">
                <h4 className="font-semibold mb-3">Partner With Us</h4>
                <p className="text-muted-foreground mb-4">Explore partnerships for content collaboration or platform integration.</p>
                <button className="w-full bg-muted text-muted-foreground hover:bg-muted/80 px-4 py-2 rounded-md transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 