// src/app/paths/industry/page.tsx
import ContentCard from '@/components/ContentCard'
import { Industry } from '@/types'

// This would typically come from your database
const industries: Industry[] = [
  {
    id: '1',
    title: 'Finance',
    slug: 'finance',
    type: 'Technical',
    description: 'Applications in financial modeling and risk analysis',
    sector: 'Financial Services',
    keyApplications: ['Portfolio Optimization', 'Risk Analysis'],
    relatedCaseStudies: ['case-1'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Healthcare',
    slug: 'healthcare',
    type: 'Persona',
    description: 'Drug discovery and medical research applications',
    sector: 'Healthcare',
    keyApplications: ['Drug Discovery', 'Protein Folding'],
    relatedCaseStudies: ['case-2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Add more industries to fill the grid
]

export default function IndustryPath() {
  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-100">Industry path</h1>
        <p className="text-gray-400 mb-8">Explore quantum computing applications across different sectors</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <ContentCard
              key={industry.id}
              title={industry.title}
              type={industry.type}
              path="industry"
              slug={industry.slug}
              description={industry.description}
            />
          ))}

          {/* Placeholder cards to maintain grid layout */}
          {Array.from({ length: Math.max(0, 8 - industries.length) }).map((_, index) => (
            <div 
              key={`placeholder-${index}`}
              className="block bg-gray-900/50 rounded-xl border border-gray-800 shadow-lg overflow-hidden"
            >
              <div className="aspect-[3/2] bg-gray-800/50 flex items-center justify-center">
                <span className="text-gray-600">Industry card</span>
              </div>
              <div className="p-3">
                <div className="mb-1.5">
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] bg-gray-800 text-gray-400">
                    {index % 3 === 0 ? 'Technical' : 'Persona'}
                  </span>
                </div>
                <div className="h-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}