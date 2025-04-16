import { cookies } from 'next/headers'
import type { CookieOptionsWithName } from '@supabase/auth-helpers-shared'

/**
 * Creates an async cookie handler compatible with Next.js 15 Server Components
 * and Supabase auth helpers.
 */
export const getAsyncCookieHandler = async () => {
  const cookieStore = await cookies()
  
  return {
    async get(name: string) {
      return cookieStore.get(name)?.value
    },
    // Note: set/remove are not implemented for server components
    // as they should be handled through middleware or client components
    async set() {
      throw new Error('Cannot set cookies in server components')
    },
    async remove() {
      throw new Error('Cannot remove cookies in server components')
    }
  }
}

/**
 * Helper to initialize cookie handler with current cookie store
 */
export const createCookieHandler = async () => {
  return await getAsyncCookieHandler()
} 