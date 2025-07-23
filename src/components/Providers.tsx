'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/AuthContext'
import { type ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
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
  )
} 