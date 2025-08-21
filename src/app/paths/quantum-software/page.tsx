import { getStaticContentList } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ExternalLink, Github, FileText } from 'lucide-react';

type QuantumSoftware = Database['public']['Tables']['quantum_software']['Row'];

export default async function QuantumSoftwarePage() {
  const quantumSoftware = await getStaticContentList('quantum_software') as QuantumSoftware[];
  
  const publishedSoftware = quantumSoftware.filter(software => software.published);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Quantum Software</h1>
        <p className="text-xl text-muted-foreground">
          Explore quantum software platforms, libraries, and development tools used in quantum computing case studies.
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          {publishedSoftware.length} software platforms available
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedSoftware.map((software) => (
          <Card key={software.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    <Link 
                      href={`/paths/quantum-software/${software.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {software.name}
                    </Link>
                  </CardTitle>
                  {software.vendor && (
                    <CardDescription className="mt-1">
                      by {software.vendor}
                    </CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {software.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {software.license_type && (
                  <Badge variant="outline" className="text-xs">
                    {software.license_type}
                  </Badge>
                )}
                {software.pricing_model && (
                  <Badge variant="outline" className="text-xs">
                    {software.pricing_model}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                {software.website_url && (
                  <a
                    href={software.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Website
                  </a>
                )}
                {software.documentation_url && (
                  <a
                    href={software.documentation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <FileText className="h-3 w-3" />
                    Docs
                  </a>
                )}
                {software.github_url && (
                  <a
                    href={software.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <Github className="h-3 w-3" />
                    GitHub
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