// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a simple example - in production you'd want more secure authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'your-secure-password'

export function middleware(request: NextRequest) {
  // Only run on admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Access"',
      },
    })
  }

  // Basic auth header format: Basic base64(username:password)
  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString()
  const [username, password] = auth.split(':')

  if (password !== ADMIN_PASSWORD) {
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Access"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}