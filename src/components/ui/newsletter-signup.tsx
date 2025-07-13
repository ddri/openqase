'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNewsletter } from '@/hooks/useNewsletter'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NewsletterSignupProps {
  buttonText?: string
  className?: string
  variant?: 'default' | 'inline'
}

export function NewsletterSignup({ 
  buttonText = 'Subscribe', 
  className,
  variant = 'default'
}: NewsletterSignupProps) {
  const { email, setEmail, isSubscribing, handleSubscribe } = useNewsletter()

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 items-center">
        <Input
          type="email"
          placeholder="Enter your email"
          className="flex-grow"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubscribing}
          required
        />
        <Button 
          type="submit"
          className={cn("px-6 py-2 font-medium", className)}
          disabled={isSubscribing}
        >
          {isSubscribing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
        <p className="text-muted-foreground mb-6 text-lg">
          Subscribe to our newsletter for the latest quantum computing insights and updates.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubscribing}
            required
          />
          <Button 
            type="submit" 
            className={cn("px-6 py-2 font-medium", className)}
            disabled={isSubscribing}
          >
            {isSubscribing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              buttonText
            )}
          </Button>
        </form>
      </div>
    </div>
  )
} 