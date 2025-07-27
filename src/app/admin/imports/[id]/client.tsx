'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowLeft, Eye, CheckCircle, XCircle, AlertTriangle, FileText, Clock } from 'lucide-react'
import Link from 'next/link'
import type { ImportBatchWithItems, StagingCaseStudy } from './page'

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4" />
    case 'approved':
      return <CheckCircle className="h-4 w-4" />
    case 'rejected':
      return <XCircle className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

interface PreviewDialogProps {
  caseStudy: StagingCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

function PreviewDialog({ caseStudy, isOpen, onClose }: PreviewDialogProps) {
  if (!caseStudy) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{caseStudy.title}</DialogTitle>
          <DialogDescription>
            Review case study details and mapping quality
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Qookie ID</h4>
              <p className="text-sm">{caseStudy.qookie_id}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">OpenQase Slug</h4>
              <p className="text-sm">{caseStudy.slug}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Year</h4>
              <p className="text-sm">{caseStudy.year}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Validation Status</h4>
              <Badge className={getStatusColor(caseStudy.validation_status)}>
                {getStatusIcon(caseStudy.validation_status)}
                <span className="ml-1 capitalize">{caseStudy.validation_status}</span>
              </Badge>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Description</h4>
            <p className="text-sm bg-gray-50 p-3 rounded">{caseStudy.description}</p>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Industries</h4>
              <div className="flex flex-wrap gap-1">
                {caseStudy.industries.map((item, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Personas</h4>
              <div className="flex flex-wrap gap-1">
                {caseStudy.personas.map((item, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Algorithms</h4>
              <div className="flex flex-wrap gap-1">
                {caseStudy.algorithms.map((item, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Companies */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Partner Companies</h4>
              <div className="flex flex-wrap gap-1">
                {caseStudy.partner_companies.map((item, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Quantum Companies</h4>
              <div className="flex flex-wrap gap-1">
                {caseStudy.quantum_companies.map((item, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Preview */}
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Content Preview</h4>
            <div className="text-sm bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
              {caseStudy.main_content?.substring(0, 500)}
              {caseStudy.main_content?.length > 500 && '...'}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const columns: ColumnDef<StagingCaseStudy>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.title}</div>
        <div className="text-sm text-muted-foreground">{row.original.qookie_id}</div>
      </div>
    ),
  },
  {
    accessorKey: 'validation_status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.validation_status
      return (
        <Badge variant="secondary" className={getStatusColor(status)}>
          <div className="flex items-center space-x-1">
            {getStatusIcon(status)}
            <span className="capitalize">{status}</span>
          </div>
        </Badge>
      )
    },
  },
  {
    accessorKey: 'categories',
    header: 'Categories',
    cell: ({ row }) => {
      const cs = row.original
      const totalCategories = cs.industries.length + cs.personas.length + cs.algorithms.length
      return (
        <div className="text-sm">
          <div>{totalCategories} mapped</div>
          <div className="text-muted-foreground">
            {cs.industries.length}i, {cs.personas.length}p, {cs.algorithms.length}a
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'year',
    header: 'Year',
    cell: ({ row }) => row.original.year,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

interface BatchReviewClientProps {
  batch: ImportBatchWithItems
}

export function BatchReviewClient({ batch }: BatchReviewClientProps) {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<StagingCaseStudy | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Update columns to include preview action
  const columnsWithPreview: ColumnDef<StagingCaseStudy>[] = [
    ...columns.slice(0, -1), // All columns except actions
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSelectedCaseStudy(row.original)
                setIsPreviewOpen(true)
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const pendingItems = batch.staging_case_studies.filter(cs => cs.validation_status === 'pending').length
  const approvedItems = batch.staging_case_studies.filter(cs => cs.validation_status === 'approved').length
  const rejectedItems = batch.staging_case_studies.filter(cs => cs.validation_status === 'rejected').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/imports">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Imports
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{batch.batch_name}</h1>
          <p className="text-muted-foreground">
            {batch.source_file} • {batch.total_items} items
          </p>
        </div>
      </div>

      {/* Batch Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{batch.total_items}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingItems}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedItems}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedItems}</div>
          </CardContent>
        </Card>
      </div>

      {/* Case Studies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staging Case Studies</CardTitle>
          <CardDescription>
            Review and approve individual case studies before promoting to production
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columnsWithPreview} 
            data={batch.staging_case_studies}
          />
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <PreviewDialog
        caseStudy={selectedCaseStudy}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false)
          setSelectedCaseStudy(null)
        }}
      />
    </div>
  )
}