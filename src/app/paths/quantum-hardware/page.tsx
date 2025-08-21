import { getStaticContentList } from '@/lib/content-fetchers';
import type { Database } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ExternalLink, FileText, Cpu } from 'lucide-react';

type QuantumHardware = Database['public']['Tables']['quantum_hardware']['Row'];

export default async function QuantumHardwarePage() {
  const quantumHardware = await getStaticContentList('quantum_hardware') as QuantumHardware[];
  
  const publishedHardware = quantumHardware.filter(hardware => hardware.published);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Quantum Hardware</h1>
        <p className="text-xl text-muted-foreground">
          Explore quantum computing hardware platforms and systems used in quantum computing case studies.
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          {publishedHardware.length} hardware platforms available
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedHardware.map((hardware) => (
          <Card key={hardware.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    <Link 
                      href={`/paths/quantum-hardware/${hardware.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {hardware.name}
                    </Link>
                  </CardTitle>
                  {hardware.vendor && (
                    <CardDescription className="mt-1">
                      by {hardware.vendor}
                    </CardDescription>
                  )}
                </div>
                <Cpu className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {hardware.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {hardware.technology_type && (
                  <Badge variant="outline" className="text-xs">
                    {hardware.technology_type}
                  </Badge>
                )}
                {hardware.qubit_count && (
                  <Badge variant="outline" className="text-xs">
                    {hardware.qubit_count} qubits
                  </Badge>
                )}
                {hardware.availability && (
                  <Badge variant="outline" className="text-xs">
                    {hardware.availability}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                {hardware.website_url && (
                  <a
                    href={hardware.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Website
                  </a>
                )}
                {hardware.documentation_url && (
                  <a
                    href={hardware.documentation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <FileText className="h-3 w-3" />
                    Docs
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