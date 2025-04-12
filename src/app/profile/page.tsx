'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface EmailPreferences {
  marketing: boolean
  social: boolean
  security: boolean
}

export default function ProfilePage() {
  const { theme, setTheme, themes } = useTheme()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [emailPrefs, setEmailPrefs] = useState<EmailPreferences>({
    marketing: false,
    social: false,
    security: true
  })
  const supabase = createClientComponentClient()
  const router = useRouter()

  // Check auth and load user
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/auth?redirectTo=/profile')
          return
        }
        setUser(user)
      } catch (error) {
        console.error('Error loading user:', error)
        toast({
          title: 'Error',
          description: 'Failed to load user data',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        router.push('/auth?redirectTo=/profile')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  // Load email preferences from database
  useEffect(() => {
    const loadEmailPrefs = async () => {
      if (!user) return
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setEmailPrefs(data.email_preferences)
      }
    }

    loadEmailPrefs()
  }, [user, supabase])

  // Save email preferences
  const saveEmailPrefs = async (key: keyof EmailPreferences, value: boolean) => {
    if (!user) return

    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        email_preferences: { ...emailPrefs, [key]: value }
      })

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to save preferences. Please try again.',
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Success',
        description: 'Your preferences have been saved.'
      })
    }
  }

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your account details and email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email</Label>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <Label>Account Created</Label>
                <p className="text-muted-foreground">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the appearance of OpenQASE.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Email Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Email Preferences</CardTitle>
              <CardDescription>
                Control which emails you receive from us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex-1 space-y-1">
                    <label
                      htmlFor="marketing"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Marketing emails
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new products, features, and more.
                    </p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={emailPrefs.marketing}
                    onCheckedChange={(checked: boolean) => saveEmailPrefs('marketing', checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex-1 space-y-1">
                    <label
                      htmlFor="social"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Social emails
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails for friend requests, follows, and more.
                    </p>
                  </div>
                  <Switch
                    id="social"
                    checked={emailPrefs.social}
                    onCheckedChange={(checked: boolean) => saveEmailPrefs('social', checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex-1 space-y-1">
                    <label
                      htmlFor="security"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Security emails
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about your account security and activity.
                    </p>
                  </div>
                  <Switch
                    id="security"
                    checked={emailPrefs.security}
                    onCheckedChange={(checked: boolean) => saveEmailPrefs('security', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 