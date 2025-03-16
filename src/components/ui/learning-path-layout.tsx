'use client';

import { ReactNode } from 'react';

interface LearningPathLayoutProps {
  title: string;
  children: ReactNode;
}

export default function LearningPathLayout({
  title,
  children
}: LearningPathLayoutProps) {
  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        <h1 className="text-4xl font-bold text-[hsl(var(--primary))] mb-8">
          {title}
        </h1>
        {children}
      </div>
    </main>
  );
} 