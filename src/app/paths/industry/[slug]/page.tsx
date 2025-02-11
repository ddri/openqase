// src/app/paths/industry/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Industry, CaseStudy } from '@/lib/types'

interface IndustryProfileProps {
  params: {
    slug: string
  }
}

// This would typically come from your database
async function getIndustryData(slug: string): Promise<Industry | null> {
  // Placeholder data
  const industries: Record<string, Industry> = {
    'finance': {
      id: '1',
      title: 'Finance & Banking',
      slug: 'finance',
      description: 'Quantum applications in financial services',
      type: 'Technical',
      sector: 'Financial Services',
      keyApplications: [
        'Portfolio Optimization',
        'Risk Analysis',
        'Trading Strategies',
        'Fraud Detection'
      ],
      relatedCaseStudies: ['case-1', 'case-2'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
  
  return industries[slug] || null
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  return ids.map(id => ({
    id,
    title: 'Example Case Study',
    slug: `case-${id}`,
    description: 'Exploring quantum computing applications in risk analysis',
    content: 'Full case study content...',
    personas: ['business-analyst'],
    industries: ['finance'],
    algorithms: ['vqe'],
    difficulty: 'Intermediate',
    tags: ['finance', 'optimization'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }))
}

export default async function IndustryProfile({ params }: IndustryProfileProps) {
  const industry = await getIndustryData(params.slug)
  
  if (!industry) {
    notFound()
  }

  const caseStudies = await getRelatedCaseStudies(industry.relatedCaseStudies)

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Industry Card */}
          <div className="col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-4">
              <div className="aspect-[3/2] bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">Industry card</span>
              </div>
              <div className="p-3">
                <div className="mb-1.5">
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] bg-blue-900 text-blue-200">
                    {industry.type}
                  </span>
                </div>
              </div>
            </div>
            <Link 
              href="/paths/industry"
              className="inline-block text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              ← Back
            </Link>
          </div>

          {/* Middle Column - Main Content */}
          <div className="col-span-7">
            <h1 className="text-2xl font-bold text-gray-100 mb-4">Group title</h1>
            <div className="space-y-6 text-gray-300">
              <div>
                <h2 className="text-xl font-semibold text-gray-100 mb-3">Industry Overview</h2>
                <p>{industry.description}</p>
                <p className="mt-4">
                  Quantum computing offers significant advantages in {industry.sector.toLowerCase()}, 
                  particularly in areas requiring complex calculations and optimization.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-100 mb-3">Key Applications</h2>
                <ul className="list-disc list-inside space-y-2">
                  {industry.keyApplications.map((app) => (
                    <li key={app} className="text-gray-300">{app}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Case Studies */}
          <div className="col-span-3">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Case studies</h2>
            <div className="space-y-4">
              {caseStudies.map((study) => (
                <Link 
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  className="block p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition-all"
                >
                  <h3 className="font-medium text-gray-100 mb-2">{study.title}</h3>
                  <p className="text-sm text-gray-400">{study.description}</p>
                  <div className="mt-2 flex gap-2">
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
          </div>
        </div>
      </div>
    </main>
  )
}