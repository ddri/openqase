// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase-middleware'

const protectedRoutes = [
  '/paths',
  '/case-study',
  '/profile'
]

const adminRoutes = [
  '/admin'
]

export async function middleware(req: NextRequest) {
  // First, update the session using the new SSR package
  const res = await updateSession(req)
  
  // Get the URL from the response or create a new one
  const url = res.url ? new URL(res.url) : new URL(req.url)
  
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isAuthCallback = req.nextUrl.pathname === '/auth/callback'
  const isAdminRoute = adminRoutes.some(route => req.nextUrl.pathname.startsWith(route))
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))
  const isApiRoute = req.nextUrl.pathname.startsWith('/api')

  // Handle auth callback - must come first
  if (isAuthCallback) {
    return res
  }

  // Handle API routes
  if (isApiRoute) {
    console.log(`[MIDDLEWARE] API route accessed: ${req.method} ${req.nextUrl.pathname}`)
    
    // Define public API routes that don't need authentication
    const publicApiRoutes = [
      '/api/newsletter',
      '/api/sentry-example-api'
    ]
    
    const isPublicApiRoute = publicApiRoutes.some(route => 
      req.nextUrl.pathname.startsWith(route)
    )
    
    // If it's a public API route, allow it through
    if (isPublicApiRoute) {
      console.log(`[MIDDLEWARE] Public API route - allowing access`)
      return res
    }
    
    // For non-public API routes, check authentication
    const { createServerSupabaseClient } = await import('@/lib/supabase')
    const supabase = await createServerSupabaseClient()
    
    // Get the session
    const { data: { session } } = await supabase.auth.getSession()
    
    // For GET requests, allow access without authentication for now
    // (This maintains current behavior while we add protection incrementally)
    if (req.method === 'GET') {
      console.log(`[MIDDLEWARE] GET request - allowing access (for now)`)
      return res
    }
    
    // For write operations (POST, PUT, PATCH, DELETE), require authentication
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method || '')) {
      if (!session) {
        console.log(`[MIDDLEWARE] Unauthorized ${req.method} request blocked`)
        return NextResponse.json(
          { error: 'Authentication required' }, 
          { status: 401 }
        )
      }
      
      // Check if user has admin role for write operations
      const { data: userPreferences } = await supabase
        .from('user_preferences')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!userPreferences || userPreferences.role !== 'admin') {
        console.log(`[MIDDLEWARE] Non-admin ${req.method} request blocked`)
        return NextResponse.json(
          { error: 'Admin access required' }, 
          { status: 403 }
        )
      }
      
      console.log(`[MIDDLEWARE] Admin ${req.method} request allowed`)
    }
    
    return res
  }

  // For admin routes, check if user has admin role
  if (isAdminRoute) {
    // Create a supabase client to check admin status
    const { createServerSupabaseClient } = await import('@/lib/supabase')
    const supabase = await createServerSupabaseClient()
    
    // Get the session
    const { data: { session } } = await supabase.auth.getSession()
    
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

  // The updateSession middleware already handles redirecting unauthenticated users
  // for protected routes, so we can just return the response
  return res
}

// Run middleware on auth routes and protected routes
export const config = {
  matcher: [
    '/auth/:path*',
    '/admin/:path*',
    '/paths/:path*',
    '/case-study/:path*',
    '/profile',
    '/api/:path*'
  ]
}