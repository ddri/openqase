'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import type { CaseStudy } from './page'

async function refreshCache() {
  try {
    // Note: For security, the token should be handled server-side
    // This is a simplified example - in production, create a server action
    const response = await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Remove auth for now - you'll need to set REVALIDATION_TOKEN in .env.local
      },
      body: JSON.stringify({ type: 'all-case-studies' })
    });
    
    if (response.ok) {
      alert('Cache refreshed successfully!');
      window.location.reload(); // Refresh the admin page to see any changes
    } else {
      alert('Failed to refresh cache - check console for details');
    }
  } catch (error) {
    console.error('Cache refresh error:', error);
    alert('Error refreshing cache');
  }
}

const columns: ColumnDef<CaseStudy>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'published',
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.original.published 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.original.published ? 'Published' : 'Draft'}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/case-studies/${row.original.id}`}>
              Edit
            </Link>
          </Button>
        </div>
      );
    }
  }
]

interface CaseStudiesClientProps {
  data: CaseStudy[]
}

export function CaseStudiesClient({ data }: CaseStudiesClientProps) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Case Studies</h1>
          <p className="text-muted-foreground">
            Create and manage case studies showcasing quantum computing applications.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshCache} variant="outline">
            Refresh Cache
          </Button>
          <Button asChild>
            <Link href="/admin/case-studies/new">
              <Plus className="w-4 h-4 mr-2" />
              New Case Study
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border">
        <DataTable 
          columns={columns} 
          data={data} 
        />
      </div>
    </div>
  )
} 