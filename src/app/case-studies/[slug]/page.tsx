import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { CaseStudy, Algorithm, Persona } from '@/content/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Get all possible case study slugs for static paths
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content', 'case-study')
  const files = await fs.readdir(contentDir)
  
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      slug: file.replace('.json', '')
    }))
}

// Load case study content
async function getCaseStudy(slug: string): Promise<CaseStudy> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'case-study', `${slug}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    notFound()
  }
}

// Load related algorithms
async function getRelatedAlgorithms(ids: string[]): Promise<Algorithm[]> {
  const algorithms = await Promise.all(
    ids.map(async (id) => {
      try {
        const filePath = path.join(process.cwd(), 'content', 'algorithm', `${id}.json`)
        const content = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(content) as Algorithm
      } catch {
        return null
      }
    })
  )

  return algorithms.filter((algo): algo is Algorithm => algo !== null)
}

// Load related personas
async function getRelatedPersonas(ids: string[]): Promise<Persona[]> {
  const personas = await Promise.all(
    ids.map(async (id) => {
      try {
        const filePath = path.join(process.cwd(), 'content', 'persona', `${id}.json`)
        const content = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(content) as Persona
      } catch {
        return null
      }
    })
  )

  return personas.filter((persona): persona is Persona => persona !== null)
}

// Get difficulty style
const getDifficultyStyle = (difficulty: string) => {
  switch(difficulty) {
    case 'Advanced':
      return 'bg-red-900/60 text-red-200'
    case 'Intermediate':
      return 'bg-blue-900/60 text-blue-200'
    default:
      return 'bg-green-900/60 text-green-200'
  }
}

// Generate metadata for SEO
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const caseStudy = await getCaseStudy(params.slug)

  return {
    title: `${caseStudy.title} | OpenQase Case Studies`,
    description: caseStudy.description,
    keywords: [
      'quantum computing',
      'case study',
      ...caseStudy.industries,
      ...caseStudy.tags
    ]
  }
}

export default async function CaseStudyPage(props: PageProps) {
  const params = await props.params;
  const caseStudy = await getCaseStudy(params.slug)
  const algorithms = await getRelatedAlgorithms(caseStudy.algorithms)
  const personas = await getRelatedPersonas(caseStudy.personas)

  return (
    (<main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/case-studies"
            className="text-gray-400 hover:text-copper transition-colors"
          >
            ← Back to Case Studies
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold text-white">{caseStudy.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyStyle(caseStudy.difficulty)}`}>
              {caseStudy.difficulty}
            </span>
          </div>
          <div className="flex gap-2 mb-6">
            {caseStudy.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="bg-gray-900 border border-gray-800">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="technical">Technical Details</TabsTrigger>
                <TabsTrigger value="impact">Impact & Results</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Project Overview</h2>
                  <p className="text-gray-300">{caseStudy.content}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Industry Context</h2>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      This case study demonstrates quantum computing applications in:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      {caseStudy.industries.map((industry) => (
                        <li key={industry}>{industry}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="technical" className="space-y-6 mt-6">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Technical Implementation</h2>
                  <div className="space-y-4">
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Related Algorithms</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {algorithms.map((algorithm) => (
                          <li key={algorithm.id}>
                            <Link 
                              href={`/paths/algorithm/${algorithm.slug}`}
                              className="hover:text-copper transition-colors"
                            >
                              {algorithm.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="impact" className="space-y-6 mt-6">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Results & Impact</h2>
                  {caseStudy.metrics && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {Object.entries(caseStudy.metrics).map(([key, value]) => (
                        <Card key={key} className="bg-gray-900/50 border-gray-800 p-6">
                          <h3 className="text-lg font-semibold text-copper mb-2">
                            {key.split(/(?=[A-Z])/).join(' ')}
                          </h3>
                          <p className="text-4xl font-bold text-white">{value}</p>
                        </Card>
                      ))}
                    </div>
                  )}
                </section>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-[#1A1A1D] rounded-lg border border-gray-800 p-6 space-y-6 sticky top-8">
              {caseStudy.technologies && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Technologies Used</h3>
                  <ul className="space-y-2 text-gray-300">
                    {caseStudy.technologies.map((tech) => (
                      <li key={tech}>• {tech}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Relevant For</h3>
                <div className="space-y-2">
                  {personas.map((persona) => (
                    <Link
                      key={persona.id}
                      href={`/paths/persona/${persona.slug}`}
                      className="block p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-gray-300">{persona.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag) => (
                    <Badge 
                      key={tag}
                      className="bg-gray-900 text-gray-300 hover:bg-gray-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>)
  );
}