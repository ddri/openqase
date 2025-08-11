import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Save, Trash } from 'lucide-react';
import type { Database } from '@/types/supabase';

type DbPersona = Database['public']['Tables']['personas']['Row'];
type PersonaInsert = Database['public']['Tables']['personas']['Insert'];
type PersonaUpdate = Database['public']['Tables']['personas']['Update'];

interface PersonaManagerProps {
  onSave: (persona: PersonaInsert | PersonaUpdate) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  personas: DbPersona[];
}

export function PersonaManager({ onSave, onDelete, personas }: PersonaManagerProps) {
  const [personaList, setPersonaList] = useState<DbPersona[]>(personas);
  const [selectedPersona, setSelectedPersona] = useState<DbPersona | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPersona) return;

    const formData = new FormData(event.currentTarget);
    const personaData: PersonaInsert | PersonaUpdate = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      expertise: [formData.get('expertise') as string].filter(Boolean),
      slug: formData.get('name')?.toString().toLowerCase().replace(/\s+/g, '-') || '',
    };

    await onSave(personaData);
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    await onDelete(id);
    setSelectedPersona(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Personas</h2>
        <button
                  onClick={() => {
          setSelectedPersona({
            id: '',
            name: '',
            description: '',
            expertise: [],
            created_at: new Date().toISOString(),
            main_content: null,
            is_system_record: false,
            published: false,
            published_at: null,
            recommended_reading: null,
            content_status: 'draft',
            archived_at: null,
            archived_by: null,
            deleted_at: null,
            deleted_by: null,
            slug: '',
            ts_content: null,
            updated_at: new Date().toISOString()
          });
          setIsEditing(true);
        }}
          className="btn btn-primary"
        >
          Add New Persona
        </button>
      </div>

      {selectedPersona && isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={selectedPersona.name}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              name="description"
              defaultValue={selectedPersona.description || ''}
              className="textarea textarea-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Expertise</label>
            <input
              type="text"
              name="expertise"
              defaultValue={selectedPersona.expertise?.[0] || ''}
              className="input input-bordered w-full"
              placeholder="Enter primary expertise area"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personaList.map((persona) => (
            <div
              key={persona.id}
              className="card bg-base-200 cursor-pointer"
              onClick={() => {
                setSelectedPersona(persona);
                setIsEditing(true);
              }}
            >
              <div className="card-body">
                <h3 className="card-title">{persona.name}</h3>
                <p>{persona.description}</p>
                {persona.expertise && persona.expertise.length > 0 && (
                  <p>Expertise: {persona.expertise.join(', ')}</p>
                )}
                <div className="card-actions justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(persona.id);
                    }}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}