import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

/**
 * Creates a Supabase client for use in client components
 */
export const createClient = () => {
  return createClientComponentClient<Database>();
};