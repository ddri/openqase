import { useCaseStudies } from '@/hooks/useApi';
import { Database } from '@/types/supabase';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

export function CaseStudiesList() {
  const { data, isLoading, error } = useCaseStudies();

  if (isLoading) {
    return <div>Loading case studies...</div>;
  }

  if (error) {
    return <div>Error loading case studies: {error.message}</div>;
  }

  if (!data?.data?.data) {
    return <div>No case studies found.</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.data.data.map((caseStudy: CaseStudy) => (
        <div
          key={caseStudy.id}
          className="rounded-lg border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h3 className="mb-2 text-xl font-semibold">{caseStudy.title}</h3>
          <p className="mb-4 text-gray-600">{caseStudy.description}</p>
          <div className="flex flex-wrap gap-2">
            {caseStudy.industries.map((industry: string) => (
              <span
                key={industry}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 