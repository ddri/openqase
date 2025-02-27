// src/components/ThemeSwitcher.tsx


'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show after first render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // Return placeholder with same size to avoid layout shift
    return <div className="w-9 h-9"></div>;
  }
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md transition-colors hover:bg-[var(--secondary)] text-[var(--foreground)]"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}