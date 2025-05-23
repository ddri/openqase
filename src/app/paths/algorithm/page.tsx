// src/app/paths/algorithm/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase-server';
import AlgorithmList from '@/components/AlgorithmList';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import type { Database } from '@/types/supabase';

type Algorithm = Database['public']['Tables']['algorithms']['Row'];

async function getAlgorithms() {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('algorithms')
    .select()
    .eq('published', true)  // Only fetch published algorithms
    .order('name');

  if (error) {
    console.error('Error fetching algorithms:', error);
    return [];
  }

  return (data as unknown) as Algorithm[];
}

export default async function AlgorithmsPage() {
  const algorithms = await getAlgorithms();

  return (
    <LearningPathLayout title="Quantum Algorithms">
      <AlgorithmList algorithms={algorithms} />
    </LearningPathLayout>
  );
}