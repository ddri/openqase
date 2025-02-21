// src/app/admin/page.tsx
'use client';

import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { Persona, Industry, Algorithm, CaseStudy } from '@/types';

export default function AdminPage() {
  const [content, setContent] = useState<{
    personas: Persona[];
    industries: Industry[];
    algorithms: Algorithm[];
    caseStudies: CaseStudy[];
  }>({
    personas: [],
    industries: [],
    algorithms: [],
    caseStudies: []
  });
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all content types when the page loads
    const fetchContent = async () => {
      try {
        const [personas, industries, algorithms, caseStudies] = await Promise.all([
          fetch('/api/admin/personas').then(res => res.json()),
          fetch('/api/admin/industries').then(res => res.json()),
          fetch('/api/admin/algorithms').then(res => res.json()),
          fetch('/api/admin/case-studies').then(res => res.json())
        ]);

        setContent({
          personas,
          industries,
          algorithms,
          caseStudies
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <AdminDashboard
      initialContent={content}
      onError={(message) => setError(message)}
    />
  );
}