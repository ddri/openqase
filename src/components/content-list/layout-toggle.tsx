'use client'

import { Button } from '@/components/ui/button'
import { Grid3X3, Table } from 'lucide-react'
import { LayoutType } from './use-layout-preference'

interface LayoutToggleProps {
  layout: LayoutType
  onToggle: () => void
  className?: string
}

export function LayoutToggle({ layout, onToggle, className }: LayoutToggleProps) {
  return (
    <div className={`flex items-center gap-1 p-1 bg-muted rounded-md ${className}`}>
      <Button
        variant={layout === 'grid' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={layout === 'table' ? onToggle : undefined}
        className="h-8 w-8 p-0"
        title="Grid view"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant={layout === 'table' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={layout === 'grid' ? onToggle : undefined}
        className="h-8 w-8 p-0"
        title="Table view"
      >
        <Table className="h-4 w-4" />
      </Button>
    </div>
  )
}