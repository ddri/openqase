import { promises as fs } from 'fs'
import path from 'path'
import ContentCard from '@/components/ContentCard'
import { Algorithm } from '@/content/types'

// Load all algorithm content at build time
async function getAlgorithms(): Promise<Algorithm[]> {
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

  // Sort algorithms by ID to maintain consistent order
  return algorithms.sort((a, b) => parseInt(a.id) - parseInt(b.id))
}

export default async function AlgorithmPath() {
  const algorithms = await getAlgorithms()

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