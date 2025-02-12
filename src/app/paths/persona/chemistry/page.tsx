// src/app/paths/persona/chemistry/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { Persona, CaseStudy } from '@/types'

export const metadata: Metadata = {
  title: 'Quantum Chemist | OpenQase Quantum Computing',
  description: 'Explore quantum computing applications in chemistry, molecular simulation, and materials science. Learn about VQE, quantum chemistry algorithms, and chemical reaction modeling.',
  keywords: [
    'quantum chemistry',
    'molecular simulation',
    'VQE',
    'materials science',
    'drug discovery',
    'chemical reactions'
  ],
  openGraph: {
    title: 'Quantum Chemist Perspective | OpenQase',
    description: 'Applying quantum computing to molecular simulation and materials discovery',
    type: 'article',
    url: 'https://openqase.com/paths/persona/chemistry',
  }
}

const personaData: Persona = {
  id: '5',
  title: 'Quantum Chemist',
  slug: 'chemistry',
  type: 'Technical',
  description: 'Apply quantum computing to solve complex molecular simulation problems, discover new materials, and model chemical reactions with unprecedented accuracy.',
  role: 'Chemistry Research',
  expertise: [
    'Molecular Simulation',
    'Quantum Chemistry Algorithms',
    'Materials Discovery',
    'Electronic Structure Calculation',
    'Reaction Mechanism Analysis',
    'Drug Design'
  ],
  relatedCaseStudies: ['molecular-simulation', 'drug-discovery', 'catalyst-design'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  return [
    {
      id: 'molecular-simulation',
      title: 'Complex Molecule Simulation',
      slug: 'molecular-simulation',
      description: 'Using VQE for accurate electronic structure calculations of complex molecules.',
      content: 'Full case study content...',
      personas: ['chemistry'],
      industries: ['chemistry', 'research'],
      algorithms: ['vqe'],
      difficulty: 'Advanced',
      tags: ['molecular-simulation', 'VQE', 'electronic-structure'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'drug-discovery',
      title: 'Quantum Drug Discovery',
      slug: 'drug-discovery',
      description: 'Accelerating drug discovery through quantum simulation of protein-ligand interactions.',
      content: 'Full case study content...',
      personas: ['chemistry'],
      industries: ['pharmaceutical', 'healthcare'],
      algorithms: ['vqe', 'qaoa'],
      difficulty: 'Advanced',
      tags: ['drug-discovery', 'proteins', 'simulation'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'catalyst-design',
      title: 'Novel Catalyst Design',
      slug: 'catalyst-design',
      description: 'Quantum approaches to designing efficient catalysts for chemical reactions.',
      content: 'Full case study content...',
      personas: ['chemistry'],
      industries: ['chemistry', 'materials'],
      algorithms: ['vqe'],
      difficulty: 'Advanced',
      tags: ['catalysis', 'materials', 'design'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export default async function ChemistryPersona() {
  const caseStudies = await getRelatedCaseStudies(personaData.relatedCaseStudies)

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Persona Card */}
          <div className="col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-4">
              <div className="aspect-[3/2] bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">{personaData.title}</span>
              </div>
              <div className="p-3">
                <div className="mb-1.5">
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] bg-blue-900 text-blue-200">
                    {personaData.type}
                  </span>
                </div>
              </div>
            </div>
            <Link 
              href="/paths/persona"
              className="inline-block text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              ← Back to Personas
            </Link>
          </div>

          {/* Middle Column - Main Content */}
          <div className="col-span-7">
            <article>
              <h1 className="text-3xl font-bold text-gray-100 mb-6">{personaData.title}</h1>
              <div className="space-y-8 text-gray-300">
                <section>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">{personaData.description}</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Research Areas</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {personaData.expertise.map((item) => (
                      <li key={item} className="text-gray-300">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Quantum Chemistry Applications</h2>
                  <div className="space-y-4">
                    <p>
                      Key applications in chemistry and materials science:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Electronic structure calculations for complex molecules</li>
                      <li>Protein folding and drug-protein interactions</li>
                      <li>Design of new catalysts and materials</li>
                      <li>Chemical reaction pathway analysis</li>
                      <li>Battery and energy storage materials</li>
                      <li>Quantum molecular dynamics</li>
                    </ul>
                  </div>
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