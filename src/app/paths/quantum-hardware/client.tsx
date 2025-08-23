'use client'

import { GridView, TableView, LayoutToggle, useLayoutPreference } from '@/components/content-list'
import type { QuantumHardware } from './page'

interface QuantumHardwareClientProps {
  items: QuantumHardware[]
  totalCount: number
}

export function QuantumHardwareClient({ items, totalCount }: QuantumHardwareClientProps) {
  const { layout, toggleLayout, isClient } = useLayoutPreference('grid')

  // Don't render layout toggle until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Quantum Hardware</h1>
          <p className="text-xl text-muted-foreground">
            Discover quantum processors, systems, and computing platforms used in quantum computing case studies.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            {totalCount} hardware platforms available
          </div>
        </div>
        <GridView 
          items={items}
          contentType="quantum-hardware"
          basePath="/paths/quantum-hardware"
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Quantum Hardware</h1>
            <p className="text-xl text-muted-foreground">
              Discover quantum processors, systems, and computing platforms used in quantum computing case studies.
            </p>
          </div>
          <LayoutToggle layout={layout} onToggle={toggleLayout} />
        </div>
        <div className="text-sm text-muted-foreground">
          {totalCount} hardware platforms available
        </div>
      </div>

      {layout === 'grid' ? (
        <GridView 
          items={items}
          contentType="quantum-hardware"
          basePath="/paths/quantum-hardware"
        />
      ) : (
        <TableView 
          items={items}
          contentType="quantum-hardware"
          basePath="/paths/quantum-hardware"
        />
      )}
    </div>
  )
}