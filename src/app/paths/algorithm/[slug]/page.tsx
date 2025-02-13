import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Algorithm, CaseStudy } from '@/content/types'

interface PageProps {
  params: { slug: string }
}

// Get all possible algorithm slugs for static paths
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content', 'algorithm')
  const files = await fs.readdir(contentDir)
  
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      slug: file.replace('.json', '')
    }))
}

// Load algorithm content
async function getAlgorithm(slug: string): Promise<Algorithm> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'algorithm', `${slug}.json`)
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
  const algorithm = await getAlgorithm(params.slug)
  
  return {
    title: `${algorithm.title} | OpenQase Quantum Computing`,
    description: algorithm.description,
    keywords: [
      'quantum computing',
      algorithm.title.toLowerCase(),
      ...algorithm.applications.map(app => app.toLowerCase())
    ]
  }
}

export default async function AlgorithmPage({ params }: PageProps) {
  const algorithm = await getAlgorithm(params.slug)
  const caseStudies = await getRelatedCaseStudies(algorithm.relatedCaseStudies)

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Algorithm Card */}
          <div className="col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-4">
              <div className="aspect-[3/2] bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">{algorithm.title}</span>
              </div>
              <div className="p-3">
                <div className="mb-1.5">
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] bg-blue-900 text-blue-200">
                    {algorithm.type}
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
              <h1 className="text-3xl font-bold text-gray-100 mb-6">{algorithm.title}</h1>
              <div className="space-y-8 text-gray-300">
                <section>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">{algorithm.description}</p>
                  </div>
                  <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center">
                      <span className="text-gray-400">Complexity:</span>
                      <code className="ml-3 px-2 py-1 bg-gray-900 rounded text-blue-300 font-mono">
                        {algorithm.complexity}
                      </code>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Prerequisites</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {algorithm.prerequisites.map((item) => (
                      <li key={item} className="text-gray-300">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Applications</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {algorithm.applications.map((item) => (
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