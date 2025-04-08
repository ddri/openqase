'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/AuthContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      themes={['light', 'dark', 'graphite']}
    >
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
} 