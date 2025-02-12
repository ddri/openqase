// src/components/PathCard.tsx
import Link from 'next/link'
import { FC } from 'react'
import CardPixelPattern from './CardPixelPattern'

interface PathCardProps {
  title: string
  path: 'persona' | 'industry' | 'algorithm'
  description: string
}

const PathCard: FC<PathCardProps> = ({ title, path, description }) => {
  return (
    <Link 
      href={`/paths/${path}`}
      className="group block w-full bg-[#1A1A1D] rounded-xl border border-gray-800 hover:border-copper transition-all duration-300 overflow-hidden relative"
    >
      <CardPixelPattern />
      <div className="relative aspect-[3/2] bg-transparent flex items-center justify-center">
        <span className="text-gray-400">{title}</span>
      </div>
      <div className="relative p-6 bg-transparent">
        <h3 className="text-xl text-white font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </Link>
  )
}

export default PathCard