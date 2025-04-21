import { createClient } from '@/utils/supabase/server';
import { Database } from '@/types/supabase';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Persona = Database['public']['Tables']['personas']['Row'];
type Industry = Database['public']['Tables']['industries']['Row'];

interface PersonaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPersonaPage({ params }: PersonaPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const isNew = resolvedParams.id === 'new';

  // Fetch persona if editing
  const { data: persona } = !isNew
    ? await supabase
        .from('personas')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()
    : { data: null };

  // Fetch industries for relationship selection
  const { data: industries } = await supabase
    .from('industries')
    .select('id, name, slug')
    .order('name');

  if (!isNew && !persona) {
    notFound();
  }

  // This means at this point, if !isNew is true, then persona must be defined
  // Use a more explicit type annotation to help TypeScript understand our intent
  const personaData: Persona = !isNew ? persona as Persona : {} as Persona;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/admin/personas">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Personas
          </Link>
        </Button>
      </div>
      
      <h1 className="mb-8 text-2xl font-bold">
        {isNew ? 'Add New Persona' : 'Edit Persona'}
      </h1>

      <form action="/api/personas" method="POST" className="space-y-8">
        {!isNew && <input type="hidden" name="id" value={personaData.id} />}

        <Tabs defaultValue="basic" className="w-full">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="interests">Interests & Industries</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={isNew ? '' : personaData.name}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    type="text"
                    name="slug"
                    id="slug"
                    defaultValue={isNew ? '' : personaData.slug}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    id="description"
                    rows={5}
                    defaultValue={isNew ? '' : (personaData.description || '')}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Persona Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    type="text"
                    name="role"
                    id="role"
                    defaultValue={isNew ? '' : (personaData.role || '')}
                    placeholder="e.g., CTO, Researcher, Developer"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interests">
            <Card>
              <CardHeader>
                <CardTitle>Interests & Industries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Industries</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {industries?.map((industry) => (
                      <div key={industry.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="industry[]"
                          id={`industry-${industry.slug}`}
                          value={industry.slug}
                          defaultChecked={isNew ? false : (personaData.industry?.includes(industry.slug) || false)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor={`industry-${industry.slug}`}>{industry.name}</Label>
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
            {isNew ? 'Create Persona' : 'Update Persona'}
          </Button>
        </div>
      </form>
    </div>
  );
}