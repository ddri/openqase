# Getting Started with OpenQase

Welcome to OpenQase! This guide will help you get up and running quickly.

---

## Quick Start

### 1. Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **Docker** installed (required by Supabase CLI)
- **Git** for version control
- A code editor (VS Code recommended)

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/openqase/openqase.git
cd openqase

# Install dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# Get these from: Supabase Dashboard → Settings → API
```

**Required environment variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

See [Environment Variables Guide](../environment-variables.md) for complete reference.

### 4. Database Setup

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Start local Supabase instance
supabase start

# Link to your production project (optional)
supabase link --project-ref <your-project-ref>

# Pull schema from production (optional)
supabase db pull
```

### 5. Run Development Server

```bash
# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

---

## Next Steps

### Learn the Basics

1. **Explore the Documentation**
   - [Installation Guide](../installation.md) - Complete setup details
   - [Environment Variables](../environment-variables.md) - All configuration options
   - [Contributing Guide](../../CONTRIBUTING.md) - How to contribute

2. **Understand the Architecture**
   - [App Structure](../app-structure.md) - How the app is organized
   - [Tech Stack](../tech-stack.md) - Technologies used
   - [API Architecture](../api-architecture.md) - API patterns

3. **Start Building**
   - [API Reference](../api-reference.md) - All endpoints
   - [Component Library](../component-library.md) - UI components
   - [Admin CMS Guide](../admin-cms-guide.md) - Content management

### Common Tasks

**View the Site Locally**
```bash
npm run dev
# Open http://localhost:3000
```

**Access Admin Panel**
```bash
# First, set up an admin user
npm run setup-admin
# Then visit http://localhost:3000/admin
```

**Build for Production**
```bash
npm run build
npm run start
```

**Sync Database**
```bash
# Pull latest schema from production
supabase db pull

# Push migrations to production
supabase db push
```

---

## Troubleshooting

### Common Issues

**Issue:** Supabase connection errors
**Solution:** Check `.env.local` has correct credentials. Run `supabase start` to ensure local instance is running.

**Issue:** "Module not found" errors
**Solution:** Run `npm install` to ensure all dependencies are installed.

**Issue:** Build failures
**Solution:** Run `npm run build` to see TypeScript errors. Fix any type issues.

**Issue:** Admin panel shows 404
**Solution:** Ensure you've run `npm run setup-admin` to create an admin user.

See [Troubleshooting Guide](../troubleshooting.md) for more help (coming soon).

---

## Project Structure Overview

```
openqase/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── admin/          # Admin CMS (dynamic)
│   │   ├── api/            # API routes
│   │   ├── case-study/     # Case studies (static)
│   │   └── paths/          # Learning paths (static)
│   ├── components/         # React components
│   ├── lib/                # Utilities and configs
│   └── types/              # TypeScript types
├── docs/                   # Documentation
├── scripts/                # Build and admin scripts
└── supabase/              # Database config
```

---

## Key Concepts

### Hybrid Architecture

OpenQase uses a hybrid approach:
- **Static pages** for public content (fast, SEO-friendly)
- **Dynamic pages** for admin and user features

### Content Types

- **Case Studies** - Real-world quantum implementations
- **Algorithms** - Quantum algorithm explanations
- **Industries** - Industry-specific applications
- **Personas** - Role-based user profiles

### Relationships

Content is cross-referenced through junction tables:
- Case studies link to algorithms, industries, personas
- Enables rich discovery and filtering

---

## Learning Resources

- **[API Reference](../api-reference.md)** - Complete API docs
- **[Project Plan](../openqase-project-plan.md)** - Vision and roadmap
- **[Contributing](../../CONTRIBUTING.md)** - How to contribute
- **[GitHub Issues](https://github.com/openqase/openqase/issues)** - Bugs and features

---

## Need Help?

- **Documentation Issues?** Open a [GitHub issue](https://github.com/openqase/openqase/issues)
- **Questions?** Check existing [issues](https://github.com/openqase/openqase/issues) first
- **Want to contribute?** Read the [Contributing Guide](../../CONTRIBUTING.md)

---

**Welcome to the team!** 🚀
