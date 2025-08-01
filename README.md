# OpenQase

OpenQase is a high-performance quantum computing business case platform featuring real-world implementations, quantum algorithms, and industry-specific resources. Built with a hybrid architecture for maximum performance and functionality.

## Overview

OpenQase provides:
- **Case Studies**: Real-world quantum computing implementations and business impact
- **Algorithms**: Detailed explanations of quantum algorithms with implementation steps
- **Industries**: Industry-specific applications and use cases
- **Personas**: Role-based learning paths and resources

## ⚡ Performance

**OpenQase v0.4.0 delivers blazing-fast performance:**
- **50-100ms page loads** (vs 30+ seconds previously)
- **76 static pages** pre-generated at build time
- **Zero runtime database calls** for public content
- **300x performance improvement** through hybrid architecture

## 🏗️ Architecture

OpenQase uses a **hybrid architecture** that combines:

- **📊 Static Generation** for public content (case studies, algorithms, personas, industries)
- **🔄 Dynamic Generation** for admin CMS and user management
- **🚀 Unified Content Fetching** system eliminates N+1 query problems
- **🛡️ Zero Breaking Changes** - all existing functionality preserved

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org) 14.x with App Router
- **Database**: [Supabase](https://supabase.com) for data and authentication
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for consistent design
- **Content**: Unified content fetching system with relationship management
- **Styling**: Tailwind CSS for responsive design
- **Deployment**: Vercel with static generation

## Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/openqase.git
cd openqase
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
# Add your Supabase credentials
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

6. **Build for production:**
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

Content is managed through a modern CMS with:

**📝 Content Types:**
- Case Studies (`/case-study/[slug]`)
- Algorithms (`/paths/algorithm/[slug]`)
- Personas (`/paths/persona/[slug]`)
- Industries (`/paths/industry/[slug]`)

**⚡ Unified API:**
```typescript
import { getStaticContentWithRelationships } from '@/lib/content-fetchers';

const algorithm = await getStaticContentWithRelationships('algorithms', 'quantum-phase-estimation');
```

**🔄 Admin Interface:**
- Real-time content editing at `/admin`
- Relationship management
- Publishing workflows
- User management

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

| Metric | Before v0.4.0 | After v0.4.0 | Improvement |
|--------|---------------|--------------|-------------|
| Page Load Time | 30+ seconds | 50-100ms | **300x faster** |
| Database Queries | 3-5 per page | 0 (static) | **100% reduction** |
| Build Time | 2-3 minutes | 45 seconds | **60% faster** |
| Static Pages | 0 | 76 | **Full static generation** |

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

1. **Read the documentation** - Start with the [Quick Reference](./docs/docs/v040-quick-reference.md)
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

**✅ v0.4.0 Complete:**
- Unified content fetching system
- Static generation for all major content types
- Hybrid architecture implementation
- 300x performance improvement

**🔄 Next Phases:**
- Blog posts migration
- Advanced caching implementation
- Search functionality enhancement

## 📞 Support

- **Documentation**: Comprehensive guides in `/docs/docs/`
- **Issues**: GitHub Issues for bug reports and feature requests
- **Performance**: Build logs and performance monitoring included

---

**OpenQase v0.4.0** - Delivering quantum computing insights at quantum speed ⚡
