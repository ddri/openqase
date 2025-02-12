// src/app/paths/algorithm/[slug]/page.tsx
import Link from 'next/link'
import { Metadata } from 'next'
import { Algorithm, CaseStudy } from '@/types'

// Updated interface to match Next.js Page Props
interface AlgorithmProfileProps {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getAlgorithmData(slug: string): Promise<Algorithm> {
  // Placeholder data - in real implementation, this would fetch from a database
  return {
    id: '1',
    title: 'Shor\'s Algorithm',
    slug: 'shors-algorithm',
    description: 'A quantum algorithm for integer factorization',
    type: 'Technical',
    complexity: 'O(log N)',
    applications: [
      'Cryptography',
      'Number Theory',
      'RSA Breaking'
    ],
    prerequisites: [
      'Quantum Fourier Transform',
      'Modular Arithmetic',
      'Basic Quantum Gates'
    ],
    relatedCaseStudies: ['case-1', 'case-2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  // Placeholder data - in real implementation, this would fetch from a database
  return ids.map(id => ({
    id,
    title: 'Case Study Example',
    slug: `case-${id}`,
    description: 'Implementation and practical applications',
    content: 'Full case study content...',
    personas: ['researcher'],
    industries: ['cryptography'],
    algorithms: ['shors-algorithm'],
    difficulty: 'Advanced' as const,
    tags: ['cryptography', 'factorization'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }))
}

// Metadata generation for SEO
export async function generateMetadata(props: AlgorithmProfileProps): Promise<Metadata> {
  const params = await props.params;
  const algorithm = await getAlgorithmData(params.slug)

  return {
    title: `${algorithm.title} | OpenQase Quantum Algorithms`,
    description: algorithm.description,
    keywords: [
      'quantum algorithm',
      algorithm.title.toLowerCase(),
      ...algorithm.applications
    ],
    openGraph: {
      title: `${algorithm.title} | OpenQase`,
      description: algorithm.description,
      type: 'article',
      url: `/paths/algorithm/${algorithm.slug}`
    }
  }
}

export default async function AlgorithmProfile(props: AlgorithmProfileProps) {
  const params = await props.params;
  const algorithm = await getAlgorithmData(params.slug)
  const caseStudies = await getRelatedCaseStudies(algorithm.relatedCaseStudies)

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Algorithm Card */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl overflow-hidden mb-4">
              <div className="aspect-[3/2] bg-gray-400 flex items-center justify-center">
                <span className="text-white">{algorithm.title}</span>
              </div>
              <div className="p-3">
                <div className="mb-1.5">
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800">
                    {algorithm.type}
                  </span>
                </div>
              </div>
            </div>
            <Link 
              href="/paths/algorithm"
              className="inline-block text-sm text-gray-300 hover:text-white transition-colors"
            >
              ← Back
            </Link>
          </div>

          {/* Middle Column - Main Content */}
          <div className="col-span-7">
            <h1 className="text-2xl font-bold text-white mb-4">{algorithm.title}</h1>
            <div className="space-y-6 text-gray-300">
              <div>
                <p>{algorithm.description}</p>
                <div className="mt-2">
                  <span className="text-gray-400">Complexity:</span>
                  <span className="ml-2 font-mono">{algorithm.complexity}</span>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Prerequisites</h2>
                <ul className="list-disc list-inside space-y-2">
                  {algorithm.prerequisites.map((item) => (
                    <li key={item} className="text-gray-300">{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Applications</h2>
                <ul className="list-disc list-inside space-y-2">
                  {algorithm.applications.map((item) => (
                    <li key={item} className="text-gray-300">{item}</li>
                  ))}
                </ul>
              </div>
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
                  <div className="mt-2 flex gap-2">
                    {study.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 bg-gray-700 text-gray-300 rounded-full"
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