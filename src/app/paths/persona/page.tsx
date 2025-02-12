// src/app/paths/persona/page.tsx
import ContentCard from '@/components/ContentCard'
import { Persona } from '@/types'

const personas: Array<Pick<Persona, 'id' | 'title' | 'slug' | 'type' | 'description'>> = [
  {
    id: '1',
    title: 'Government Policy Maker',
    slug: 'government',
    type: 'Persona',
    description: 'Understand quantum computing impact on national security, research funding, and policy implications'
  },
  {
    id: '2',
    title: 'Investment Professional',
    slug: 'investor',
    type: 'Persona',
    description: 'Evaluate quantum computing opportunities, market trends, and investment strategies'
  },
  {
    id: '3',
    title: 'Software Engineer',
    slug: 'software-engineer',
    type: 'Technical',
    description: 'Learn quantum algorithm implementation, development tools, and programming frameworks'
  },
  {
    id: '4',
    title: 'Financial Analyst',
    slug: 'finance',
    type: 'Technical',
    description: 'Explore quantum applications in trading, risk analysis, and portfolio optimization'
  },
  {
    id: '5',
    title: 'Quantum Chemist',
    slug: 'chemistry',
    type: 'Technical',
    description: 'Apply quantum computing to molecular simulation and materials science research'
  }
]

export default function PersonaPath() {
  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-100">Persona path</h1>
        <p className="text-gray-400 mb-8">Find case studies relevant to your role</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <ContentCard
              key={persona.id}
              title={persona.title}
              type={persona.type}
              path="persona"
              slug={persona.slug}
              description={persona.description}
            />
          ))}
        </div>
      </div>
    </main>
  )
}