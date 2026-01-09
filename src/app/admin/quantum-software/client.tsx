'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Trash2, AlertCircle } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { StatusBadge } from '@/components/admin/StatusBadge'
import type { QuantumSoftware } from './page'
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

interface QuantumSoftwareClientProps {
  data: QuantumSoftware[]
}

export function QuantumSoftwareClient({ data }: QuantumSoftwareClientProps) {
  const [quantumSoftware, setQuantumSoftware] = useState<QuantumSoftware[]>(data)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [softwareToDelete, setSoftwareToDelete] = useState<QuantumSoftware | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    setQuantumSoftware(data);
  }, [data]);

  const handleDelete = async (software: QuantumSoftware) => {
    setSoftwareToDelete(software)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!softwareToDelete) return
    
    setIsDeleting(true)
    try {
      const response = await fetch('/api/quantum-software/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: softwareToDelete.id })
      })

      if (response.ok) {
        setQuantumSoftware(prev => prev.filter(s => s.id !== softwareToDelete.id))
      } else {
        console.error('Failed to delete quantum software')
      }
    } catch (error) {
      console.error('Error deleting quantum software:', error)
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setSoftwareToDelete(null)
    }
  }

  const columns: ColumnDef<QuantumSoftware>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'vendor',
      header: 'Vendor',
    },
    {
      accessorKey: 'published',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.published ?? false} />
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Link href={`/admin/quantum-software/${row.original.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(row.original)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Quantum Software</h1>
          <p className="text-muted-foreground">
            Create and manage quantum software platforms showcasing quantum computing tools.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/quantum-software/new">
              <Plus className="w-4 h-4 mr-2" />
              New Software
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border">
        <DataTable columns={columns} data={quantumSoftware} />
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Delete Quantum Software
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{softwareToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}