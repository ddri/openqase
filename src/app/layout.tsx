// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ThemeProvider from '@/components/ThemeProvider';
import AlphaBanner from '@/components/ui/AlphaBanner';

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
            <footer className="py-6 border-t border-[var(--border)] bg-[var(--background)]">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-[var(--muted-foreground)]">
                      © {new Date().getFullYear()} openQase. All rights reserved.
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <Link href="/privacy-policy" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                      Privacy Policy
                    </Link>
                    <Link href="/terms-of-service" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                      Terms of Service
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}