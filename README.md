# OpenQase

OpenQase is a curated collection of quantum computing business cases, with a cross-reference of the industries, algorithms, and personas that are most relevant to each. This GitHub repository features the underlying OpenQase CMS, but from scratch to serve the needs to the cross-referencing of these metadata relationships, and provided as open source for any teams looking to create their own such libraries. Note that the software is open source, but the case studies and other data are accessible via the website, the API, or (upcoming) MCP.

## Overview

OpenQase provides:
- **Case Studies**: Real-world quantum computing implementations and business impact
- **Algorithms**: Detailed explanations of quantum algorithms with implementation steps
- **Industries**: Industry-specific applications and use cases
- **Personas**: Role-based descriptions of relevant users

## Performance

**OpenQase v0.5.0 delivers the requisite "blazing-fast" performance:**
- **50-100ms page loads** (due to static renders)
- **76 static pages** pre-generated at build time
- **Zero runtime database calls** for public content
- **300x performance improvement** through hybrid architecture

## Architecture

OpenQase uses a **hybrid architecture** that combines:

- **📊 Static Generation** for public content (case studies, algorithms, personas, industries)
- **🔄 Dynamic Generation** for admin CMS and user management
- **🚀 Unified Content Fetching** system eliminates prior N+1 query processes
- **🛡️ Zero Breaking Changes** - all existing functionality preserved (touch wood)

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org) 15.x with App Router
- **Database**: [Supabase](https://supabase.com) for data and authentication
- **Newsletter**: [Beehiiv](https://beehiiv.com/) integration for professional newsletter management
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for consistent design
- **Content**: Unified content fetching system with relationship management
- **Styling**: Tailwind CSS for responsive design
- **Deployment**: Vercel with static generation

## Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/ddri/openqase.git
cd openqase
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
# Add your Supabase credentials and Beehiiv API key for newsletter
```

4. **Set up local database:**
```bash
# Option A: Use the setup script (recommended)
./scripts/setup-local.sh

# Option B: Manual setup
supabase start
supabase db reset
```

5. **Run the development server:**
```bash
npm run dev
```

6. **Set up admin access:**
```bash
npm run setup-admin
# Creates admin user for content management and soft delete features
```

7. **Build for production:**
```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📚 Documentation

### Core System
- **[Unified Content Fetching](./docs/unified-content-fetching.md)** - Complete API documentation
- **[Data Fetching](./docs/data-fetching.md)** - Updated patterns and best practices
- **[Quick Reference](./docs/v040-quick-reference.md)** - Developer quick start guide

### Additional Resources
- **[Release Notes](./docs/release-notes.md)** - Latest changes and improvements
- **[Migration Guide](./docs/data-fetching.md#migration-status)** - Upgrading from legacy patterns
- **[API Documentation](./docs/api-documentation.md)** - REST API reference
- **[Scripts Documentation](./docs/import-system.md)** - Import system, admin utilities, and development tools
- **[Email System](./docs/email-system.md)** - Dual email architecture with Beehiiv and Resend

## 🔧 Content Management

Content is managed through the professional OpenQase CMS with:

**📝 Content Types:**
- Case Studies (`/case-study/[slug]`) with featured content support
- Algorithms (`/paths/algorithm/[slug]`)
- Personas (`/paths/persona/[slug]`)
- Industries (`/paths/industry/[slug]`)
- Blog Posts (`/blog/[slug]`) with featured content support

**⚡ Unified API:**
```typescript
import { getStaticContentWithRelationships } from '@/lib/content-fetchers';

const algorithm = await getStaticContentWithRelationships('algorithms', 'quantum-phase-estimation');
```

**🔄 Admin Interface:**
- Real-time content editing at `/admin`
- **Professional soft delete system** - safely delete content with recovery options
- **Featured content management** - showcase important content on homepage
- Relationship management
- Publishing workflows
- User management

**🗑️ Soft Delete System:**
- Safe content deletion with recovery capability
- Admin-only delete operations with proper authentication
- Audit trail tracking who deleted what and when
- 30-day retention before permanent deletion

**⭐ Featured Content:**
- Mark case studies and blog posts as featured
- Automatic homepage integration
- Performance-optimized with database indexes

**📥 Import System:**
OpenQase includes a comprehensive case study import system for handling JSON exports:

```bash
# Import case studies from JSON files
tsx scripts/import-case-studies-with-mapping.ts /path/to/json/files --commit

# Available import utilities:
# - import-case-studies-with-mapping.ts: Main importer with entity mapping
# - batch-name-generator.ts: Generates batch names (QK-001, QK-002, etc.)
# - entity-mapping.json: Predefined mappings for algorithms/industries/personas
# - populate-entities.ts: Utility for seeding reference entities
```

The import system features:
- **Entity Mapping**: Intelligent matching of algorithms, industries, and personas
- **Batch Tracking**: Human-readable batch names for admin management
- **Duplicate Detection**: Prevents importing the same content twice
- **Comprehensive Reporting**: Detailed statistics and unmapped entity reports

## 📊 Performance Metrics

| Metric | Before v0.4.0 | After v0.5.0 | Improvement |
|--------|---------------|--------------|-------------|
| Page Load Time | 30+ seconds | 50-100ms | **300x faster** |
| Database Queries | 3-5 per page | 0 (static) | **100% reduction** |
| Build Time | 2-3 minutes | 45 seconds | **60% faster** |
| Static Pages | 0 | 76+ | **Full static generation** |

## 🚀 Deployment

**Development:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm run start
```

**Static Export:**
```bash
NEXT_STATIC_EXPORT=true npm run build
```

## 🤝 Contributing

1. **Read the documentation** - Start with the [Quick Reference](./docs/v040-quick-reference.md)
2. **Follow the patterns** - Use unified content fetching for public content
3. **Preserve admin functionality** - Keep dynamic patterns for admin features
4. **Test performance** - Ensure changes don't impact build times

## 📋 Project Structure

```
openqase/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── admin/             # Admin CMS (dynamic)
│   │   ├── api/               # API routes (dynamic)
│   │   ├── case-study/        # Case studies (static)
│   │   └── paths/             # Learning paths (static)
│   ├── components/            # Reusable React components
│   ├── lib/
│   │   ├── content-fetchers.ts # Unified content fetching system
│   │   └── supabase-server.ts # Database clients
│   └── types/                 # TypeScript definitions
├── docs/                      # Documentation
├── migrations/                # Database migrations
└── scripts/                   # Build and deployment scripts
    ├── import-case-studies-with-mapping.ts    # Main case study importer
    ├── batch-name-generator.ts               # Batch naming utility (QK-001, etc.)
    ├── entity-mapping.json                   # Entity mapping definitions
    ├── populate-entities.ts                  # Entity population utility
    ├── setup-admin.ts                        # Admin user setup
    ├── setup-local.sh                        # Local environment setup
    ├── get-schema.ts                          # Database schema extraction
    ├── enable-dev-mode.js                    # Development mode toggle
    ├── performance-monitor.ts                # Performance monitoring tools
    └── page-load-performance.js              # Page performance testing
```

## 🔄 Migration Status

**✅ v0.5.0 Complete:**
- Unified content fetching system
- Static generation for all major content types
- Hybrid architecture implementation
- Professional soft delete system
- Featured content functionality
- Newsletter integration
- Homepage redesign
- Security hardening
- 301 redirect management

**🔄 Next Phases:**

### 🚀 Feature Development (High Impact)
- Search functionality enhancement (basic implementation complete)

### 🛠️ Technical Debt & Infrastructure
- **Advanced Caching with Redis** - Upgrade from in-memory rate limiting to Redis-based caching and session storage

### 📚 Documentation & Developer Experience  
- **Authentication Documentation** - Document Supabase Auth patterns, RLS policies, and admin setup
- **Troubleshooting Guide** - Common development issues and solutions (Supabase connection, build errors, etc.)
- **Environment Variables Guide** - Comprehensive documentation of all environment variables
- **Deployment Guide Expansion** - Document different deployment scenarios beyond Vercel

### 📈 Growth & Scaling (Future)
- **Enhanced Search System** - Upgrade to Supabase full-text search when content scales beyond current client-side search capabilities
  - *Current Status*: Client-side search works well for current content volume (~25 case studies, ~12 algorithms)
  - *Triggers for Implementation*: >50 case studies, user feedback about search quality, need to search inside content body
  - *Technical Approach*: PostgreSQL full-text search with `to_tsvector()` and `plainto_tsquery()` for better relevance, typo tolerance, and content body searching
- **Type Safety & Testing Infrastructure** - Comprehensive improvements for development robustness
  - *Type Safety*: Remove `as any` casts, add proper TypeScript generics for dynamic queries, improve Supabase type safety
  - *Testing Framework*: Add Jest/Vitest with unit tests, integration tests, and component testing  
  - *Implementation Trigger*: When adding multiple contributors or before major refactoring efforts
  - *Effort*: High (1-2 weeks) - better suited for dedicated development cycles
- **Multi-admin Support** - Add proper user roles and permissions when scaling beyond single admin
- **Performance Monitoring Dashboard** - Build on existing performance tools for better insights
- **API Rate Limiting Improvements** - Scale rate limiting for production multi-server deployments

## Support

- **Documentation**: Comprehensive guides in `/docs/`
- **Issues**: GitHub Issues for bug reports and feature requests
- **Performance**: Build logs and performance monitoring included

---



## Planned updates in upcoming releases

**OpenQase v0.5.0** - Delivering quantum computing insights at quantum speed 

**Note:** The following major version updates are available but require careful testing due to potential breaking changes:

- **Tailwind CSS**: 3.4.17 → 4.1.11 (major CSS framework redesign)
- **Zod**: 3.25.63 → 4.0.14 (validation library with breaking changes)
- **Sentry**: 9.39.0 → 10.0.0 (monitoring service updates)
- **Node.js Types**: 20.x → 24.x (latest Node.js support)

These updates should be planned for a dedicated maintenance window with thorough testing.
