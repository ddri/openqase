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
    
  // Fetch relationships if editing
  let algorithmIds: string[] = []
  let industryIds: string[] = []
  let personaIds: string[] = []
  
  if (!isNew && caseStudy) {
    // Fetch algorithm relationships
    const { data: algorithmRelations } = await supabase
      .from('algorithm_case_study_relations')
      .select('algorithm_id')
      .eq('case_study_id', caseStudy.id)
    
    if (algorithmRelations) {
      algorithmIds = algorithmRelations.map(relation => relation.algorithm_id as string)
    }
    
    // Fetch industry relationships
    const { data: industryRelations } = await supabase
      .from('case_study_industry_relations' as any)
      .select('industry_id')
      .eq('case_study_id', caseStudy.id)
    
    if (industryRelations) {
      industryIds = industryRelations.map((relation: any) => relation.industry_id)
    }
    
    // Fetch persona relationships
    const { data: personaRelations } = await supabase
      .from('case_study_persona_relations' as any)
      .select('persona_id')
      .eq('case_study_id', caseStudy.id)
    
    if (personaRelations) {
      personaIds = personaRelations.map((relation: any) => relation.persona_id)
    }
  }

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

  // If editing, add the relationship IDs to the case study data
  let caseStudyWithRelations = caseStudy;
  if (!isNew && caseStudy) {
    caseStudyWithRelations = {
      ...caseStudy,
      algorithmIds,
      industryIds,
      personaIds
    } as any;
  }

  return (
    <CaseStudyForm
      caseStudy={caseStudyWithRelations}
      algorithms={algorithms || []}
      industries={industries || []}
      personas={personas || []}
      isNew={isNew}
    />
  )
}