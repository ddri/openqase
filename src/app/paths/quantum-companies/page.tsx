import { getStaticContentList } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ExternalLink, Building2, Users } from 'lucide-react';

type QuantumCompany = Database['public']['Tables']['quantum_companies']['Row'];

export default async function QuantumCompaniesPage() {
  const quantumCompanies = await getStaticContentList('quantum_companies') as QuantumCompany[];
  
  const publishedCompanies = quantumCompanies.filter(company => company.published);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Quantum Companies</h1>
        <p className="text-xl text-muted-foreground">
          Explore quantum computing companies and organizations featured in case studies.
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          {publishedCompanies.length} companies available
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    <Link 
                      href={`/paths/quantum-companies/${company.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {company.name}
                    </Link>
                  </CardTitle>
                  {company.headquarters && (
                    <CardDescription className="mt-1">
                      📍 {company.headquarters}
                    </CardDescription>
                  )}
                </div>
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {company.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {company.company_type && (
                  <Badge variant="outline" className="text-xs">
                    {company.company_type}
                  </Badge>
                )}
                {company.founded_year && (
                  <Badge variant="outline" className="text-xs">
                    Founded {company.founded_year}
                  </Badge>
                )}
                {company.funding_stage && (
                  <Badge variant="outline" className="text-xs">
                    {company.funding_stage}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                {company.website_url && (
                  <a
                    href={company.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Website
                  </a>
                )}
                {company.linkedin_url && (
                  <a
                    href={company.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <Users className="h-3 w-3" />
                    LinkedIn
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}