import { Metadata } from 'next'
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server'
import type { Database } from '@/types/supabase'
import { notFound } from 'next/navigation'
import { CaseStudyForm } from './client'

export const metadata: Metadata = {
  title: 'Edit Case Study',
  description: 'Create or edit a case study'
}

type CaseStudy = Database['public']['Tables']['case_studies']['Row']
type Industry = Database['public']['Tables']['industries']['Row']
type Algorithm = Database['public']['Tables']['algorithms']['Row']
type Persona = Database['public']['Tables']['personas']['Row']
type QuantumSoftware = Database['public']['Tables']['quantum_software']['Row']
type QuantumHardware = Database['public']['Tables']['quantum_hardware']['Row']
type QuantumCompany = Database['public']['Tables']['quantum_companies']['Row']
type PartnerCompany = Database['public']['Tables']['partner_companies']['Row']

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
  let algorithms: string[] = []
  let industries: string[] = []
  let personas: string[] = []
  let quantumSoftware: string[] = []
  let quantumHardware: string[] = []
  let quantumCompanies: string[] = []
  let partnerCompanies: string[] = []
  
  if (!isNew && caseStudy) {
    // Fetch algorithm relationships
    const { data: algorithmRelations } = await supabase
      .from('algorithm_case_study_relations')
      .select('algorithm_id')
      .eq('case_study_id', caseStudy.id)
    
    if (algorithmRelations) {
      algorithms = algorithmRelations.map(relation => relation.algorithm_id as string)
    }
    
    // Fetch industry relationships
    const { data: industryRelations } = await supabase
      .from('case_study_industry_relations' as any)
      .select('industry_id')
      .eq('case_study_id', caseStudy.id)
    
    if (industryRelations) {
      industries = industryRelations.map((relation: any) => relation.industry_id)
    }
    
    // Fetch persona relationships
    const { data: personaRelations } = await supabase
      .from('case_study_persona_relations' as any)
      .select('persona_id')
      .eq('case_study_id', caseStudy.id)
    
    if (personaRelations) {
      personas = personaRelations.map((relation: any) => relation.persona_id)
    }
    
    // Fetch quantum software relationships
    const { data: quantumSoftwareRelations } = await supabase
      .from('case_study_quantum_software_relations' as any)
      .select('quantum_software_id')
      .eq('case_study_id', caseStudy.id)
    
    if (quantumSoftwareRelations) {
      quantumSoftware = quantumSoftwareRelations.map((relation: any) => relation.quantum_software_id)
    }
    
    // Fetch quantum hardware relationships
    const { data: quantumHardwareRelations } = await supabase
      .from('case_study_quantum_hardware_relations' as any)
      .select('quantum_hardware_id')
      .eq('case_study_id', caseStudy.id)
    
    if (quantumHardwareRelations) {
      quantumHardware = quantumHardwareRelations.map((relation: any) => relation.quantum_hardware_id)
    }
    
    // Fetch quantum company relationships
    const { data: quantumCompanyRelations } = await supabase
      .from('case_study_quantum_company_relations' as any)
      .select('quantum_company_id')
      .eq('case_study_id', caseStudy.id)
    
    if (quantumCompanyRelations) {
      quantumCompanies = quantumCompanyRelations.map((relation: any) => relation.quantum_company_id)
    }
    
    // Fetch partner company relationships
    const { data: partnerCompanyRelations } = await supabase
      .from('case_study_partner_company_relations' as any)
      .select('partner_company_id')
      .eq('case_study_id', caseStudy.id)
    
    if (partnerCompanyRelations) {
      partnerCompanies = partnerCompanyRelations.map((relation: any) => relation.partner_company_id)
    }
  }

  // Fetch related data for dropdowns
  const { data: allIndustries } = await supabase
    .from('industries')
    .select('id, slug, name')
    .order('name')

  const { data: allAlgorithms } = await supabase
    .from('algorithms')
    .select('id, slug, name')
    .order('name')

  const { data: allPersonas } = await supabase
    .from('personas')
    .select('id, slug, name')
    .order('name')

  // Fetch quantum entities for dropdowns
  const { data: allQuantumSoftware } = await supabase
    .from('quantum_software')
    .select('id, slug, name')
    .eq('published', true)
    .order('name')

  const { data: allQuantumHardware } = await supabase
    .from('quantum_hardware')
    .select('id, slug, name')
    .eq('published', true)
    .order('name')

  const { data: allQuantumCompanies } = await supabase
    .from('quantum_companies')
    .select('id, slug, name')
    .eq('published', true)
    .order('name')

  const { data: allPartnerCompanies } = await supabase
    .from('partner_companies')
    .select('id, slug, name')
    .eq('published', true)
    .order('name')

  if (!isNew && !caseStudy) {
    notFound()
  }

  // If editing, add the relationship IDs to the case study data
  let caseStudyWithRelations = caseStudy;
  if (!isNew && caseStudy) {
    caseStudyWithRelations = {
      ...caseStudy,
      algorithms,
      industries,
      personas,
      quantum_software: quantumSoftware,
      quantum_hardware: quantumHardware,
      quantum_companies: quantumCompanies,
      partner_companies: partnerCompanies
    } as any;
  }

  return (
    <CaseStudyForm
      caseStudy={caseStudyWithRelations}
      algorithms={allAlgorithms || []}
      industries={allIndustries || []}
      personas={allPersonas || []}
      quantumSoftware={allQuantumSoftware || []}
      quantumHardware={allQuantumHardware || []}
      quantumCompanies={allQuantumCompanies || []}
      partnerCompanies={allPartnerCompanies || []}
      isNew={isNew}
    />
  )
}