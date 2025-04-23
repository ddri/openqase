import { createClient } from '@/utils/supabase/server';
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

interface AlgorithmPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAlgorithmPage({ params }: AlgorithmPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const isNew = resolvedParams.id === 'new';

  // Fetch algorithm if editing
  const { data: algorithm } = !isNew
    ? await supabase
        .from('algorithms')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()
    : { data: null };

  // Fetch related data for relationships
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('id, title, slug')
    .order('title');

  const { data: industries } = await supabase
    .from('industries')
    .select('id, name, slug')
    .order('name');

  if (!isNew && !algorithm) {
    notFound();
  }

  // This means at this point, if !isNew is true, then algorithm must be defined
  // Use a more explicit type annotation to help TypeScript understand our intent
  const algorithmData: Algorithm = !isNew ? algorithm as Algorithm : {} as Algorithm;

  return (
    <AlgorithmForm
      algorithm={algorithmData}
      caseStudies={caseStudies || []}
      industries={industries || []}
      isNew={isNew}
    />
  );
}