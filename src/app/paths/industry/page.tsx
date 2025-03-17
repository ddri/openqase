// src/app/paths/industry/page.tsx
import { getAllContent } from '@/lib/mdx';
import IndustryList from '@/components/IndustryList';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import type { Industry } from '@/lib/types';

export default async function IndustriesPage() {
  const industryContent = await getAllContent<Industry>('industry');
  const industries = industryContent.map(content => ({
    ...content.frontmatter,
    slug: content.slug
  }));

  return (
    <LearningPathLayout title="Quantum Industries">
      <IndustryList industries={industries} />
    </LearningPathLayout>
  );
}