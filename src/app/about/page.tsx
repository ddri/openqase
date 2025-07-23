import { Metadata } from 'next';
import { NewsletterSignup } from '@/components/ui/newsletter-signup'
import { AutoSchema } from '@/components/AutoSchema';

export const metadata: Metadata = {
  title: 'About OpenQase | Making Quantum Computing Accessible to Everyone',
  description: 'Learn about OpenQase\'s mission to bridge the gap between quantum computing theory and practical business applications. Discover our approach to making complex quantum concepts accessible.',
};

export default function AboutPage() {
  return (
    <>
      {/* Auto-generate organization schema for About page */}
      <AutoSchema type="organization" />
      
      <main className="min-h-screen">
        <div className="container-outer section-spacing">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="mb-6">
              Making Quantum Computing Accessible to Business Leaders
            </h1>
            <p className="text-xl text-muted-foreground">
              OpenQase bridges the gap between the theory and practical business applications, helping decision-makers understand real-world quantum value without the complexity.
            </p>
          </div>

        {/* Main Content - Single Column */}
        <div className="max-w-4xl mx-auto">
          {/* The Problem We Solve */}
          <section className="mb-16">
            <h2 className="mb-6">The Problem We Solve</h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Quantum computing promises to transform industries, but understanding practical applications remains a challenge for business leaders. Even for those of us working for Quantum Computing companies, it's not been easy to answer questions like "when will quantum computing be ready", or "what is the business case for a quantum computer".
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6 border-l-4 border-primary">
                <p className="text-muted-foreground">
                  <strong>The Challenge:</strong> Most quantum computing resources focus on academic theory or technical implementation details. Business decision-makers need to understand <em>what quantum computing can do for their organization</em> without getting lost in complex mathematics or physics.
                </p>
              </div>
              
              <p className="text-muted-foreground">
                OpenQase solves this by curating real-world quantum implementations and presenting them in business-focused language. We show you what companies like Ford, Goldman Sachs, and Airbus are actually doing with quantum computing—and how it impacts their bottom line.
              </p>
            </div>
          </section>

          {/* Our Mission */}
          <section className="mb-16">
            <h2 className="mb-6">Our Mission</h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                To make quantum computing accessible to every business leader who needs to understand its potential impact on their industry.
              </p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3 text-primary">What We Believe</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Quantum computing shouldn't require a PhD to understand</li>
                    <li>• Real business applications matter more than theoretical potential</li>
                    <li>• Decision-makers need practical insights, not academic papers</li>
                    <li>• Learning should be organized around your role and industry</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">How We Help</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Translate complex quantum concepts into business language</li>
                    <li>• Document real implementations with measurable outcomes</li>
                    <li>• Organize content by professional role and industry</li>
                    <li>• Focus on practical applications over theoretical possibilities</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Our Approach Section */}
          <section className="mb-16">
            <h2 className="mb-6">A Different Approach</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unlike academic resources or vendor marketing, OpenQase focuses on practical implementation insights organized around how you actually work. These learning paths are a result of real-world experience working in the quantum computing industry, and began as real-life projects and case studies developed with our various teams. We are making this information public so you don't have to go through what we did.
            </p>
            <div className="grid gap-8">
              <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <span className="text-lg font-semibold text-primary">👤</span>
                  </div>
                  <h3>By Your Role</h3>
                </div>
                <p className="text-muted-foreground">
                  CEOs get strategic insights, CTOs get implementation guidance, engineers get technical details. Content tailored to your specific responsibilities and decision-making needs.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <span className="text-lg font-semibold text-primary">🏢</span>
                  </div>
                  <h3>By Your Industry</h3>
                </div>
                <p className="text-muted-foreground">
                  Financial services, healthcare, energy, manufacturing—see quantum applications that matter to your specific sector with relevant business context and outcomes.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <span className="text-lg font-semibold text-primary">⚡</span>
                  </div>
                  <h3>By Solution Type</h3>
                </div>
                <p className="text-muted-foreground">
                  Optimization, machine learning, security—understand quantum algorithms through their business applications rather than mathematical complexity.
                </p>
              </div>
            </div>
          </section>

          {/* Case Studies Section */}
          <section className="mb-16">
            <h2 className="mb-6">Real Implementations, Real Results</h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Every case study documents actual quantum computing implementations with measurable business outcomes—not theoretical possibilities or marketing claims.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-primary">What You'll Find</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Business context:</strong> Why the company needed quantum computing</li>
                    <li>• <strong>Implementation approach:</strong> How they actually built and deployed solutions</li>
                    <li>• <strong>Measurable outcomes:</strong> Specific improvements and ROI metrics</li>
                    <li>• <strong>Lessons learned:</strong> Challenges, surprises, and practical insights</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Featured Examples</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>HSBC & Quantinuum:</strong> Quantum cybersecurity and fraud detection</li>
                    <li>• <strong>Google & Quantinuum:</strong> 47% reduction in quantum circuit complexity</li>
                    <li>• <strong>Mitsui & Quantinuum:</strong> Supply chain optimization at global scale</li>
                    <li>• <em>Plus dozens more across industries and use cases</em></li>
                  </ul>
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
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              <h2 className="mb-4">Join The Community</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect with other professionals exploring quantum computing applications in business contexts. Stay updated with the latest case studies, insights, and community discussions.
              </p>
              <div className="space-y-4">
                <NewsletterSignup 
                  buttonText="Subscribe to Updates"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
                  variant="inline"
                />
              </div>
            </div>
          </section>

          {/* Get Involved Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="mb-4">Get Involved</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join our community of quantum computing professionals. Contribute content, ask questions, or explore partnership opportunities.
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-shadow flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-semibold text-primary">📝</span>
                </div>
                <h4 className="font-semibold mb-3">Contribute Content</h4>
                <p className="text-muted-foreground mb-6 flex-grow">Share your quantum computing case study or implementation experience with our community.</p>
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg font-medium transition-colors">
                  Submit Case Study
                </button>
              </div>
              
              <div className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-shadow flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-semibold text-primary">💬</span>
                </div>
                <h4 className="font-semibold mb-3">Ask Questions</h4>
                <p className="text-muted-foreground mb-6 flex-grow">Get help understanding quantum applications for your specific industry or use case.</p>
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg font-medium transition-colors">
                  Get in Touch
                </button>
              </div>
              
              <div className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-shadow flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-semibold text-primary">🤝</span>
                </div>
                <h4 className="font-semibold mb-3">Partner With Us</h4>
                <p className="text-muted-foreground mb-6 flex-grow">Explore partnerships for content collaboration or platform integration.</p>
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg font-medium transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
    </>
  );
} 