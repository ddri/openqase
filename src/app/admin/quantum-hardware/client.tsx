'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Trash2, AlertCircle } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { StatusBadge } from '@/components/admin/StatusBadge'
import type { QuantumHardware } from './page'
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

interface QuantumHardwareClientProps {
  data: QuantumHardware[]
}

export function QuantumHardwareClient({ data }: QuantumHardwareClientProps) {
  const [quantumHardware, setQuantumHardware] = useState<QuantumHardware[]>(data)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [hardwareToDelete, setHardwareToDelete] = useState<QuantumHardware | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    setQuantumHardware(data);
  }, [data]);

  const handleDelete = async (hardware: QuantumHardware) => {
    setHardwareToDelete(hardware)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!hardwareToDelete) return
    
    setIsDeleting(true)
    try {
      const response = await fetch('/api/quantum-hardware/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: hardwareToDelete.id })
      })

      if (response.ok) {
        setQuantumHardware(prev => prev.filter(s => s.id !== hardwareToDelete.id))
      } else {
        console.error('Failed to delete quantum hardware')
      }
    } catch (error) {
      console.error('Error deleting quantum hardware:', error)
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setHardwareToDelete(null)
    }
  }

  const columns: ColumnDef<QuantumHardware>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'manufacturer',
      header: 'Manufacturer',
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
          <Link href={`/admin/quantum-hardware/${row.original.id}`}>
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
          <h1 className="text-3xl font-bold mb-2">Quantum Hardware</h1>
          <p className="text-muted-foreground">
            Create and manage quantum hardware systems showcasing quantum computing devices.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/quantum-hardware/new">
              <Plus className="w-4 h-4 mr-2" />
              New Hardware
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border">
        <DataTable columns={columns} data={quantumHardware} />
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Delete Quantum Hardware
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{hardwareToDelete?.name}"? This action cannot be undone.
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