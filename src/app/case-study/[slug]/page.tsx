// src/app/case-study/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Database } from '@/types/supabase';
import LearningPathLayout from '@/components/ui/learning-path-layout';
import { Badge } from '@/components/ui/badge';
import MarkdownIt from 'markdown-it';
import { ReferencesRenderer, processContentWithReferences } from '@/components/ui/ReferencesRenderer';

// Initialize markdown-it with GFM features enabled
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});

// Function to fix bullet points in markdown content
function preprocessMarkdown(content: string): string {
  // Fix lists: ensure there's a space after each dash at the beginning of a line
  // and add a newline before lists if needed
  const fixedContent = content
    .replace(/^-([^\s])/gm, '- $1')  // Add space after dash at line start if missing
    .replace(/([^\n])\n^-\s/gm, '$1\n\n- '); // Add blank line before list starts
    
  return fixedContent;
}

// Customize renderer to improve table formatting
const defaultRender = md.renderer.rules.table_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.table_open = function(tokens, idx, options, env, self) {
  // Add a div wrapper with a class around the table
  return '<div class="table-container">' + defaultRender(tokens, idx, options, env, self);
};

md.renderer.rules.table_close = function(tokens, idx, options, env, self) {
  // Close both the table and the wrapper div
  return '</table></div>';
};

// Customize cell rendering for numeric detection
const defaultCellRender = md.renderer.rules.td_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.td_open = function(tokens, idx, options, env, self) {
  // Check if cell content might be numeric
  const content = tokens[idx+1]?.content;
  const isNumeric = content && !isNaN(parseFloat(content)) && content.trim() !== '';
  
  if (isNumeric) {
    return '<td class="numeric">';
  }
  return defaultCellRender(tokens, idx, options, env, self);
};

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  console.log('Fetching case study with slug:', slug);

  const supabase = await createServerSupabaseClient();
  const { data: caseStudy, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  console.log('Case study query result:', { caseStudy, error });
  console.log('Resource links:', caseStudy?.resource_links);

  if (error || !caseStudy) {
    console.error('Error fetching case study:', error);
    return notFound();
  }

  // Process content with references if available
  let processedContent = '';
  if (caseStudy.main_content) {
    // Preprocess the markdown content to fix list formatting
    const preprocessedContent = preprocessMarkdown(caseStudy.main_content);
    
    // Process citations in content if there are references
    if (caseStudy.academic_references) {
      const processedMarkdown = processContentWithReferences(preprocessedContent);
      processedContent = md.render(processedMarkdown);
    } else {
      processedContent = md.render(preprocessedContent);
    }
  }

  return (
    <LearningPathLayout
      title={caseStudy.title}
      description={caseStudy.description || ''}
      backLinkText="Back to Case Studies"
      backLinkHref="/case-study"
    >
      <div className="prose dark:prose-invert max-w-none">
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div>
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
            
            {/* Display References Section if available */}
            {caseStudy.academic_references && (
              <ReferencesRenderer referencesMarkup={caseStudy.academic_references} />
            )}
          </div>
          <div className="space-y-6">
            {caseStudy.partner_companies && caseStudy.partner_companies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Partner Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.partner_companies.map((company: string) => (
                    <Badge key={company} variant="outline">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {caseStudy.quantum_companies && caseStudy.quantum_companies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Quantum Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.quantum_companies.map((company: string) => (
                    <Badge key={company} variant="outline">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {caseStudy.quantum_hardware && caseStudy.quantum_hardware.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Quantum Hardware</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.quantum_hardware.map((hardware: string) => (
                    <Badge key={hardware} variant="outline">
                      {hardware}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {caseStudy.industries && caseStudy.industries.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.industries.map((industry: string) => (
                    <Badge key={industry} variant="outline">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {caseStudy.algorithms && caseStudy.algorithms.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Algorithms</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.algorithms.map((algorithm: string) => (
                    <Badge key={algorithm} variant="outline">
                      {algorithm}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {caseStudy.resource_links && caseStudy.resource_links.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Resource Links</h3>
                <div className="flex flex-col space-y-2">
                  {caseStudy.resource_links
                    .sort((a, b) => a.order - b.order)
                    .map((link, index) => (
                      <a 
                        key={index} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        {link.label || link.url}
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LearningPathLayout>
  );
}