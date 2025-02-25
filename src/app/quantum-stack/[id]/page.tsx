// src/app/quantum-stack/[id]/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface StackLayer {
 title: string;
 description: string;
 color: string;
 layer: number;
 applications: Array<{
   title: string;
   description: string;
   examples: string[];
 }>;
 relatedContent?: {
   algorithm?: string[];
   caseStudy?: string[];
 };
 rawContent: string;
}

const components = {
 h1: ({ children }: { children: React.ReactNode }) => (
   <h1 className="text-4xl font-bold text-text-primary mb-6">{children}</h1>
 ),
 h2: ({ children }: { children: React.ReactNode }) => (
   <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">{children}</h2>
 ),
 h3: ({ children }: { children: React.ReactNode }) => (
   <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">{children}</h3>
 ),
 p: ({ children }: { children: React.ReactNode }) => (
   <p className="text-text-secondary mb-4 leading-relaxed">{children}</p>
 ),
 ul: ({ children }: { children: React.ReactNode }) => (
   <ul className="list-disc list-inside space-y-2 text-text-secondary mb-6 ml-4">{children}</ul>
 ),
 li: ({ children }: { children: React.ReactNode }) => (
   <li className="text-text-secondary">{children}</li>
 ),
};

export async function generateStaticParams() {
 const contentDirectory = path.join(process.cwd(), 'content', 'stack-layers');
 const files = await fs.readdir(contentDirectory);
 
 return files
   .filter(file => file.endsWith('.mdx'))
   .map(file => ({
     id: file.replace('.mdx', ''),
   }));
}

async function getStackLayer(id: string): Promise<StackLayer | null> {
 try {
   const filePath = path.join(process.cwd(), 'content', 'stack-layers', `${id}.mdx`);
   const fileContent = await fs.readFile(filePath, 'utf8');
   const { data, content } = matter(fileContent);
   
   return {
     ...data,
     rawContent: content
   } as StackLayer;
 } catch (error) {
   return null;
 }
}

export default async function StackLayerPage({ params }: { params: { id: string } }) {
 const stackLayer = await getStackLayer(params.id);

 if (!stackLayer) {
   notFound();
 }

 return (
   <main className="min-h-screen p-8">
     <div className="max-w-7xl mx-auto">
       <div className="mb-8">
         <Link 
           href="/quantum-stack"
           className="text-sm text-text-secondary hover:text-text-primary transition-colors"
         >
           ← Back to Quantum Stack
         </Link>
       </div>

       <div className="grid grid-cols-12 gap-8">
         {/* Left Column - Layer Info */}
         <div className="col-span-2">
           <Card>
             <CardHeader>
               <Badge className="bg-accent text-white mb-2">
                 Layer {stackLayer.layer}
               </Badge>
               <CardTitle>{stackLayer.title}</CardTitle>
             </CardHeader>
           </Card>
         </div>

         {/* Main Content */}
         <div className="col-span-7">
           <article className="prose dark:prose-invert max-w-none">
             <MDXRemote 
               source={stackLayer.rawContent}
               components={components} 
             />
           </article>
         </div>

         {/* Right Column - Applications & Related */}
         <div className="col-span-3">
           <div className="sticky top-8 space-y-6">
             {stackLayer.applications && (
               <Card>
                 <CardHeader>
                   <CardTitle className="text-lg">Key Applications</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="space-y-4">
                     {stackLayer.applications.map((app) => (
                       <div key={app.title}>
                         <h4 className="font-medium text-text-primary mb-2">{app.title}</h4>
                         <p className="text-sm text-text-secondary mb-2">{app.description}</p>
                         <div className="flex flex-wrap gap-2">
                           {app.examples.map((example) => (
                             <Badge key={example} variant="outline">
                               {example}
                             </Badge>
                           ))}
                         </div>
                       </div>
                     ))}
                   </div>
                 </CardContent>
               </Card>
             )}

             {stackLayer.relatedContent && (
               <Card>
                 <CardHeader>
                   <CardTitle className="text-lg">Related Content</CardTitle>
                 </CardHeader>
                 <CardContent>
                   {stackLayer.relatedContent.algorithm && (
                     <div className="mb-4">
                       <h4 className="font-medium text-text-primary mb-2">Algorithms</h4>
                       <div className="space-y-1">
                         {stackLayer.relatedContent.algorithm.map((algo) => (
                           <Link 
                             key={algo}
                             href={`/paths/algorithm/${algo}`}
                             className="block text-text-secondary hover:text-text-primary"
                           >
                             {algo}
                           </Link>
                         ))}
                       </div>
                     </div>
                   )}
                   {stackLayer.relatedContent.caseStudy && (
                     <div>
                       <h4 className="font-medium text-text-primary mb-2">Case Studies</h4>
                       <div className="space-y-1">
                         {stackLayer.relatedContent.caseStudy.map((study) => (
                           <Link 
                             key={study}
                             href={`/case-study/${study}`}
                             className="block text-text-secondary hover:text-text-primary"
                           >
                             {study}
                           </Link>
                         ))}
                       </div>
                     </div>
                   )}
                 </CardContent>
               </Card>
             )}
           </div>
         </div>
       </div>
     </div>
   </main>
 );
}