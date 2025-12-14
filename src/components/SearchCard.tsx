'use client'

import { useRef } from 'react'
import LazyGlobalSearch, { LazyGlobalSearchRef } from '@/components/LazyGlobalSearch'
import { SearchableItem } from '@/lib/content-fetchers'

interface SearchCardProps {
  searchData: SearchableItem[]
}

export default function SearchCard({ searchData }: SearchCardProps) {
  const searchRef = useRef<LazyGlobalSearchRef>(null)

  return (
    <div className="w-full">
      <LazyGlobalSearch
        ref={searchRef}
        searchData={searchData}
        className="w-full text-base"
      />
    </div>
  )
}