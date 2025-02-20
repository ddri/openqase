// File: src/components/Navigation.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'openQase', href: '/' },
    { label: 'Learning Paths', href: '/learning-paths' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Quantum Stack', href: '/quantum-stack' }
  ];

  return (
    <nav className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex gap-6 md:gap-10">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                // First item (openQase) gets different styling
                index === 0 
                  ? 'font-bold text-lg'
                  : 'text-foreground/60',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;