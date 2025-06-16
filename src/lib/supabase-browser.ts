import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

// Singleton instance to prevent multiple clients
let supabaseInstance: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Creates a single Supabase client for use in Browser/Client Components.
 * Uses singleton pattern to prevent multiple instances.
 */
export function createBrowserSupabaseClient() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY are missing');
    throw new Error('Supabase configuration is missing');
  }

  supabaseInstance = createBrowserClient<Database>(supabaseUrl, supabaseKey);
  return supabaseInstance;
}

// Export the singleton instance for backward compatibility
export const supabase = createBrowserSupabaseClient();