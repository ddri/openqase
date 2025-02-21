// src/app/learning-paths/page.tsx
import PathCard from '@/components/PathCard'

export default function LearningPaths() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Learning paths</h1>
        <p className="text-text-secondary mb-12">
          Choose your path to explore quantum computing case studies
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PathCard 
            title="Personas" 
            path="personas"
            description="Find case studies relevant to your role and professional background"
          />
          <PathCard 
            title="Industry path" 
            path="industries"
            description="Explore quantum computing applications in your sector"
          />
          <PathCard 
            title="Algorithm path" 
            path="algorithms"
            description="Learn about specific quantum algorithms and their implementations"
          />
        </div>
      </div>
    </main>
  )
}