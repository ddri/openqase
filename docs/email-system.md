# Email System

OpenQase uses a dual email service architecture combining Beehiiv for marketing emails and Resend for transactional emails, providing optimal deliverability and functionality for each email type.

## Architecture Overview

```
Newsletter Form → Dual Service → [Beehiiv + Resend + Database]
                                      ↓
                               Welcome Email (preferred service)

Profile Page → Newsletter API → newsletter_subscriptions table
     ↓               ↓                    ↓
User toggles → Authenticates user → Updates subscription
marketing    → Validates request  → (active/unsubscribed)
emails       → Updates database   → Returns status
```

## Email Service Responsibilities

### Beehiiv (Marketing Emails)
- **Primary newsletter marketing platform**
- Campaign newsletters and announcements
- Subscriber analytics and growth tools
- Advanced templates and design features
- UTM tracking and subscriber segmentation

### Resend (Transactional Emails)
- **Authentication emails** (signup confirmations, password resets)
- **Security notifications** (login alerts, account changes)
- **System notifications** (admin alerts, error reports)
- **Backup newsletter delivery** (fallback service)

### Database (Supabase)
- Local subscriber management
- Unsubscribe token generation
- Email preference tracking
- Cross-service synchronization

## Email Type Classification

Following industry best practices and Resend's recommendations:

```
┌─────────────────────┬────────────────────┬──────────────────┐
│ Email Type          │ User Control       │ System           │
├─────────────────────┼────────────────────┼──────────────────┤
│ Security & Account  │ None (always sent) │ Transactional    │
│ Password Resets     │ None (always sent) │ Transactional    │
│ Login Notifications │ None (always sent) │ Transactional    │
│ Marketing Newsletter│ Subscribe/Unsubscr │ Marketing        │
│ Product Updates     │ Subscribe/Unsubscr │ Marketing        │
│ Campaign Emails     │ Subscribe/Unsubscr │ Marketing        │
└─────────────────────┴────────────────────┴──────────────────┘
```

**Important**: Transactional emails should NEVER be toggleable as they are required for account security and functionality.

## Setup & Configuration

### Environment Variables

```bash
# Beehiiv Configuration (Marketing)
BEEHIIV_API_KEY=your_beehiiv_api_key_here
BEEHIIV_PUBLICATION_ID=your_publication_id_here

# Resend Configuration (Transactional)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@your-domain.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Beehiiv Setup

1. **Create Account**: Go to [beehiiv.com](https://beehiiv.com) and create an account
2. **Create Publication**: Set up your newsletter publication
3. **Get API Credentials**: 
   - Note your **Publication ID**
   - Generate an **API key** (requires paid plan)
4. **Domain Setup** (Optional):
   - Go to Settings → Domain
   - Add your domain (e.g., `newsletter.openqase.com`)
   - Configure DNS records for better deliverability

### Resend Setup

1. **Create Account**: Go to [resend.com](https://resend.com)
2. **Domain Verification**: Add and verify your sending domain
3. **API Key**: Generate API key in dashboard
4. **Configure Sender**: Set up `RESEND_FROM_EMAIL` address

## Service Configuration

The dual service automatically detects available services:

```typescript
// Default configuration
{
  useBeehiiv: true,        // If BEEHIIV_API_KEY is set
  useResend: true,         // If RESEND_API_KEY is set
  syncToDatabase: true,    // Always sync to local DB
  sendWelcomeEmail: true,  // Send welcome email
  preferredService: 'beehiiv' // Which service sends welcome email
}
```

### Migration Options

#### Option A: Gradual Migration (Recommended)
- Keep both services running
- Beehiiv handles welcome emails and campaigns
- Resend handles transactional emails
- Database syncs both services

#### Option B: Full Beehiiv
- Set `preferredService: 'beehiiv'`
- Use Beehiiv for all marketing emails
- Keep Resend for transactional only

#### Option C: Resend + Beehiiv Sync
- Set `preferredService: 'resend'`
- Use Resend for emails
- Sync subscribers to Beehiiv for analytics

## Database Schema

### Newsletter Subscriptions Table

```sql
CREATE TABLE newsletter_subscriptions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email text NOT NULL UNIQUE,
    status text NOT NULL DEFAULT 'active',
    unsubscribe_token VARCHAR(255) UNIQUE DEFAULT gen_random_uuid(),
    metadata jsonb DEFAULT '{}',
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscriptions(status);
CREATE INDEX idx_newsletter_unsubscribe_token ON newsletter_subscriptions(unsubscribe_token);
```

### Key Fields
- `email`: Subscriber email address (unique)
- `status`: `active`, `unsubscribed`, or `bounced`
- `unsubscribe_token`: UUID for one-click unsubscribe
- `metadata`: JSON field for UTM tracking, source attribution, etc.

## API Documentation

### Base URL
```
/api/newsletter
```

### Subscribe to Newsletter

**Endpoint**: `POST /api/newsletter`

**Request Body**:
```json
{
  "email": "user@example.com",
  "source": "blog"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "services": {
    "beehiiv": "success",
    "resend": "success",
    "database": "success"
  }
}
```

**Rate Limiting**: 5 requests per 5-minute window per IP

### Check Subscription Status

**Endpoint**: `GET /api/newsletter?token={unsubscribe_token}`

**Response**:
```json
{
  "email": "user@example.com",
  "status": "active",
  "subscribed_at": "2024-01-15T10:30:00Z"
}
```

### Unsubscribe

**Endpoint**: `DELETE /api/newsletter?token={unsubscribe_token}`

**Response**:
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

## Features

### Automatic Fallback
- If Beehiiv fails, subscription continues via database
- If Resend fails, subscription continues via Beehiiv
- Graceful degradation ensures no lost subscriptions

### Subscriber Sync
- All subscribers synced to local database
- Beehiiv receives UTM tracking data
- Resend maintains backup subscriber data

### Analytics & Tracking
- UTM campaigns automatically set
- Source tracking (blog, about page, etc.)
- Subscriber journey tracking in metadata

### Rate Limiting
- Protection against spam and abuse
- 5 requests per 5-minute window per IP
- Configurable limits per environment

## Email Templates

### Welcome Email (Beehiiv)
- Professional HTML templates
- OpenQase branding
- Responsive design
- CAN-SPAM compliant

### Transactional Emails (Resend)
- Authentication confirmations
- Password reset instructions
- Security notifications
- System alerts

## Testing

### Test Newsletter Signup

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "source": "test"}'
```

### Test Service Connections

```javascript
// In browser console
fetch('/api/newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com', source: 'test' })
})
.then(res => res.json())
.then(data => console.log(data))
```

### Verification Checklist

1. **Check services are loaded:**
   ```bash
   # In server logs, you should see:
   "Successfully subscribed to Beehiiv: test@example.com"
   "Successfully sent welcome email via Resend: test@example.com"
   ```

2. **Check database:**
   ```sql
   SELECT email, status, metadata FROM newsletter_subscriptions 
   WHERE email = 'test@example.com';
   ```

3. **Check Beehiiv dashboard:**
   - Go to Audience → Subscribers
   - Look for new subscriber with UTM data

## Compliance & Best Practices

### CAN-SPAM Compliance
- ✅ One-click unsubscribe with unique tokens
- ✅ Clear sender identification
- ✅ Physical address in email footers
- ✅ Honest subject lines
- ✅ Prompt unsubscribe processing

### GDPR Compliance
- ✅ Explicit consent for marketing emails
- ✅ Easy unsubscribe mechanism
- ✅ Data retention policies
- ✅ Right to data deletion

### Email Deliverability
- ✅ Separate marketing and transactional emails
- ✅ Domain authentication (SPF, DKIM, DMARC)
- ✅ Reputation monitoring
- ✅ List hygiene and bounce handling

## Troubleshooting

### Common Issues

**"Beehiiv service not available"**
- Check API key and publication ID
- Verify Beehiiv account is paid (API requires paid plan)
- Check network connectivity

**"Newsletter service is not configured"**
- Ensure at least one service (Beehiiv or Resend) is configured
- Check environment variables are set correctly
- Verify API keys are valid

**"Rate limit exceeded"**
- Wait 5 minutes for rate limit reset
- Check for unusual traffic patterns
- Consider implementing user-specific rate limiting

**Subscribers not syncing**
- Check database connection
- Verify newsletter_subscriptions table exists
- Check server logs for errors
- Ensure RLS policies allow inserts

### Monitoring

**Key Metrics to Track:**
- Subscription success rate
- Email delivery rates
- Unsubscribe rates
- Service uptime
- Database sync success

**Recommended Alerts:**
- Service failures
- High bounce rates
- Unusual subscription patterns
- Database sync errors


