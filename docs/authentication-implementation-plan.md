# Authentication Implementation Plan for OpenQASE CMS

## Overview

This document outlines the plan for implementing proper authentication for the OpenQASE CMS using Next.js 15 and Supabase. The goal is to ensure that authentication works correctly in both development and production environments, allowing access to protected routes and data while maintaining security.

## Current Issues

- JWT validation errors when trying to access data from Supabase
- Development mode bypassing authentication but still encountering errors
- Empty data being returned from database queries

## Implementation Plan

### 1. Update Supabase Server Client

The `src/lib/supabase-server.ts` file needs to be updated to use the recommended pattern for Next.js 15 with Supabase:

```typescript
// src/lib/supabase-server.ts
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export const createServerClient = async () => {
  const cookieStore = cookies()
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createServerClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value
      }
    }
  })
}
```

### 2. Update Middleware

The `src/middleware.ts` file should be updated to handle authentication properly:

```typescript
// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = [
  '/paths',
  '/case-study',
  '/profile'
]

const adminRoutes = [
  '/admin'
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession()

  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isAuthCallback = req.nextUrl.pathname === '/auth/callback'
  const isAdminRoute = adminRoutes.some(route => req.nextUrl.pathname.startsWith(route))
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))

  // Handle auth callback - must come first
  if (isAuthCallback) {
    return res
  }

  // Redirect from auth page if already logged in
  if (isAuthPage && session) {
    const redirectTo = req.nextUrl.searchParams.get('redirectTo') || '/'
    return NextResponse.redirect(new URL(redirectTo, req.url))
  }

  // Check admin access for admin routes
  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth?redirectTo=/admin', req.url))
    }

    // Check if user is admin
    const { data: userPreferences } = await supabase
      .from('user_preferences')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!userPreferences || userPreferences.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Check auth for protected routes
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth?redirectTo=' + req.nextUrl.pathname, req.url))
  }

  return res
}

// Run middleware on auth routes and protected routes
export const config = {
  matcher: [
    '/auth/:path*',
    '/admin/:path*',
    '/paths/:path*',
    '/case-study/:path*',
    '/profile'
  ]
}
```

### 3. Development Mode Setup

For development mode, we need to:

1. Run the `scripts/local-admin-setup.sql` script to set up the admin user in the local Supabase instance
2. Sign in with the admin user (davedri@gmail.com) during development
3. Ensure the `NEXT_PUBLIC_DEV_MODE` environment variable is set to `true` in `.env.local`

### 4. Client-Side Authentication

For client components, we should use the `createClientComponentClient` function:

```typescript
'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export function ClientComponent() {
  const supabase = createClientComponentClient<Database>()
  // Use supabase client...
}
```

## Implementation Steps

1. Switch to Code mode to implement these changes
2. Update `src/lib/supabase-server.ts` first
3. Update `src/middleware.ts` to remove the development mode bypass
4. Test the CMS with proper authentication
5. If needed, run the `scripts/local-admin-setup.sql` script to set up the admin user

## Expected Outcome

- Authentication works correctly in both development and production environments
- JWT validation errors are resolved
- Data is properly fetched from the database
- Admin routes are properly protected
- Protected routes require authentication