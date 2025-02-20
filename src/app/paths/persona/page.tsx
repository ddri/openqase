// src/app/paths/persona/page.tsx
import { promises as fs } from 'fs'
import path from 'path'
import ContentCard from '@/components/ContentCard'
import type { Persona } from '@/types'

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

  return personas.sort((a, b) => parseInt(a.id) - parseInt(b.id))
}

export default async function PersonaPath() {
  const personas = await getPersonas()

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-text-primary">
          Persona path
        </h1>
        <p className="text-text-secondary mb-8">
          Find case studies relevant to your role
        </p>
        
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