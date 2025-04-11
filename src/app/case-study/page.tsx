// src/app/case-study/page.tsx
import { getAllContent } from '@/lib/mdx';
import type { CaseStudy } from '@/lib/types';
import CaseStudyList from '@/components/CaseStudyList';
import AuthGate from '@/components/auth/AuthGate';

export default async function CaseStudyPage() {
  const caseStudyList = await getAllContent<CaseStudy>('case-study');
  
  // Map the data to match what CaseStudyList expects
  const caseStudies = caseStudyList.map(item => ({
    ...item.frontmatter,
    slug: item.slug
  }));

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
          <CaseStudyList caseStudies={caseStudies} />
        </div>
      </main>
    </AuthGate>
  );
}