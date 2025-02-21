// src/app/paths/persona/software-engineer/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { Persona, CaseStudy } from '@/types'

export const metadata: Metadata = {
  title: 'Software Engineer | OpenQase Quantum Computing',
  description: 'Explore quantum computing from a software development perspective, including quantum algorithms, development tools, and programming frameworks.',
  keywords: [
    'quantum software development',
    'quantum programming',
    'quantum algorithms',
    'Qiskit',
    'Cirq',
    'quantum frameworks'
  ],
  openGraph: {
    title: 'Software Engineer Perspective | OpenQase',
    description: 'Building quantum applications and implementing quantum algorithms',
    type: 'article',
    url: 'https://openqase.com/paths/persona/software-engineer',
  }
}

const personaData: Persona = {
  id: '3',
  title: 'Software Engineer',
  slug: 'software-engineer',
  type: 'Technical',
  description: 'Learn how to develop quantum applications, implement algorithms, and use quantum development frameworks to build the next generation of quantum software.',
  role: 'Software Development',
  expertise: [
    'Quantum Algorithm Implementation',
    'Quantum Development Frameworks',
    'Circuit Design and Optimization',
    'Error Mitigation Techniques',
    'Classical-Quantum Integration',
    'Testing and Validation'
  ],
  relatedCaseStudies: ['algorithm-implementation', 'hybrid-architecture', 'error-mitigation'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  return [
    {
      id: 'algorithm-implementation',
      title: 'Implementing VQE in Qiskit',
      slug: 'algorithm-implementation',
      description: 'Step-by-step guide to implementing the Variational Quantum Eigensolver algorithm.',
      content: 'Full case study content...',
      personas: ['software-engineer'],
      industries: ['quantum-computing'],
      algorithms: ['vqe'],
      difficulty: 'Advanced',
      tags: ['implementation', 'Qiskit', 'VQE'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'hybrid-architecture',
      title: 'Hybrid Quantum-Classical Systems',
      slug: 'hybrid-architecture',
      description: 'Designing and implementing hybrid quantum-classical software architectures.',
      content: 'Full case study content...',
      personas: ['software-engineer'],
      industries: ['software-development'],
      algorithms: ['qaoa'],
      difficulty: 'Intermediate',
      tags: ['architecture', 'hybrid', 'design'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'error-mitigation',
      title: 'Error Mitigation Strategies',
      slug: 'error-mitigation',
      description: 'Implementing error mitigation techniques in quantum algorithms.',
      content: 'Full case study content...',
      personas: ['software-engineer'],
      industries: ['quantum-computing'],
      algorithms: [],
      difficulty: 'Advanced',
      tags: ['error-mitigation', 'NISQ', 'optimization'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export default async function SoftwareEngineerPersona() {
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
              href="/paths/personas"
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
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Technical Skills</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {personaData.expertise.map((item) => (
                      <li key={item} className="text-gray-300">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Development Tools</h2>
                  <div className="space-y-4">
                    <p>
                      Key quantum development frameworks and tools:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Qiskit - IBM{'&apos;'}s open-source framework</li>
                      <li>Cirq - Google{'&apos;'}s quantum programming framework</li>
                      <li>Q# - Microsoft{'&apos;'}s quantum development kit</li>
                      <li>Pennylane - Cross-platform quantum ML framework</li>
                      <li>pyQuil - Rigetti{'&apos;'}s Python framework</li>
                      <li>Amazon Braket - AWS quantum service SDK</li>
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