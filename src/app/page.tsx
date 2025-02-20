// File: src/app/page.tsx
import PixelGradient from '@/components/PixelGradient'
import InteractiveJourney from '@/components/journey/InteractiveJourney'

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <PixelGradient />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-text-primary mb-6">
                Welcome to openQase
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Your comprehensive resource for quantum computing case studies, learning paths, and industry applications.
              </p>
            </div>
            
            {/* Journey Diagram */}
            <InteractiveJourney />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Learning Paths', 'Case Studies', 'Technology Stack'].map((title) => (
                <div 
                  key={title}
                  className="p-6 bg-card-background backdrop-blur-sm rounded-xl 
                    border border-card-border hover:border-card-hoverBorder 
                    hover:bg-card-hoverBackground transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    {title}
                  </h3>
                  <p className="text-text-secondary">
                    {getFeatureDescription(title)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                About openQase
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-text-secondary">
                  openQase is an open resource platform dedicated to making quantum computing accessible 
                  and practical for professionals across all industries. We provide curated case studies, 
                  learning materials, and technical insights to help you understand and apply quantum 
                  computing in your field.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function getFeatureDescription(title: string): string {
  const descriptions = {
    'Learning Paths': 'Explore quantum computing through personalized learning paths tailored to your role and interests.',
    'Case Studies': 'Discover real-world applications of quantum computing across various industries.',
    'Technology Stack': 'Understand the complete quantum computing stack from hardware to software.'
  }
  return descriptions[title as keyof typeof descriptions]
}