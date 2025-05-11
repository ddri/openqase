import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { Database } from '@/types/supabase';
import { notFound } from 'next/navigation';
import { IndustryForm } from './client';

type Industry = Database['public']['Tables']['industries']['Row'];

interface IndustryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditIndustryPage({ params }: IndustryPageProps) {
  const resolvedParams = await params;
  const supabase = createServiceRoleSupabaseClient();
  const isNew = resolvedParams.id === 'new';

  // Fetch industry if editing
  const { data: industry } = !isNew
    ? await supabase
        .from('industries')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()
    : { data: null };

  if (!isNew && !industry) {
    notFound();
  }

  // This means at this point, if !isNew is true, then industry must be defined
  // Use a more explicit type annotation to help TypeScript understand our intent
  const industryData: Industry = !isNew ? industry as Industry : {} as Industry;

  return (
    <IndustryForm
      industry={industryData}
      isNew={isNew}
    />
  );
}