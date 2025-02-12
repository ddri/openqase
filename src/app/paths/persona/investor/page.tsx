// src/app/paths/persona/investor/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { Persona, CaseStudy } from '@/types'

export const metadata: Metadata = {
  title: 'Investment Professional | OpenQase Quantum Computing',
  description: 'Understand quantum computing investment opportunities, market analysis, and strategic considerations for venture capital and investment decisions.',
  keywords: [
    'quantum computing investment',
    'venture capital',
    'market analysis',
    'quantum startups',
    'investment strategy'
  ],
  openGraph: {
    title: 'Investment Professional Perspective | OpenQase',
    description: 'Evaluating quantum computing market opportunities and investment strategies',
    type: 'article',
    url: 'https://openqase.com/paths/persona/investor',
  }
}

const personaData: Persona = {
  id: '2',
  title: 'Investment Professional',
  slug: 'investor',
  type: 'Persona',
  description: 'Navigate the quantum computing investment landscape, from early-stage startups to established players, understanding market trends and technological milestones.',
  role: 'Investment and Strategy',
  expertise: [
    'Market Analysis',
    'Technology Assessment',
    'Risk Evaluation',
    'Investment Strategy',
    'Due Diligence',
    'Portfolio Management'
  ],
  relatedCaseStudies: ['startup-evaluation', 'market-analysis', 'hardware-vs-software'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  return [
    {
      id: 'startup-evaluation',
      title: 'Quantum Startup Evaluation Framework',
      slug: 'startup-evaluation',
      description: 'A systematic approach to evaluating quantum computing startups and their technological claims.',
      content: 'Full case study content...',
      personas: ['investor'],
      industries: ['venture-capital', 'technology'],
      algorithms: [],
      difficulty: 'Intermediate',
      tags: ['startup', 'investment', 'evaluation'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'market-analysis',
      title: 'Quantum Computing Market Landscape',
      slug: 'market-analysis',
      description: 'Analysis of the quantum computing market segments, growth projections, and key players.',
      content: 'Full case study content...',
      personas: ['investor'],
      industries: ['market-research', 'technology'],
      algorithms: [],
      difficulty: 'Beginner',
      tags: ['market-analysis', 'trends', 'strategy'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'hardware-vs-software',
      title: 'Hardware vs Software Investment Strategy',
      slug: 'hardware-vs-software',
      description: 'Comparing investment opportunities in quantum hardware and software sectors.',
      content: 'Full case study content...',
      personas: ['investor'],
      industries: ['technology', 'venture-capital'],
      algorithms: [],
      difficulty: 'Advanced',
      tags: ['hardware', 'software', 'strategy'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export default async function InvestorPersona() {
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
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Investment Considerations</h2>
                  <div className="space-y-4">
                    <p>
                      Investment professionals in quantum computing need to consider:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Technical milestones and development timelines</li>
                      <li>Market readiness and adoption curves</li>
                      <li>Competition and intellectual property landscape</li>
                      <li>Team expertise and technical capabilities</li>
                      <li>Hardware vs. software investment trade-offs</li>
                      <li>Exit strategies and commercialization paths</li>
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