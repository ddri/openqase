// src/components/Navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from './ui/ThemeSwitcher';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  const linkClass = (path: string) => {
    return `px-4 py-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors ${
      isActive(path) ? 'font-bold text-[var(--primary)]' : ''
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--background)] border-b border-[var(--border)] py-4">
      <div className="container mx-auto px-4 flex items-center">
        <Link href="/" className="text-xl font-bold mr-8 text-[var(--foreground)]">
          openQase
        </Link>
        
        <div className="flex space-x-4">
          <Link href="/paths" className={linkClass('/paths')}>
            Learning Paths
          </Link>
          <Link href="/case-study" className={linkClass('/case-study')}>
            Case Studies
          </Link>
          <Link href="/quantum-stack" className={linkClass('/quantum-stack')}>
            Quantum Stack
          </Link>
        </div>
        
        <div className="ml-auto">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}