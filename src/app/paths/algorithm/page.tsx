// src/app/paths/algorithm/page.tsx
import ContentCard from '@/components/ContentCard'
import { Algorithm } from '@/types'

const algorithms: Algorithm[] = [
  {
    id: '1',
    title: 'Shor\'s Algorithm',
    slug: 'shors-algorithm',
    type: 'Technical' as const,
    description: 'Integer factorization and its applications',
    complexity: 'O(log N)',
    applications: ['Cryptography', 'Number Theory'],
    prerequisites: ['Quantum Fourier Transform', 'Modular Arithmetic'],
    relatedCaseStudies: ['case-1'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Grover\'s Algorithm',
    slug: 'grovers-algorithm',
    type: 'Technical' as const,
    description: 'Quantum search algorithm and database applications',
    complexity: 'O(√N)',
    applications: ['Database Search', 'Optimization'],
    prerequisites: ['Quantum Gates', 'Amplitude Amplification'],
    relatedCaseStudies: ['case-2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export default function AlgorithmPath() {
  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-100">Algorithm path</h1>
        <p className="text-gray-400 mb-8">Learn about specific quantum algorithms</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {algorithms.map((algorithm) => (
            <ContentCard
              key={algorithm.id}
              title={algorithm.title}
              type={algorithm.type}
              path="algorithm"
              slug={algorithm.slug}
              description={algorithm.description}
            />
          ))}
        </div>
      </div>
    </main>
  )
}