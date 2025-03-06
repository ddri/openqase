// src/app/paths/algorithm/page.tsx
import { getAllContent } from '@/lib/mdx';
import type { Algorithm } from '@/lib/types';
import AlgorithmList from '@/components/AlgorithmList';

export default async function AlgorithmPage() {
  const algorithmList = await getAllContent<Algorithm>('algorithm');
  
  // Map the data to match what AlgorithmList expects
  const algorithms = algorithmList.map(item => ({
    ...item.frontmatter,
    slug: item.slug
  }));

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">
          Quantum Algorithms
        </h1>
        <AlgorithmList algorithms={algorithms} />
      </div>
    </main>
  );
}