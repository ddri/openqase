import { Metadata } from 'next'
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server'
import { ImportsClient } from './client'

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

export default async function ImportsPage() {
  const supabase = createServiceRoleSupabaseClient();
  
  // Simple query first - the user table joins might not exist yet
  const { data: importBatches, error } = await supabase
    .from('import_batches')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching import batches:', error)
    
    // Check if it's a table doesn't exist error
    if (error.message?.includes('relation "import_batches" does not exist')) {
      return (
        <div className="p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <h3 className="text-yellow-800 font-medium">Database Migration Required</h3>
            <p className="text-yellow-700 mt-1">
              The import system requires database migration. Please run:
            </p>
            <code className="block bg-yellow-100 p-2 mt-2 rounded text-sm">
              supabase db reset
            </code>
            <p className="text-yellow-700 mt-2 text-sm">
              Or apply the migration: <code>supabase migration up</code>
            </p>
          </div>
        </div>
      );
    }
    
    return <div className="p-6">Error loading import batches: {error.message}</div>
  }

  return <ImportsClient data={importBatches || []} />
}