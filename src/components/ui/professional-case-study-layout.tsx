import { ReactNode } from 'react';
import { ArrowLeft, Users, Cpu, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface ProfessionalCaseStudyLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  backLinkText?: string;
  backLinkHref?: string;
  caseStudy: any;
}

export default function ProfessionalCaseStudyLayout({
  title,
  description,
  children,
  backLinkText = "Back to Case Studies",
  backLinkHref = "/case-study",
  caseStudy
}: ProfessionalCaseStudyLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="surface-sunken border-b border-border">
        <div className="container-outer py-6">
          <Link
            href={backLinkHref}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>{backLinkText}</span>
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-outer py-8 md:py-12">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr,300px]">
          {/* Article Content */}
          <article className="max-w-none">
            <div className="surface-content rounded-lg p-8 prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:text-foreground/90">
              {children}
            </div>
          </article>

          {/* Professional Sidebar */}
          <aside className="space-y-6">
            {/* Quick Facts */}
            <div className="surface-sunken rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Facts</h3>
              <div className="space-y-4">
                {caseStudy.year && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Year</div>
                    <Badge variant="secondary" className="font-medium">
                      {caseStudy.year}
                    </Badge>
                  </div>
                )}

                {caseStudy.partner_companies && caseStudy.partner_companies.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Partner Companies</div>
                    <div className="flex flex-wrap gap-1.5">
                      {caseStudy.partner_companies.map((company: string) => (
                        <Badge key={company} variant="outline" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {caseStudy.quantum_companies && caseStudy.quantum_companies.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Quantum Companies</div>
                    <div className="flex flex-wrap gap-1.5">
                      {caseStudy.quantum_companies.map((company: string) => (
                        <Badge key={company} variant="outline" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Details */}
            <div className="surface-sunken rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Technical Details</h3>
              <div className="space-y-4">
                {caseStudy.quantum_hardware && caseStudy.quantum_hardware.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <Cpu className="h-3 w-3" />
                      Quantum Hardware
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {caseStudy.quantum_hardware.map((hardware: string) => (
                        <Badge key={hardware} variant="outline" className="text-xs">
                          {hardware}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {caseStudy.quantum_software && caseStudy.quantum_software.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Quantum Software</div>
                    <div className="flex flex-wrap gap-1.5">
                      {caseStudy.quantum_software.map((software: string) => (
                        <Badge key={software} variant="outline" className="text-xs">
                          {software}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="surface-sunken rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Categories</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Industries</div>
                  <div className="flex flex-wrap gap-1.5">
                    {(() => {
                      if (caseStudy.case_study_industry_relations && caseStudy.case_study_industry_relations.length > 0) {
                        const naIndustry = caseStudy.case_study_industry_relations.find((rel: any) => rel.industries?.slug === 'not-applicable');
                        if (naIndustry && naIndustry.industries) {
                          return <span className="text-xs text-muted-foreground">Not Applicable</span>;
                        }
                        const actualIndustries = caseStudy.case_study_industry_relations.filter((rel: any) => rel.industries?.slug !== 'not-applicable');
                        if (actualIndustries.length > 0) {
                          return actualIndustries.map((relation: any) =>
                            relation.industries ? (
                              <Link key={relation.industries.id} href={`/paths/industry/${relation.industries?.slug}`}>
                                <Badge variant="default" className="text-xs hover:bg-primary/80 cursor-pointer">
                                  {relation.industries.name}
                                </Badge>
                              </Link>
                            ) : null
                          );
                        }
                      }
                      return <span className="text-xs text-muted-foreground">None</span>;
                    })()}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Algorithms</div>
                  <div className="flex flex-wrap gap-1.5">
                    {(() => {
                      if (caseStudy.algorithm_case_study_relations && caseStudy.algorithm_case_study_relations.length > 0) {
                        const naAlgorithm = caseStudy.algorithm_case_study_relations.find((rel: any) => rel.algorithms?.slug === 'not-applicable');
                        if (naAlgorithm && naAlgorithm.algorithms) {
                          return <span className="text-xs text-muted-foreground">Not Applicable</span>;
                        }
                        const actualAlgorithms = caseStudy.algorithm_case_study_relations.filter((rel: any) => rel.algorithms?.slug !== 'not-applicable');
                        if (actualAlgorithms.length > 0) {
                          return actualAlgorithms.map((relation: any) =>
                            relation.algorithms ? (
                              <Link key={relation.algorithms.id} href={`/paths/algorithm/${relation.algorithms?.slug}`}>
                                <Badge variant="default" className="text-xs hover:bg-primary/80 cursor-pointer">
                                  {relation.algorithms.name}
                                </Badge>
                              </Link>
                            ) : null
                          );
                        }
                      }
                      return <span className="text-xs text-muted-foreground">None</span>;
                    })()}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Target Personas</div>
                  <div className="flex flex-wrap gap-1.5">
                    {(() => {
                      if (caseStudy.case_study_persona_relations && caseStudy.case_study_persona_relations.length > 0) {
                        const naPersona = caseStudy.case_study_persona_relations.find((rel: any) => rel.personas?.slug === 'not-applicable');
                        if (naPersona && naPersona.personas) {
                          return <span className="text-xs text-muted-foreground">Not Applicable</span>;
                        }
                        const actualPersonas = caseStudy.case_study_persona_relations.filter((rel: any) => rel.personas?.slug !== 'not-applicable');
                        if (actualPersonas.length > 0) {
                          return actualPersonas.map((relation: any) =>
                            relation.personas ? (
                              <Link key={relation.personas.id} href={`/paths/persona/${relation.personas?.slug}`}>
                                <Badge variant="default" className="text-xs hover:bg-primary/80 cursor-pointer">
                                  {relation.personas.name}
                                </Badge>
                              </Link>
                            ) : null
                          );
                        }
                      }
                      return <span className="text-xs text-muted-foreground">None</span>;
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Resource Links */}
            {caseStudy.resource_links && Array.isArray(caseStudy.resource_links) && caseStudy.resource_links.length > 0 && (
              <div className="surface-sunken rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Additional Resources
                </h3>
                <div className="space-y-2">
                  {(caseStudy.resource_links as Array<{url: string, label?: string, order: number}>)
                    .sort((a, b) => a.order - b.order)
                    .map((link, index) => (
                      <a 
                        key={index} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                      >
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{link.label || link.url}</span>
                      </a>
                    ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}