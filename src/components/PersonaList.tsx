'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Database } from '@/types/supabase';
import ContentCard from '@/components/ui/content-card';

// Explicitly import the Row type
type Persona = Database['public']['Tables']['personas']['Row'];

interface PersonaListProps {
  personas: Persona[];
}

export default function PersonaList({ personas }: PersonaListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'created_at'>('name');

  // Filter and sort personas
  const filteredPersonas = personas
    .filter(persona => {
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        (persona.name?.toLowerCase().includes(query) ?? false) ||
        (persona.description?.toLowerCase().includes(query) ?? false) ||
        (persona.expertise?.some(e => e.toLowerCase().includes(query)) ?? false)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'created_at') {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      }
      return (a.name || '').localeCompare(b.name || '');
    });

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="text-sm font-medium mb-1.5 block">
            Search personas
          </Label>
          <Input
            id="search"
            type="search"
            placeholder="Search by name, description, or expertise..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="w-full sm:w-[200px]">
          <Label htmlFor="sort" className="text-sm font-medium mb-1.5 block">
            Sort by
          </Label>
          <Select value={sortBy} onValueChange={(value: 'name' | 'created_at') => setSortBy(value)}>
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="created_at">Created Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-[var(--text-secondary)]">
        {filteredPersonas.length} persona{filteredPersonas.length !== 1 ? 's' : ''} found
      </div>

      {/* Persona Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersonas.map((persona) => (
          <ContentCard
            key={persona.slug}
            title={persona.name || 'Untitled Persona'}
            description={persona.description || ''}
            badges={persona.expertise || []}
            href={`/paths/persona/${persona.slug}`}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPersonas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-[var(--text-secondary)]">
            No personas found matching your search.
          </p>
        </div>
      )}
    </div>
  );
} 