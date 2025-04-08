'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSearchParams } from 'next/navigation'

export default function AuthPage() {
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()
  const redirectTo = searchParams.get('redirectTo') || '/'

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
            view="sign_up"
            showLinks={true}
            redirectTo={`/auth/callback?redirectTo=${redirectTo}`}
          />
        </div>
      </div>
    </div>
  )
} 