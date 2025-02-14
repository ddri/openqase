import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import type { CaseStudy } from '@/types'

interface PageProps {
  params: {
    slug: string
  }
}

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  // This would typically fetch from a database
  // For now returning mock data matching our CaseStudy type
  const caseStudies: Record<string, CaseStudy> = {
    'volkswagen-traffic-optimization': {
      id: '2',
      title: "Volkswagen's Traffic Flow Optimization",
      slug: 'volkswagen-traffic-optimization',
      description: 'Volkswagen\'s implementation of quantum computing for optimizing traffic flow in major cities.',
      content: 'Full case study content...',
      personas: ['engineer', 'researcher'],
      industries: ['automotive', 'smart-cities'],
      algorithms: ['qaoa'],
      tags: ['automotive', 'optimization', 'smart-cities'],
      difficulty: 'Intermediate',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Add other case studies here...
  }

  return caseStudies[slug] || null
}

const getDifficultyStyle = (difficulty: CaseStudy['difficulty']): string => {
  switch(difficulty) {
    case 'Advanced':
      return 'bg-red-900/60 text-red-200'
    case 'Intermediate':
      return 'bg-blue-900/60 text-blue-200'
    default:
      return 'bg-green-900/60 text-green-200'
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const caseStudy = await getCaseStudy(params.slug)

  if (!caseStudy) {
    // Handle 404 case
    return (
      <main className="min-h-screen bg-[#0C0C0D] p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Case Study Not Found</h1>
          <Link 
            href="/case-studies"
            className="text-gray-400 hover:text-copper transition-colors"
          >
            ← Back to Case Studies
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
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
                  <p className="text-gray-300">{caseStudy.description}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Challenge</h2>
                  <p className="text-gray-300">
                    {/* Challenge content would come from caseStudy.content, properly structured */}
                    Content to be structured from database...
                  </p>
                </section>
              </TabsContent>

              <TabsContent value="technical" className="space-y-6 mt-6">
                {/* Technical content sections */}
              </TabsContent>

              <TabsContent value="impact" className="space-y-6 mt-6">
                {/* Impact content sections */}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-[#1A1A1D] rounded-lg border border-gray-800 p-6 space-y-6 sticky top-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Related Algorithms</h3>
                <ul className="space-y-2 text-gray-300">
                  {caseStudy.algorithms.map(algo => (
                    <li key={algo}>• {algo}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Industries</h3>
                <ul className="space-y-2 text-gray-300">
                  {caseStudy.industries.map(industry => (
                    <li key={industry}>• {industry}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map(tag => (
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
    </main>
  )
}