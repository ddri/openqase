'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'

interface FilterOption {
  value: string
  label: string
}

interface FilterConfig {
  key: string
  label: string
  options: FilterOption[]
}

interface AdminListFiltersProps<T> {
  // Data
  data: T[]

  // Search config
  searchPlaceholder?: string
  searchKeys?: (keyof T)[]

  // Filter config
  filters?: FilterConfig[]

  // Callbacks
  onFilteredDataChange: (filtered: T[]) => void

  // Display
  itemName?: string
}

export function AdminListFilters<T extends Record<string, any>>({
  data,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  filters = [],
  onFilteredDataChange,
  itemName = 'items',
}: AdminListFiltersProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, string>>(() => {
    // Initialize all filters to 'all'
    const initial: Record<string, string> = {}
    filters.forEach(filter => {
      initial[filter.key] = 'all'
    })
    return initial
  })

  // Filtering logic (memoized)
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search logic
      if (searchQuery && searchKeys.length > 0) {
        const query = searchQuery.toLowerCase()
        const matches = searchKeys.some(key =>
          String(item[key] || '').toLowerCase().includes(query)
        )
        if (!matches) return false
      }

      // Filter logic
      for (const filter of filters) {
        const value = filterValues[filter.key]
        if (value && value !== 'all') {
          // Handle boolean filters
          if (value === 'true' || value === 'false') {
            if (String(item[filter.key]) !== value) return false
          } else {
            if (item[filter.key] !== value) return false
          }
        }
      }

      return true
    })
  }, [data, searchQuery, searchKeys, filters, filterValues])

  // Effect to notify parent
  useEffect(() => {
    onFilteredDataChange(filteredData)
  }, [filteredData, onFilteredDataChange])

  return (
    <>
      {/* Filter Bar */}
      <div className="mb-6 p-4 bg-card rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          {searchKeys.length > 0 && (
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {/* Filters */}
          {filters.map((filter) => (
            <Select
              key={filter.key}
              value={filterValues[filter.key]}
              onValueChange={(v) =>
                setFilterValues({ ...filterValues, [filter.key]: v })
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>

      {/* Result Count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredData.length} of {data.length} {itemName}
      </div>
    </>
  )
}
