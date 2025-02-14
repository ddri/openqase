// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OpenQase - Quantum Computing Case Studies',
  description: 'Explore quantum computing case studies through persona, industry, and algorithm paths',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0C0C0D] min-h-screen`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}