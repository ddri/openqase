// src/components/Navigation.tsx
import Link from 'next/link'
import { ThemeSwitcher } from './ThemeSwitcher'

export default function Navigation() {
  return (
    <nav className="border-b border-card-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-text-primary font-semibold text-lg">
              openQase
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
              <Link 
                href="/learning-path"
                className="text-text-secondary hover:text-accent transition-colors px-3 py-2"
              >
                Learning Path
              </Link>
              <Link 
                href="/paths/persona"
                className="text-text-secondary hover:text-accent transition-colors px-3 py-2"
              >
                Persona
              </Link>
              <Link 
                href="/paths/industry"
                className="text-text-secondary hover:text-accent transition-colors px-3 py-2"
              >
                Industry
              </Link>
              <Link 
                href="/paths/algorithm"
                className="text-text-secondary hover:text-accent transition-colors px-3 py-2"
              >
                Algorithm
              </Link>
              <Link 
                href="/quantum-stack"
                className="text-text-secondary hover:text-accent transition-colors px-3 py-2"
              >
                Quantum Stack
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}