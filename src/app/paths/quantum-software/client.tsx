'use client'

import { GridView, TableView, LayoutToggle, useLayoutPreference } from '@/components/content-list'
import type { QuantumSoftware } from './page'

interface QuantumSoftwareClientProps {
  items: QuantumSoftware[]
  totalCount: number
}

export function QuantumSoftwareClient({ items, totalCount }: QuantumSoftwareClientProps) {
  const { layout, toggleLayout, isClient } = useLayoutPreference('grid')

  // Don't render layout toggle until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Quantum Software</h1>
          <p className="text-xl text-muted-foreground">
            Explore quantum software platforms, libraries, and development tools used in quantum computing case studies.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            {totalCount} software platforms available
          </div>
        </div>
        <GridView 
          items={items}
          contentType="quantum-software"
          basePath="/paths/quantum-software"
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Quantum Software</h1>
            <p className="text-xl text-muted-foreground">
              Explore quantum software platforms, libraries, and development tools used in quantum computing case studies.
            </p>
          </div>
          <LayoutToggle layout={layout} onToggle={toggleLayout} />
        </div>
        <div className="text-sm text-muted-foreground">
          {totalCount} software platforms available
        </div>
      </div>

      {layout === 'grid' ? (
        <GridView 
          items={items}
          contentType="quantum-software"
          basePath="/paths/quantum-software"
        />
      ) : (
        <TableView 
          items={items}
          contentType="quantum-software"
          basePath="/paths/quantum-software"
        />
      )}
    </div>
  )
}