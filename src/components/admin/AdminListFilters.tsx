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

interface FilterOption {
  value: string
  label: string
}

interface FilterConfig {
  key: string
  label: string
  value: string
  onChange: (value: string) => void
  options: FilterOption[]
}

interface AdminListFiltersProps {
  // Search config
  searchQuery: string
  onSearchChange: (query: string) => void
  searchPlaceholder?: string

  // Filter config
  filters?: FilterConfig[]

  // Display
  resultCount: number
  totalCount: number
  itemName?: string
}

export function AdminListFilters({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  resultCount,
  totalCount,
  itemName = 'items',
}: AdminListFiltersProps) {
  return (
    <>
      {/* Filter Bar */}
      <div className="mb-6 p-4 bg-card rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          {filters.map((filter) => (
            <Select
              key={filter.key}
              value={filter.value}
              onValueChange={filter.onChange}
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
        Showing {resultCount} of {totalCount} {itemName}
      </div>
    </>
  )
}
