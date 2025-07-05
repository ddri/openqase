import { useCaseStudies } from '@/hooks/useApi';
import { Database } from '@/types/supabase';
import ContentCard from '@/components/ui/content-card';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'] & {
  related_industries?: Array<{ id: string; slug: string; name: string }>;
  related_algorithms?: Array<{ id: string; slug: string; name: string }>;
  related_personas?: Array<{ id: string; slug: string; name: string }>;
};

export function CaseStudiesList() {
  const { data, isLoading, error } = useCaseStudies();

  if (isLoading) {
    return <div>Loading case studies...</div>;
  }

  if (error) {
    return <div>Error loading case studies: {error.message}</div>;
  }

  if (!data?.items) {
    return <div>No case studies found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.items.map((caseStudy: CaseStudy) => {
        // Combine related industries and algorithms into badges
        const badges = [
          ...(caseStudy.related_industries?.map(industry => industry.name) || []),
          ...(caseStudy.related_algorithms?.map(algorithm => algorithm.name) || [])
        ];

        return (
          <ContentCard
            key={caseStudy.id}
            title={caseStudy.title}
            description={caseStudy.description || ''}
            badges={badges}
            href={`/case-study/${caseStudy.slug}`}
          />
        );
      })}
    </div>
  );
} 