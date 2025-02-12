// src/app/paths/algorithm/qaoa/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { Algorithm, CaseStudy } from '@/types'

export const metadata: Metadata = {
  title: 'QAOA (Quantum Approximate Optimization Algorithm) | OpenQase Quantum Computing',
  description: 'Explore the Quantum Approximate Optimization Algorithm (QAOA), a hybrid quantum-classical algorithm designed for solving combinatorial optimization problems on NISQ devices.',
  keywords: [
    'QAOA',
    'quantum optimization',
    'combinatorial problems',
    'MaxCut',
    'NISQ algorithms',
    'hybrid quantum-classical'
  ],
  openGraph: {
    title: 'QAOA (Quantum Approximate Optimization Algorithm) | OpenQase',
    description: 'Learn how QAOA tackles complex optimization problems using quantum computing',
    type: 'article',
    url: 'https://openqase.com/paths/algorithm/qaoa',
  }
}

const algorithmData: Algorithm = {
  id: '4',
  title: 'Quantum Approximate Optimization Algorithm (QAOA)',
  slug: 'qaoa',
  description: 'A hybrid quantum-classical algorithm specifically designed for solving combinatorial optimization problems on near-term quantum devices. QAOA combines quantum and classical processing to find approximate solutions to problems that are computationally challenging for classical computers.',
  type: 'Technical',
  complexity: 'Variable (depends on circuit depth p and problem size)',
  applications: [
    'Maximum Cut Problems',
    'Portfolio Optimization',
    'Traffic Flow Optimization',
    'Network Design',
    'Resource Allocation',
    'Vehicle Routing Problems'
  ],
  prerequisites: [
    'Quantum Mechanics Fundamentals',
    'Combinatorial Optimization',
    'Hamiltonian Evolution',
    'Classical Optimization Methods',
    'Graph Theory Basics'
  ],
  relatedCaseStudies: ['maxcut-study', 'portfolio-opt', 'traffic-routing'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  return [
    {
      id: 'maxcut-study',
      title: 'MaxCut Problem Solution using QAOA',
      slug: 'maxcut-study',
      description: 'Implementing QAOA to solve the Maximum Cut problem on real quantum hardware.',
      content: 'Full case study content...',
      personas: ['researcher', 'optimization-specialist'],
      industries: ['computer-science', 'quantum-computing'],
      algorithms: ['qaoa'],
      difficulty: 'Advanced',
      tags: ['MaxCut', 'optimization', 'implementation'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'portfolio-opt',
      title: 'Financial Portfolio Optimization',
      slug: 'portfolio-opt',
      description: 'Using QAOA for portfolio optimization in financial markets.',
      content: 'Full case study content...',
      personas: ['financial-analyst', 'quant-researcher'],
      industries: ['finance', 'investment'],
      algorithms: ['qaoa'],
      difficulty: 'Advanced',
      tags: ['finance', 'portfolio', 'optimization'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'traffic-routing',
      title: 'Smart City Traffic Optimization',
      slug: 'traffic-routing',
      description: 'Applying QAOA to optimize traffic flow in urban environments.',
      content: 'Full case study content...',
      personas: ['urban-planner', 'transportation-engineer'],
      industries: ['transportation', 'smart-cities'],
      algorithms: ['qaoa'],
      difficulty: 'Intermediate',
      tags: ['smart-cities', 'traffic', 'routing'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export default async function QAOAAlgorithm() {
  const caseStudies = await getRelatedCaseStudies(algorithmData.relatedCaseStudies)

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Algorithm Card */}
          <div className="col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-4">
              <div className="aspect-[3/2] bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">{algorithmData.title}</span>
              </div>
              <div className="p-3">
                <div className="mb-1.5">
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] bg-blue-900 text-blue-200">
                    {algorithmData.type}
                  </span>
                </div>
              </div>
            </div>
            <Link 
              href="/paths/algorithm"
              className="inline-block text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              ← Back to Algorithms
            </Link>
          </div>

          {/* Middle Column - Main Content */}
          <div className="col-span-7">
            <article>
              <h1 className="text-3xl font-bold text-gray-100 mb-6">{algorithmData.title}</h1>
              <div className="space-y-8 text-gray-300">
                <section>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">{algorithmData.description}</p>
                  </div>
                  <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center">
                      <span className="text-gray-400">Complexity:</span>
                      <code className="ml-3 px-2 py-1 bg-gray-900 rounded text-blue-300 font-mono">
                        {algorithmData.complexity}
                      </code>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Prerequisites</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {algorithmData.prerequisites.map((item) => (
                      <li key={item} className="text-gray-300">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Applications</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {algorithmData.applications.map((item) => (
                      <li key={item} className="text-gray-300">{item}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </article>
          </div>

          {/* Right Column - Case Studies */}
          <div className="col-span-3">
            <aside>
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Related Case Studies</h2>
              <div className="space-y-4">
                {caseStudies.map((study) => (
                  <Link 
                    key={study.id}
                    href={`/case-studies/${study.slug}`}
                    className="block p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition-all"
                  >
                    <h3 className="font-medium text-gray-100 mb-2">{study.title}</h3>
                    <p className="text-sm text-gray-400">{study.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 bg-gray-800 text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}