// src/app/paths/persona/page.tsx
import { getStaticContentList } from '@/lib/content-fetchers';
import PersonaList from '@/components/PersonaList';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import type { Database } from '@/types/supabase';

type Persona = Database['public']['Tables']['personas']['Row'];

export default async function PersonasPage() {
  const personas = await getStaticContentList('personas') as Persona[];

  return (
    <LearningPathLayout title="Quantum Personas">
      <PersonaList personas={personas} />
    </LearningPathLayout>
  );
}