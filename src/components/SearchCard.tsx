'use client'

import { useRef } from 'react'
import LazyGlobalSearch, { LazyGlobalSearchRef } from '@/components/LazyGlobalSearch'
import { SearchableItem } from '@/lib/content-fetchers'

interface SearchCardProps {
  searchData: SearchableItem[]
}

export default function SearchCard({ searchData }: SearchCardProps) {
  const searchRef = useRef<LazyGlobalSearchRef>(null)

  const handleCardClick = () => {
    searchRef.current?.focus()
  }

  return (
    <div 
      className="bg-card border border-border p-6 elevation-interactive hover:border-primary cursor-pointer"
      onClick={handleCardClick}
    >
      <h2 className="text-xl font-semibold mb-4 text-foreground">Search Case Studies</h2>
      <div onClick={(e) => e.stopPropagation()}>
        <LazyGlobalSearch ref={searchRef} searchData={searchData} className="w-full" />
      </div>
    </div>
  )
}