// src/app/paths/industry/page.tsx
import ContentCard from '@/components/ContentCard'
import type { Industry } from '@/types'

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
  // ... other industries
]

export default function IndustryPath() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-text-primary">
          Industry path
        </h1>
        <p className="text-text-secondary mb-8">
          Explore quantum computing applications across different sectors
        </p>
        
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

          {/* Placeholder cards */}
          {Array.from({ length: Math.max(0, 8 - industries.length) }).map((_, index) => (
            <div 
              key={`placeholder-${index}`}
              className="block bg-surface-secondary rounded-xl 
                border border-card-border shadow-sm overflow-hidden"
            >
              <div className="aspect-[3/2] bg-surface-tertiary flex items-center justify-center">
                <span className="text-text-tertiary">Industry card</span>
              </div>
              <div className="p-2">
                <div className="mb-1.5">
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] 
                    bg-surface-tertiary text-text-tertiary">
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