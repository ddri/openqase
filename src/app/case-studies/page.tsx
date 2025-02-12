// src/app/case-studies/page.tsx
import Link from 'next/link'
import { CaseStudy } from '@/types'

const caseStudies: Array<Pick<CaseStudy, 'id' | 'title' | 'slug' | 'description' | 'tags' | 'difficulty'>> = [
  {
    id: '1',
    title: 'Portfolio Optimization at Goldman Sachs',
    slug: 'goldman-portfolio-optimization',
    description: 'How Goldman Sachs implemented quantum algorithms for portfolio optimization, achieving better risk-adjusted returns.',
    difficulty: 'Advanced',
    tags: ['finance', 'optimization', 'QAOA']
  },
  {
    id: '2',
    title: 'Volkswagen\'s Traffic Flow Optimization',
    slug: 'volkswagen-traffic-optimization',
    description: 'Volkswagen\'s implementation of quantum computing for optimizing traffic flow in major cities.',
    difficulty: 'Intermediate',
    tags: ['automotive', 'optimization', 'smart-cities']
  },
  {
    id: '3',
    title: 'Merck\'s Drug Discovery Breakthrough',
    slug: 'merck-drug-discovery',
    description: 'How Merck accelerated drug discovery using quantum computing for molecular simulation.',
    difficulty: 'Advanced',
    tags: ['pharmaceutical', 'chemistry', 'VQE']
  },
  {
    id: '4',
    title: 'BP\'s Carbon Capture Optimization',
    slug: 'bp-carbon-capture',
    description: 'BP\'s use of quantum computing to optimize carbon capture and storage processes.',
    difficulty: 'Intermediate',
    tags: ['energy', 'sustainability', 'optimization']
  },
  {
    id: '5',
    title: 'IBM\'s Quantum Risk Analysis',
    slug: 'ibm-risk-analysis',
    description: 'Implementation of quantum algorithms for Monte Carlo simulation in risk analysis.',
    difficulty: 'Advanced',
    tags: ['finance', 'risk-management', 'monte-carlo']
  },
  {
    id: '6',
    title: 'Airbus Aerospace Design',
    slug: 'airbus-aerospace-design',
    description: 'Quantum computing applications in aerospace design and fluid dynamics simulation.',
    difficulty: 'Advanced',
    tags: ['aerospace', 'simulation', 'design']
  },
  {
    id: '7',
    title: 'BASF Materials Discovery',
    slug: 'basf-materials',
    description: 'BASF\'s quantum approach to discovering new materials and catalysts.',
    difficulty: 'Advanced',
    tags: ['chemistry', 'materials', 'simulation']
  },
  {
    id: '8',
    title: 'Quantum Cybersecurity at JPMorgan',
    slug: 'jpmorgan-cybersecurity',
    description: 'JPMorgan\'s preparation for quantum-safe cryptography and security infrastructure.',
    difficulty: 'Intermediate',
    tags: ['finance', 'security', 'cryptography']
  },
  {
    id: '9',
    title: 'ExxonMobil\'s Supply Chain Optimization',
    slug: 'exxon-supply-chain',
    description: 'Quantum solutions for optimizing global supply chain and logistics operations.',
    difficulty: 'Intermediate',
    tags: ['energy', 'logistics', 'optimization']
  },
  {
    id: '10',
    title: 'BMW Manufacturing Optimization',
    slug: 'bmw-manufacturing',
    description: 'Implementation of quantum computing in automotive manufacturing processes.',
    difficulty: 'Advanced',
    tags: ['automotive', 'manufacturing', 'optimization']
  },
  {
    id: '11',
    title: 'Roche Protein Folding Analysis',
    slug: 'roche-protein-folding',
    description: 'Using quantum computing to understand protein folding for drug development.',
    difficulty: 'Advanced',
    tags: ['pharmaceutical', 'biology', 'simulation']
  },
  {
    id: '12',
    title: 'Microsoft Azure Quantum Services',
    slug: 'microsoft-azure-quantum',
    description: 'How Microsoft built and scaled their quantum computing cloud services.',
    difficulty: 'Intermediate',
    tags: ['cloud', 'infrastructure', 'services']
  }
]

export default function CaseStudies() {
  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-100">Case Studies</h1>
        <p className="text-gray-400 mb-8">Real-world applications of quantum computing in business</p>
        
        <div className="space-y-6">
          {caseStudies.map((study) => (
            <Link 
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="block bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex">
                <div className="w-1/3 aspect-[16/9]">
                  <div className="w-full h-full bg-gray-800 rounded-l-xl flex items-center justify-center">
                    <span className="text-gray-400">Case Study Image</span>
                  </div>
                </div>
                <div className="w-2/3 p-6">
                  <h2 className="text-xl font-semibold text-gray-100 mb-2">{study.title}</h2>
                  <p className="text-gray-400 mb-4">{study.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {study.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 bg-gray-800 text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full 
                      ${study.difficulty === 'Advanced' ? 'bg-red-900 text-red-200' : 
                        study.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-green-900 text-green-200'}`}
                    >
                      {study.difficulty}
                    </span>
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