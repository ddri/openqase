import { createServerClient } from '@/lib/supabase-server';
import { Database } from '@/types/supabase';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];
type Industry = Database['public']['Tables']['industries']['Row'];
type Algorithm = Database['public']['Tables']['algorithms']['Row'];
type Persona = Database['public']['Tables']['personas']['Row'];

interface CaseStudyPageProps {
  params: {
    id: string;
  };
}

export default async function EditCaseStudyPage({ params }: CaseStudyPageProps) {
  const supabase = await createServerClient();
  const isNew = params.id === 'new';

  // Fetch case study if editing
  const { data: caseStudy } = !isNew
    ? await supabase
        .from('case_studies')
        .select('*')
        .eq('id', params.id)
        .single()
    : { data: null };

  // Fetch related data for dropdowns
  const { data: industries } = await supabase
    .from('industries')
    .select('slug, name')
    .order('name');

  const { data: algorithms } = await supabase
    .from('algorithms')
    .select('slug, name')
    .order('name');

  const { data: personas } = await supabase
    .from('personas')
    .select('slug, name')
    .order('name');

  if (!isNew && !caseStudy) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-2xl font-bold">
        {isNew ? 'Add New Case Study' : 'Edit Case Study'}
      </h1>

      <form action="/api/case-studies" method="POST" className="space-y-8">
        {!isNew && <input type="hidden" name="id" value={caseStudy.id} />}

        <Tabs defaultValue="basic" className="w-full">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="classifications">Classifications</TabsTrigger>
            <TabsTrigger value="technical">Technical Details</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={caseStudy?.title}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    type="text"
                    name="slug"
                    id="slug"
                    defaultValue={caseStudy?.slug}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    id="description"
                    rows={3}
                    defaultValue={caseStudy?.description || ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    type="url"
                    name="url"
                    id="url"
                    defaultValue={caseStudy?.url || ''}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      name="published"
                      id="published"
                      defaultChecked={caseStudy?.published}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      name="featured"
                      id="featured"
                      defaultChecked={caseStudy?.featured}
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    name="content"
                    id="content"
                    rows={10}
                    defaultValue={caseStudy?.content || ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mdx_content">MDX Content</Label>
                  <Textarea
                    name="mdx_content"
                    id="mdx_content"
                    rows={10}
                    defaultValue={caseStudy?.mdx_content || ''}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classifications">
            <Card>
              <CardHeader>
                <CardTitle>Classifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Industries</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {industries?.map((industry: Pick<Industry, 'slug' | 'name'>) => (
                      <div key={industry.slug} className="flex items-center space-x-2">
                        <Checkbox
                          name="industries[]"
                          value={industry.slug}
                          defaultChecked={caseStudy?.industries?.includes(industry.slug)}
                        />
                        <Label>{industry.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Algorithms</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {algorithms?.map((algorithm: Pick<Algorithm, 'slug' | 'name'>) => (
                      <div key={algorithm.slug} className="flex items-center space-x-2">
                        <Checkbox
                          name="algorithms[]"
                          value={algorithm.slug}
                          defaultChecked={caseStudy?.algorithms?.includes(algorithm.slug)}
                        />
                        <Label>{algorithm.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Personas</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {personas?.map((persona: Pick<Persona, 'slug' | 'name'>) => (
                      <div key={persona.slug} className="flex items-center space-x-2">
                        <Checkbox
                          name="personas[]"
                          value={persona.slug}
                          defaultChecked={caseStudy?.personas?.includes(persona.slug)}
                        />
                        <Label>{persona.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    type="text"
                    name="tags"
                    id="tags"
                    defaultValue={caseStudy?.tags?.join(', ') || ''}
                    placeholder="Comma-separated list"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card>
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="partner_companies">Partner Companies</Label>
                  <Input
                    type="text"
                    name="partner_companies"
                    id="partner_companies"
                    defaultValue={caseStudy?.partner_companies?.join(', ') || ''}
                    placeholder="Comma-separated list"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantum_companies">Quantum Companies</Label>
                  <Input
                    type="text"
                    name="quantum_companies"
                    id="quantum_companies"
                    defaultValue={caseStudy?.quantum_companies?.join(', ') || ''}
                    placeholder="Comma-separated list"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantum_hardware">Quantum Hardware</Label>
                  <Input
                    type="text"
                    name="quantum_hardware"
                    id="quantum_hardware"
                    defaultValue={caseStudy?.quantum_hardware?.join(', ') || ''}
                    placeholder="Comma-separated list"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technologies">Technologies</Label>
                  <Input
                    type="text"
                    name="technologies"
                    id="technologies"
                    defaultValue={caseStudy?.technologies?.join(', ') || ''}
                    placeholder="Comma-separated list"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Input
                    type="text"
                    name="difficulty"
                    id="difficulty"
                    defaultValue={caseStudy?.difficulty || ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metrics">Metrics (JSON)</Label>
                  <Textarea
                    name="metrics"
                    id="metrics"
                    rows={5}
                    defaultValue={caseStudy?.metrics ? JSON.stringify(caseStudy.metrics, null, 2) : ''}
                    placeholder="Enter JSON metrics"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button type="submit" variant="default">
            {isNew ? 'Create Case Study' : 'Update Case Study'}
          </Button>
        </div>
      </form>
    </div>
  );
} 