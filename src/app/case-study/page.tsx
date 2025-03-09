// src/app/case-study/page.tsx
import { getAllContent } from '@/lib/mdx';
import type { CaseStudy } from '@/lib/types';
import CaseStudyList from '@/components/CaseStudyList';

export default async function CaseStudyPage() {
  const caseStudyList = await getAllContent<CaseStudy>('case-study');
  
  // Map the data to match what CaseStudyList expects
  const caseStudies = caseStudyList.map(item => ({
    ...item.frontmatter,
    slug: item.slug
  }));

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[hsl(var(--primary))] mb-8">
          Case Studies
        </h1>
        <CaseStudyList caseStudies={caseStudies} />
      </div>
    </main>
  );
}