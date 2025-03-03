// src/app/paths/persona/page.tsx
import { getAllContent } from '@/lib/mdx';
import { Persona } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Atom, BarChart3, Code, LightbulbIcon, Shield } from 'lucide-react';
import React from 'react';

// Icon mapping function
const getPersonaIcon = (title: string) => {
  const iconMap: Record<string, React.ReactElement> = {
    "Quantum Chemist": <Atom className="persona-icon" />,
    "Financial Analyst": <BarChart3 className="persona-icon" />,
    "Government Policy Maker": <Shield className="persona-icon" />,
    "Investment Professional": <LightbulbIcon className="persona-icon" />,
    "Software Engineer": <Code className="persona-icon" />
  };
  
  return iconMap[title] || <LightbulbIcon className="persona-icon" />;
};

export const metadata = {
 title: 'Learning Path by Persona | OpenQase',
 description: 'Choose your quantum computing learning path based on your role and experience'
};

export default async function PersonaPage() {
 const personaList = await getAllContent<Persona>('persona');

 return (
   <main className="min-h-screen p-8">
     <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Learning Path by Persona</h1>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {personaList.map((persona) => (
          <Link key={persona.slug} href={`/paths/persona/${persona.slug}`}>
            <Card fixedHeight height={300} className="hover:bg-accent/15 hover:shadow-lg transition-all">
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-9">
                  <div className="persona-icon-wrapper">
                    {getPersonaIcon(persona.frontmatter.title)}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {persona.frontmatter.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-auto">
                  {persona.frontmatter.description}
                </p>
                
                {/* Expertise badges */}
                {persona.frontmatter.expertise && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {persona.frontmatter.expertise.slice(0, 3).map((item: string) => (
                        <Badge 
                          key={item} 
                          variant="outline" 
                          className="badge"
                        >
                          {item}
                        </Badge>
                      ))}
                      {persona.frontmatter.expertise.length > 3 && (
                        <Badge 
                          variant="outline" 
                          className="more-badge"
                        >
                          +{persona.frontmatter.expertise.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </Link>
         ))}
       </div>
     </div>
   </main>
 );
}