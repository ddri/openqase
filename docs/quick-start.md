# OpenQase Quick Start Guide

## Overview

OpenQase is a Next.js-based educational platform for quantum computing, using Supabase for authentication and data management. This guide will help you get started with development.

## Prerequisites

1. **Node.js and npm**
   - Node.js 18.x or later
   - npm 9.x or later

2. **Supabase Account**
   - Create an account at [Supabase](https://supabase.com)
   - Create a new project
   - Keep your project URL and anon key handy

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd openqase
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy example env file
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **View Documentation**
   - `docs/content-management.md` - Content creation guide
   - `docs/architecture-and-recommendations.md` - Technical details
   - `docs/quick-start.md` - This guide

## Directory Structure

```
openqase/
├── content/           # MDX content files
│   ├── algorithm/    # Quantum algorithms
│   ├── case-study/   # Implementation examples
│   ├── industry/     # Industry applications
│   └── persona/      # Role-based learning paths
├── src/
│   ├── app/         # Next.js app router pages
│   │   ├── auth/    # Authentication pages
│   │   └── paths/   # Content type routes
│   ├── components/  # React components
│   │   ├── ui/     # Base UI components
│   │   └── auth/   # Auth components
│   └── lib/        # Utilities and types
└── docs/           # Documentation
```

## Authentication Setup

1. **Configure Auth Providers**
   - Go to your Supabase project dashboard
   - Navigate to Authentication > Providers
   - Enable Email/Password provider
   - (Optional) Configure additional providers

2. **Test Authentication**
   - Visit `http://localhost:3000/auth`
   - Try signing up with email/password
   - Verify redirect behavior

## Common Tasks

### 1. Creating New Content

1. Choose content type (algorithm/case-study/industry/persona)
2. Create MDX file in appropriate directory
3. Add required frontmatter (see templates in content-management.md)
4. Write content using markdown and custom components
5. Test locally

### 2. Protected Routes

The following routes require authentication:
- `/paths/*` - Learning paths
- `/case-study/*` - Case studies
- `/quantum-stack/*` - Quantum stack
- `/profile` - User profile

To add new protected routes:
1. Add route to `protectedRoutes` in `src/middleware.ts`
2. Wrap component with `AuthGate`
3. Add appropriate warning messages

### 3. Development Workflow

1. Make code changes
2. Run development server
3. Test with sample content
4. Test authentication flows
5. Build and verify

## Key Files

- `src/middleware.ts` - Auth middleware and route protection
- `src/components/auth/AuthGate.tsx` - Auth protection component
- `src/lib/mdx.ts` - MDX processing and content loading
- `src/lib/types.ts` - TypeScript definitions

## Content Creation Examples

1. **Create Algorithm Content**
   ```mdx
   ---
   title: "New Algorithm"
   type: "algorithm"
   slug: "new-algorithm"
   description: "Description here"
   keyApplications: ["optimization"]
   prerequisites: ["linear-algebra"]
   keywords: ["quantum", "optimization"]
   lastUpdated: "2024-02-23"
   ---

   # Algorithm Content
   Content here...
   ```

2. **Create Persona Content**
   ```mdx
   ---
   title: "New Persona"
   type: "persona"
   slug: "new-persona"
   description: "Description here"
   role: "Role Name"
   expertise: ["skill1", "skill2"]
   keywords: ["keyword1", "keyword2"]
   lastUpdated: "2024-02-23"
   ---

   # Persona Content
   Content here...
   ```

3. **Test Locally**
   ```bash
   npm run dev
   ```

## Build Process

1. **Build Site**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm run start
   ```

## Troubleshooting

### Common Issues

1. **Authentication Issues**
   - Check Supabase credentials in `.env.local`
   - Verify Supabase project configuration
   - Clear browser cookies and try again
   - Check browser console for errors

2. **Build Errors**
   - Check required frontmatter fields
   - Verify MDX syntax
   - Ensure proper TypeScript types
   - Check for proper date format

3. **Development Server Issues**
   - Clear `.next` directory
   - Restart development server
   - Check for syntax errors
   - Verify environment variables

### Need Help?

- Check the documentation in `/docs`
- Review content examples in `/content`
- Examine component implementations in `/src/components`
- Verify types in `src/lib/types.ts`

## Best Practices

1. **Authentication**
   - Always use `AuthGate` for protected content
   - Test both authenticated and unauthenticated states
   - Handle loading and error states
   - Use proper TypeScript types

2. **Content Creation**
   - Follow templates exactly
   - Keep content focused
   - Use appropriate keywords
   - Update lastUpdated date
   - Use custom components where appropriate

3. **Development**
   - Test changes locally
   - Follow TypeScript types
   - Use existing components
   - Follow accessibility guidelines
   - Keep code DRY

4. **Deployment**
   - Build and test locally
   - Verify all routes work
   - Test authentication flows
   - Check content rendering
   - Monitor performance

## Last Updated: 2024-03