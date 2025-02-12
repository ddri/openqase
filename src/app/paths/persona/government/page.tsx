// src/app/paths/persona/government/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { Persona, CaseStudy } from '@/types'

export const metadata: Metadata = {
  title: 'Government Policy Maker | OpenQase Quantum Computing',
  description: 'Explore quantum computing implications for government policy, national security, and research funding decisions.',
  keywords: [
    'quantum policy',
    'government',
    'national security',
    'research funding',
    'quantum strategy'
  ],
  openGraph: {
    title: 'Government Policy Maker Perspective | OpenQase',
    description: 'Understanding quantum computing impact on national security and policy',
    type: 'article',
    url: 'https://openqase.com/paths/persona/government',
  }
}

const personaData: Persona = {
  id: '1',
  title: 'Government Policy Maker',
  slug: 'government',
  type: 'Persona',
  description: 'Understand the strategic implications of quantum computing for government policy, national security, and research funding allocation.',
  role: 'Government and Policy',
  expertise: [
    'Policy Development',
    'Research Funding Allocation',
    'National Security Strategy',
    'International Collaboration',
    'Technology Assessment'
  ],
  relatedCaseStudies: ['national-security', 'research-funding', 'international-standards'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  return [
    {
      id: 'national-security',
      title: 'Post-Quantum Cryptography Transition',
      slug: 'national-security',
      description: 'Strategic planning for national cryptographic infrastructure in the quantum era.',
      content: 'Full case study content...',
      personas: ['government'],
      industries: ['government', 'cybersecurity'],
      algorithms: ['shors-algorithm'],
      difficulty: 'Intermediate',
      tags: ['security', 'cryptography', 'policy'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'research-funding',
      title: 'Quantum Research Funding Strategy',
      slug: 'research-funding',
      description: 'Developing effective funding frameworks for quantum computing research initiatives.',
      content: 'Full case study content...',
      personas: ['government', 'researcher'],
      industries: ['government', 'academia'],
      algorithms: [],
      difficulty: 'Beginner',
      tags: ['funding', 'research', 'strategy'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'international-standards',
      title: 'International Quantum Standards',
      slug: 'international-standards',
      description: 'Coordinating international efforts in quantum computing standards and protocols.',
      content: 'Full case study content...',
      personas: ['government'],
      industries: ['government', 'standardization'],
      algorithms: [],
      difficulty: 'Advanced',
      tags: ['standards', 'international', 'collaboration'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export default async function GovernmentPersona() {
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
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] bg-green-900 text-green-200">
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
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Key Areas of Focus</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {personaData.expertise.map((item) => (
                      <li key={item} className="text-gray-300">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Strategic Considerations</h2>
                  <div className="space-y-4">
                    <p>
                      Government policy makers play a crucial role in shaping the quantum computing landscape through:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Developing national quantum strategies and roadmaps</li>
                      <li>Allocating research funding and resources</li>
                      <li>Establishing regulatory frameworks and standards</li>
                      <li>Ensuring national security preparedness</li>
                      <li>Fostering international collaboration and competition</li>
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