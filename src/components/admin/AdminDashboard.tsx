// src/components/admin/AdminDashboard.tsx
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Save, Trash, Settings2 } from 'lucide-react';
import type { Persona, Industry, Algorithm, CaseStudy, PersonaType, DifficultyLevel } from '@/lib/types';

interface AdminDashboardProps {
  initialContent: {
    persona: Persona[];
    industry: Industry[];
    algorithm: Algorithm[];
    caseStudy: CaseStudy[];
  };
  onError: (message: string) => void;
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function AdminDashboard({ initialContent, onError }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('learning-paths');
  const [selectedItem, setSelectedItem] = useState<{
    type: 'persona' | 'industry' | 'algorithm' | 'case-study' | null;
    item: any;
  }>({ type: null, item: null });
  const [isEditing, setIsEditing] = useState(false);

  // State for all content types
  const [personaList, setPersonaList] = useState<Persona[]>(initialContent.persona);
  const [industryList, setIndustryList] = useState<Industry[]>(initialContent.industry);
  const [algorithmList, setAlgorithmList] = useState<Algorithm[]>(initialContent.algorithm);
  const [caseStudyList, setCaseStudyList] = useState<CaseStudy[]>(initialContent.caseStudy);

  const createNewItem = (type: 'persona' | 'industry' | 'algorithm' | 'case-study') => {
    const timestamp = new Date().toISOString();
    let newItem: any = {
      id: '',
      title: '',
      slug: '',
      description: '',
      createdAt: timestamp,
      updatedAt: timestamp
    };

    // Add type-specific fields
    switch (type) {
      case 'persona':
        newItem = {
          ...newItem,
          type: 'Technical' as PersonaType,
          role: '',
          expertise: [],
          relatedCaseStudies: []
        };
        break;
      case 'industry':
        newItem = {
          ...newItem,
          type: 'Technical' as PersonaType,
          sector: '',
          keyApplications: [],
          relatedCaseStudies: []
        };
        break;
      case 'algorithm':
        newItem = {
          ...newItem,
          type: 'Technical',
          complexity: 'Beginner' as DifficultyLevel,
          applications: [],
          prerequisites: [],
          relatedCaseStudies: []
        };
        break;
      case 'case-study':
        newItem = {
          ...newItem,
          content: '',
          personas: [],
          industries: [],
          algorithms: [],
          difficulty: 'Beginner' as DifficultyLevel,
          tags: []
        };
        break;
    }

    setSelectedItem({ type, item: newItem });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedItem.type || !selectedItem.item) return;

    try {
      console.log('Saving:', selectedItem.type, selectedItem.item);

      // Update the slug based on the title if it's empty
      if (!selectedItem.item.slug && selectedItem.item.title) {
        selectedItem.item.slug = createSlug(selectedItem.item.title);
      }

      // Construct the correct API endpoint
      const endpoint = `/api/admin/${selectedItem.type}s`;

      const response = await fetch(
        selectedItem.item.id 
          ? `${endpoint}/${selectedItem.item.id}` 
          : endpoint,
        {
          method: selectedItem.item.id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...selectedItem.item,
            updatedAt: new Date().toISOString(),
            ...((!selectedItem.item.id) && { createdAt: new Date().toISOString() })
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save');
      }

      const savedItem = await response.json();

      // Update local state based on content type
      switch (selectedItem.type) {
        case 'persona':
          setPersonaList(prev => {
            const index = prev.findIndex(p => p.id === savedItem.id);
            return index >= 0
              ? prev.map(p => p.id === savedItem.id ? savedItem : p)
              : [...prev, savedItem];
          });
          break;
        case 'industry':
          setIndustryList(prev => {
            const index = prev.findIndex(i => i.id === savedItem.id);
            return index >= 0
              ? prev.map(i => i.id === savedItem.id ? savedItem : i)
              : [...prev, savedItem];
          });
          break;
        case 'algorithm':
          setAlgorithmList(prev => {
            const index = prev.findIndex(a => a.id === savedItem.id);
            return index >= 0
              ? prev.map(a => a.id === savedItem.id ? savedItem : a)
              : [...prev, savedItem];
          });
          break;
        case 'case-study':
          setCaseStudyList(prev => {
            const index = prev.findIndex(c => c.id === savedItem.id);
            return index >= 0
              ? prev.map(c => c.id === savedItem.id ? savedItem : c)
              : [...prev, savedItem];
          });
          break;
      }

      setIsEditing(false);
      onError(''); // Clear any existing errors
    } catch (error) {
      console.error('Save error:', error);
      onError(error instanceof Error ? error.message : 'Failed to save changes');
    }
  };

  const handleDelete = async () => {
    if (!selectedItem.type || !selectedItem.item) return;

    try {
      const response = await fetch(
        `/api/admin/${selectedItem.type}s/${selectedItem.item.id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      // Update local state based on content type
      switch (selectedItem.type) {
        case 'persona':
          setPersonaList(prev => prev.filter(p => p.id !== selectedItem.item.id));
          break;
        case 'industry':
          setIndustryList(prev => prev.filter(i => i.id !== selectedItem.item.id));
          break;
        case 'algorithm':
          setAlgorithmList(prev => prev.filter(a => a.id !== selectedItem.item.id));
          break;
        case 'case-study':
          setCaseStudyList(prev => prev.filter(c => c.id !== selectedItem.item.id));
          break;
      }

      setSelectedItem({ type: null, item: null });
      setIsEditing(false);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to delete item');
    }
  };

  const renderContentList = (type: 'persona' | 'industry' | 'algorithm') => {
    const items = type === 'persona' ? personaList :
                 type === 'industry' ? industryList :
                 algorithmList;

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium capitalize">{type}s</CardTitle>
          <Button size="sm" onClick={() => createNewItem(type)}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 border rounded hover:bg-accent/10 cursor-pointer"
                onClick={() => {
                  setSelectedItem({ type, item });
                  setIsEditing(false);
                }}
              >
                <span>{item.title}</span>
                <Badge variant={type === 'persona' ? 'default' : 'secondary'}>
                  {type === 'persona' ? item.type :
                   type === 'algorithm' ? item.complexity :
                   item.sector}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderEditor = () => {
    if (!selectedItem.item) return null;

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {isEditing ? `Edit ${selectedItem.type}` : `${selectedItem.type} Details`}
            </CardTitle>
            <div className="space-x-2">
              {!isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={selectedItem.item.title}
                disabled={!isEditing}
                onChange={(e) => setSelectedItem({
                  ...selectedItem,
                  item: { ...selectedItem.item, title: e.target.value }
                })}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full min-h-[100px] p-2 border rounded"
                value={selectedItem.item.description}
                disabled={!isEditing}
                onChange={(e) => setSelectedItem({
                  ...selectedItem,
                  item: { ...selectedItem.item, description: e.target.value }
                })}
              />
            </div>

            {selectedItem.type === 'persona' && (
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  className="w-full p-2 border rounded"
                  value={selectedItem.item.type}
                  disabled={!isEditing}
                  onChange={(e) => setSelectedItem({
                    ...selectedItem,
                    item: { ...selectedItem.item, type: e.target.value as PersonaType }
                  })}
                >
                  <option value="Technical">Technical</option>
                  <option value="Persona">Persona</option>
                </select>
              </div>
            )}

            {selectedItem.type === 'algorithm' && (
              <div>
                <Label htmlFor="complexity">Complexity</Label>
                <select
                  id="complexity"
                  className="w-full p-2 border rounded"
                  value={selectedItem.item.complexity}
                  disabled={!isEditing}
                  onChange={(e) => setSelectedItem({
                    ...selectedItem,
                    item: { ...selectedItem.item, complexity: e.target.value as DifficultyLevel }
                  })}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold">openQase Admin</h1>
            <Button variant="ghost" size="icon">
              <Settings2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          </TabsList>

          <TabsContent value="learning-paths">
            <div className="grid grid-cols-3 gap-6">
              {renderContentList('persona')}
              {renderContentList('industry')}
              {renderContentList('algorithm')}
            </div>
            
            {selectedItem.type && (
              <div className="mt-6">
                {renderEditor()}
              </div>
            )}
          </TabsContent>

          <TabsContent value="case-studies">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Case Studies</CardTitle>
                <Button onClick={() => createNewItem('case-study')}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Case Study
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {caseStudyList.map((study: CaseStudy) => (
                    <div
                      key={study.id}
                      className="border rounded p-4 hover:bg-accent/10 cursor-pointer"
                      onClick={() => {
                        setSelectedItem({ type: 'case-study', item: study });
                        setIsEditing(false);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{study.title}</h3>
                        <Badge>{study.difficulty}</Badge>
                      </div>
                      <div className="flex gap-2">
                        {study.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <div>
                          Personas: {study.persona.length}
                          • Industries: {study.industry.length}
                          • Algorithms: {study.algorithm.length}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedItem.type === 'case-study' && (
              <div className="mt-6">
                {renderEditor()}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}