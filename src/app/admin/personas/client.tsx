'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Trash2, AlertCircle } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import type { Persona } from './page'
import { useState } from 'react'
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

interface PersonasClientProps {
  data: Persona[]
}

export function PersonasClient({ data }: PersonasClientProps) {
  const [personas, setPersonas] = useState<Persona[]>(data)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [personaToDelete, setPersonaToDelete] = useState<Persona | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (persona: Persona) => {
    setPersonaToDelete(persona)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!personaToDelete) return
    
    setIsDeleting(true)
    try {
      const response = await fetch('/api/personas/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: personaToDelete.id })
      })
      
      if (response.ok) {
        // Remove the deleted persona from the state
        setPersonas(personas.filter(p => p.id !== personaToDelete.id))
        alert('Persona moved to trash')
      } else {
        const error = await response.text()
        alert(`Failed to delete persona: ${error}`)
        console.error('Failed to delete persona')
      }
    } catch (error) {
      console.error('Error deleting persona:', error)
      alert('Error deleting persona')
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setPersonaToDelete(null)
    }
  }

  const columns: ColumnDef<Persona>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'expertise',
      header: 'Expertise',
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.original.expertise && row.original.expertise.length > 0 
            ? row.original.expertise.join(', ') 
            : 'N/A'}
        </div>
      )
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
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/personas/${row.original.id}`}>
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
          <h1 className="text-3xl font-bold mb-2">User Personas</h1>
          <p className="text-muted-foreground">
            Create and manage user personas to target content for specific audiences.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/personas/new">
            <Plus className="w-4 h-4 mr-2" />
            New Persona
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <DataTable 
          columns={columns} 
          data={personas} 
          searchKey="name"
        />
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Delete Persona
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{personaToDelete?.name}&quot;? It will be moved to trash and can be recovered later.
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