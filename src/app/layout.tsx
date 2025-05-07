// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Navigation from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import FooterWrapper from '@/components/FooterWrapper';
import Providers from '@/components/Providers';
import { GlobalErrorBoundary } from '@/components/error-boundary/GlobalErrorBoundary';

// Load Montserrat for headings
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
});

// Load Open Sans for body
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['400', '600', '700'],
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
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="min-h-screen antialiased">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">
              <GlobalErrorBoundary>
                {children}
              </GlobalErrorBoundary>
            </main>
            {/* Footer is only shown on non-admin routes */}
            <FooterWrapper />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}