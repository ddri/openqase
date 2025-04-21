# Admin Setup Guide

This guide explains how to set up an admin user and enable development mode for local testing.

## Setting Up the Admin User

The system is configured to use `davedri@gmail.com` as the admin user. There are two ways to set up this user:

### Option 1: For Local Development (Recommended)

If you're running a local Supabase instance:

1. Make sure your local Supabase instance is running
2. Connect to your local Supabase database using a SQL client or the Supabase Studio
3. Run the SQL script provided in `scripts/local-admin-setup.sql`

This script will:
- Check if the user exists
- Set the user's role to 'admin' in the user_preferences table
- Provide instructions for creating the user if it doesn't exist

### Option 2: Using the Setup Script

For cloud-hosted Supabase instances:

1. Make sure you have a `.env.local` file in the project root with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ADMIN_PASSWORD=your_admin_password
   ```

2. Run the admin setup script:
   ```bash
   npx ts-node scripts/setup-admin.ts
   ```

3. This script will:
   - Sign in as `davedri@gmail.com` using the provided password
   - Set the user's role to 'admin' in the user_preferences table
   - Provide confirmation when the setup is complete

## Enabling Development Mode

For local development, you can bypass authentication checks to make testing easier:

### Quick Setup (Recommended)

Run the provided script to automatically enable development mode:

```bash
node scripts/enable-dev-mode.js
```

This script will:
1. Create or update your `.env.local` file
2. Set `NEXT_PUBLIC_DEV_MODE=true`
3. Ensure other required environment variables are present

After running the script, restart your development server to apply the changes.

### Manual Setup

If you prefer to set up development mode manually:

1. In your `.env.local` file, add:
   ```
   NEXT_PUBLIC_DEV_MODE=true
   ```

2. Make sure your `NODE_ENV` is set to "development" (this is the default when running with `npm run dev`).

3. With these settings, the middleware will bypass authentication checks when:
   - The application is running in development mode
   - NEXT_PUBLIC_DEV_MODE is set to "true"
   - The hostname is "localhost"

## Troubleshooting

If you're having issues with admin access:

1. Check that the user exists in Supabase with the email `davedri@gmail.com`
2. Verify that the user has an entry in the `user_preferences` table with `role='admin'`
3. Make sure your Supabase credentials in `.env.local` are correct
4. If using development mode, ensure both `NODE_ENV="development"` and `NEXT_PUBLIC_DEV_MODE=true` are set

## Security Notes

- Development mode should NEVER be enabled in production environments
- The admin setup script should only be run in development or during initial production setup
- Always use strong passwords for admin accounts