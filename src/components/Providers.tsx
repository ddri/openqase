'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/AuthContext'
import { useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'

// Only load DevTools in development and dynamically
const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then(mod => ({ default: mod.ReactQueryDevtools })),
  {
    ssr: false,
    loading: () => null,
  }
)

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes - much better for static content
            gcTime: 10 * 60 * 1000, // 10 minutes - keep data in cache longer
            refetchOnWindowFocus: false,
            retry: 1, // Only retry once on failure
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="dark"
        enableSystem={false}
        themes={['light', 'dark']}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
} 