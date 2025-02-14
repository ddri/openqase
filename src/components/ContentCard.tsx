import Link from 'next/link'
import { FC } from 'react'
import type { PersonaType } from '@/types'

interface ContentCardProps {
  title: string;
  type: PersonaType;
  path: string;
  slug: string;
  description?: string;
}

const ContentCard: FC<ContentCardProps> = ({ title, type, path, slug, description }) => {
  return (
    <Link 
      href={`/paths/${path}/${slug}`}
      className="block bg-gray-900 rounded-xl border border-gray-800 hover:border-copper transition-all duration-300"
    >
      <div className="aspect-[3/2] bg-gray-800 flex items-center justify-center">
        <span className="text-gray-400">{title}</span>
      </div>
      <div className="p-3">
        <div className="mb-1.5">
          <span className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] 
            ${type === 'Technical' 
              ? 'bg-copper/20 text-copper-light' 
              : 'bg-green-900 text-green-200'
            }`}
          >
            {type}
          </span>
        </div>
        <h3 className="text-base text-gray-100 font-semibold mb-0.5">{title}</h3>
        {description && (
          <p className="text-sm text-gray-400">{description}</p>
        )}
      </div>
    </Link>
  )
}

export default ContentCard