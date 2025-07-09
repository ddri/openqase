// src/app/paths/industry/page.tsx
import { getStaticContentList } from '@/lib/content-fetchers';
import IndustryList from '@/components/IndustryList';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import type { Database } from '@/types/supabase';

type Industry = Database['public']['Tables']['industries']['Row'];

export default async function IndustriesPage() {
  const industries = await getStaticContentList('industries') as Industry[];

  return (
    <LearningPathLayout title="Quantum Industries">
      <IndustryList industries={industries} />
    </LearningPathLayout>
  );
}