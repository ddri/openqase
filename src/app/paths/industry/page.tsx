// src/app/paths/industry/page.tsx
import { Metadata } from 'next';
import { getStaticContentList } from '@/lib/content-fetchers';
import IndustryList from '@/components/IndustryList';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import type { Database } from '@/types/supabase';

export const metadata: Metadata = {
  title: 'Quantum Computing by Industry | Financial, Healthcare, Energy Applications - OpenQase',
  description: 'Industry-specific quantum computing applications for finance, healthcare, energy, and manufacturing. Discover sector-relevant use cases and implementation strategies.',
};

type Industry = Database['public']['Tables']['industries']['Row'];

export default async function IndustriesPage() {
  const industries = await getStaticContentList('industries') as Industry[];

  return (
    <LearningPathLayout title="Quantum Industries">
      <IndustryList industries={industries} />
    </LearningPathLayout>
  );
}