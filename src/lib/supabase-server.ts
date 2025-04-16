import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { getAsyncCookieHandler } from './cookies';

export const createServerClient = async (): Promise<SupabaseClient<Database>> => {
  const cookieHandler = await getAsyncCookieHandler();
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieHandler.get(name);
        },
      },
    }
  );
}; 