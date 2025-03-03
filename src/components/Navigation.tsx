// src/components/Navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from './ui/ThemeSwitcher';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <nav 
      className={`sticky top-0 z-[100] w-full border-b border-[var(--border)] transition-all duration-300 ${
        scrolled 
          ? 'py-2 backdrop-blur-md bg-[var(--background)/90] shadow-md' 
          : 'py-4 bg-[var(--background)]'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center">
        <Link href="/" className={`font-bold mr-8 text-[var(--foreground)] transition-all duration-300 ${
          scrolled ? 'text-lg' : 'text-xl'
        }`}>
          openQase
        </Link>
        
        <div className="flex space-x-4 pb-1">
          <Link 
            href="/paths" 
            className={`px-4 py-2 ${isActive('/paths') ? 'text-[color:hsl(var(--primary))] active' : ''}`}
          >
            Learning Paths
          </Link>
          
          <Link 
            href="/case-study" 
            className={`px-4 py-2 ${isActive('/case-study') ? 'text-[color:hsl(var(--primary))] active' : ''}`}
          >
            Case Studies
          </Link>
          
          <Link 
            href="/quantum-stack" 
            className={`px-4 py-2 ${isActive('/quantum-stack') ? 'text-[color:hsl(var(--primary))] active' : ''}`}
          >
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