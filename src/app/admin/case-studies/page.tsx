import { Metadata } from 'next'
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server'
import type { Database } from '@/types/supabase'
import { CaseStudiesClient } from './client'

export const metadata: Metadata = {
  title: 'Case Studies Management',
  description: 'Manage case studies content'
}

export type CaseStudy = Database['public']['Tables']['case_studies']['Row']

export default async function CaseStudiesPage() {
  const supabase = createServiceRoleSupabaseClient();
  
  const { data: caseStudies, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('title')

  if (error) {
    console.error('Error fetching case studies:', error)
    return <div>Error loading case studies</div>
  }

  return <CaseStudiesClient data={caseStudies || []} />
}