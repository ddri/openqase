'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'

export default function AuthContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const redirectTo = searchParams.get('redirectTo') || '/'
  const [isLoading, setIsLoading] = useState(true)

  // Check auth state and redirect if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.replace(redirectTo)
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

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        toast({
          title: 'Success',
          description: 'Successfully signed in',
        })
        router.replace(redirectTo)
      } else if (event === 'SIGNED_OUT') {
        toast({
          title: 'Signed out',
          description: 'You have been signed out',
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router, redirectTo])

  if (isLoading) {
    return (
      <div className="container relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
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
                    brand: 'rgb(var(--primary))',
                    brandAccent: 'rgb(var(--primary-foreground))',
                    inputBackground: 'transparent',
                    inputText: 'inherit',
                    inputPlaceholder: 'rgb(var(--muted-foreground))',
                  },
                  radii: {
                    borderRadiusButton: '0.5rem',
                    buttonBorderRadius: '0.5rem',
                    inputBorderRadius: '0.5rem',
                  },
                },
              },
              className: {
                container: 'w-full',
                button: 'w-full px-4 py-2 text-white bg-primary hover:bg-primary/90',
                input: 'w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20',
                label: 'text-sm font-medium',
                anchor: 'text-primary hover:text-primary/90',
                message: 'text-sm text-destructive',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  button_label: 'Sign in',
                },
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Create a password',
                  button_label: 'Create account',
                },
              },
            }}
            providers={[]}
            view="sign_in"
            showLinks={true}
            redirectTo={`${window.location.origin}/auth/callback?redirectTo=${redirectTo}`}
            onlyThirdPartyProviders={false}
          />
        </div>
      </div>
    </div>
  )
} 