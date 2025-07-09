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

4. **Run the development server:**
```bash
npm run dev
```

5. **Build for production:**
```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📚 Documentation

### Core System
- **[Unified Content Fetching](./docs/docs/unified-content-fetching.md)** - Complete API documentation
- **[Hybrid Architecture](./docs/docs/v040-hybrid-architecture.md)** - Architecture decisions and implementation
- **[Data Fetching](./docs/docs/data-fetching.md)** - Updated patterns and best practices
- **[Quick Reference](./docs/docs/v040-quick-reference.md)** - Developer quick start guide

### Additional Resources
- **[Release Notes](./docs/docs/release-notes.md)** - Latest changes and improvements
- **[Migration Guide](./docs/docs/data-fetching.md#migration-status)** - Upgrading from legacy patterns
- **[API Documentation](./docs/docs/api-documentation.md)** - REST API reference
- **[Email Preferences System](./docs/docs/email-preferences-system.md)** - Newsletter management following Resend best practices

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
