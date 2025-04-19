import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function createServerClient(): Promise<SupabaseClient<Database>> {
  const cookieStore = await cookies();
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => {
          return cookieStore.get(name)?.value;
        },
        set: (name, value, options) => {
          // This is only used for server actions, not needed for server components
        },
        remove: (name, options) => {
          // This is only used for server actions, not needed for server components
        },
      },
    }
  );
}