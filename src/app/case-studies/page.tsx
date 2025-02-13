import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { CaseStudy } from '@/content/types'

// Load all case studies at build time
async function getCaseStudies(): Promise<CaseStudy[]> {
  const contentDir = path.join(process.cwd(), 'content', 'case-study')
  const files = await fs.readdir(contentDir)
  
  const caseStudies = await Promise.all(
    files
      .filter(file => file.endsWith('.json'))
      .map(async file => {
        const content = await fs.readFile(path.join(contentDir, file), 'utf-8')
        return JSON.parse(content) as CaseStudy
      })
  )

  // Sort case studies by ID to maintain consistent order
  return caseStudies.sort((a, b) => parseInt(a.id) - parseInt(b.id))
}

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

export default async function CaseStudies() {
  const caseStudies = await getCaseStudies()

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Case Studies</h1>
        <p className="text-gray-400 mb-8">Real-world applications of quantum computing in business</p>
        
        <div className="space-y-4">
          {caseStudies.map((study) => (
            <Link 
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="block"
            >
              <div className="flex bg-[#1A1A1D] rounded-lg overflow-hidden border border-gray-800/50 hover:border-copper/50 transition-all duration-300">
                <div className="w-[400px] bg-[#1E1E23] flex items-center justify-center text-gray-600">
                  Case Study Image
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold text-white">{study.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyStyle(study.difficulty)}`}>
                        {study.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4">{study.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {study.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}