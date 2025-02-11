// src/app/page.tsx
import PathCard from '@/components/PathCard'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-white">Learning path</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PathCard 
            title="Persona path" 
            path="persona"
            description="Find case studies relevant to your role"
          />
          <PathCard 
            title="Industry path" 
            path="industry"
            description="Explore quantum computing in your sector"
          />
          <PathCard 
            title="Algorithm path" 
            path="algorithm"
            description="Learn about specific quantum algorithms"
          />
        </div>
      </div>
    </main>
  )
}