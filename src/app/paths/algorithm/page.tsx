// src/app/paths/algorithm/page.tsx
import { getStaticContentList } from '@/lib/content-fetchers';
import AlgorithmList from '@/components/AlgorithmList';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import type { Database } from '@/types/supabase';

type Algorithm = Database['public']['Tables']['algorithms']['Row'];

export default async function AlgorithmsPage() {
  const algorithms = await getStaticContentList('algorithms') as Algorithm[];

  return (
    <LearningPathLayout title="Quantum Algorithms">
      <AlgorithmList algorithms={algorithms} />
    </LearningPathLayout>
  );
}