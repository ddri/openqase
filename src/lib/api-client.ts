import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// API response types
export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

// API client class
export class ApiClient {
  // Industries
  static async getIndustries(): Promise<ApiResponse<Database['public']['Tables']['industries']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('industries')
        .select('*')
        .order('name');
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch industries' };
    }
  }

  static async getIndustryBySlug(slug: string): Promise<ApiResponse<Database['public']['Tables']['industries']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('industries')
        .select('*')
        .eq('slug', slug)
        .single();
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch industry' };
    }
  }

  // Personas
  static async getPersonas(): Promise<ApiResponse<Database['public']['Tables']['personas']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('personas')
        .select('*')
        .order('name');
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch personas' };
    }
  }

  static async getPersonaBySlug(slug: string): Promise<ApiResponse<Database['public']['Tables']['personas']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('personas')
        .select('*')
        .eq('slug', slug)
        .single();
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch persona' };
    }
  }

  // Algorithms
  static async getAlgorithms(): Promise<ApiResponse<Database['public']['Tables']['algorithms']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('algorithms')
        .select('*')
        .eq('published', true)
        .order('name');
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch algorithms' };
    }
  }

  static async getAlgorithmBySlug(slug: string): Promise<ApiResponse<Database['public']['Tables']['algorithms']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('algorithms')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch algorithm' };
    }
  }

  // Case Studies
  static async getCaseStudies(page = 1, pageSize = 10, filters?: { industry?: string; algorithm?: string }): Promise<ApiResponse<{
    data: Database['public']['Tables']['case_studies']['Row'][];
    total: number;
  }>> {
    try {
      let query = supabase
        .from('case_studies')
        .select('*', { count: 'exact' })
        .eq('published', true)
        .order('published_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);
      
      if (filters?.industry) {
        query = query.contains('industries', [filters.industry]);
      }
      
      if (filters?.algorithm) {
        query = query.contains('algorithms', [filters.algorithm]);
      }
      
      const { data, error, count } = await query;
      
      return { 
        data: data ? { data, total: count || 0 } : null, 
        error: error?.message || null 
      };
    } catch (error) {
      return { data: null, error: 'Failed to fetch case studies' };
    }
  }

  static async getCaseStudyBySlug(slug: string): Promise<ApiResponse<Database['public']['Tables']['case_studies']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch case study' };
    }
  }

  // User Preferences
  static async getUserPreferences(): Promise<ApiResponse<Database['public']['Tables']['user_preferences']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .single();
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch user preferences' };
    }
  }

  static async updateUserPreferences(preferences: Partial<Database['public']['Tables']['user_preferences']['Update']> & { id: string }): Promise<ApiResponse<Database['public']['Tables']['user_preferences']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert(preferences)
        .select()
        .single();
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to update user preferences' };
    }
  }
} 