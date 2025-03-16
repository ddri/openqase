export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
            About openQase
          </h1>
        </div>

        {/* Mission Section */}
        <section id="mission" className="max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 md:mb-6">What is OpenQase?</h2>
          <div className="space-y-4 text-base sm:text-lg">
            <p className="text-muted-foreground">
              OpenQase is a curated collection of business cases and industry partnerships involving Quantum Computing. The project exists to unlock the practical potential of quantum-related technologies, and does so by showcasing not only the most thorough collection of these published case studies, but relating them with the personas, industries, and algorithms involved. This is not just an educational resource, but an acceleration for decisions makers and industry stakeholders looking to find useful examples and form their own practical projects.
            </p>
            <p className="text-muted-foreground">
              Our mission is to illuminate the path from quantum theory to implementation by showcasing how organizations are solving complex problems and creating value with quantum technologies today. By providing access to these vetted case studies and success stories, we enable individuals and companies to visualize their own quantum opportunities and accelerate their adoption journey.
            </p>
            <p className="text-muted-foreground">
              We're committed to demystifying quantum computing by grounding it in business reality. Through our platform, we connect the quantum ecosystem—researchers, practitioners, business leaders, and curious learners—creating a resource that transforms abstract quantum concepts into actionable insights and collaborative possibilities.
            </p>            
          </div>
        </section>

        {/* Why Quantum Education Section */}
        <section className="max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 md:mb-6">Why does OpenQase exist?</h2>
          <div className="space-y-4 text-base sm:text-lg">
            <p className="text-muted-foreground">
              As quantum computing continues to evolve, there's a growing need for practical 
              case studies that bridges theoretical knowledge with the early efforts at exploring real-world applications. 
              Traditional learning resources often focus heavily on theory, leaving a gap 
              in practical implementation knowledge. This is a pain we have felt, as the OpenQase team stems from a number of established quantum computing companies on both the technical and commercial side of operations. These are the case studies and examples we wish we had, and pulled together because we needed. And now they are curated, arranged, and are continually being added for your and the wider community's benefit.
            </p>
          </div>
        </section>

        {/* Contributing Section */}
        <section className="max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 md:mb-6">Contributing to openQase</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            openQase is an open-source project, and we welcome contributions from the 
            community. Whether you're interested in adding case studies, improving 
            documentation, or enhancing the platform's features, there are many ways 
            to get involved.
          </p>
          <div className="bg-card rounded-lg p-4 sm:p-6 border">
            <h3 className="text-xl sm:text-2xl font-medium mb-4">Ways to Contribute</h3>
            <ul className="space-y-2 text-base sm:text-lg text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Add new case studies</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Improve documentation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Report bugs and suggest features</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Share your quantum computing experiences</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Help others in the community</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Timeline/Roadmap Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 md:mb-6">Project Timeline</h2>
          <div className="space-y-6 sm:space-y-8">
            <div className="border-l-2 pl-4 sm:pl-6 pb-6 sm:pb-8">
              <h3 className="text-lg sm:text-xl font-medium mb-2">Phase 1: Foundation (Current)</h3>
              <p className="text-base sm:text-lg text-muted-foreground">
                Basic platform structure, initial case studies, and core learning paths.
              </p>
            </div>
            <div className="border-l-2 pl-4 sm:pl-6 pb-6 sm:pb-8">
              <h3 className="text-lg sm:text-xl font-medium mb-2">Phase 2: Interactive Learning</h3>
              <p className="text-base sm:text-lg text-muted-foreground">
                Integration of interactive notebooks, quantum circuit visualization, and 
                hands-on exercises.
              </p>
            </div>
            <div className="border-l-2 pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-medium mb-2">Phase 3: Community Growth</h3>
              <p className="text-base sm:text-lg text-muted-foreground">
                User accounts, progress tracking, community features, and advanced analytics.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 