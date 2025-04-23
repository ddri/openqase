import { createClient } from '@/utils/supabase/server';
import { Database } from '@/types/supabase';
import { notFound } from 'next/navigation';
import { PersonaForm } from './client';

type Persona = Database['public']['Tables']['personas']['Row'];
type Industry = Database['public']['Tables']['industries']['Row'];

interface PersonaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPersonaPage({ params }: PersonaPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const isNew = resolvedParams.id === 'new';

  // Fetch persona if editing
  const { data: persona } = !isNew
    ? await supabase
        .from('personas')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()
    : { data: null };

  // Fetch industries for relationship selection
  const { data: industries } = await supabase
    .from('industries')
    .select('id, name, slug')
    .order('name');

  if (!isNew && !persona) {
    notFound();
  }

  // This means at this point, if !isNew is true, then persona must be defined
  // Use a more explicit type annotation to help TypeScript understand our intent
  const personaData: Persona = !isNew ? persona as Persona : {} as Persona;

  return (
    <PersonaForm
      persona={personaData}
      industries={industries || []}
      isNew={isNew}
    />
  );
}