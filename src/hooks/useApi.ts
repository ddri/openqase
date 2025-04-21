import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/api-client';

// Industries
export function useIndustries() {
  return useQuery({
    queryKey: ['industries'],
    queryFn: () => ApiClient.getIndustries(),
  });
}

export function useIndustry(slug: string) {
  return useQuery({
    queryKey: ['industry', slug],
    queryFn: () => ApiClient.getIndustryBySlug(slug),
    enabled: !!slug,
  });
}

// Personas
export function usePersonas() {
  return useQuery({
    queryKey: ['personas'],
    queryFn: () => ApiClient.getPersonas(),
  });
}

export function usePersona(slug: string) {
  return useQuery({
    queryKey: ['persona', slug],
    queryFn: () => ApiClient.getPersonaBySlug(slug),
    enabled: !!slug,
  });
}

// Algorithms
export function useAlgorithms() {
  return useQuery({
    queryKey: ['algorithms'],
    queryFn: () => ApiClient.getAlgorithms(),
  });
}

export function useAlgorithm(slug: string) {
  return useQuery({
    queryKey: ['algorithm', slug],
    queryFn: () => ApiClient.getAlgorithmBySlug(slug),
    enabled: !!slug,
  });
}

// Case Studies
export function useCaseStudies(page = 1, pageSize = 10, filters?: { industry?: string; algorithm?: string }) {
  return useQuery({
    queryKey: ['case-studies', page, pageSize, filters],
    queryFn: () => ApiClient.getCaseStudies(page, pageSize, filters),
  });
}

export function useCaseStudy(slug: string) {
  return useQuery({
    queryKey: ['case-study', slug],
    queryFn: () => ApiClient.getCaseStudyBySlug(slug),
    enabled: !!slug,
  });
}

// User Preferences
export function useUserPreferences() {
  return useQuery({
    queryKey: ['user-preferences'],
    queryFn: () => ApiClient.getUserPreferences(),
  });
}

export function useUpdateUserPreferences() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ApiClient.updateUserPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-preferences'] });
    },
  });
} 