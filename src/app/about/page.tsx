export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
            About OpenQase
          </h1>
        </div>

        {/* Mission Section */}
        <section id="mission" className="max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 md:mb-6">What is OpenQase?</h2>
          <div className="space-y-4 text-base sm:text-lg">
            <p className="text-muted-foreground">
              OpenQase is a curated collection of the available business cases and industry partnerships exploring Quantum Computing. The project aims to accelerate the adoption of quantum technology, and to shorten the time it takes for those companies and individuals who are quantum curious to actively explore the practical potential of this emerging industry.
            </p>
            <p className="text-muted-foreground">
              We do this by showcasing not only the most thorough collection of published case studies to date, but relating them with the personas, industries, and algorithms involved. This is not just an educational resource, but a collection of examples for decisions makers and industry stakeholders looking to structure their own practical projects. We know this is useful because we ourselves work in the industry, and are open sourcing the resources that we have collected from our own commercial, technical, or scientific purposes.
            </p>            
          </div>
        </section>

        {/* Why Quantum Education Section */}
        <section className="max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 md:mb-6">How to use the OpenQase library?</h2>
          <div className="space-y-4 text-base sm:text-lg">
            <p className="text-muted-foreground">
              A small curation of business cases have been published to the Case Studies section. These will continue to be added to, and we will be expanding the metadata and highlighting the insights and metrics that matter. There is also the Lesrning Path section, which you can explore by either the Persona path, the Industry path, or the Algorithm path. As the names suggest, these individual learning paths focus on these unique perspectives, and effectively cross-examine the case studies published to date through the lens of who is doing what, and where, and with what algorithms. As an indicative resource, it's a powerful way to get a feel for the current state of quantum utility, and more rapidly stand on the shoulders of giants, as it were, and formulate your own contributions or projects.
            </p>
          </div>
        </section>

        {/* Contributing Section */}
        <section className="max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 md:mb-6">Contributing to OpenQase</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            OpenQase is an open-source project, and we welcome contributions from the 
            community. Whether you're interested in adding case studies, improving the
            documentation, or enhancing the platform's features, there are many ways 
            to get involved. Contact us via the contact form with a suggestion of how you would like to be involved.  
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
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 md:mb-6">Project Roadmap</h2>
          <div className="space-y-4 text-base sm:text-lg">
            <p className="text-muted-foreground">
              The high level roadmap for OpenQase covers the three phases for the project's establishment through to ongoing community-driven operations. Notable updates are documented in the Release Notes section, and we regularly write about the project and wider community collaboration in the Blog section. You're welcome to add feature requests or raise bugs directly on the GitHub repository.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <div className="border-l-2 pl-4 sm:pl-6 pb-6 sm:pb-8">
              <h3 className="text-lg sm:text-xl font-medium mb-2">Phase 1: Foundation (Current)</h3>
              <p className="text-base sm:text-lg text-muted-foreground">
                Create the basic platform structure, seed the initial case studies, and develop the core learning paths.
              </p>
            </div>
            <div className="border-l-2 pl-4 sm:pl-6 pb-6 sm:pb-8">
              <h3 className="text-lg sm:text-xl font-medium mb-2">Phase 2: Community-Driven </h3>
              <p className="text-base sm:text-lg text-muted-foreground">
              User accounts, community submissions, and expanded case study library.
              </p>
            </div>
            <div className="border-l-2 pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-medium mb-2">Phase 3: Interactive Learning</h3>
              <p className="text-base sm:text-lg text-muted-foreground">
                Integration of interactive notebooks, select third-party research APIs, and curated selection of industry and implementation partners.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 