// src/components/Navigation.tsx
import Link from 'next/link'
import { FC } from 'react'

const Navigation: FC = () => {
  return (
    <nav className="bg-[#1A1A1D] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-white">
            openQase
          </Link>
          
          <div className="flex gap-8">
            <Link 
              href="/paths"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Learning Path
            </Link>
            <Link 
              href="/quantum-stack"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Quantum Stack
            </Link>
            <Link 
              href="/research"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Research
            </Link>
            <Link 
              href="/case-studies"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Case Studies
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation