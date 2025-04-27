// Re-export client-side functions and instances
export { createBrowserSupabaseClient, supabase } from './supabase-browser';

// Re-export server-side functions
// Using a dynamic import pattern to avoid "next/headers" error in client components
export async function createServerSupabaseClient() {
  // This function is only called in server contexts (middleware, server components, server actions)
  const { createServerSupabaseClient: _createServerSupabaseClient } = await import('./supabase-server');
  return _createServerSupabaseClient();
}

export async function createServiceRoleSupabaseClient() {
  // This function is only called in server contexts (server components, server actions)
  const { createServiceRoleSupabaseClient: _createServiceRoleSupabaseClient } = await import('./supabase-server');
  return _createServiceRoleSupabaseClient();
}

/**
 * @deprecated This file is being refactored according to the CMS refactoring plan.
 * For client-side Supabase operations, import from './supabase-browser'
 * For server-side Supabase operations, import from './supabase-server'
 */