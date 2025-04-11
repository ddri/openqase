'use client';

import { ReactNode } from 'react';
import AuthGate from '@/components/auth/AuthGate';

interface LearningPathLayoutProps {
  title: string;
  children: ReactNode;
}

export default function LearningPathLayout({
  title,
  children
}: LearningPathLayoutProps) {
  return (
    <AuthGate
      title="Access Learning Path Content"
      description="Sign in to access detailed learning paths and resources tailored to your needs."
    >
      <main className="min-h-screen">
        <div className="container-outer section-spacing">
          <h1 className="text-4xl font-bold text-[hsl(var(--primary))] mb-8">
            {title}
          </h1>
          {children}
        </div>
      </main>
    </AuthGate>
  );
} 