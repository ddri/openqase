import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Save, Trash } from 'lucide-react';

// You would define these types in your types.ts file
type PersonaType = 'Technical' | 'Persona';

interface Persona {
  id: string;
  title: string;
  slug: string;
  type: PersonaType;
  description: string;
  role: string;
  expertise: string[];
  relatedCaseStudies: string[];
}

const PersonaManager = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newExpertise, setNewExpertise] = useState('');

  // Example admin functions - in production these would call your API
  const savePersona = async (persona: Persona) => {
    // Here you would make an API call to save the persona
    console.log('Saving persona:', persona);
  };

  const deletePersona = async (id: string) => {
    // Here you would make an API call to delete the persona
    console.log('Deleting persona:', id);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Persona Manager</h1>
        <Button onClick={() => {
          setSelectedPersona(null);
          setIsEditing(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          New Persona
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left sidebar - Persona List */}
        <div className="col-span-4 space-y-4">
          {personas.map(persona => (
            <Card 
              key={persona.id}
              className="cursor-pointer hover:border-blue-500 transition-colors"
              onClick={() => {
                setSelectedPersona(persona);
                setIsEditing(false);
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{persona.title}</h3>
                    <p className="text-sm text-gray-500">{persona.role}</p>
                  </div>
                  <Badge variant={persona.type === 'Technical' ? 'default' : 'secondary'}>
                    {persona.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right side - Editor */}
        <div className="col-span-8">
          {selectedPersona && (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {isEditing ? 'Edit Persona' : 'Persona Details'}
                  </h2>
                  <div className="space-x-2">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          savePersona(selectedPersona);
                          setIsEditing(false);
                        }}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <Tabs defaultValue="basic" className="w-full">
                  <TabsList>
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="expertise">Expertise</TabsTrigger>
                    <TabsTrigger value="related">Related Content</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={selectedPersona.title}
                        disabled={!isEditing}
                        onChange={(e) => setSelectedPersona({
                          ...selectedPersona,
                          title: e.target.value
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        id="description"
                        className="w-full min-h-[100px] p-2 border rounded"
                        value={selectedPersona.description}
                        disabled={!isEditing}
                        onChange={(e) => setSelectedPersona({
                          ...selectedPersona,
                          description: e.target.value
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <select
                        id="type"
                        className="w-full p-2 border rounded"
                        value={selectedPersona.type}
                        disabled={!isEditing}
                        onChange={(e) => setSelectedPersona({
                          ...selectedPersona,
                          type: e.target.value as PersonaType
                        })}
                      >
                        <option value="Technical">Technical</option>
                        <option value="Persona">Persona</option>
                      </select>
                    </div>
                  </TabsContent>

                  <TabsContent value="expertise" className="space-y-4">
                    <div className="space-y-2">
                      {selectedPersona.expertise.map((exp, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="flex-1">{exp}</span>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newExpertise = [...selectedPersona.expertise];
                                newExpertise.splice(index, 1);
                                setSelectedPersona({
                                  ...selectedPersona,
                                  expertise: newExpertise
                                });
                              }}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}

                      {isEditing && (
                        <div className="flex gap-2">
                          <Input
                            value={newExpertise}
                            onChange={(e) => setNewExpertise(e.target.value)}
                            placeholder="Add new expertise..."
                          />
                          <Button
                            onClick={() => {
                              if (newExpertise.trim()) {
                                setSelectedPersona({
                                  ...selectedPersona,
                                  expertise: [...selectedPersona.expertise, newExpertise.trim()]
                                });
                                setNewExpertise('');
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="related" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Related Case Studies</Label>
                      {/* Add your case study selector here */}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonaManager;