# Environment Variables Setup Guide

This guide explains how to manage environment variables between local development and production deployment.

## 🏗️ File Structure Overview

```
openqase/
├── .env.local          # Local development (git-ignored)
├── .env.production     # Production values (git-ignored, for reference)
├── .env.example        # Template file (committed to git)
└── ENV_SETUP_GUIDE.md  # This guide
```

## 🔧 Local Development Setup

### 1. Using Supabase Local Instance (Recommended)

Your current `.env.local` is perfect for local development:

```bash
# Local Supabase (via supabase start)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Local app URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Development mode
NODE_ENV=development
```

**Benefits:**
- ✅ Fast development with local data
- ✅ No API rate limits
- ✅ Safe to experiment without affecting production
- ✅ Works offline

### 2. Using Production Data Locally (For Testing)

Create `.env.local.production` when you need to test with live data:

```bash
# Production Supabase (use sparingly)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

**When to use:**
- 🔍 Testing with production data
- 🐛 Debugging production-specific issues
- 📊 Content review before launch

## 🚀 Production Deployment (Vercel)

### Required Environment Variables

Add these to your Vercel project settings:

```bash
# === CRITICAL (App won't work without these) ===
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key

# === IMPORTANT ===
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
RESEND_API_KEY=your-resend-api-key

# === OPTIONAL ===
VERCEL_ANALYTICS_ID=your-analytics-id
SENTRY_DSN=your-sentry-dsn
```

### How to Get Production Values

1. **Supabase Variables:**
   - Go to [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your OpenQase project
   - Settings → API
   - Copy: Project URL, anon key, service_role key

2. **Resend API Key:**
   - Go to [resend.com](https://resend.com)
   - API Keys section
   - Create new key for OpenQase

## 📋 Quick Setup Commands

### Switch to Local Development
```bash
# Make sure Supabase is running locally
supabase start

# Use your existing .env.local (already set up correctly)
npm run dev
```

### Switch to Production Testing
```bash
# Copy production values to test file
cp .env.local .env.local.backup
cp .env.local.production .env.local  # (after creating this file)

# Test with production data
npm run dev

# Switch back to local
cp .env.local.backup .env.local
```

### Deploy to Vercel
```bash
# Add environment variables in Vercel dashboard
# Settings → Environment Variables

# Deploy
git push origin develop
```

## 🔍 Troubleshooting

### "Loading case studies..." stuck?
- ❌ Missing Supabase environment variables on Vercel
- ❌ Wrong Supabase URL (using localhost in production)
- ❌ Invalid API keys

### Check your current environment:
```bash
# In your app, add this to debug:
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
```

### Local development not working?
```bash
# Restart Supabase
supabase stop
supabase start

# Check status
supabase status
```

## 🎯 Best Practices

### ✅ DO:
- Keep `.env.local` for local development only
- Use Vercel dashboard for production variables
- Test production deployment with staging environment
- Keep a backup of working local environment

### ❌ DON'T:
- Commit real API keys to git
- Use production database for local development
- Mix local and production URLs in same environment
- Share environment files between team members

## 🔄 Environment Switching Script

Create a simple script to switch environments:

```bash
# scripts/switch-env.sh
#!/bin/bash

if [ "$1" = "local" ]; then
    cp .env.local.backup .env.local
    echo "Switched to LOCAL environment"
elif [ "$1" = "production" ]; then
    cp .env.local .env.local.backup
    cp .env.local.production .env.local
    echo "Switched to PRODUCTION environment"
else
    echo "Usage: ./scripts/switch-env.sh [local|production]"
fi
```

## 📚 Summary

- **Local Development:** Use `.env.local` with Supabase local instance
- **Production Deployment:** Set variables in Vercel dashboard
- **Testing:** Create `.env.local.production` for production data testing
- **Never commit:** Real API keys or production URLs to git 