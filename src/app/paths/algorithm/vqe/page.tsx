// src/app/paths/algorithm/vqe/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { Algorithm, CaseStudy } from '@/types'

export const metadata: Metadata = {
  title: 'VQE (Variational Quantum Eigensolver) | OpenQase Quantum Computing',
  description: 'Learn about the Variational Quantum Eigensolver (VQE), a hybrid quantum-classical algorithm for simulating quantum systems and solving optimization problems in chemistry and materials science.',
  keywords: [
    'VQE',
    'Variational Quantum Eigensolver',
    'quantum chemistry',
    'hybrid algorithms',
    'molecular simulation',
    'quantum optimization'
  ],
  openGraph: {
    title: 'VQE (Variational Quantum Eigensolver) | OpenQase',
    description: 'Explore how VQE combines quantum and classical computing for molecular simulation and optimization',
    type: 'article',
    url: 'https://openqase.com/paths/algorithm/vqe',
  }
}

const algorithmData: Algorithm = {
  id: '3',
  title: 'Variational Quantum Eigensolver (VQE)',
  slug: 'vqe',
  description: 'A hybrid quantum-classical algorithm designed to find the ground state energy of molecular and chemical systems. VQE combines the power of quantum computers with classical optimization techniques, making it particularly well-suited for near-term quantum devices.',
  type: 'Technical',
  complexity: 'O(N⁴) for molecular systems, variable based on ansatz',
  applications: [
    'Molecular Energy Calculations',
    'Quantum Chemistry Simulations',
    'Materials Science Research',
    'Drug Discovery',
    'Catalyst Design',
    'Optimization Problems'
  ],
  prerequisites: [
    'Quantum Mechanics Basics',
    'Linear Algebra',
    'Classical Optimization Methods',
    'Quantum Circuit Design',
    'Understanding of Ansatz Construction'
  ],
  relatedCaseStudies: ['molecular-simulation', 'drug-discovery', 'material-design'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  return [
    {
      id: 'molecular-simulation',
      title: 'Simulating H₂ Molecule with VQE',
      slug: 'molecular-simulation',
      description: 'Step-by-step implementation of VQE to calculate the ground state energy of a hydrogen molecule.',
      content: 'Full case study content...',
      personas: ['chemist', 'researcher'],
      industries: ['chemistry', 'quantum-computing'],
      algorithms: ['vqe'],
      difficulty: 'Advanced',
      tags: ['chemistry', 'simulation', 'molecules'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'drug-discovery',
      title: 'VQE in Drug Discovery',
      slug: 'drug-discovery',
      description: 'Using VQE to predict molecular properties for drug candidate screening.',
      content: 'Full case study content...',
      personas: ['pharmaceutical-researcher', 'quantum-chemist'],
      industries: ['pharmaceutical', 'healthcare'],
      algorithms: ['vqe'],
      difficulty: 'Advanced',
      tags: ['drug-discovery', 'pharmaceuticals', 'molecular-properties'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'material-design',
      title: 'New Materials Discovery',
      slug: 'material-design',
      description: 'Applying VQE to discover and characterize novel materials for energy applications.',
      content: 'Full case study content...',
      personas: ['materials-scientist', 'researcher'],
      industries: ['materials', 'energy'],
      algorithms: ['vqe'],
      difficulty: 'Advanced',
      tags: ['materials-science', 'energy', 'sustainability'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export default async function VQEAlgorithm() {
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