// src/app/learning-path/page.tsx
import PathCard from '@/components/PathCard'

export default function LearningPath() {
  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Learning path</h1>
        <p className="text-gray-400 mb-12">Choose your path to explore quantum computing case studies</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PathCard 
            title="Persona" 
            path="persona"
            description="Find case studies relevant to your role and professional background"
          />
          <PathCard 
            title="Industry path" 
            path="industry"
            description="Explore quantum computing applications in your sector"
          />
          <PathCard 
            title="Algorithm path" 
            path="algorithm"
            description="Learn about specific quantum algorithms and their implementations"
          />
        </div>
      </div>
    </main>
  )
}