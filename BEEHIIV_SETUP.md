# Beehiiv Integration Setup Guide

## Overview

OpenQase now supports a dual newsletter service architecture that can use both Resend and Beehiiv simultaneously. This provides flexibility for gradual migration and redundancy.

## Architecture

```
Newsletter Form → Dual Service → [Beehiiv + Resend + Database]
                                      ↓
                               Welcome Email (preferred service)
```

### Service Responsibilities

- **Beehiiv**: Primary newsletter marketing platform
- **Resend**: Transactional emails (auth, password resets) + backup newsletter
- **Database**: Local subscriber management and unsubscribe tokens

## Setup Process

### 1. Create Beehiiv Account

1. Go to [beehiiv.com](https://beehiiv.com) and create an account
2. Create a new publication
3. Note your **Publication ID** and create an **API key**

### 2. Environment Variables

Add these to your `.env.local`:

```bash
# Beehiiv Configuration
BEEHIIV_API_KEY=your_beehiiv_api_key_here
BEEHIIV_PUBLICATION_ID=your_publication_id_here

# Existing Resend (keep for transactional emails)
RESEND_API_KEY=your_existing_resend_key
```

### 3. Domain Setup (Optional)

For better deliverability, configure your domain in Beehiiv:

1. Go to Settings → Domain
2. Add your domain (e.g., `newsletter.openqase.com`)
3. Add the DNS records provided by Beehiiv
4. Verify the domain

### 4. Configuration Options

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

### 5. Service Migration Options

#### Option A: Gradual Migration (Recommended)
- Keep both services running
- Beehiiv handles welcome emails
- Resend handles transactional emails
- Database syncs both

#### Option B: Full Beehiiv
- Set `preferredService: 'beehiiv'`
- Disable Resend for newsletters
- Use Beehiiv for all marketing emails

#### Option C: Resend + Beehiiv Sync
- Set `preferredService: 'resend'`
- Use Resend for emails
- Sync subscribers to Beehiiv for analytics

## Features

### Automatic Fallback
- If Beehiiv fails, subscription still works via database
- If Resend fails, subscription still works via Beehiiv
- Graceful degradation ensures no lost subscriptions

### Subscriber Sync
- All subscribers are synced to local database
- Beehiiv gets UTM tracking data
- Resend gets backup subscriber data

### Analytics & Tracking
- UTM campaigns automatically set
- Source tracking (blog, about page, etc.)
- Subscriber journey tracking

## API Endpoints

All existing endpoints work unchanged:

```bash
# Subscribe
POST /api/newsletter
{
  "email": "user@example.com",
  "source": "blog"
}

# Unsubscribe
DELETE /api/newsletter?token=unsubscribe_token

# Check Status
GET /api/newsletter?token=unsubscribe_token
```

## Testing

### Test Newsletter Signup

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "source": "test"}'
```

### Test Service Connections

```javascript
// In browser console on your site
fetch('/api/newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com', source: 'test' })
})
.then(res => res.json())
.then(data => console.log(data))
```

## Migration Steps

### From Resend-Only to Dual Service

1. **Add Beehiiv credentials** to environment variables
2. **Deploy** - dual service automatically activates
3. **Test** newsletter signup with new email
4. **Monitor** both services for a week
5. **Optionally** switch preferred service to Beehiiv

### Subscriber Data Migration

Beehiiv doesn't require migrating existing subscribers immediately since:
- New subscribers go to both services
- Existing subscribers stay in database
- Gradual migration happens naturally

For bulk migration (optional):
1. Export subscribers from database
2. Import CSV to Beehiiv
3. Map custom fields as needed

## Troubleshooting

### Common Issues

**"Beehiiv service not available"**
- Check API key and publication ID
- Verify Beehiiv account is paid (API requires paid plan)

**"Newsletter service is not configured"**
- Ensure at least one service (Beehiiv or Resend) is configured
- Check environment variables are set

**Subscribers not syncing**
- Check database connection
- Verify newsletter_subscriptions table exists
- Check server logs for errors

### Verification

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

## Benefits

### For OpenQase

- **Redundancy**: Multiple services prevent lost subscriptions
- **Analytics**: Better tracking and segmentation
- **Deliverability**: Beehiiv's specialized infrastructure
- **Growth Tools**: Beehiiv's built-in growth features

### For Subscribers

- **Reliability**: Multiple delivery paths
- **Better Design**: Beehiiv's newsletter templates
- **Preference Management**: Advanced unsubscribe options
- **Mobile Optimization**: Better mobile experience

## Next Steps

1. **Monitor metrics** in both services
2. **A/B test** welcome emails
3. **Migrate newsletter campaigns** to Beehiiv
4. **Set up automations** in Beehiiv
5. **Configure premium subscriptions** (if needed)

## Cost Comparison

### Resend
- $20/month for 100k emails
- Focused on transactional emails
- Simple pricing model

### Beehiiv
- $39/month for 2,500 subscribers
- Focused on newsletters and growth
- Includes analytics, automations, monetization

### Recommendation
Use both services for their strengths:
- Beehiiv for newsletter marketing
- Resend for transactional emails
- Total: ~$60/month for full email infrastructure 