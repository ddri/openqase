// src/app/paths/persona/page.tsx
import { getAllContent } from '@/lib/mdx';
import PersonaList from '@/components/PersonaList';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import type { Persona } from '@/lib/types';

export default async function PersonasPage() {
  const personaContent = await getAllContent<Persona>('persona');
  const personas = personaContent.map(content => ({
    ...content.frontmatter,
    slug: content.slug
  }));

  return (
    <LearningPathLayout title="Quantum Personas">
      <PersonaList personas={personas} />
    </LearningPathLayout>
  );
}