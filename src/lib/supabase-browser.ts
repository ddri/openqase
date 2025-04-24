import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Export the supabase instance for client-side use (used by AuthContext.tsx)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Creates a Supabase client for use in Browser/Client Components.
 * Uses the public ANON key.
 */
export function createBrowserSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY are missing');
    throw new Error('Supabase configuration is missing');
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}