import { Metadata } from 'next'
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server'
import { BatchReviewClient } from './client'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Review Import Batch',
  description: 'Review and approve case studies from import batch'
}

export type StagingCaseStudy = {
  id: string;
  batch_id: string;
  qookie_id: string;
  qookie_slug: string;
  qookie_data: any;
  slug: string;
  title: string;
  description: string;
  main_content: string;
  partner_companies: string[];
  quantum_companies: string[];
  algorithms: string[];
  industries: string[];
  personas: string[];
  quantum_hardware: string[];
  quantum_software: string[];
  year: number;
  validation_status: string;
  validation_errors: string[];
  validation_warnings: string[];
  mapping_quality: any;
  reviewed_by?: string;
  reviewed_at?: string;
  promotion_status: string;
  promoted_at?: string;
  created_at: string;
  updated_at: string;
}

export type ImportBatchWithItems = {
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
  staging_case_studies: StagingCaseStudy[];
}

interface BatchReviewPageProps {
  params: { id: string }
}

export default async function BatchReviewPage({ params }: BatchReviewPageProps) {
  const supabase = createServiceRoleSupabaseClient();
  
  // Fetch batch with staging case studies
  const { data: batch, error } = await supabase
    .from('import_batches')
    .select(`
      *,
      staging_case_studies (*)
    `)
    .eq('id', params.id)
    .single();

  if (error) {
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
          </div>
        </div>
      );
    }
    notFound();
  }

  if (!batch) {
    notFound();
  }

  return <BatchReviewClient batch={batch as ImportBatchWithItems} />
}