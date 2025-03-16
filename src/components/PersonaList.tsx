'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Persona } from '@/lib/types';
import ContentList from '@/components/ui/content-list';

interface PersonaListProps {
  personas: Persona[];
}

export default function PersonaList({ personas }: PersonaListProps) {
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Get unique roles for filtering
  const roles = Array.from(new Set(personas.map(p => p.role))).sort();

  const renderExtraFilters = () => (
    <div className="w-full sm:max-w-[200px]">
      <Label htmlFor="role" className="text-sm font-medium mb-1.5 block">
        Role
      </Label>
      <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value)}>
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
  );

  const renderBadges = (persona: Persona) => (
    <>
      <Badge 
        variant="outline" 
        className="text-xs px-2 py-0.5 whitespace-nowrap"
      >
        {persona.role}
      </Badge>
      {persona.expertise.slice(0, 2).map(exp => (
        <Badge 
          key={exp} 
          variant="outline" 
          className="text-xs px-2 py-0.5 whitespace-nowrap"
        >
          {exp}
        </Badge>
      ))}
      {persona.expertise.length > 2 && (
        <Badge 
          variant="outline" 
          className="text-xs px-2 py-0.5 whitespace-nowrap"
        >
          +{persona.expertise.length - 2} more
        </Badge>
      )}
    </>
  );

  const filteredPersonas = roleFilter === 'all' 
    ? personas 
    : personas.filter(p => p.role === roleFilter);

  return (
    <ContentList
      items={filteredPersonas}
      type="persona"
      renderBadges={renderBadges}
      renderExtraFilters={renderExtraFilters}
      basePath="/paths/persona"
    />
  );
} 