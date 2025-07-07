# OpenQase Deployment Guide

This guide explains how to deploy OpenQase to production environments.

## Environment Variables Required

### Core Application
```bash
# Public URLs
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Supabase
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Email Service (Resend)
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@your-domain.com

# Analytics (Optional)
VERCEL_ANALYTICS_ID=your-vercel-analytics-id

# Error Monitoring (Sentry - Optional)
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

### Admin Setup
After deployment, you'll need to:

1. Create an admin user in your Supabase Auth dashboard
2. Update the admin email in `/scripts/setup-admin.ts`
3. Run the admin setup script to grant admin privileges

### Database Setup

1. Apply all migrations in the `/migrations` folder to your production database
2. Ensure RLS (Row Level Security) policies are properly configured
3. Set up your content tables (algorithms, case_studies, blog_posts, etc.)

### Email Configuration

OpenQase uses Resend for email delivery. Configure:
- Newsletter subscription confirmations  
- Admin notifications
- System alerts

### Security Considerations

- Never commit actual environment values to git
- Use secure, randomly generated keys for production
- Enable all Supabase security features
- Configure proper CORS settings
- Set up SSL/TLS certificates

### Deployment Platforms

#### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### Other Platforms
Ensure Node.js 18+ support and configure environment variables accordingly.

## Local Development

1. Copy `.env.example` to `.env.local`
2. Fill in your local Supabase credentials
3. Run `npm run dev`

## Content Management

- Admin users can manage content via `/admin` routes
- Content is stored in Supabase database
- Images and files can be stored in Supabase Storage

## Monitoring

- Vercel Analytics for page views and performance
- Sentry for error tracking and monitoring
- Custom newsletter signup tracking 