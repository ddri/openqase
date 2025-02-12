// src/app/paths/algorithm/shors-algorithm/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { Algorithm, CaseStudy } from '@/types'

export const metadata: Metadata = {
  title: 'Shor\'s Algorithm | OpenQase Quantum Computing',
  description: 'Learn about Shor\'s Algorithm, a quantum algorithm for integer factorization that has significant implications for cryptography and RSA encryption. Explore its applications, complexity, and prerequisites.',
  keywords: [
    'Shor\'s Algorithm',
    'quantum computing',
    'cryptography',
    'RSA encryption',
    'integer factorization',
    'quantum algorithms'
  ],
  openGraph: {
    title: 'Shor\'s Algorithm | OpenQase',
    description: 'Explore Shor\'s Algorithm and its revolutionary implications for cryptography and quantum computing',
    type: 'article',
    url: 'https://openqase.com/paths/algorithm/shors-algorithm',
  }
}

const algorithmData: Algorithm = {
  id: '1',
  title: 'Shor\'s Algorithm',
  slug: 'shors-algorithm',
  description: 'A groundbreaking quantum algorithm for integer factorization, particularly significant for its potential to break RSA encryption. This algorithm demonstrates quantum computing\'s ability to solve certain problems exponentially faster than classical computers.',
  type: 'Technical',
  complexity: 'O(log N)',
  applications: [
    'Breaking RSA Encryption',
    'Integer Factorization',
    'Number Theory Research',
    'Cryptographic Systems Analysis'
  ],
  prerequisites: [
    'Quantum Fourier Transform',
    'Modular Arithmetic',
    'Basic Quantum Gates',
    'Classical Period Finding'
  ],
  relatedCaseStudies: ['cryptography-impact', 'rsa-analysis', 'quantum-advantage'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

async function getRelatedCaseStudies(ids: string[]): Promise<CaseStudy[]> {
  // In a real app, this would fetch from a database
  return [
    {
      id: 'cryptography-impact',
      title: 'Impact on Modern Cryptography',
      slug: 'cryptography-impact',
      description: 'Analysis of how Shor\'s Algorithm affects current cryptographic systems and future security implications.',
      content: 'Full case study content...',
      personas: ['security-analyst', 'cryptographer'],
      industries: ['cybersecurity', 'finance'],
      algorithms: ['shors-algorithm'],
      difficulty: 'Advanced',
      tags: ['cryptography', 'security', 'RSA'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'rsa-analysis',
      title: 'RSA in the Quantum Era',
      slug: 'rsa-analysis',
      description: 'Detailed examination of RSA vulnerability to quantum attacks via Shor\'s Algorithm.',
      content: 'Full case study content...',
      personas: ['researcher', 'security-analyst'],
      industries: ['cybersecurity'],
      algorithms: ['shors-algorithm'],
      difficulty: 'Intermediate',
      tags: ['RSA', 'encryption', 'quantum-threat'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export default async function ShorsAlgorithm() {
  const caseStudies = await getRelatedCaseStudies(algorithmData.relatedCaseStudies)

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Algorithm Card */}
          <div className="col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-4">
              <div className="aspect-[3/2] bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">{algorithmData.title}</span>
              </div>
              <div className="p-3">
                <div className="mb-1.5">
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] bg-blue-900 text-blue-200">
                    {algorithmData.type}
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
              <h1 className="text-3xl font-bold text-gray-100 mb-6">{algorithmData.title}</h1>
              <div className="space-y-8 text-gray-300">
                <section>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">{algorithmData.description}</p>
                  </div>
                  <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center">
                      <span className="text-gray-400">Complexity:</span>
                      <code className="ml-3 px-2 py-1 bg-gray-900 rounded text-blue-300 font-mono">
                        {algorithmData.complexity}
                      </code>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Prerequisites</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {algorithmData.prerequisites.map((item) => (
                      <li key={item} className="text-gray-300">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Applications</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {algorithmData.applications.map((item) => (
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