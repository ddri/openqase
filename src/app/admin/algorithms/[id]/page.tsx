import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { Database } from '@/types/supabase';
import { notFound } from 'next/navigation';
import { AlgorithmForm } from './client';

type Algorithm = Database['public']['Tables']['algorithms']['Row'];

// Define more specific types for the query results
interface CaseStudyListItem {
  id: string;
  title: string;
  slug: string;
}

interface IndustryListItem {
  id: string;
  name: string;
  slug: string;
}

interface PersonaListItem {
  id: string;
  name: string;
  slug: string;
}

interface AlgorithmPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAlgorithmPage({ params }: AlgorithmPageProps) {
  const resolvedParams = await params;
  const supabase = createServiceRoleSupabaseClient();
  const isNew = resolvedParams.id === 'new';

  // Fetch algorithm if editing
  let algorithm: Algorithm | null = null;
  if (!isNew) {
    const { data } = await supabase
      .from('algorithms')
      .select('*')
      .eq('id', resolvedParams.id)
      .single();
    algorithm = data;
  }

  // Fetch related data for relationships using service client to bypass RLS
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('id, title, slug')
    .order('title');

  const { data: industries } = await supabase
    .from('industries')
    .select('id, name, slug')
    .order('name');

  const { data: personas } = await supabase
    .from('personas')
    .select('id, name, slug')
    .order('name');

  let relatedCaseStudyIds: string[] = [];
  let relatedIndustryIds: string[] = [];
  let relatedPersonaIds: string[] = [];

  if (!isNew && algorithm) {
    // Fetch related case study IDs
    const { data: csRelations } = await supabase
      .from('algorithm_case_study_relations' as any)
      .select('case_study_id')
      .eq('algorithm_id', algorithm.id);
    if (csRelations) {
      relatedCaseStudyIds = csRelations.map((rel: any) => rel.case_study_id);
    }

    // Fetch related industry IDs
    const { data: indRelations } = await supabase
      .from('algorithm_industry_relations' as any)
      .select('industry_id')
      .eq('algorithm_id', algorithm.id);
    if (indRelations) {
      relatedIndustryIds = indRelations.map((rel: any) => rel.industry_id);
    }

    // Fetch related persona IDs
    const { data: personaRelations } = await supabase
      .from('persona_algorithm_relations' as any)
      .select('persona_id')
      .eq('algorithm_id', algorithm.id);
    if (personaRelations) {
      relatedPersonaIds = personaRelations.map((rel: any) => rel.persona_id);
    }
  }

  if (!isNew && !algorithm) {
    notFound();
  }

  // This means at this point, if !isNew is true, then algorithm must be defined
  // Use a more explicit type annotation to help TypeScript understand our intent
  const algorithmData: Algorithm = !isNew && algorithm ? algorithm : {} as Algorithm;

  if (!isNew) {
    (algorithmData as any).related_case_studies = relatedCaseStudyIds;
    (algorithmData as any).related_industries = relatedIndustryIds;
    (algorithmData as any).related_personas = relatedPersonaIds;
  }

  return (
    <AlgorithmForm
      algorithm={algorithmData}
      caseStudies={caseStudies || []}
      industries={industries || []}
      personas={personas || []}
      isNew={isNew}
    />
  );
}