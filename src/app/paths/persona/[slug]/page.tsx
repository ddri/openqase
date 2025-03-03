// src/app/paths/persona/[slug]/page.tsx
import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { CaseStudy } from '@/lib/types';

// Components for MDX
const components = {
 h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-6">{children}</h1>
 ),
 h2: ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-semibold text-[var(--text-primary)] mt-8 mb-4">{children}</h2>
 ),
 p: ({ children }: { children: React.ReactNode }) => (
  <p className="text-[var(--text-secondary)] mb-4">{children}</p>
 ),
};

async function getPersona(slug: string) {
 try {
   const filePath = path.join(process.cwd(), 'content', 'persona', `${slug}.mdx`);
   const fileContent = await fs.readFile(filePath, 'utf8');
   const { data, content } = matter(fileContent);
   
   // Add debug logging to help us verify
   console.log('Loading persona MDX:', slug);
   console.log('Content found:', !!content);
   
   return {
     frontmatter: data,
     content,
     source: content // For MDXRemote compatibility
   };
 } catch (error) {
   console.error('Error loading persona:', error);
   return null;
 }
}

async function getCaseStudy(slug: string) {
 try {
   const filePath = path.join(process.cwd(), 'content', 'case-study', `${slug}.mdx`);
   const fileContent = await fs.readFile(filePath, 'utf8');
   const { data, content } = matter(fileContent);
   return {
     frontmatter: data,
     content,
     slug,
   };
 } catch (error) {
   console.error('Error loading case study:', error);
   return null;
 }
}

// Generate static paths
export async function generateStaticParams() {
 const contentDirectory = path.join(process.cwd(), 'content', 'persona');
 const files = await fs.readdir(contentDirectory);
 
 return files
   .filter(file => file.endsWith('.mdx'))
   .map(file => ({
     slug: file.replace('.mdx', ''),
   }));
}

// Get metadata for the page with Promise params
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
 // Await the params before using
 const resolvedParams = await props.params;
 const slug = resolvedParams.slug;
 const persona = await getPersona(slug);
 
 if (!persona) {
   return {
     title: 'Not Found',
     description: 'Page not found'
   };
 }

 return {
   title: `${persona.frontmatter.title} | OpenQase Quantum Computing`,
   description: persona.frontmatter.description,
   keywords: persona.frontmatter.keywords,
 };
}

// Updated to handle params as a Promise
export default async function PersonaPage(props: { params: Promise<{ slug: string }> }) {
 // Await the params before using
 const resolvedParams = await props.params;
 const slug = resolvedParams.slug;
 const persona = await getPersona(slug);
 
 if (!persona) {
   notFound();
 }
   
 // Get related case studies
 const caseStudies = await Promise.all(
   persona.frontmatter.relatedCaseStudies.map(async (studySlug: string) => {
     const study = await getCaseStudy(studySlug);
     if (!study) return null;
     return study;
   })
 ).then(studies => studies.filter(Boolean)); // Remove any null results

 return (
   <main className="min-h-screen p-8">
     <div className="max-w-7xl mx-auto">
       <div className="grid grid-cols-12 gap-8">
         {/* Left Column - Persona Card */}
         <div className="col-span-2">
          <Card className="bg-[var(--card)] border">
          <div className="aspect-[3/2] bg-[var(--card)] flex items-center justify-center">
          <span className="text-[var(--text-primary)]">{persona.frontmatter.title}</span>
             </div>
             <div className="p-3">
               <Badge className="bg-[var(--primary)] text-[var(--primary-foreground)] border-0">
                 {persona.frontmatter.role}
               </Badge>
             </div>
           </Card>
           <Link
             href="/paths/persona"
             className="inline-block mt-4 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
           >
             ← Back to Persona
           </Link>
         </div>

         {/* Main Content */}
         <div className="col-span-7">
           <article className="prose max-w-none">
             <MDXRemote source={persona.source} components={components} />
           </article>
         </div>

         {/* Right Column - Case Studies */}
         <div className="col-span-3">
         <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
             Related Case Studies
           </h2>
           <div className="space-y-4">
             {caseStudies.map((study) => (
               <Link
                 key={study.slug}
                 href={`/case-study/${study.slug}`}
                 className="block p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg hover:shadow-md"
               >
                 <h3 className="font-medium text-[var(--text-primary)] mb-2">
                   {study.frontmatter.title}
                 </h3>
                 <p className="text-sm text-[var(--text-secondary)]">
                   {study.frontmatter.description}
                 </p>
                 <div className="mt-3 flex flex-wrap gap-2">
                   {study.frontmatter.tags.map((tag: string) => (
                     <Badge key={tag} variant="outline" className="text-[var(--text-secondary)] border-[var(--border)]">
                       {tag}
                     </Badge>
                   ))}
                 </div>
               </Link>
             ))}
           </div>
         </div>
       </div>
     </div>
   </main>
 );
}