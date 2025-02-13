import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Persona, CaseStudy } from '@/content/types'

interface PageProps {
  params: { slug: string }
}

// Get all possible persona slugs for static paths
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content', 'persona')
  const files = await fs.readdir(contentDir)
  
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      slug: file.replace('.json', '')
    }))
}

// Load persona content
async function getPersona(slug: string): Promise<Persona> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'persona', `${slug}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    notFound()
  }
}

// Load related case studies
async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  const caseStudies = await Promise.all(
    ids.map(async (id) => {
      try {
        const filePath = path.join(process.cwd(), 'content', 'case-study', `${id}.json`)
        const content = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(content) as CaseStudy
      } catch {
        return null
      }
    })
  )

  return caseStudies.filter((study): study is CaseStudy => study !== null)
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const persona = await getPersona(params.slug)
  
  return {
    title: `${persona.title} | OpenQase Quantum Computing`,
    description: persona.description,
    keywords: [
      'quantum computing',
      persona.title.toLowerCase(),
      persona.role.toLowerCase(),
      ...persona.expertise.map(exp => exp.toLowerCase())
    ]
  }
}

export default async function PersonaPage({ params }: PageProps) {
  const persona = await getPersona(params.slug)
  const caseStudies = await getRelatedCaseStudies(persona.relatedCaseStudies)

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Persona Card */}
          <div className="col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-4">
              <div className="aspect-[3/2] bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">{persona.title}</span>
              </div>
              <div className="p-3">
                <div className="mb-1.5">
                  <span className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] 
                    ${persona.type === 'Technical' 
                      ? 'bg-blue-900 text-blue-200' 
                      : 'bg-green-900 text-green-200'
                    }`}
                  >
                    {persona.type}
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
              <h1 className="text-3xl font-bold text-gray-100 mb-6">{persona.title}</h1>
              <div className="space-y-8 text-gray-300">
                <section>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">{persona.description}</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Key Areas of Focus</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {persona.expertise.map((item) => (
                      <li key={item} className="text-gray-300">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Role Overview</h2>
                  <div className="space-y-4">
                    <p>
                      As a {persona.title} in the quantum computing space, your role involves:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Understanding quantum computing applications in {persona.role}</li>
                      <li>Developing expertise in quantum technologies and their implications</li>
                      <li>Staying current with quantum computing developments</li>
                      <li>Applying quantum solutions to domain-specific challenges</li>
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