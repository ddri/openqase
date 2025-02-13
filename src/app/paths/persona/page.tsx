import { promises as fs } from 'fs'
import path from 'path'
import ContentCard from '@/components/ContentCard'
import { Persona } from '@/content/types'

// Load all persona content at build time
async function getPersonas(): Promise<Persona[]> {
  const contentDir = path.join(process.cwd(), 'content', 'persona')
  const files = await fs.readdir(contentDir)
  
  const personas = await Promise.all(
    files
      .filter(file => file.endsWith('.json'))
      .map(async file => {
        const content = await fs.readFile(path.join(contentDir, file), 'utf-8')
        return JSON.parse(content) as Persona
      })
  )

  // Sort personas by ID to maintain consistent order
  return personas.sort((a, b) => parseInt(a.id) - parseInt(b.id))
}

export default async function PersonaPath() {
  const personas = await getPersonas()

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-100">Persona path</h1>
        <p className="text-gray-400 mb-8">Find case studies relevant to your role</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <ContentCard
              key={persona.id}
              title={persona.title}
              type={persona.type}
              path="persona"
              slug={persona.slug}
              description={persona.description}
            />
          ))}
        </div>
      </div>
    </main>
  )
}