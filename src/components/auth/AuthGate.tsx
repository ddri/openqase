'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock } from 'lucide-react';

interface AuthGateProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AuthGate({ children, title, description }: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const supabase = createClientComponentClient();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Show nothing while checking auth status
  if (isAuthenticated === null) {
    return null;
  }

  // If authenticated, show the actual content
  if (isAuthenticated) {
    return children;
  }

  // If not authenticated, show the login prompt
  return (
    <div className="container max-w-4xl mx-auto py-12">
      <Card className="text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">{title}</CardTitle>
          <CardDescription className="text-base sm:text-lg">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="default">
              <Link href={`/auth?redirectTo=${pathname}`}>Sign In</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/auth?redirectTo=${pathname}`}>Create Account</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground mx-auto">
            Join our community to access exclusive quantum computing resources
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 