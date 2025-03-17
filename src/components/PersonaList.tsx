'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Persona } from '@/lib/types';
import ContentCard from '@/components/ui/content-card';

interface PersonaListProps {
  personas: Persona[];
}

export default function PersonaList({ personas }: PersonaListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'lastUpdated'>('title');

  // Get unique roles for filtering
  const roles = Array.from(new Set(personas.map(p => p.role))).sort();

  // Filter and sort personas
  const filteredPersonas = personas
    .filter(persona => {
      if (roleFilter !== 'all' && persona.role !== roleFilter) return false;
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        persona.title.toLowerCase().includes(query) ||
        persona.description.toLowerCase().includes(query) ||
        persona.role.toLowerCase().includes(query) ||
        persona.expertise.some((exp: string) => exp.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'lastUpdated') {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
      return a.title.localeCompare(b.title);
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
            placeholder="Search by title, description, role, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full sm:w-[200px]">
          <Label htmlFor="role" className="text-sm font-medium mb-1.5 block">
            Role
          </Label>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map(role => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-[200px]">
          <Label htmlFor="sort" className="text-sm font-medium mb-1.5 block">
            Sort by
          </Label>
          <Select value={sortBy} onValueChange={(value: 'title' | 'lastUpdated') => setSortBy(value)}>
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title (A-Z)</SelectItem>
              <SelectItem value="lastUpdated">Last Updated</SelectItem>
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
            title={persona.title}
            description={persona.description}
            badges={[persona.role, ...persona.expertise]}
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