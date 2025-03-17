// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ThemeProvider from '@/components/ThemeProvider';
import AlphaBanner from '@/components/ui/AlphaBanner';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';

// Load Inter with additional weights for better typography
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'OpenQASE - Quantum Computing Education Platform',
  description: 'Learn about quantum computing with case studies and learning paths',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <AlphaBanner />
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}