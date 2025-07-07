# Newsletter Subscription System

## Overview

The Newsletter Subscription System is a production-ready email marketing and subscription management solution built into OpenQase. It provides a complete infrastructure for collecting newsletter subscriptions, managing subscriber data, sending welcome emails, and handling unsubscribes with full compliance features.

The system integrates **Resend** as the email delivery service and uses **Supabase** for subscriber data persistence. It includes comprehensive rate limiting, beautiful HTML email templates, and a RESTful API for integration with frontend forms.

## Features

- 📧 **Newsletter Subscriptions**: Collect and manage email subscriptions
- 🎨 **Beautiful Welcome Emails**: Professional HTML email templates with OpenQase branding
- 🛡️ **Rate Limiting**: Protection against spam and abuse (5 requests per 5-minute window)
- 📊 **Subscription Status**: Check subscription status and manage preferences
- 🔗 **One-Click Unsubscribe**: Compliant unsubscribe functionality with unique tokens
- 🔄 **Duplicate Handling**: Smart handling of existing subscriptions
- 📈 **Marketing Ready**: Foundation for bi-weekly newsletters and campaigns
- ⚡ **Production Ready**: Error handling, logging, and reliability features

## Architecture

### System Components

```
Frontend Form → Newsletter API → Database Storage
                     ↓
              Resend Email Service → Welcome Email
```

**Key Files:**
- `src/app/api/newsletter/route.ts` - Main API endpoint (POST, GET, DELETE)
- `src/lib/rate-limiter.ts` - Rate limiting implementation
- `supabase/migrations/20250706115203_add_newsletter_subscriptions.sql` - Database schema
- `src/types/database.types.ts` - TypeScript database types

### Email Architecture

**Unified Email System:**
- All emails (transactional + marketing) flow through **Resend**
- Supabase Auth emails configured to use Resend SMTP
- Newsletter system uses Resend API directly for marketing emails

## API Documentation

### Base URL
```
/api/newsletter
```

### Endpoints

#### 1. Subscribe to Newsletter
```http
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com",
  "source": "website"  // optional, defaults to "website"
}
```

**Rate Limiting:** 5 requests per 5-minute window per IP address

**Success Response (200):**
```json
{
  "message": "Successfully subscribed to newsletter! Check your email for confirmation.",
  "email": "user@example.com",
  "alreadySubscribed": false
}
```

**Already Subscribed (200):**
```json
{
  "message": "You are already subscribed to our newsletter!",
  "email": "user@example.com",
  "alreadySubscribed": true
}
```

**Rate Limited (429):**
```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 218
}
```

**Headers:**
- `X-RateLimit-Limit: 5`
- `X-RateLimit-Remaining: 4`
- `Retry-After: 300` (when rate limited)

#### 2. Check Subscription Status
```http
GET /api/newsletter?email=user@example.com
```

**Response (200):**
```json
{
  "subscribed": true,
  "email": "user@example.com",
  "status": "active",
  "subscriptionDate": "2025-07-07T03:48:39.271202+00:00"
}
```

#### 3. Unsubscribe
```http
DELETE /api/newsletter?token={unsubscribe_token}
```

**Response (200):**
```json
{
  "message": "Successfully unsubscribed from newsletter.",
  "email": "user@example.com"
}
```

## Database Schema

### newsletter_subscriptions Table

```sql
CREATE TABLE newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    subscription_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribe_token VARCHAR(255) UNIQUE DEFAULT gen_random_uuid(),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- `idx_newsletter_email` on `email`
- `idx_newsletter_status` on `status`
- `idx_newsletter_date` on `subscription_date`
- `idx_newsletter_unsubscribe_token` on `unsubscribe_token`

**Status Values:**
- `active` - Subscribed and receiving emails
- `unsubscribed` - Opted out of emails

**Metadata Field:**
```json
{
  "source": "website",           // Subscription source tracking
  "reactivated": true,           // If subscription was reactivated
  "unsubscribed_at": "2025-07-07T...", // Unsubscribe timestamp
  "preferences": {...}           // Future: Email preferences
}
```

## Email Integration

### Resend Configuration

**Environment Variables:**
```bash
# .env.local
RESEND_API_KEY=re_YourResendAPIKey
NEXT_PUBLIC_SITE_URL=https://openqase.com
```

**Supabase Configuration:**
```toml
# supabase/config.toml
[auth.email.smtp]
enabled = true
host = "smtp.resend.com"
port = 587
user = "resend"
pass = "env(RESEND_API_KEY)"
admin_email = "hello@openqase.com"
sender_name = "OpenQase"
```

### Welcome Email Template

**Subject:** `Welcome to OpenQase Newsletter! 🚀`
**From:** `david@openqase.com`

The welcome email features:
- 🎨 **Gradient header** with OpenQase branding
- 📝 **Clear value proposition** - what subscribers will receive
- 🔗 **Call-to-action** linking back to OpenQase.com
- ⚖️ **Legal compliance** with unsubscribe link
- 📱 **Responsive design** that works on all devices

Key content areas:
- Quantum computing business case studies
- Algorithm implementations and insights
- Industry applications and trends
- OpenQase platform updates

## Rate Limiting

### Configuration
```typescript
// src/lib/rate-limiter.ts
export const RATE_LIMITS = {
  newsletter: {
    limit: 5,           // 5 requests
    windowMs: 300000,   // 5 minutes (300,000ms)
  }
}
```

### Implementation
- **Per-IP tracking** using request headers (`x-forwarded-for`, `x-real-ip`)
- **In-memory storage** with automatic cleanup
- **Proper HTTP headers** for client-side handling
- **Graceful degradation** - subscription succeeds even if email fails

### Headers
```http
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
Retry-After: 218
```

## Frontend Integration

### Basic HTML Form
```html
<form id="newsletter-form">
  <input type="email" name="email" placeholder="Enter your email" required>
  <input type="hidden" name="source" value="homepage">
  <button type="submit">Subscribe to Newsletter</button>
</form>

<script>
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        source: formData.get('source')
      })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      alert(result.message);
    } else {
      alert(result.error || 'Something went wrong');
    }
  } catch (error) {
    alert('Network error. Please try again.');
  }
});
</script>
```

### React Integration
```tsx
import { useState } from 'react';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          source: 'react-form' 
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(result.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.error);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={status === 'loading'}
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {message && (
        <p className={status === 'success' ? 'text-green-600' : 'text-red-600'}>
          {message}
        </p>
      )}
    </form>
  );
}
```

## Marketing Campaigns

### Bi-Weekly Newsletter Usage

The system is designed to support marketing campaigns. Here's how to send newsletters:

```typescript
// Example newsletter script
async function sendBiWeeklyNewsletter() {
  const supabase = createServerSupabaseClient();
  
  // Get all active subscribers
  const { data: subscribers } = await supabase
    .from('newsletter_subscriptions')
    .select('email, unsubscribe_token')
    .eq('status', 'active');
  
  // Send newsletter to each subscriber
  for (const subscriber of subscribers) {
    const unsubscribeUrl = `https://openqase.com/newsletter/unsubscribe?token=${subscriber.unsubscribe_token}`;
    
    await resend.emails.send({
      from: 'david@openqase.com',
      to: subscriber.email,
      subject: 'OpenQase Weekly Update - Jan 15th, 2025',
      html: `
        <!-- Your newsletter content -->
        <h1>This Week in Quantum Computing</h1>
        <p>Latest case studies and insights...</p>
        
        <!-- Unsubscribe link (required) -->
        <p><a href="${unsubscribeUrl}">Unsubscribe</a></p>
      `
    });
  }
}
```

### Campaign Analytics

With Resend, you can enable:
- **Open tracking** - See who opens your emails
- **Click tracking** - Track link clicks
- **Bounce handling** - Manage invalid email addresses
- **Delivery analytics** - Monitor email delivery rates

## Testing

### Local Testing

1. **Start development environment:**
```bash
npm run dev
supabase start  # if not already running
```

2. **Test subscription endpoint:**
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "source": "api-test"}'
```

3. **Check rate limiting:**
```bash
# Send 6 requests quickly to trigger rate limit
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/newsletter \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"test$i@example.com\"}"
done
```

4. **Verify database:**
```bash
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" \
  -c "SELECT email, status, subscription_date FROM newsletter_subscriptions;"
```

### Email Testing

- **Local emails** are caught by Supabase's Inbucket at `http://localhost:54324`
- **Production emails** are sent via Resend
- **Welcome emails** are sent immediately upon subscription
- **Test with invalid emails** (like `test@example.com`) may be rejected by Resend

## Monitoring & Analytics

### Key Metrics to Track

1. **Subscription Rate:** New subscriptions per day/week
2. **Conversion Rate:** Newsletter subscriptions from different sources
3. **Unsubscribe Rate:** Percentage of users unsubscribing
4. **Email Deliverability:** Bounce rates and delivery success
5. **Engagement:** Open rates and click-through rates (via Resend)

### Database Queries
```sql
-- Subscription growth over time
SELECT DATE(subscription_date) as date, COUNT(*) as subscriptions
FROM newsletter_subscriptions 
WHERE status = 'active'
GROUP BY DATE(subscription_date)
ORDER BY date DESC;

-- Subscription sources
SELECT metadata->>'source' as source, COUNT(*) as count
FROM newsletter_subscriptions 
WHERE status = 'active'
GROUP BY metadata->>'source';

-- Unsubscribe rate
SELECT 
  (SELECT COUNT(*) FROM newsletter_subscriptions WHERE status = 'unsubscribed') * 100.0 /
  (SELECT COUNT(*) FROM newsletter_subscriptions) as unsubscribe_rate_percent;
```

## Security & Compliance

### Data Protection
- **GDPR Compliance:** One-click unsubscribe with unique tokens
- **Data Minimization:** Only storing essential subscription data
- **Secure Tokens:** UUID-based unsubscribe tokens
- **Rate Limiting:** Protection against abuse and spam

### Email Compliance
- **CAN-SPAM Act:** Unsubscribe links in all emails
- **GDPR:** Right to be forgotten via unsubscribe
- **Professional Sender:** Using verified domain (openqase.com)

## Troubleshooting

### Common Issues

**1. TypeScript Errors with Database Types**
```bash
# Regenerate database types
supabase gen types typescript --local > src/types/database.types.ts
```

**2. Emails Not Sending**
- Check `RESEND_API_KEY` in `.env.local`
- Verify domain verification in Resend dashboard
- Check Resend API limits and usage

**3. Rate Limiting Too Strict**
```typescript
// Adjust in src/lib/rate-limiter.ts
export const RATE_LIMITS = {
  newsletter: {
    limit: 10,          // Increase limit
    windowMs: 900000,   // Increase window to 15 minutes
  }
}
```

**4. Database Connection Issues**
```bash
# Check Supabase status
supabase status

# Reset local database
supabase db reset
```

### Logs and Debugging

**Server logs show:**
- `Welcome email sent successfully to: [email]` - Email delivery success
- `Newsletter subscription error:` - Detailed error messages
- `POST /api/newsletter 200` - Successful API calls
- `POST /api/newsletter 429` - Rate limit triggers

## Deployment

### Environment Variables (Production)

```bash
# Required for production
RESEND_API_KEY=re_YourProductionAPIKey
NEXT_PUBLIC_SITE_URL=https://openqase.com

# Supabase (production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Database Migration

```bash
# Apply newsletter migration to production
supabase db push --linked

# Or manually apply the migration file
supabase db push --migration-file supabase/migrations/20250706115203_add_newsletter_subscriptions.sql
```

### Monitoring

Monitor these endpoints in production:
- Newsletter API response times
- Email delivery success rates via Resend dashboard
- Database performance for subscriber queries
- Rate limiting effectiveness

## Future Enhancements

### Planned Features
- **Email Preferences:** Subscription preferences (frequency, topics)
- **Segmentation:** Send different newsletters to different segments
- **A/B Testing:** Test different email templates and subject lines
- **Admin Dashboard:** Manage subscribers via the existing admin CMS
- **Analytics Dashboard:** Visual analytics for subscription metrics
- **Auto-campaigns:** Automated drip campaigns for new subscribers

### Resend Advanced Features
- **Domains:** Configure custom sending domains
- **Templates:** Use Resend's template system
- **Audiences:** Manage subscriber segments in Resend
- **Webhooks:** Handle bounces and complaints automatically

## Summary

The Newsletter Subscription System provides a robust foundation for email marketing at OpenQase. With 6 active test subscribers already in the database, beautiful welcome emails being delivered via Resend, and a production-ready API with rate limiting, the system is ready for immediate use and future scaling.

The unified email architecture ensures all emails (transactional and marketing) flow through Resend for consistent deliverability and branding, while the comprehensive API makes it easy to integrate newsletter subscriptions throughout the OpenQase platform. 