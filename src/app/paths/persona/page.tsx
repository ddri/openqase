// src/app/paths/persona/page.tsx
import { Metadata } from 'next';
import { getStaticContentList } from '@/lib/content-fetchers';
import PersonaList from '@/components/PersonaList';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import type { Database } from '@/types/supabase';

export const metadata: Metadata = {
  title: 'Quantum Computing by Role | Learning Paths for Business Leaders & Engineers - OpenQase',
  description: 'Role-specific quantum computing content for CEOs, CTOs, engineers, and consultants. Learn how quantum applications apply to your professional responsibilities.',
};

type Persona = Database['public']['Tables']['personas']['Row'];

export default async function PersonasPage() {
  const personas = await getStaticContentList('personas') as Persona[];

  return (
    <LearningPathLayout title="Quantum Personas">
      <PersonaList personas={personas} />
    </LearningPathLayout>
  );
}