import { createClient } from '@/utils/supabase/server';
import { Database } from '@/types/supabase';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Industry = Database['public']['Tables']['industries']['Row'];
type Algorithm = Database['public']['Tables']['algorithms']['Row'];
type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

interface IndustryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditIndustryPage({ params }: IndustryPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const isNew = resolvedParams.id === 'new';

  // Fetch industry if editing
  const { data: industry } = !isNew
    ? await supabase
        .from('industries')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()
    : { data: null };

  // Fetch related data for relationships
  const { data: algorithms } = await supabase
    .from('algorithms')
    .select('id, name, slug')
    .order('name');

  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('id, title, slug')
    .order('title');

  if (!isNew && !industry) {
    notFound();
  }

  // This means at this point, if !isNew is true, then industry must be defined
  // Use a more explicit type annotation to help TypeScript understand our intent
  const industryData: Industry = !isNew ? industry as Industry : {} as Industry;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/admin/industries">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Industries
          </Link>
        </Button>
      </div>
      
      <h1 className="mb-8 text-2xl font-bold">
        {isNew ? 'Add New Industry' : 'Edit Industry'}
      </h1>

      <form action="/api/industries" method="POST" className="space-y-8">
        {!isNew && <input type="hidden" name="id" value={industryData.id} />}

        <Card>
          <CardHeader>
            <CardTitle>Industry Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                defaultValue={isNew ? '' : industryData.name}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                type="text"
                name="slug"
                id="slug"
                defaultValue={isNew ? '' : industryData.slug}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                rows={5}
                defaultValue={isNew ? '' : (industryData.description || '')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Input
                type="text"
                name="icon"
                id="icon"
                defaultValue={isNew ? '' : (industryData.icon || '')}
                placeholder="Icon name or SVG path"
              />
              <p className="text-sm text-muted-foreground">
                Enter an icon name or SVG path. This will be used to represent the industry visually.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="submit" variant="default">
            {isNew ? 'Create Industry' : 'Update Industry'}
          </Button>
        </div>
      </form>
    </div>
  );
}