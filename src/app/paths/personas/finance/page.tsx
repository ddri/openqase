// src/app/paths/persona/finance/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { Persona, CaseStudy } from '@/types'

export const metadata: Metadata = {
  title: 'Financial Analyst | OpenQase Quantum Computing',
  description: 'Discover how quantum computing transforms financial modeling, portfolio optimization, and risk analysis in the finance industry.',
  keywords: [
    'quantum finance',
    'portfolio optimization',
    'risk analysis',
    'financial modeling',
    'quantum algorithms finance',
    'trading strategies'
  ],
  openGraph: {
    title: 'Financial Analyst Perspective | OpenQase',
    description: 'Quantum computing applications in finance and trading',
    type: 'article',
    url: 'https://openqase.com/paths/persona/finance',
  }
}

const personaData: Persona = {
  id: '4',
  title: 'Financial Analyst',
  slug: 'finance',
  type: 'Technical',
  description: 'Leverage quantum computing for advanced financial modeling, portfolio optimization, and risk analysis to gain competitive advantages in financial markets.',
  role: 'Financial Analysis',
  expertise: [
    'Portfolio Optimization',
    'Risk Management',
    'Derivatives Pricing',
    'Trading Strategies',
    'Asset Allocation',
    'Monte Carlo Simulation'
  ],
  relatedCaseStudies: ['portfolio-optimization', 'risk-analysis', 'derivatives-pricing'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  return [
    {
      id: 'portfolio-optimization',
      title: 'Quantum Portfolio Optimization',
      slug: 'portfolio-optimization',
      description: 'Using QAOA for portfolio optimization and asset allocation strategies.',
      content: 'Full case study content...',
      personas: ['finance'],
      industries: ['finance', 'investment'],
      algorithms: ['qaoa'],
      difficulty: 'Advanced',
      tags: ['portfolio', 'optimization', 'QAOA'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'risk-analysis',
      title: 'Quantum Risk Analysis',
      slug: 'risk-analysis',
      description: 'Implementing quantum algorithms for improved Monte Carlo simulations in risk assessment.',
      content: 'Full case study content...',
      personas: ['finance'],
      industries: ['finance', 'risk-management'],
      algorithms: ['qae'],
      difficulty: 'Advanced',
      tags: ['risk', 'monte-carlo', 'simulation'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'derivatives-pricing',
      title: 'Quantum Options Pricing',
      slug: 'derivatives-pricing',
      description: 'Quantum approaches to derivatives pricing and financial instrument valuation.',
      content: 'Full case study content...',
      personas: ['finance'],
      industries: ['finance'],
      algorithms: ['amplitude-estimation'],
      difficulty: 'Advanced',
      tags: ['derivatives', 'pricing', 'options'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export default async function FinancialAnalystPersona() {
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
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Key Applications</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {personaData.expertise.map((item) => (
                      <li key={item} className="text-gray-300">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Quantum Advantage in Finance</h2>
                  <div className="space-y-4">
                    <p>
                      Key areas where quantum computing provides advantages:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Faster portfolio optimization with multiple constraints</li>
                      <li>More accurate pricing for complex derivatives</li>
                      <li>Enhanced risk assessment through quantum simulation</li>
                      <li>Improved fraud detection algorithms</li>
                      <li>Real-time trading strategy optimization</li>
                      <li>Large-scale Monte Carlo simulations</li>
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