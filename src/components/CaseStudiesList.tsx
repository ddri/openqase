import { Database } from '@/types/supabase';
import ContentCard from '@/components/ui/content-card';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

interface CaseStudiesListProps {
  caseStudies: CaseStudy[];
}

export function CaseStudiesList({ caseStudies }: CaseStudiesListProps) {
  if (!caseStudies || caseStudies.length === 0) {
    return <div>No case studies found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {caseStudies.map((caseStudy) => {
        return (
          <ContentCard
            key={caseStudy.id}
            title={caseStudy.title}
            description={caseStudy.description || ''}
            badges={[]} // No badges for now - keeping it simple
            href={`/case-study/${caseStudy.slug}`}
          />
        );
      })}
    </div>
  );
} 