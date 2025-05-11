// src/app/paths/persona/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PersonaList from '@/components/PersonaList';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import type { Database } from '@/types/supabase';

type Persona = Database['public']['Tables']['personas']['Row'];

async function getPersonas() {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('personas')
    .select('*')
    .eq('published', true)  // Only fetch published personas
    .order('name');

  if (error) {
    console.error('Error fetching personas:', error);
    return [];
  }

  return (data as unknown) as Persona[];
}

export default async function PersonasPage() {
  const personas = await getPersonas();

  return (
    <LearningPathLayout title="Quantum Personas">
      <PersonaList personas={personas} />
    </LearningPathLayout>
  );
}