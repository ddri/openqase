// src/app/paths/persona/page.tsx
import { getAllContent } from '@/lib/mdx';
import { Persona } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata = {
 title: 'Learning Path by Persona | OpenQase',
 description: 'Choose your quantum computing learning path based on your role and experience'
};

export default async function PersonaPage() {
 const personaList = await getAllContent<Persona>('persona');

 return (
   <main className="min-h-screen p-8">
     <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Learning Path by Persona</h1>
      <p className="text-xl text-[var(--text-secondary)] mb-8">Choose your path based on your role and experience</p>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {personaList.map((persona) => (
          <Link key={persona.slug} href={`/paths/persona/${persona.slug}`}>
  <Card fixedHeight height={280} className="hover:bg-accent/5 transition-colors relative">
    <CardHeader flexGrow>
      <CardTitle className="text-xl mb-2 text-[var(--text-primary)]">
        {persona.frontmatter.title}
      </CardTitle>
      <CardDescription className="text-[var(--text-secondary)] mb-16">
        {persona.frontmatter.description}
      </CardDescription>
    </CardHeader>
    
    {/* Added: Fixed position expertise badges at bottom of card */}
    {persona.frontmatter.expertise && (
  <div className="absolute bottom-4 left-6 right-6">
    <div className="flex overflow-x-auto pb-1 scrollbar-none">
      <div className="flex gap-2 flex-nowrap">
        {persona.frontmatter.expertise.slice(0, 3).map((item: string) => (
          <Badge key={item} variant="outline" className="text-[var(--text-secondary)] border-[var(--border)]">
            {item}
          </Badge>
        ))}
        {persona.frontmatter.expertise.length > 3 && (
          <Badge variant="outline" className="text-[var(--text-secondary)] border-[var(--border)]">
            +{persona.frontmatter.expertise.length - 3} more
          </Badge>
        )}
      </div>
    </div>
  </div>
)}
  </Card>
</Link>
         ))}
       </div>
     </div>
   </main>
 );
}