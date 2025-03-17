// src/app/paths/algorithm/page.tsx
import { getAllContent } from '@/lib/mdx';
import AlgorithmList from '@/components/AlgorithmList';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import type { Algorithm } from '@/lib/types';

export default async function AlgorithmsPage() {
  const algorithmContent = await getAllContent<Algorithm>('algorithm');
  const algorithms = algorithmContent.map(content => ({
    ...content.frontmatter,
    slug: content.slug
  }));

  return (
    <LearningPathLayout title="Quantum Algorithms">
      <AlgorithmList algorithms={algorithms} />
    </LearningPathLayout>
  );
}