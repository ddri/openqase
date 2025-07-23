import { Metadata } from 'next';
import { NewsletterSignup } from '@/components/ui/newsletter-signup'
import { AutoSchema } from '@/components/AutoSchema';
import { GetInvolvedSection } from '@/components/GetInvolvedSection';

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
                Quantum computing promises to transform industries, but understanding practical applications remains a challenge for business leaders. Even for those of us working in the quantum computing industry, it's not easy to answer questions like "when will quantum computing be ready", or "what is the business case for a quantum computer". This is a polite way of asking "what's in it for me", which is the most important question we need to answer.
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6 border-l-4 border-primary">
                <p className="text-muted-foreground">
                  <strong>The Challenge:</strong> business leaders need to understand <em>what quantum computing can do for their organization</em> without getting lost in complex mathematics or physics.
                </p>
              </div>
              
              <p className="text-muted-foreground">
                OpenQase approaches this by curating a collection of real-world quantum computing business case studies. We show you what companies like Ford, Goldman Sachs, and Airbus are actually doing with quantum computing—and how it impacts their bottom line. This isn't a replacement for the yearly consulting reports and commercial business intelligence services. Those are an essential part of our ecosystem, but those are a little further down the engagement funnel, for people and organisations with considerable intent. At the other end is a whole lot mass media coverage that we will just call "noisy" and leave it at that. But there is a missing middle in terms of a self-learning resource, something of a "wikipedia for quantum computing business cases". Something like OpenQase. 
              </p>
            </div>
          </section>






          {/* Our Approach Section */}
          <section className="mb-16">
            <h2 className="mb-6">A Guided Approach</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unlike academic resources or vendor marketing, OpenQase focuses on practical implementation insights organized around how you actually work. These learning paths are a result of real-world experience working in the quantum computing industry, and began as real-life projects and case studies developed with our various teams. We are making this information public so you don't have to go through collecting it all like we did. And we're making it open source so you can contribute to the project too, increasing our collective understanding of (and interaction with) the published case studies and supporting resources.
            </p>
                          <div className="bg-muted/30 rounded-lg p-6 border-l-4 border-primary">
                <p className="text-muted-foreground">
                  <strong>By Role:</strong> CEOs get strategic insights, CTOs get implementation guidance, engineers get technical details. Content tailored to your specific responsibilities and decision-making needs.
                </p>
                                <p className="text-muted-foreground">
                  <strong>By Industry:</strong> Financial services, healthcare, energy, manufacturing—see quantum applications that matter to your specific sector with relevant business context and outcomes.
                </p>
                                                <p className="text-muted-foreground">
                  <strong>By Solution Type:</strong> Optimization, machine learning, security—understand quantum algorithms through their business applications rather than mathematical complexity.
                </p>
              </div>
          </section>

          {/* Our Vision Section */}
          <section className="mb-16">
            <h2 className="mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground mb-8">
              OpenQase has been referred to as "the Wikipedia for quantum computing business applications". Big shoes to fill. But as a community and open source project it sets a worthy goal, and one we pursue with the following points in mind.
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

          {/* Join Our Community Section - Integrated from sidebar */}
          {/* <section className="mb-16">
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
          </section> */}

          {/* Get Involved Section */}
          <GetInvolvedSection />
        </div>
      </div>
    </main>
    </>
  );
} 