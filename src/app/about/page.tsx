export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="mb-4">
            About OpenQase
          </h1>
          <p className="text-muted-foreground">
            OpenQASE is a comprehensive knowledge platform dedicated to documenting and sharing quantum computing business case studies and applications.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Mission Section */}
            <section className="mb-12">
              <h2 className="mb-4">Our Mission</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  OpenQase aims to become the definitive resource for quantum computing business applications by bridging the gap between theoretical quantum research and practical business implementation.
                </p>
                <p className="text-muted-foreground">
                  Despite significant advances in quantum computing technology, there remains a substantial gap between theoretical quantum research and practical business applications. Many organizations and professionals struggle to understand how quantum computing can solve real-world business problems, identify relevant use cases for their specific industry, navigate the complex technical landscape of quantum algorithms, and find comprehensive, accessible resources that bridge theoretical concepts with business value.
                </p>
                <p className="text-muted-foreground">
                  OpenQase addresses these challenges through a structured, accessible platform that connects quantum computing concepts with tangible business applications through community curated content and related concept navigation.
                </p>
              </div>
            </section>

            {/* Our Approach Section */}
            <section className="mb-12">
              <h2 className="mb-4">Our Approach</h2>
              <p className="text-muted-foreground mb-8">
                The Learning Paths concept is central to OpenQase's approach to making quantum computing accessible to diverse audiences. The platform offers three distinct navigation journeys:
              </p>
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <div className="mb-3">
                    <h3>Persona Path</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Content tailored to your professional role, ensuring business leaders receive strategic insights while technical practitioners get implementation details.
                  </p>
                </div>
                <div>
                  <div className="mb-3">
                    <h3>Industry Path</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Content organized around specific business sectors, helping professionals understand quantum computing applications relevant to their industry.
                  </p>
                </div>
                <div>
                  <div className="mb-3">
                    <h3>Algorithm Path</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Content organized around quantum algorithms and techniques, helping match business problems with appropriate quantum solutions.
                  </p>
                </div>
              </div>
            </section>

            {/* Case Studies Section */}
            <section className="mb-12">
              <h2 className="mb-4">Case Studies: Our Core Content</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  The Case Studies section forms the core content foundation of OpenQase, providing documented examples of real-world quantum computing implementations. Each case study details actual quantum computing deployments, including the business context, problem description, implementation approach, and outcomes.
                </p>
                <p className="text-muted-foreground">
                  Our case studies focus on the business context, problem description, and outcomes of quantum computing implementations. They provide information on the industries served, algorithms used, and partner companies involved, making it easy to understand the practical value of quantum computing.
                </p>
                <p className="text-muted-foreground">
                  All case studies are structured to balance technical depth with business relevance, ensuring they serve both decision-makers and implementers while providing concrete examples of quantum computing's practical value.
                </p>
              </div>
            </section>

            {/* Our Vision Section */}
            <section>
              <h2 className="mb-4">Our Vision</h2>
              <p className="text-muted-foreground mb-6">
                OpenQase aims to become the definitive resource for quantum computing business applications by:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-2">
                  <span className="font-medium">Democratizing Knowledge:</span>
                  <span className="text-muted-foreground">Making quantum computing concepts accessible to diverse business stakeholders through clear, practical examples.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Bridging Theory and Practice:</span>
                  <span className="text-muted-foreground">Connecting theoretical quantum concepts with practical business applications to accelerate adoption.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Supporting Informed Decision-Making:</span>
                  <span className="text-muted-foreground">Providing organizations with the knowledge needed to evaluate quantum computing's potential value.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Accelerating Skill Development:</span>
                  <span className="text-muted-foreground">Offering clear learning paths for professionals seeking to develop quantum computing expertise.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Building Community:</span>
                  <span className="text-muted-foreground">Creating an accessible community for curating and sharing the implementation experiences, best practices, and outcomes of quantum computing partnerships in this early stage of the wider industry.</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="mt-12 lg:mt-0 lg:col-span-4">
            {/* Join Our Community Section */}
            <div className="rounded-lg border bg-card p-6 mb-8">
              <h3 className="mb-4">Join Our Community</h3>
              <p className="text-muted-foreground mb-6">
                Connect with other professionals exploring quantum computing applications in business contexts.
              </p>
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                Subscribe to Updates
              </button>
            </div>

            {/* Our Team Section */}
            <div className="rounded-lg border bg-card p-6 mb-8">
              <h3 className="mb-4">Our Team</h3>
              <p className="text-muted-foreground mb-4">
                OpenQase is developed by a multidisciplinary team with expertise in:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  </div>
                  <span>Quantum Computing</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  </div>
                  <span>Business Strategy</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  </div>
                  <span>Education & Knowledge Sharing</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  </div>
                  <span>Content Development</span>
                </li>
              </ul>
            </div>

            {/* Contact Us Section */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4">Contact Us</h3>
              <p className="text-muted-foreground mb-6">
                Have questions or want to contribute a case study? We'd love to hear from you!
              </p>
              <button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md">
                Get in Touch
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
} 