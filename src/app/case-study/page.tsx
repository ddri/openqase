// src/app/case-study/page.tsx
import CaseStudyList from '@/components/CaseStudyList';
import { createServiceClient } from '@/utils/supabase/service-role';
import type { CaseStudy } from '@/lib/types';

export default async function CaseStudyPage() {
  const supabase = createServiceClient();
  
  // Fetch case studies directly using the service role client
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching case studies:', error);
    return <div>Error loading case studies</div>;
  }
  
  // Map the database results to the expected CaseStudy type
  const caseStudies: CaseStudy[] = (data || []).map(item => ({
    type: 'case-study',
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    main_content: item.main_content,
    partner_companies: item.partner_companies || [],
    quantum_companies: item.quantum_companies || [],
    url: item.url,
    algorithms: item.algorithms || [],
    industries: item.industries || [],
    personas: item.personas || [],
    qubits_used: item.qubits_used || null,
    quantum_hardware: item.quantum_hardware || [],
    classical_hardware: [],
    published: item.published,
    published_at: item.published_at,
    created_at: item.created_at,
    updated_at: item.updated_at,
    lastUpdated: item.updated_at
  }));

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
        <CaseStudyList caseStudies={caseStudies || []} />
      </div>
    </main>
  );
}