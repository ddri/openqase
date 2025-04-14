// src/app/case-study/page.tsx
import { createServerClient } from '@/lib/supabase-server';
import type { CaseStudy } from '@/types/supabase';
import CaseStudyList from '@/components/CaseStudyList';
import AuthGate from '@/components/auth/AuthGate';

export default async function CaseStudyPage() {
  const supabase = createServerClient();
  
  const { data: caseStudies, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching case studies:', error);
    return <div>Error loading case studies</div>;
  }

  return (
    <AuthGate
      title="Unlock Real-World Quantum Applications"
      description="Get exclusive access to detailed case studies showcasing how organizations are implementing quantum computing solutions today."
    >
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
          <CaseStudyList caseStudies={caseStudies || []} />
        </div>
      </main>
    </AuthGate>
  );
}