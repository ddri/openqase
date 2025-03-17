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
   <main className="min-h-screen">
     <div className="container-outer section-spacing">
       {/* Back link */}
       <div className="mb-6 sm:mb-8">
         <Link
           href="/paths/persona"
           className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
         >
           <span>←</span>
           <span>Back to Persona</span>
         </Link>
       </div>

       {/* Header Section */}
       <div className="mb-8 sm:mb-12">
         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
           {persona.frontmatter.title}
         </h1>
         <Badge className="persona-role-badge text-base">
           {persona.frontmatter.role}
         </Badge>
       </div>

       {/* Main Content + Sidebar */}
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
         {/* Main Content */}
         <div className="lg:col-span-8">
           <article className="prose prose-lg dark:prose-invert max-w-none">
             <MDXRemote source={persona.source} components={components} />
           </article>
         </div>

         {/* Right Sidebar - Case Studies */}
         <aside className="lg:col-span-4">
           <div className="sticky top-24">
             <h2 className="text-2xl font-semibold mb-4">
               Related Case Studies
             </h2>
             <div className="grid gap-4">
               {caseStudies.map((study) => (
                 <Link
                   key={study.slug}
                   href={`/case-study/${study.slug}`}
                   className="group block"
                 >
                   <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-border-hover">
                     <div className="p-4 sm:p-6">
                       <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                         {study.frontmatter.title}
                       </h3>
                       <p className="text-muted-foreground text-sm mb-4">
                         {study.frontmatter.description}
                       </p>
                       <div className="flex flex-wrap gap-2">
                         {study.frontmatter.tags.map((tag: string) => (
                           <Badge 
                             key={tag} 
                             variant="secondary"
                             className="text-xs"
                           >
                             {tag}
                           </Badge>
                         ))}
                       </div>
                     </div>
                   </Card>
                 </Link>
               ))}
             </div>
           </div>
         </aside>
       </div>
     </div>
   </main>
 );
}