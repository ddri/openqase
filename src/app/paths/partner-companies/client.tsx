'use client'

import { GridView, TableView, LayoutToggle, useLayoutPreference } from '@/components/content-list'
import type { PartnerCompany } from './page'

interface PartnerCompaniesClientProps {
  items: PartnerCompany[]
  totalCount: number
}

export function PartnerCompaniesClient({ items, totalCount }: PartnerCompaniesClientProps) {
  const { layout, toggleLayout, isClient } = useLayoutPreference('grid')

  // Don't render layout toggle until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Partner Companies</h1>
          <p className="text-xl text-muted-foreground">
            Explore organizations collaborating on quantum initiatives featured in case studies.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            {totalCount} partner companies available
          </div>
        </div>
        <GridView 
          items={items}
          contentType="partner-companies"
          basePath="/paths/partner-companies"
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Partner Companies</h1>
            <p className="text-xl text-muted-foreground">
              Explore organizations collaborating on quantum initiatives featured in case studies.
            </p>
          </div>
          <LayoutToggle layout={layout} onToggle={toggleLayout} />
        </div>
        <div className="text-sm text-muted-foreground">
          {totalCount} partner companies available
        </div>
      </div>

      {layout === 'grid' ? (
        <GridView 
          items={items}
          contentType="partner-companies"
          basePath="/paths/partner-companies"
        />
      ) : (
        <TableView 
          items={items}
          contentType="partner-companies"
          basePath="/paths/partner-companies"
        />
      )}
    </div>
  )
}