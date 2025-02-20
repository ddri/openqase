// src/app/paths/algorithm/page.tsx
import { promises as fs } from 'fs'
import path from 'path'
import ContentCard from '@/components/ContentCard'
import type { Algorithm } from '@/types'

async function getAlgorithms(): Promise<Algorithm[]> {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'algorithm')
    const files = await fs.readdir(contentDir)
    
    const algorithms = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async file => {
          const content = await fs.readFile(path.join(contentDir, file), 'utf-8')
          return JSON.parse(content) as Algorithm
        })
    )

    return algorithms.sort((a, b) => parseInt(a.id) - parseInt(b.id))
  } catch (error) {
    // Fallback data
    return [
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
      }
    ] as Algorithm[]
  }
}

export default async function AlgorithmPath() {
  const algorithms = await getAlgorithms()

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-text-primary">
          Algorithm path
        </h1>
        <p className="text-text-secondary mb-8">
          Learn about specific quantum algorithms
        </p>
        
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