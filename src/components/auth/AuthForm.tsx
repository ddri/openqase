'use client'

import { useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase-browser'

export type AuthView = 'sign_in' | 'sign_up' | 'forgotten_password' | 'update_password'

interface AuthFormProps {
  view?: AuthView
  redirectTo?: string
  onAuthSuccess?: () => void
}

export function AuthForm({ 
  view = 'sign_in',
  redirectTo = '/',
  onAuthSuccess 
}: AuthFormProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <Auth
        supabaseClient={supabase}
        view={view}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'rgb(var(--primary))',
                brandAccent: 'rgb(var(--primary-foreground))',
              },
            },
          },
          className: {
            container: 'w-full',
            button: 'w-full px-4 py-2 text-white bg-primary hover:bg-primary/90',
            input: 'w-full px-3 py-2 border rounded-md',
            label: 'text-sm font-medium',
          },
        }}
        providers={['github']}
        redirectTo={redirectTo}
        magicLink={true}
      />
    </div>
  )
} 