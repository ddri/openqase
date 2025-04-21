import { createClient } from '@/utils/supabase/server';
import { Database } from '@/types/supabase';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Algorithm = Database['public']['Tables']['algorithms']['Row'];

// Define more specific types for the query results
interface CaseStudyListItem {
  id: string;
  title: string;
  slug: string;
}

interface IndustryListItem {
  id: string;
  name: string;
  slug: string;
}

interface AlgorithmPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAlgorithmPage({ params }: AlgorithmPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const isNew = resolvedParams.id === 'new';

  // Fetch algorithm if editing
  const { data: algorithm } = !isNew
    ? await supabase
        .from('algorithms')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()
    : { data: null };

  // Fetch related data for relationships
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('id, title, slug')
    .order('title');

  const { data: industries } = await supabase
    .from('industries')
    .select('id, name, slug')
    .order('name');

  if (!isNew && !algorithm) {
    notFound();
  }

  // This means at this point, if !isNew is true, then algorithm must be defined
  // Use a more explicit type annotation to help TypeScript understand our intent
  const algorithmData: Algorithm = !isNew ? algorithm as Algorithm : {} as Algorithm;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/admin/algorithms">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Algorithms
          </Link>
        </Button>
      </div>
      
      <h1 className="mb-8 text-2xl font-bold">
        {isNew ? 'Add New Algorithm' : 'Edit Algorithm'}
      </h1>

      <form action="/api/algorithms" method="POST" className="space-y-8">
        {!isNew && <input type="hidden" name="id" value={algorithmData.id} />}

        <Tabs defaultValue="basic" className="w-full">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="technical">Technical Details</TabsTrigger>
            <TabsTrigger value="relationships">Relationships</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Algorithm Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={isNew ? '' : algorithmData.name}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    type="text"
                    name="slug"
                    id="slug"
                    defaultValue={isNew ? '' : algorithmData.slug}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    id="description"
                    rows={5}
                    defaultValue={isNew ? '' : (algorithmData.description || '')}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    name="published"
                    id="published"
                    defaultChecked={isNew ? false : (algorithmData.published || false)}
                  />
                  <Label htmlFor="published">Published</Label>
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
                  <Label htmlFor="use_cases">Use Cases</Label>
                  <Input
                    type="text"
                    name="use_cases"
                    id="use_cases"
                    defaultValue={isNew ? '' : (algorithmData.use_cases?.join(', ') || '')}
                    placeholder="Comma-separated list"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter comma-separated list of use cases for this algorithm
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relationships">
            <Card>
              <CardHeader>
                <CardTitle>Related Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Related Case Studies</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {caseStudies?.map((caseStudy: CaseStudyListItem) => (
                      <div key={caseStudy.id} className="flex items-center space-x-2">
                        <Checkbox
                          name="related_case_studies[]"
                          value={caseStudy.slug}
                          // We'll need to implement this relationship in the future
                          // defaultChecked={algorithm?.related_case_studies?.includes(caseStudy.slug)}
                        />
                        <Label>{caseStudy.title}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Related Industries</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {industries?.map((industry) => (
                      <div key={industry.id} className="flex items-center space-x-2">
                        <Checkbox
                          name="related_industries[]"
                          value={industry.slug}
                          // We'll need to implement this relationship in the future
                          // defaultChecked={algorithm?.related_industries?.includes(industry.slug)}
                        />
                        <Label>{industry.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="submit" variant="default">
            {isNew ? 'Create Algorithm' : 'Update Algorithm'}
          </Button>
        </div>
      </form>
    </div>
  );
}