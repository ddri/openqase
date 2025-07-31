# Installation & Local Development

Complete guide to setting up OpenQase locally for development.

## Prerequisites

- [Node.js](https://nodejs.org/) (Version >= 18.0)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (recommended)
- [Docker](https://www.docker.com/) (required for local Supabase)

## Quick Start

```bash
# 1. Clone and install
git clone <repository-url>
cd openqase
npm install

# 2. Set up local Supabase
supabase start

# 3. Configure environment
cp .env.local.example .env.local
# Add your Supabase credentials (see below)

# 4. Run the application
npm run dev
```

## Detailed Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd openqase
npm install
```

### 2. Supabase Local Development

OpenQase uses Supabase for database and authentication. For local development, run a local Supabase instance:

```bash
# Start local Supabase services
supabase start
```

This starts the local Supabase stack using Docker, including:
- Database (PostgreSQL)
- Authentication
- Storage
- API Gateway

Get your local credentials:
```bash
supabase status
```

Output will look like:
```
     API URL: http://localhost:54321
   GraphQL URL: http://localhost:54321/graphql/v1
      DB URL: postgresql://postgres:postgres@localhost:54322/postgres
  Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
  JWT secret: your-local-jwt-secret
    anon key: your-local-anon-key
service_role key: your-local-service-role-key
```

### 3. Environment Configuration

Create your local environment file:

```bash
cp .env.local.example .env.local
```

Configure with your local Supabase credentials:

```bash
# .env.local

# Supabase Configuration (from 'supabase status')
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-local-service-role-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Service (Optional for local development)
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@localhost

# Admin Setup (Optional)
ADMIN_EMAIL=admin@localhost
ADMIN_PASSWORD=your-secure-password
```

**Important**: Never commit `.env.local` to version control.

### 4. Database Setup

The local Supabase instance automatically applies migrations from `supabase/migrations/`.

To reset the database (clean slate):
```bash
supabase db reset
```

To create a new migration:
```bash
supabase migration new migration_name
```

### 5. Run the Application

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 6. Admin Setup (Optional)

To create an admin user for content management:

```bash
npm run setup-admin
```

This creates an admin user and grants necessary permissions.

## Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
supabase start          # Start local Supabase
supabase stop           # Stop local Supabase
supabase db reset       # Reset local database

# Admin
npm run setup-admin     # Create admin user
npm run enable-dev-mode # Enable development features

# Performance
npm run test-performance # Run performance tests

# Import System
tsx scripts/import-case-studies-with-mapping.ts <directory> # Import case studies
```

## Development Workflow

1. **Start Supabase**: `supabase start`
2. **Start Next.js**: `npm run dev`
3. **Access admin**: Visit `/admin` (requires admin setup)
4. **View database**: Supabase Studio at `http://localhost:54323`

## Troubleshooting

### Common Issues

**Port conflicts**: If ports are in use, stop other services or configure different ports
**Docker issues**: Ensure Docker is running before `supabase start`
**Migration errors**: Run `supabase db reset` to start fresh
**Environment variables**: Verify all required variables are set in `.env.local`

### Getting Help

- Check the [API Documentation](./api-documentation.md)
- Review [Import System](./import-system.md) for data import
- See [Scripts Documentation](./import-system.md) for available utilities

## Next Steps

- Visit [http://localhost:3000](http://localhost:3000) to see the application
- Access admin interface at [http://localhost:3000/admin](http://localhost:3000/admin)
- View database at [http://localhost:54323](http://localhost:54323) (Supabase Studio)
- Read the [API Documentation](./api-documentation.md) for development patterns