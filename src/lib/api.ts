import { createServerSupabaseClient } from '@/lib/supabase';
import type { Database } from '@/types/supabase';
import { PostgrestSingleResponse, PostgrestResponse } from '@supabase/supabase-js';

type Tables = Database['public']['Tables']
type PersonaRow = Tables['personas']['Row']
type CaseStudyRow = Tables['case_studies']['Row']

export interface RelatedCaseStudy extends Pick<CaseStudyRow, 'id' | 'slug' | 'title' | 'description'> {
  published_at?: string;
}

export async function getPersona(slug: string) {
  const supabase = await createServerSupabaseClient();

  const { data: persona } = await supabase
    .from('personas')
    .select('*, related_case_studies:case_studies(*)')
    .match({ slug })
    .single() as PostgrestSingleResponse<PersonaRow & { related_case_studies: CaseStudyRow[] }>;

  return persona;
}
export async function getCaseStudiesByPersona(personaId: string): Promise<CaseStudyRow[]> {
  const supabase = await createServerSupabaseClient();


  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .contains('personas', [personaId])
    .eq('published', true)
    .order('published_at', { ascending: false }) as PostgrestResponse<CaseStudyRow>;

  return caseStudies || [];
}