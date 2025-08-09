import { Metadata } from 'next'
import { createServiceRoleSupabaseClient } from '@/lib/supabase'
import type { Database } from '@/types/supabase'
import { CaseStudiesClient } from './client'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Case Studies Management',
  description: 'Manage case studies content'
}

export type CaseStudy = Database['public']['Views']['admin_case_studies']['Row']

export default async function CaseStudiesPage() {
  try {
    const supabase = await createServiceRoleSupabaseClient();
    
    // Use admin view to show all non-deleted case studies
    let { data: caseStudies, error } = await supabase
      .from('admin_case_studies')
      .select('*')
      .order('title')

    if (error) {
      console.error('Error fetching case studies:', error)
      return <div>Error loading case studies: {error.message}</div>
    }

    return <CaseStudiesClient data={caseStudies || []} />
  } catch (err) {
    console.error('Unexpected error in CaseStudiesPage:', err)
    return <div>Unexpected error loading case studies</div>
  }
}