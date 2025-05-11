// src/app/paths/industry/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase-server';
import IndustryList from '@/components/IndustryList';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import type { Database } from '@/types/supabase';

type Industry = Database['public']['Tables']['industries']['Row'];

async function getIndustries() {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('industries')
    .select()
    .eq('published', true)  // Only fetch published industries
    .order('name');

  if (error) {
    console.error('Error fetching industries:', error);
    return [];
  }

  return data as Industry[];
}

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <LearningPathLayout title="Quantum Industries">
      <IndustryList industries={industries} />
    </LearningPathLayout>
  );
}