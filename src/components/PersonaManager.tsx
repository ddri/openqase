import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Save, Trash } from 'lucide-react';
import { Database } from '../types/database.types';

type DbPersona = Database['public']['Tables']['personas']['Row'] & {
  key_interests: string[];
};
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
  const [newExpertise, setNewExpertise] = useState('');

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPersona) return;

    const formData = new FormData(event.currentTarget);
    const personaData: PersonaInsert | PersonaUpdate = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      role: formData.get('role') as string,
      industry_focus: formData.get('industry_focus') as string,
      key_interests: selectedPersona.key_interests
    };

    await onSave(personaData);
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    await onDelete(id);
    setSelectedPersona(null);
    setIsEditing(false);
  };

  const handleAddInterest = () => {
    if (!selectedPersona) return;
    setSelectedPersona({
      ...selectedPersona,
      key_interests: [...selectedPersona.key_interests, '']
    });
  };

  const handleInterestChange = (index: number, value: string) => {
    if (!selectedPersona) return;
    const newInterests = [...selectedPersona.key_interests];
    newInterests[index] = value;
    setSelectedPersona({
      ...selectedPersona,
      key_interests: newInterests
    });
  };

  const handleRemoveInterest = (indexToRemove: number) => {
    if (!selectedPersona) return;
    setSelectedPersona({
      ...selectedPersona,
      key_interests: selectedPersona.key_interests.filter((_: string, index: number) => index !== indexToRemove)
    });
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
              role: '',
              industry_focus: '',
              key_interests: [],
              created_at: new Date().toISOString(),
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
            <label className="label">Role</label>
            <input
              type="text"
              name="role"
              defaultValue={selectedPersona.role || ''}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Industry Focus</label>
            <input
              type="text"
              name="industry_focus"
              defaultValue={selectedPersona.industry_focus || ''}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Key Interests</label>
            {selectedPersona.key_interests.map((interest: string, index: number) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={interest}
                  onChange={(e) => handleInterestChange(index, e.target.value)}
                  className="input input-bordered flex-1"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(index)}
                  className="btn btn-error"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddInterest}
              className="btn btn-secondary"
            >
              Add Interest
            </button>
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
                {persona.role && <p>Role: {persona.role}</p>}
                {persona.industry_focus && (
                  <p>Industry: {persona.industry_focus}</p>
                )}
                {persona.key_interests.length > 0 && (
                  <div>
                    <p className="font-semibold">Key Interests:</p>
                    <ul className="list-disc list-inside">
                      {persona.key_interests.map((interest: string, index: number) => (
                        <li key={index}>{interest}</li>
                      ))}
                    </ul>
                  </div>
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