// src/app/paths/algorithm/grovers-algorithm/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { Algorithm, CaseStudy } from '@/types'

export const metadata: Metadata = {
  title: 'Grover\'s Algorithm | OpenQase Quantum Computing',
  description: 'Explore Grover\'s Algorithm, a quantum algorithm that provides quadratic speedup for searching unstructured databases. Learn about its applications in optimization, search problems, and database queries.',
  keywords: [
    'Grover\'s Algorithm',
    'quantum search',
    'database search',
    'quantum computing',
    'optimization',
    'amplitude amplification'
  ],
  openGraph: {
    title: 'Grover\'s Algorithm | OpenQase',
    description: 'Discover how Grover\'s Algorithm revolutionizes search problems in quantum computing',
    type: 'article',
    url: 'https://openqase.com/paths/algorithm/grovers-algorithm',
  }
}

const algorithmData: Algorithm = {
  id: '2',
  title: 'Grover\'s Algorithm',
  slug: 'grovers-algorithm',
  description: 'A quantum algorithm that provides quadratic speedup for searching unstructured databases. It transforms the classical O(N) search problem into a quantum O(√N) solution, demonstrating a clear quantum advantage for search and optimization problems.',
  type: 'Technical',
  complexity: 'O(√N)',
  applications: [
    'Unstructured Database Search',
    'Optimization Problems',
    'SAT Problem Solving',
    'Quantum State Preparation',
    'Cryptographic Applications'
  ],
  prerequisites: [
    'Quantum Gates and Circuits',
    'Amplitude Amplification',
    'Oracle Implementation',
    'Linear Algebra Basics',
    'Quantum Measurement Theory'
  ],
  relatedCaseStudies: ['database-search', 'optimization-problems', 'sat-solving'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  return [
    {
      id: 'database-search',
      title: 'Quantum Database Search Implementation',
      slug: 'database-search',
      description: 'Real-world implementation of Grover\'s Algorithm for searching large databases, with performance comparisons to classical methods.',
      content: 'Full case study content...',
      personas: ['developer', 'researcher'],
      industries: ['database', 'computing'],
      algorithms: ['grovers-algorithm'],
      difficulty: 'Intermediate',
      tags: ['search', 'optimization', 'implementation'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'optimization-problems',
      title: 'Solving Optimization Problems',
      slug: 'optimization-problems',
      description: 'Using Grover\'s Algorithm to solve complex optimization problems in logistics and operations research.',
      content: 'Full case study content...',
      personas: ['data-scientist', 'optimization-specialist'],
      industries: ['logistics', 'operations'],
      algorithms: ['grovers-algorithm'],
      difficulty: 'Advanced',
      tags: ['optimization', 'logistics', 'operations-research'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export default async function GroversAlgorithm() {
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