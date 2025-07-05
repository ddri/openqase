/**
 * OpenQase API Hooks
 * 
 * 📚 DOCUMENTATION: See /docs/docs/api-documentation.md for complete usage guide
 * 🔗 QUICK REFERENCE: See /docs/docs/api-quick-reference.md for common patterns
 * 
 * These hooks provide optimized data fetching with automatic caching and error handling.
 * All hooks use API routes for consistent data access patterns.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Case Studies - Complex filtering with relationships
export function useCaseStudies(page = 1, pageSize = 10, filters?: { industry?: string; algorithm?: string }) {
  return useQuery({
    queryKey: ['case-studies', page, pageSize, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      
      if (filters?.industry) {
        params.append('industry', filters.industry);
      }
      
      if (filters?.algorithm) {
        params.append('algorithm', filters.algorithm);
      }
      
      const response = await fetch(`/api/case-studies?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch case studies');
      }
      
      return response.json();
    },
  });
}

// Single Case Study
export function useCaseStudy(slug: string) {
  return useQuery({
    queryKey: ['case-study', slug],
    queryFn: async () => {
      const response = await fetch(`/api/case-studies/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch case study');
      }
      return response.json();
    },
    enabled: !!slug,
  });
}

// Newsletter subscription
export function useNewsletterSubscription() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to subscribe to newsletter');
      }
      
      return response.json();
    },
  });
} 