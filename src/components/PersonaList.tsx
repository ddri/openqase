'use client';

import { useState, useMemo, useCallback } from 'react';
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

type SortOption = 'name-asc' | 'name-desc' | 'updated-asc' | 'updated-desc';

export default function PersonaList({ personas }: PersonaListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  // Memoize expensive filtering and sorting operations
  const filteredPersonas = useMemo(() => {
    return personas
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
      switch (sortBy) {
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'updated-asc':
          const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
          const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
          return dateA - dateB;
        case 'updated-desc':
          const dateC = a.updated_at ? new Date(a.updated_at).getTime() : 0;
          const dateD = b.updated_at ? new Date(b.updated_at).getTime() : 0;
          return dateD - dateC;
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });
  }, [personas, searchQuery, sortBy]);

  // Memoize event handlers to prevent child re-renders
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((value: SortOption) => {
    setSortBy(value);
  }, []);

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
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>

        <div className="w-full sm:w-[200px]">
          <Label htmlFor="sort" className="text-sm font-medium mb-1.5 block">
            Sort by
          </Label>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="updated-desc">Recently Updated</SelectItem>
              <SelectItem value="updated-asc">Least Recently Updated</SelectItem>
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