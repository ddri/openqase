'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    setStatus('loading')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(),
          source: 'homepage'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.alreadySubscribed 
          ? 'You\'re already subscribed!' 
          : 'Successfully subscribed! Check your email for confirmation.'
        )
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }

  return (
    <div className="bg-card border border-border p-6 h-full flex flex-col justify-center hover:border-primary transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Stay Updated</h2>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Get notified when new quantum computing case studies and industry insights are published. Join quantum professionals staying ahead of the curve.
        </p>
        
        {status === 'success' ? (
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-sm rounded">
              {message}
            </div>
            <Button 
              onClick={() => {
                setStatus('idle')
                setMessage('')
              }}
              variant="outline" 
              className="w-full"
            >
              Subscribe another email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
              required
            />
            <Button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary hover:bg-primary/90 text-black font-medium disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe to Updates'}
            </Button>
            {status === 'error' && (
              <div className="text-red-600 text-xs">
                {message}
              </div>
            )}
          </form>
        )}
        
        <p className="text-xs text-muted-foreground">
          Free weekly updates • No spam • Unsubscribe anytime
        </p>
      </div>
    </div>
  )
}