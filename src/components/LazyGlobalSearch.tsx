'use client';

import { useState, Suspense, lazy } from 'react';
import { Search } from 'lucide-react';
import { SearchableItem } from '@/lib/content-fetchers';

// Lazy load the actual search component
const GlobalSearch = lazy(() => import('./GlobalSearch'));

interface LazyGlobalSearchProps {
  className?: string;
}

// Simple search input that shows before activation
function SearchPlaceholder({ onActivate, className }: { onActivate: () => void; className?: string }) {
  return (
    <div className={`relative w-full max-w-2xl ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="Search case studies, algorithms, companies..."
          onClick={onActivate}
          onFocus={onActivate}
          readOnly
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
        />
      </div>
    </div>
  );
}

// Loading state while search component loads
function SearchLoading({ className }: { className?: string }) {
  return (
    <div className={`relative w-full max-w-2xl ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="Loading search..."
          disabled
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-muted/50 cursor-wait"
        />
      </div>
    </div>
  );
}

export default function LazyGlobalSearch({ className }: LazyGlobalSearchProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchData, setSearchData] = useState<SearchableItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const activateSearch = async () => {
    if (isSearchActive) return;
    
    setIsLoading(true);
    
    try {
      // Fetch search data from API endpoint
      const response = await fetch('/api/search-data');
      if (!response.ok) {
        throw new Error('Failed to fetch search data');
      }
      const data = await response.json();
      setSearchData(data);
      setIsSearchActive(true);
    } catch (error) {
      console.error('Failed to load search data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return <SearchLoading className={className} />;
  }

  // Show placeholder until activated
  if (!isSearchActive) {
    return <SearchPlaceholder onActivate={activateSearch} className={className} />;
  }

  // Show full search component once activated
  return (
    <Suspense fallback={<SearchLoading className={className} />}>
      <GlobalSearch searchData={searchData} className={className} />
    </Suspense>
  );
}