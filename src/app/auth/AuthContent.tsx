'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

export function AuthContent({ redirectTo }: { redirectTo?: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const redirectToParam = searchParams.get('redirectTo') || '/'
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.replace(redirectToParam)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        toast({
          title: 'Error',
          description: 'Failed to check authentication status',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        toast({
          title: 'Success',
          description: 'Successfully signed in',
        })
      } else if (event === 'SIGNED_OUT') {
        toast({
          title: 'Signed out',
          description: 'You have been signed out',
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router, redirectToParam])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="container relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to your account to access all features
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'hsl(var(--primary))',
                      brandAccent: 'hsl(var(--primary))',
                    },
                  },
                },
              }}
              providers={[]}
              view="sign_in"
              showLinks={true}
              redirectTo={`${window.location.origin}/auth/callback?redirectTo=${redirectToParam}`}
              onlyThirdPartyProviders={false}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
} 