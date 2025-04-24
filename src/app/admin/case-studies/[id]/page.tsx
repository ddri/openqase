import { Metadata } from 'next'
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server'
import type { Database } from '@/types/supabase'
import { notFound } from 'next/navigation'
import { CaseStudyForm } from './client'

export const metadata: Metadata = {
  title: 'Edit Case Study - OpenQASE Admin',
  description: 'Create or edit a case study'
}

type CaseStudy = Database['public']['Tables']['case_studies']['Row']
type Industry = Database['public']['Tables']['industries']['Row']
type Algorithm = Database['public']['Tables']['algorithms']['Row']
type Persona = Database['public']['Tables']['personas']['Row']

interface CaseStudyPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditCaseStudyPage({ params }: CaseStudyPageProps) {
  const resolvedParams = await params
  // Use service role client to bypass RLS
  const supabase = createServiceRoleSupabaseClient()
  const isNew = resolvedParams.id === 'new'

  // Fetch case study if editing
  const { data: caseStudy } = !isNew
    ? await supabase
        .from('case_studies')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()
    : { data: null }

  // Fetch related data for dropdowns
  const { data: industries } = await supabase
    .from('industries')
    .select('id, slug, name')
    .order('name')

  const { data: algorithms } = await supabase
    .from('algorithms')
    .select('id, slug, name')
    .order('name')

  const { data: personas } = await supabase
    .from('personas')
    .select('id, slug, name')
    .order('name')

  if (!isNew && !caseStudy) {
    notFound()
  }

  return (
    <CaseStudyForm
      caseStudy={caseStudy}
      algorithms={algorithms || []}
      industries={industries || []}
      personas={personas || []}
      isNew={isNew}
    />
  )
}