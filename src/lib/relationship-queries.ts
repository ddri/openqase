'use server'

import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';

/**
 * Get quantum software related to a company through shared case studies
 */
export async function getRelatedQuantumSoftware(caseStudyIds: string[]) {
  if (!caseStudyIds || caseStudyIds.length === 0) return [];
  
  const supabase = await createServiceRoleSupabaseClient();
  
  // First get the software IDs from the junction table
  const { data: relations, error: relError } = await supabase
    .from('case_study_quantum_software_relations')
    .select('quantum_software_id')
    .in('case_study_id', caseStudyIds);
  
  if (relError || !relations || relations.length === 0) {
    console.error('Error fetching software relations:', relError);
    return [];
  }
  
  const softwareIds = [...new Set(relations.map(r => r.quantum_software_id).filter(id => id !== null))] as string[];
  
  // Then fetch the software details
  const { data, error } = await supabase
    .from('quantum_software')
    .select(`
      id,
      name,
      slug,
      description
    `)
    .in('id', softwareIds);
  
  if (error) {
    console.error('Error fetching quantum software:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Get quantum hardware related to a company through shared case studies
 */
export async function getRelatedQuantumHardware(caseStudyIds: string[]) {
  if (!caseStudyIds || caseStudyIds.length === 0) return [];
  
  const supabase = await createServiceRoleSupabaseClient();
  
  // First get the hardware IDs from the junction table
  const { data: relations, error: relError } = await supabase
    .from('case_study_quantum_hardware_relations')
    .select('quantum_hardware_id')
    .in('case_study_id', caseStudyIds);
  
  if (relError || !relations || relations.length === 0) {
    console.error('Error fetching hardware relations:', relError);
    return [];
  }
  
  const hardwareIds = [...new Set(relations.map(r => r.quantum_hardware_id).filter(id => id !== null))] as string[];
  
  // Then fetch the hardware details
  const { data, error } = await supabase
    .from('quantum_hardware')
    .select(`
      id,
      name,
      slug,
      description
    `)
    .in('id', hardwareIds);
  
  if (error) {
    console.error('Error fetching quantum hardware:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Get partner companies related to a quantum company through shared case studies
 */
export async function getRelatedPartnerCompanies(caseStudyIds: string[]) {
  if (!caseStudyIds || caseStudyIds.length === 0) return [];
  
  const supabase = await createServiceRoleSupabaseClient();
  
  // First get the partner company IDs from the junction table
  const { data: relations, error: relError } = await supabase
    .from('case_study_partner_company_relations')
    .select('partner_company_id')
    .in('case_study_id', caseStudyIds);
  
  if (relError || !relations || relations.length === 0) {
    console.error('Error fetching partner relations:', relError);
    return [];
  }
  
  const partnerIds = [...new Set(relations.map(r => r.partner_company_id).filter(id => id !== null))] as string[];
  
  // Then fetch the partner details
  const { data, error } = await supabase
    .from('partner_companies')
    .select(`
      id,
      name,
      slug,
      description,
      industry
    `)
    .in('id', partnerIds);
  
  if (error) {
    console.error('Error fetching partner companies:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Get quantum companies related to a partner company through shared case studies
 */
export async function getRelatedQuantumCompanies(caseStudyIds: string[]) {
  if (!caseStudyIds || caseStudyIds.length === 0) return [];
  
  const supabase = await createServiceRoleSupabaseClient();
  
  // First get the quantum company IDs from the junction table
  const { data: relations, error: relError } = await supabase
    .from('case_study_quantum_company_relations')
    .select('quantum_company_id')
    .in('case_study_id', caseStudyIds);
  
  if (relError || !relations || relations.length === 0) {
    console.error('Error fetching quantum company relations:', relError);
    return [];
  }
  
  const companyIds = [...new Set(relations.map(r => r.quantum_company_id).filter(id => id !== null))] as string[];
  
  // Then fetch the company details
  const { data, error } = await supabase
    .from('quantum_companies')
    .select(`
      id,
      name,
      slug,
      description,
      company_type
    `)
    .in('id', companyIds);
  
  if (error) {
    console.error('Error fetching quantum companies:', error);
    return [];
  }
  
  return data || [];
}