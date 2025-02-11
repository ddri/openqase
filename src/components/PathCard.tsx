// src/components/PathCard.tsx
import Link from 'next/link'
import { FC } from 'react'

interface PathCardProps {
  title: string
  path: 'persona' | 'industry' | 'algorithm'
  description: string
}

const PathCard: FC<PathCardProps> = ({ title, path, description }) => {
  return (
    <Link 
      href={`/paths/${path}`}
      className="block w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="aspect-[3/2] bg-gray-100"></div>
      <div className="p-3">
        <h3 className="text-base text-gray-900 font-semibold mb-0.5">{title}</h3>
        <p className="text-xs text-gray-600 leading-snug">{description}</p>
      </div>
    </Link>
  )
}

export default PathCard