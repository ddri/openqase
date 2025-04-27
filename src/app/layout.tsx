// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import { GlobalErrorBoundary } from '@/components/error-boundary/GlobalErrorBoundary';

// Load Inter with additional weights for better typography
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'OpenQASE',
  description: 'Open Quantum Algorithm Study Environment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen antialiased">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">
              <GlobalErrorBoundary>
                {children}
              </GlobalErrorBoundary>
            </main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}