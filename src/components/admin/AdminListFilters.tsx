'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface FilterOption {
  label: string;
  value: string | boolean | number;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

export interface AdminListFiltersProps<T> {
  /** Array of data to filter */
  data: T[];
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Keys to search in (e.g., ['name', 'description']) */
  searchKeys: (keyof T)[];
  /** Filter configurations */
  filters?: FilterConfig[];
  /** Callback when filtered data changes */
  onFilteredDataChange: (filteredData: T[]) => void;
  /** Show result count */
  showResultCount?: boolean;
  /** Custom className for wrapper */
  className?: string;
}

/**
 * AdminListFilters - Reusable search and filter component for admin list pages
 *
 * Provides consistent UI for:
 * - Search input with Search button (form submission pattern)
 * - Multiple dropdown filters (update immediately)
 * - Clear button to reset search
 * - Optional result count display
 *
 * Uses dual-state pattern to prevent infinite loops:
 * - searchInput: Controlled input field value (updates on every keystroke)
 * - searchQuery: Actual filter applied (updates on form submit)
 * This separation prevents useEffect from triggering on every keystroke.
 *
 * @example
 * ```tsx
 * <AdminListFilters
 *   data={algorithms}
 *   searchPlaceholder="Search algorithms..."
 *   searchKeys={['name', 'description']}
 *   filters={[
 *     {
 *       key: 'published',
 *       label: 'Status',
 *       options: [
 *         { label: 'All Status', value: 'all' },
 *         { label: 'Published', value: true },
 *         { label: 'Draft', value: false }
 *       ]
 *     }
 *   ]}
 *   onFilteredDataChange={setFilteredData}
 *   showResultCount
 * />
 * ```
 */
export function AdminListFilters<T extends Record<string, any>>({
  data,
  searchPlaceholder = 'Search...',
  searchKeys,
  filters = [],
  onFilteredDataChange,
  showResultCount = false,
  className,
}: AdminListFiltersProps<T>) {
  // DUAL STATE PATTERN - Prevents infinite loop
  // searchInput: Controlled input field value (updates on every keystroke)
  // searchQuery: Actual filter applied to data (updates on form submit)
  const [searchInput, setSearchInput] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');

  // Initialize filters with 'all' value - use lazy initialization to prevent hydration mismatch
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string | boolean | number>>(() => {
    const initialFilters: Record<string, string | boolean | number> = {};
    filters.forEach((filter) => {
      initialFilters[filter.key] = 'all';
    });
    return initialFilters;
  });

  // Use ref to always call the latest callback without adding it to dependencies
  const onFilteredDataChangeRef = React.useRef(onFilteredDataChange);
  React.useEffect(() => {
    onFilteredDataChangeRef.current = onFilteredDataChange;
  }, [onFilteredDataChange]);

  // Apply filtering whenever search query or filters change
  // NOTE: This pattern prevents infinite loops by:
  // 1. Using searchQuery (not searchInput) in dependencies
  // 2. searchQuery only updates on form submit, not on every keystroke
  // 3. Parent callback is called via ref to avoid including it in dependencies
  React.useEffect(() => {
    let filtered = [...data];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        searchKeys.some((key) => {
          const value = item[key];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          return false;
        })
      );
    }

    // Apply dropdown filters
    filters.forEach((filterConfig) => {
      const filterValue = activeFilters[filterConfig.key];
      if (filterValue !== 'all' && filterValue !== undefined) {
        filtered = filtered.filter((item) => {
          const itemValue = item[filterConfig.key];
          return itemValue === filterValue;
        });
      }
    });

    // Call the callback via ref to avoid adding it to dependencies
    onFilteredDataChangeRef.current(filtered);
  }, [searchQuery, activeFilters, data]);

  const handleFilterChange = (filterKey: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: value === 'all' ? 'all' :
                  value === 'true' ? true :
                  value === 'false' ? false :
                  value,
    }));
  };

  // MANUAL SEARCH TRIGGER - User clicks Search button
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput); // Copy input → query
  };

  // CLEAR SEARCH - Reset search state
  const clearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  return (
    <div className={className}>
      {/* Filter Bar */}
      <div className="mb-6 p-4 bg-card rounded-lg border">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filter Dropdowns */}
          {filters.map((filter) => (
            <Select
              key={filter.key}
              value={String(activeFilters[filter.key] ?? 'all')}
              onValueChange={(value) => handleFilterChange(filter.key, value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem
                    key={String(option.value)}
                    value={String(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

          {/* Search Button */}
          <Button type="submit" variant="default">
            Search
          </Button>

          {/* Clear Button */}
          {searchQuery && (
            <Button type="button" variant="outline" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </form>
      </div>

      {/* Result Count */}
      {showResultCount && (
        <div className="text-sm text-muted-foreground mb-4">
          Showing {onFilteredDataChange.length || 0} of {data.length} items
        </div>
      )}
    </div>
  );
}
