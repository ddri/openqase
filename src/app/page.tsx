// src/app/page.tsx
import PixelGradient from '@/components/PixelGradient'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0C0C0D] relative">
      <PixelGradient />
      
      {/* Content with relative positioning to appear above the gradient */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">
                Welcome to openQase
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Your comprehensive resource for quantum computing case studies, learning paths, and industry applications.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">Learning Paths</h3>
                <p className="text-gray-300">
                  Explore quantum computing through personalized learning paths tailored to your role and interests.
                </p>
              </div>
              <div className="p-6 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">Case Studies</h3>
                <p className="text-gray-300">
                  Discover real-world applications of quantum computing across various industries.
                </p>
              </div>
              <div className="p-6 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">Technology Stack</h3>
                <p className="text-gray-300">
                  Understand the complete quantum computing stack from hardware to software.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-white mb-6">
                About openQase
              </h2>
              <div className="prose prose-invert">
                <p className="text-gray-300">
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