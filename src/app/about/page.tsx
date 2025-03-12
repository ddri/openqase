export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">About openQase</h1>
        <p className="text-lg text-muted-foreground">
          Bridging the gap between quantum computing theory and real-world applications through 
          practical education and industry case studies.
        </p>
      </div>

      {/* Mission Section */}
      <section id="mission" className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
        <p className="text-muted-foreground mb-4">
          openQase aims to democratize quantum computing education by providing accessible, 
          practical, and industry-relevant learning resources. We believe in learning through 
          real-world examples and hands-on experience.
        </p>
        <p className="text-muted-foreground">
          Our platform brings together quantum computing enthusiasts, professionals, and 
          organizations to share knowledge and experiences, creating a vibrant community 
          of quantum learners and practitioners.
        </p>
      </section>

      {/* Why Quantum Education Section */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6">Why Quantum Education?</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            As quantum computing continues to evolve, there's a growing need for practical 
            education that bridges theoretical knowledge with real-world applications. 
            Traditional learning resources often focus heavily on theory, leaving a gap 
            in practical implementation knowledge.
          </p>
          <p className="text-muted-foreground">
            openQase fills this gap by providing:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Real-world case studies from industry leaders</li>
            <li>Practical implementation guides for quantum algorithms</li>
            <li>Role-based learning paths for different career trajectories</li>
            <li>Interactive quantum computing exercises</li>
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <p className="text-muted-foreground mb-8">
          openQase is built and maintained by a passionate team of quantum computing 
          enthusiasts, educators, and industry professionals.
        </p>
        {/* Team member cards will be added here */}
      </section>

      {/* Contributing Section */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6">Contributing to openQase</h2>
        <p className="text-muted-foreground mb-4">
          openQase is an open-source project, and we welcome contributions from the 
          community. Whether you're interested in adding case studies, improving 
          documentation, or enhancing the platform's features, there are many ways 
          to get involved.
        </p>
        <div className="bg-card rounded-lg p-6 border">
          <h3 className="text-xl font-medium mb-4">Ways to Contribute</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Add new case studies</li>
            <li>• Improve documentation</li>
            <li>• Report bugs and suggest features</li>
            <li>• Share your quantum computing experiences</li>
            <li>• Help others in the community</li>
          </ul>
        </div>
      </section>

      {/* Timeline/Roadmap Section */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Project Timeline</h2>
        <div className="space-y-4">
          <div className="border-l-2 pl-4 pb-8">
            <h3 className="text-lg font-medium">Phase 1: Foundation (Current)</h3>
            <p className="text-muted-foreground">
              Basic platform structure, initial case studies, and core learning paths.
            </p>
          </div>
          <div className="border-l-2 pl-4 pb-8">
            <h3 className="text-lg font-medium">Phase 2: Interactive Learning</h3>
            <p className="text-muted-foreground">
              Integration of interactive notebooks, quantum circuit visualization, and 
              hands-on exercises.
            </p>
          </div>
          <div className="border-l-2 pl-4">
            <h3 className="text-lg font-medium">Phase 3: Community Growth</h3>
            <p className="text-muted-foreground">
              User accounts, progress tracking, community features, and advanced analytics.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 