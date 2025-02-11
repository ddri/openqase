// src/app/paths/persona/page.tsx
import ContentCard from '@/components/ContentCard'
import { Persona } from '@/types'

const personas: Persona[] = [
  {
    id: '1',
    title: 'Business Analyst',
    slug: 'business-analyst',
    type: 'Technical' as const,
    description: 'Understanding quantum computing from a business perspective',
    role: 'Business Analysis',
    expertise: ['Strategy', 'Requirements Analysis', 'Stakeholder Management'],
    relatedCaseStudies: ['case-1', 'case-2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Data Scientist',
    slug: 'data-scientist',
    type: 'Technical' as const,
    description: 'Applying quantum algorithms to data analysis',
    role: 'Data Science',
    expertise: ['Machine Learning', 'Quantum Algorithms', 'Data Analysis'],
    relatedCaseStudies: ['case-2', 'case-3'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export default function PersonaPath() {
  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-100">Persona path</h1>
        <p className="text-gray-400 mb-8">Find case studies relevant to your role</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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