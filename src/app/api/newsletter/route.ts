import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { rateLimiter, RATE_LIMITS } from '@/lib/rate-limiter'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Email validation schema
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional().default('website'), // Track subscription source
})

// Unsubscribe schema
const unsubscribeSchema = z.object({
  token: z.string().min(1, 'Unsubscribe token is required'),
})

/**
 * Subscribe to newsletter
 */
export async function POST(request: Request) {
  try {
    // Apply rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    
    const rateLimitResult = rateLimiter.checkLimit(
      `newsletter:${clientIP}`,
      RATE_LIMITS.newsletter.limit,
      RATE_LIMITS.newsletter.windowMs
    )
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
                  headers: {
          'X-RateLimit-Limit': RATE_LIMITS.newsletter.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'Retry-After': rateLimitResult.retryAfter?.toString() || '300'
        }
        }
      )
    }

    const data = await request.json()
    
    // Validate the email
    const result = newsletterSchema.safeParse(data)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const { email, source } = result.data
    const supabase = await createServerSupabaseClient()

    // Check if email already exists
    const { data: existing } = await supabase
      .from('newsletter_subscriptions')
      .select('id, status')
      .eq('email', email)
      .single()

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json({
          message: 'You are already subscribed to our newsletter!',
          email,
          alreadySubscribed: true
        })
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscriptions')
          .update({ 
            status: 'active',
            subscription_date: new Date().toISOString(),
            metadata: { ...existing.metadata || {}, source, reactivated: true }
          })
          .eq('email', email)

        if (updateError) {
          console.error('Error reactivating subscription:', updateError)
          return NextResponse.json(
            { error: 'Failed to reactivate subscription' },
            { status: 500 }
          )
        }
      }
    } else {
      // Create new subscription
      const { error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email,
          status: 'active',
          metadata: { source }
        })

      if (insertError) {
        console.error('Error creating subscription:', insertError)
        return NextResponse.json(
          { error: 'Failed to subscribe to newsletter' },
          { status: 500 }
        )
      }
    }

    // Send welcome email via Resend
    try {
      const { data: unsubscribeData } = await supabase
        .from('newsletter_subscriptions')
        .select('unsubscribe_token')
        .eq('email', email)
        .single()

      const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/newsletter/unsubscribe?token=${unsubscribeData?.unsubscribe_token}`

      await resend.emails.send({
        from: 'david@openqase.com',
        to: [email],
        subject: 'Welcome to OpenQase Newsletter! 🚀',
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Welcome to OpenQase! 🚀</h1>
            </div>
            
            <div style="padding: 40px 30px; background: #ffffff;">
              <h2 style="color: #333; margin-top: 0;">Thank you for subscribing!</h2>
              
              <p style="color: #666; line-height: 1.6; margin: 20px 0;">
                You've successfully subscribed to the OpenQase newsletter. You'll receive the latest updates on:
              </p>
              
              <ul style="color: #666; line-height: 1.8; margin: 20px 0; padding-left: 20px;">
                <li>Quantum computing business case studies</li>
                <li>Algorithm implementations and insights</li>
                <li>Industry applications and trends</li>
                <li>OpenQase platform updates</li>
              </ul>
              
              <div style="background: #f8f9fa; border-radius: 8px; padding: 25px; margin: 30px 0;">
                <h3 style="color: #333; margin-top: 0; font-size: 18px;">What's Next?</h3>
                <p style="color: #666; line-height: 1.6; margin: 10px 0;">
                  Explore our growing collection of quantum computing case studies and learning paths at 
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://openqase.com'}" style="color: #667eea; text-decoration: none;">OpenQase.com</a>
                </p>
              </div>
              
              <p style="color: #999; font-size: 14px; line-height: 1.6; margin-top: 40px;">
                You can <a href="${unsubscribeUrl}" style="color: #667eea; text-decoration: none;">unsubscribe</a> at any time.
                <br>
                This email was sent because you signed up for the OpenQase newsletter.
              </p>
            </div>
          </div>
        `
      })

      console.log('Welcome email sent successfully to:', email)
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      // Don't fail the subscription if email fails
    }

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter! Check your email for confirmation.',
        email,
        alreadySubscribed: false
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMITS.newsletter.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        }
      }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

/**
 * Unsubscribe from newsletter
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unsubscribe token is required' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    // Find subscription by token
    const { data: subscription, error: findError } = await supabase
      .from('newsletter_subscriptions')
      .select('id, email, status')
      .eq('unsubscribe_token', token)
      .single()

    if (findError || !subscription) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe token' },
        { status: 404 }
      )
    }

    if (subscription.status === 'unsubscribed') {
      return NextResponse.json({
        message: 'You are already unsubscribed from our newsletter.',
        email: subscription.email
      })
    }

    // Update subscription status
    const { error: updateError } = await supabase
      .from('newsletter_subscriptions')
      .update({ 
        status: 'unsubscribed',
        metadata: { 
          unsubscribed_at: new Date().toISOString()
        }
      })
      .eq('unsubscribe_token', token)

    if (updateError) {
      console.error('Error unsubscribing:', updateError)
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Successfully unsubscribed from newsletter.',
      email: subscription.email
    })
    
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}

/**
 * Get subscription status (for admin or checking)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    const { data: subscription } = await supabase
      .from('newsletter_subscriptions')
      .select('email, status, subscription_date')
      .eq('email', email)
      .single()

    if (!subscription) {
      return NextResponse.json({
        subscribed: false,
        email
      })
    }

    return NextResponse.json({
      subscribed: subscription.status === 'active',
      email: subscription.email,
      status: subscription.status,
      subscriptionDate: subscription.subscription_date
    })
    
  } catch (error) {
    console.error('Newsletter status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    )
  }
} 