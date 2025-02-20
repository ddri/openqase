// src/app/case-studies/page.tsx
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

interface CaseStudy {
  id: string
  title: string
  slug: string
  description: string
  tags: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Portfolio Optimization at Goldman Sachs',
    slug: 'goldman-portfolio-optimization',
    description: 'How Goldman Sachs implemented quantum algorithms for portfolio optimization, achieving better risk-adjusted returns.',
    tags: ['finance', 'optimization', 'QAOA'],
    difficulty: 'Advanced'
  },
  {
    id: '2',
    title: "Volkswagen's Traffic Flow Optimization",
    slug: 'volkswagen-traffic-optimization',
    description: 'Volkswagen\'s implementation of quantum computing for optimizing traffic flow in major cities.',
    tags: ['automotive', 'optimization', 'smart-cities'],
    difficulty: 'Intermediate'
  },
  {
    id: '3',
    title: "Merck's Drug Discovery Breakthrough",
    slug: 'merck-molecular-simulation',
    description: 'How Merck accelerated drug discovery using quantum computing for molecular simulation.',
    tags: ['pharmaceutical', 'chemistry', 'VQE'],
    difficulty: 'Advanced'
  }
  // ... more case studies
]

const getDifficultyStyle = (difficulty: string) => {
  switch(difficulty) {
    case 'Advanced':
      return 'bg-red-900/60 text-red-200'
    case 'Intermediate':
      return 'bg-blue-900/60 text-blue-200'
    default:
      return 'bg-green-900/60 text-green-200'
  }
}

export default function CaseStudies() {
  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Case Studies</h1>
        <p className="text-gray-400 mb-8">Real-world applications of quantum computing in business</p>
        
        <div className="space-y-4">
          {caseStudies.map((study) => (
            <Link 
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="block"
            >
              <div className="flex bg-[#1A1A1D] rounded-lg overflow-hidden border border-gray-800/50 hover:border-copper/50 transition-all duration-300">
                <div className="w-[400px] bg-[#1E1E23] flex items-center justify-center text-gray-600">
                  Case Study Image
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold text-white">{study.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyStyle(study.difficulty)}`}>
                        {study.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4">{study.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {study.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}