'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { Upload, Eye, MoreVertical, FileText, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import type { ImportBatch } from './page'

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'staging':
      return <Clock className="h-4 w-4" />
    case 'review':
      return <Eye className="h-4 w-4" />
    case 'approved':
      return <CheckCircle className="h-4 w-4" />
    case 'promoted':
      return <CheckCircle className="h-4 w-4" />
    case 'failed':
      return <XCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'staging':
      return 'bg-blue-100 text-blue-800'
    case 'review':
      return 'bg-yellow-100 text-yellow-800'
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'promoted':
      return 'bg-green-100 text-green-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

interface FileUploadDialogProps {
  onUploadSuccess: () => void;
}

function FileUploadDialog({ onUploadSuccess }: FileUploadDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [batchName, setBatchName] = useState('')
  const [uploadResult, setUploadResult] = useState<any>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Auto-generate batch name from filename
      const date = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      const cleanName = selectedFile.name.replace(/\.(json|JSON)$/, '').replace(/^qookie-openqase-export-/, '')
      setBatchName(`${date} - Qookie Export (${cleanName})`)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('batchName', batchName)
      formData.append('userId', 'admin') // TODO: Get actual user ID

      const response = await fetch('/api/imports/qookie', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setUploadResult(result)
        onUploadSuccess()
      } else {
        setUploadResult({ error: result.error || 'Upload failed' })
      }
    } catch (error) {
      setUploadResult({ error: 'Upload failed: ' + String(error) })
    } finally {
      setIsUploading(false)
    }
  }

  const resetDialog = () => {
    setFile(null)
    setBatchName('')
    setUploadResult(null)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Import File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Qookie Export</DialogTitle>
          <DialogDescription>
            Upload a Qookie JSON export file to import case studies
          </DialogDescription>
        </DialogHeader>
        
        {!uploadResult ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="file">Qookie Export File</Label>
              <Input
                id="file"
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="mt-1"
              />
              {file && (
                <p className="text-sm text-muted-foreground mt-1">
                  Selected: {file.name} ({Math.round(file.size / 1024)}KB)
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="batchName">Batch Name</Label>
              <Input
                id="batchName"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                placeholder="e.g., February 2025 - Qookie Export"
                className="mt-1"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetDialog}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpload}
                disabled={!file || !batchName || isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload & Process'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {uploadResult.error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Upload Failed</h3>
                    <p className="text-sm text-red-700 mt-1">{uploadResult.error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Upload Successful</h3>
                    <p className="text-sm text-green-700 mt-1">{uploadResult.message}</p>
                    {uploadResult.results && (
                      <div className="mt-2 text-xs text-green-600">
                        <p>Processed: {uploadResult.results.total_processed}</p>
                        <p>Valid: {uploadResult.results.validation_summary.total_valid}</p>
                        <p>Warnings: {uploadResult.results.validation_summary.total_warnings}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetDialog}>
                Close
              </Button>
              {uploadResult.batch_id && (
                <Button asChild>
                  <Link href={`/admin/imports/${uploadResult.batch_id}`}>
                    Review Import
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

const columns: ColumnDef<ImportBatch>[] = [
  {
    accessorKey: 'batch_name',
    header: 'Batch Name',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.batch_name}</div>
        <div className="text-sm text-muted-foreground">{row.original.source_file}</div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
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
    accessorKey: 'items',
    header: 'Items',
    cell: ({ row }) => {
      const batch = row.original
      return (
        <div className="text-sm">
          <div>{batch.total_items} total</div>
          <div className="text-muted-foreground">
            {batch.valid_items} valid, {batch.approved_items} approved
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const date = new Date(row.original.created_at)
      const dateStr = date.getFullYear() + '-' + 
                     String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                     String(date.getDate()).padStart(2, '0')
      const timeStr = String(date.getHours()).padStart(2, '0') + ':' + 
                     String(date.getMinutes()).padStart(2, '0')
      return (
        <div className="text-sm">
          <div>{dateStr}</div>
          <div className="text-muted-foreground">{timeStr}</div>
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const batch = row.original
      return (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/imports/${batch.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              Review
            </Link>
          </Button>
        </div>
      )
    },
  },
]

interface ImportsClientProps {
  data: ImportBatch[]
}

export function ImportsClient({ data }: ImportsClientProps) {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1)
    // Refresh the page to show new data
    window.location.reload()
  }

  const totalBatches = data.length
  const activeBatches = data.filter(batch => ['staging', 'review', 'approved'].includes(batch.status)).length
  const promotedBatches = data.filter(batch => batch.status === 'promoted').length

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Import Management</h1>
          <p className="text-muted-foreground">
            Manage Qookie case study imports and review staging content
          </p>
        </div>
        <FileUploadDialog onUploadSuccess={handleUploadSuccess} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBatches}</div>
            <p className="text-xs text-muted-foreground">All import batches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Imports</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBatches}</div>
            <p className="text-xs text-muted-foreground">Awaiting review or promotion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promoted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotedBatches}</div>
            <p className="text-xs text-muted-foreground">Successfully promoted to production</p>
          </CardContent>
        </Card>
      </div>

      {/* Import Batches Table */}
      <Card>
        <CardHeader>
          <CardTitle>Import Batches</CardTitle>
          <CardDescription>
            All Qookie import batches and their processing status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={data}
            key={refreshKey}
          />
        </CardContent>
      </Card>
    </div>
  )
}