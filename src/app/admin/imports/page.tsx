import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Import Management',
  description: 'Manage Qookie case study imports'
}

export type ImportBatch = {
  id: string;
  batch_name: string;
  source_file: string;
  source_type: string;
  export_version?: string;
  export_date?: string;
  qookie_total_items?: number;
  total_items: number;
  valid_items: number;
  invalid_items: number;
  approved_items: number;
  promoted_items: number;
  status: string;
  imported_by?: string;
  promoted_by?: string;
  created_at: string;
  promoted_at?: string;
}

export default function ImportsPage() {
  // TODO: This feature requires database migration
  // Temporarily disabled for performance testing
  return (
    <div className="p-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h3 className="text-yellow-800 font-medium">Import System Disabled</h3>
        <p className="text-yellow-700 mt-1">
          The Qookie import system requires database migration. This feature is temporarily disabled for performance testing.
        </p>
      </div>
    </div>
  );
}