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
  params: {
    id: string;
  };
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

  // Technical level options
  const technicalLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

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
        {!isNew && <input type="hidden" name="id" value={persona.id} />}

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
                    defaultValue={persona?.name}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    type="text"
                    name="slug"
                    id="slug"
                    defaultValue={persona?.slug}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    id="description"
                    rows={5}
                    defaultValue={persona?.description || ''}
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
                    defaultValue={persona?.role || ''}
                    placeholder="e.g., CTO, Researcher, Developer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technical_level">Technical Level</Label>
                  <select
                    name="technical_level"
                    id="technical_level"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={persona?.technical_level || ''}
                  >
                    <option value="">Select a technical level</option>
                    {technicalLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
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
                  <Label htmlFor="key_interests">Key Interests</Label>
                  <Input
                    type="text"
                    name="key_interests"
                    id="key_interests"
                    defaultValue={persona?.key_interests?.join(', ') || ''}
                    placeholder="Comma-separated list"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter comma-separated list of key interests for this persona
                  </p>
                </div>

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
                          defaultChecked={persona?.industry?.includes(industry.slug)}
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