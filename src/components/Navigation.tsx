// src/components/Navigation.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-[#1A1A1D] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-white hover:text-copper transition-colors">
            openQase
          </Link>
          
          <div className="flex gap-8">
            <Link 
              href="/learning-path"
              className="relative group"
            >
              <span className={`transition-colors ${
                pathname.startsWith('/learning-path') 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}>
                Learning Path
              </span>
              <span className={`absolute bottom-[-8px] left-0 w-full h-0.5 transition-transform duration-200 
                ${pathname.startsWith('/learning-path') 
                  ? 'bg-copper scale-x-100' 
                  : 'bg-copper scale-x-0 group-hover:scale-x-100'}`} 
              />
            </Link>
            <Link 
              href="/quantum-stack"
              className="relative group"
            >
              <span className={`transition-colors ${
                pathname === '/quantum-stack' 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}>
                Quantum Stack
              </span>
              <span className={`absolute bottom-[-8px] left-0 w-full h-0.5 transition-transform duration-200 
                ${pathname === '/quantum-stack' 
                  ? 'bg-copper scale-x-100' 
                  : 'bg-copper scale-x-0 group-hover:scale-x-100'}`} 
              />
            </Link>
            {/* <Link 
              href="/research"
              className="relative group"
            >
              <span className={`transition-colors ${
                pathname === '/research' 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}>
                Research
              </span>
              <span className={`absolute bottom-[-8px] left-0 w-full h-0.5 transition-transform duration-200 
                ${pathname === '/research' 
                  ? 'bg-copper scale-x-100' 
                  : 'bg-copper scale-x-0 group-hover:scale-x-100'}`} 
              />
            </Link> */}
            <Link 
              href="/case-studies"
              className="relative group"
            >
              <span className={`transition-colors ${
                pathname === '/case-studies' 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}>
                Case Studies
              </span>
              <span className={`absolute bottom-[-8px] left-0 w-full h-0.5 transition-transform duration-200 
                ${pathname === '/case-studies' 
                  ? 'bg-copper scale-x-100' 
                  : 'bg-copper scale-x-0 group-hover:scale-x-100'}`} 
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}