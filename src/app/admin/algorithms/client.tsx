'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Trash2, AlertCircle } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { StatusBadge } from '@/components/admin/StatusBadge'
import type { Algorithm } from './page'
import { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface AlgorithmsClientProps {
  data: Algorithm[]
}

export function AlgorithmsClient({ data }: AlgorithmsClientProps) {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>(data)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [algorithmToDelete, setAlgorithmToDelete] = useState<Algorithm | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Refresh data when component mounts or when returning to this page
  useEffect(() => {
    // Update state with the latest data from props
    setAlgorithms(data);
  }, [data]);

  const handleDelete = async (algorithm: Algorithm) => {
    setAlgorithmToDelete(algorithm)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!algorithmToDelete) return
    
    setIsDeleting(true)
    try {
      const response = await fetch('/api/algorithms/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: algorithmToDelete.id })
      })
      
      if (response.ok) {
        // Remove the deleted algorithm from the state
        setAlgorithms(algorithms.filter(a => a.id !== algorithmToDelete.id))
        alert('Algorithm moved to trash')
      } else {
        const error = await response.text()
        alert(`Failed to delete algorithm: ${error}`)
        console.error('Failed to delete algorithm')
      }
    } catch (error) {
      console.error('Error deleting algorithm:', error)
      alert('Error deleting algorithm')
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setAlgorithmToDelete(null)
    }
  }

  const columns: ColumnDef<Algorithm>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.original.description ?
            (row.original.description.length > 50 ?
              `${row.original.description.substring(0, 50)}...` :
              row.original.description) :
            'N/A'}
        </div>
      )
    },
    {
      accessorKey: 'published',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.published} />
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/algorithms/${row.original.id}`}>
              Edit
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(row.original)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Algorithms</h1>
          <p className="text-muted-foreground">
            Create and manage quantum algorithm descriptions and implementations.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/algorithms/new">
            <Plus className="w-4 h-4 mr-2" />
            New Algorithm
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <DataTable
          columns={columns}
          data={algorithms}
          searchKey="name"
        />
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Delete Algorithm
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{algorithmToDelete?.name}&quot;? It will be moved to trash and can be recovered later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}