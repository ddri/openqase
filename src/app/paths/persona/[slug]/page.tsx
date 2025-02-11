// src/app/paths/persona/[slug]/page.tsx
import Link from 'next/link'
import { Persona, CaseStudy } from '@/types'

interface PersonaProfileProps {
  params: {
    slug: string
  }
}

// This would typically come from your database
async function getPersonaData(slug: string): Promise<Persona> {
  // Placeholder data
  return {
    id: '1',
    title: 'Business Analyst',
    slug: 'business-analyst',
    description: 'Understanding quantum computing from a business perspective',
    type: 'Technical',
    role: 'Business Analysis',
    expertise: ['Strategy', 'Requirements Analysis', 'Stakeholder Management'],
    relatedCaseStudies: ['case-1', 'case-2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  // Placeholder data
  return ids.map(id => ({
    id,
    title: 'Case Study Example',
    slug: `case-${id}`,
    description: 'Lorem ipsum dolor sit amet...',
    content: 'Full case study content...',
    personas: ['business-analyst'],
    industries: ['finance'],
    algorithms: ['grover'],
    difficulty: 'Beginner' as const,
    tags: ['optimization', 'finance'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }))
}

export default async function PersonaProfile({ params }: PersonaProfileProps) {
  const persona = await getPersonaData(params.slug)
  const caseStudies = await getRelatedCaseStudies(persona.relatedCaseStudies)

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Persona Card */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl overflow-hidden mb-4">
              <div className="aspect-[3/2] bg-gray-400 flex items-center justify-center">
                <span className="text-white">{persona.title}</span>
              </div>
              <div className="p-3">
                <div className="mb-1.5">
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800">
                    {persona.type}
                  </span>
                </div>
              </div>
            </div>
            <Link 
              href="/paths/persona"
              className="inline-block text-sm text-gray-300 hover:text-white transition-colors"
            >
              ← Back
            </Link>
          </div>

          {/* Middle Column - Main Content */}
          <div className="col-span-7">
            <h1 className="text-2xl font-bold text-white mb-4">{persona.title}</h1>
            <div className="space-y-4 text-gray-300">
              <p>{persona.description}</p>
              
              <h2 className="text-xl font-semibold text-white mt-8 mb-4">Expertise</h2>
              <ul className="list-disc list-inside">
                {persona.expertise.map((item) => (
                  <li key={item} className="text-gray-300">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Case Studies */}
          <div className="col-span-3">
            <h2 className="text-xl font-semibold text-white mb-4">Case studies</h2>
            <div className="space-y-4">
              {caseStudies.map((study) => (
                <Link 
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <h3 className="font-medium text-white mb-2">{study.title}</h3>
                  <p className="text-sm text-gray-300">{study.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}