import { Metadata } from 'next'
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server'
import type { Database } from '@/types/supabase'
import dynamic from 'next/dynamic'

// Dynamic import for heavy admin component
const CaseStudiesClient = dynamic(() => import('./client').then(mod => ({ default: mod.CaseStudiesClient })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      <span className="ml-2">Loading case studies...</span>
    </div>
  )
})

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