import { Metadata } from 'next'
import { createServiceRoleSupabaseClient } from '@/lib/supabase'
import type { Database } from '@/types/supabase'
import { CaseStudiesClient } from './client'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Case Studies Management',
  description: 'Manage case studies content'
}

export type CaseStudy = Database['public']['Tables']['case_studies']['Row']

export default async function CaseStudiesPage() {
  try {
    const supabase = await createServiceRoleSupabaseClient();
    
    // Try to fetch with import_batch_name, fall back if column doesn't exist
    let { data: caseStudies, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('title')

    if (error) {
      console.error('Error fetching case studies:', error)
      
      // If error might be due to missing column, try without it
      if (error.message?.includes('import_batch_name') || error.code === 'PGRST116') {
        console.log('Trying fallback query without import_batch_name')
        const fallbackResult = await supabase
          .from('case_studies')
          .select('id, title, description, published, created_at, updated_at, slug, main_content, partner_companies, quantum_companies, quantum_hardware, quantum_software, academic_references, resource_links, published_at, year, algorithms')
          .order('title')
        
        if (!fallbackResult.error) {
          // Add null import_batch_name to each item
          caseStudies = fallbackResult.data?.map(item => ({
            ...item,
            import_batch_name: null,
            algorithms: item.algorithms || null,
            academic_references: item.academic_references || null
          })) || []
          error = null
        }
      }
    }

    if (error) {
      console.error('Final error fetching case studies:', error)
      return <div>Error loading case studies: {error.message}</div>
    }

    return <CaseStudiesClient data={caseStudies || []} />
  } catch (err) {
    console.error('Unexpected error in CaseStudiesPage:', err)
    return <div>Unexpected error loading case studies</div>
  }
}