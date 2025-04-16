import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

type TestData = {
  id: string
  name: string
  status: 'active' | 'inactive'
}

const data: TestData[] = [
  { id: '1', name: 'Test Item 1', status: 'active' },
  { id: '2', name: 'Test Item 2', status: 'inactive' },
]

const columns: ColumnDef<TestData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
]

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Data Table Test</h1>
      <div className="bg-card rounded-lg border">
        <DataTable 
          columns={columns} 
          data={data} 
        />
      </div>
    </div>
  )
} 