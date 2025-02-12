// src/app/paths/algorithm/page.tsx
import ContentCard from '@/components/ContentCard'
import { Algorithm } from '@/types'

const algorithms: Array<Pick<Algorithm, 'id' | 'title' | 'slug' | 'type' | 'description'>> = [
  {
    id: '1',
    title: 'Shor\'s Algorithm',
    slug: 'shors-algorithm',
    type: 'Technical',
    description: 'Integer factorization algorithm with applications in cryptography and RSA breaking'
  },
  {
    id: '2',
    title: 'Grover\'s Algorithm',
    slug: 'grovers-algorithm',
    type: 'Technical',
    description: 'Quantum search algorithm for unstructured databases with quadratic speedup'
  },
  {
    id: '3',
    title: 'VQE',
    slug: 'vqe',
    type: 'Technical',
    description: 'Variational Quantum Eigensolver for molecular simulation and quantum chemistry'
  },
  {
    id: '4',
    title: 'QAOA',
    slug: 'qaoa',
    type: 'Technical',
    description: 'Quantum Approximate Optimization Algorithm for combinatorial optimization problems'
  },
  {
    id: '5',
    title: 'HHL Algorithm',
    slug: 'hhl-algorithm',
    type: 'Technical',
    description: 'Quantum algorithm for solving systems of linear equations exponentially faster'
  },
  {
    id: '6',
    title: 'Quantum Fourier Transform',
    slug: 'qft',
    type: 'Technical',
    description: 'Fundamental quantum transform used in many quantum algorithms'
  },
  {
    id: '7',
    title: 'Quantum Phase Estimation',
    slug: 'phase-estimation',
    type: 'Technical',
    description: 'Algorithm for estimating the eigenvalues of a unitary operator'
  },
  {
    id: '8',
    title: 'Quantum Walk',
    slug: 'quantum-walk',
    type: 'Technical',
    description: 'Quantum analog of classical random walks with applications in search'
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