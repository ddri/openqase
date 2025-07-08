import { createServerSupabaseClient } from '@/lib/supabase-server';
import { CaseStudiesList } from '@/components/CaseStudiesList';
import type { Database } from '@/types/supabase';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

async function getCaseStudies() {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('published', true)  // Only fetch published case studies
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }

  return (data as unknown) as CaseStudy[];
}

export default async function CaseStudyPage() {
  const caseStudies = await getCaseStudies();

  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        <div className="max-w-2xl mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Case Studies
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Explore real-world applications of quantum computing across different industries and use cases.
          </p>
        </div>
        <CaseStudiesList caseStudies={caseStudies} />
      </div>
    </main>
  );
}