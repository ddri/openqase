'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  
  // Only render footer on non-admin routes
  if (isAdminRoute) return null;
  
  return <Footer />;
} 