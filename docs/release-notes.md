# Release Notes

## v0.5.0 - Content Management Revolution & Security Hardening (Current)

**🚀 Major Release with Soft Delete System, Featured Content, Newsletter Integration, and Critical Security Fixes**

### 🎯 Highlights
- **Complete Soft Delete System** across all content types with recovery capabilities
- **Featured Content System** for homepage curation
- **Newsletter Integration** with Beehiiv for professional email management
- **Critical Security Fixes** preventing unpublished content exposure
- **Homepage Redesign** with modern magazine-style layout
- **Relationship Data Fix** for proper content connections

### 🔐 Security Fixes
- **Fixed Critical Vulnerability**: Unpublished content could be accessed via public API endpoints
  - Removed `includeUnpublished` parameter from all public GET endpoints
  - Hardcoded published-only filtering to prevent draft content exposure
  - Protects partner companies from premature case study exposure
- **Removed Dead Code**: Deleted unused `/api/revalidate` endpoint that lacked authentication
  - Eliminated potential DoS attack vector
  - All revalidation now happens securely through Server Actions

### ✨ New Features

**Soft Delete System:**
- Professional content deletion with recovery capabilities
- `deleted_at` and `deleted_by` columns added to all content tables
- Secure database functions with SQL injection protection
- Admin-only delete endpoints with proper authorization
- Recovery system for accidentally deleted content

**Featured Content:**
- Homepage displays up to 2 featured case studies
- Admin interface for selecting featured content
- Performance indexes for optimized queries
- Graceful fallback when no featured content selected

**Newsletter Integration:**
- Beehiiv API integration for professional newsletter management
- Form validation with loading states and error handling
- Rate limiting to prevent spam
- Prominent sidebar placement on homepage

### 🎨 Design Improvements

**Homepage Redesign:**
- Clean, magazine-style layout with organized content sections
- Removed redundant "Latest Addition" section
- Added partner company badges to case study cards
- Improved visual hierarchy and mobile responsiveness
- Consistent hover states across all interactive elements

### 🐛 Bug Fixes

**Bidirectional Junction Table Handling:**
- Fixed critical bug where relationship data showed "None" on content pages
- Implemented context-aware filtering for all junction tables
- Properly handles Industries, Algorithms, and Personas relationships
- Fixed duplicate filtering that was destroying relationship data

**Content Filtering:**
- Resolved build failures from unpublished content in relationships
- JavaScript runtime filtering handles mixed published/unpublished content
- Static site generation only builds pages for published content
- Page components now resilient to null relationships

### 🔧 Technical Improvements

**Database Architecture:**
- Added soft delete columns with proper indexes
- Implemented secure database functions with SECURITY DEFINER
- Transaction safety for all schema modifications
- Performance indexes for featured content queries

**Security Hardening:**
- Removed localhost authentication bypasses from middleware
- Proper admin role verification for all content operations
- Secured all API endpoints with appropriate authentication
- Input validation and SQL injection protection

### 📝 Documentation

**CLAUDE.md Guidelines:**
- Added bidirectional junction table documentation
- Documented security considerations and accepted risks
- Updated commit and CHANGELOG maintenance practices

**Security Audit:**
- Comprehensive security audit documented in SECURITY-AUDIT-2025-01.md
- Identified and fixed critical vulnerabilities
- Documented accepted risks with justifications
- Created roadmap for future security improvements

### ⚠️ Known Issues & Accepted Risks

**Accepted for Beta:**
- XSS in markdown rendering (single admin author mitigates risk)
- CSRF protection not implemented (single admin, low value target)
- Rate limiting broken on Vercel serverless (Beehiiv provides backup)
- CSP allows unsafe-inline (required for third-party services)

**Future Improvements:**
- Implement Redis/Vercel KV for distributed rate limiting
- Add CSRF tokens or migrate to Server Actions
- Tighten CSP if removing third-party services

---

## v0.4.1 - Enhanced Stability & Documentation Updates

**🔧 Maintenance & Improvements**

### 🎯 Key Updates
- **📦 Dependency Updates**: Minor/patch version updates for Next.js 15.x, React 19.x, TypeScript 5.9
- **🛡️ Security**: Removed Docusaurus dependencies, eliminating 16 security vulnerabilities  
- **🔧 Auth Migration**: Completed migration from deprecated `@supabase/auth-helpers-nextjs` to `@supabase/ssr`
- **🔍 Code Quality**: Re-enabled ESLint during builds with improved rule configuration
- **📚 Documentation**: Updated and corrected installation guides and tech stack references
- **⚡ Performance**: Optimized TypeScript interfaces for admin relationship components

### 🐛 Bug Fixes
- Fixed `.env.example` file references in installation documentation
- Corrected outdated TanStack Query references (dependency was removed)
- Updated version numbers and roadmap status

### 🔧 Technical Details

**Supabase Auth Migration Completed**
- **Issue**: Build warnings from deprecated `@supabase/auth-helpers-nextjs@0.10.0` and `@supabase/auth-helpers-shared`
- **Solution**: Migrated to unified `@supabase/ssr@0.6.1` package for Next.js 15 compatibility
- **Impact**: Eliminated deprecation warnings, improved build performance, future-proofed auth system
- **Breaking Changes**: None - migration was type-level only in `src/lib/cookies.ts`
- **Why This Matters**: Supabase deprecated auth-helpers in favor of unified SSR package supporting all SSR frameworks. The new package provides better middleware support and cleaner API for server-side auth handling.

---

## v0.4.0 - Hybrid Architecture & Unified Content Fetching

**🚀 Major Performance Overhaul**

OpenQase v0.4.0 introduces a revolutionary hybrid architecture that delivers 300x faster page loads while maintaining full CMS capabilities.

### 🎯 Key Achievements

- **⚡ 300x Performance Improvement**: Page loads reduced from 30+ seconds to 50-100ms
- **🔄 Unified Content Fetching**: Single API for all content types eliminates N+1 query problems  
- **🏗️ Hybrid Architecture**: Static generation for public content, dynamic for admin functionality
- **📊 76 Static Pages**: Case studies, algorithms, personas, and industries now pre-generated
- **🛠️ Zero Breaking Changes**: All existing admin workflows preserved

### 🔧 Technical Implementation

**New Unified Content Fetching System:**
- `getStaticContentWithRelationships()` - Single query with all relationships
- `getStaticContentList()` - Optimized listing page data
- `generateStaticParamsForContentType()` - Build-time static parameter generation
- `getBuildTimeContentList()` - Service role client for build-time safety

**Migrated Content Types:**
- ✅ Case Studies (`/case-study/[slug]`) - 21 pages
- ✅ Algorithms (`/paths/algorithm/[slug]`) - 21 pages  
- ✅ Personas (`/paths/persona/[slug]`) - 15 pages
- ✅ Industries (`/paths/industry/[slug]`) - 19 pages

### 🔐 Security & Authentication Enhancements

**Enhanced Authentication Security:**
- **Replaced client-side `getSession()` with server-validated `getUser()`** eliminating security warnings
- **Improved auth validation** across all protected routes and middleware
- **Enhanced security posture** with proper server-side authentication checks

### 🎨 Design & User Experience Improvements

**About Page Redesign:**
- **Converted to single-column layout** for improved readability and mobile experience
- **Integrated sidebar content inline** creating a natural content flow:
  - Our Team section now flows naturally after Vision
  - Community engagement section enhanced with gradient background and dual CTAs
  - Enhanced "Get Involved" section with three distinct action paths
- **Added visual elements** including icons, cards with hover effects, and better typography hierarchy
- **Improved content organization** with better section spacing and visual callouts
- **Enhanced mobile responsiveness** with optimized layouts for all screen sizes

**Contact Us Page Improvements:**
- **Simplified to single-column layout** for better focus and usability
- **Improved mobile experience** with full-width form and better touch targets
- **Enhanced content hierarchy** with logical flow from contact form to community links to FAQ
- **Consistent design language** matching the About page improvements

### 🎯 Branding & Identity

**Custom Favicon Implementation:**
- **Replaced default Vercel favicon** with custom OpenQase branding
- **Created scalable SVG favicon** based on the distinctive OpenQase "Q" logo design
- **Optimized for all device types** including browser tabs, bookmarks, and mobile home screens
- **Improved brand recognition** across all touchpoints

### 📱 Mobile Experience Enhancements

**Enhanced Mobile Usability:**
- **Single-column layouts** eliminate horizontal scrolling and cramped interfaces
- **Improved touch targets** and form interactions on mobile devices
- **Better content prioritization** with mobile-first information hierarchy
- **Consistent spacing and typography** across all screen sizes
- **Faster mobile performance** with static generation

### 🛠 Admin & Content Management

**Database Operations Optimization:**
- **Implemented batch database operations** for improved performance in admin interfaces
- **Enhanced case study management** with optimized save operations and better error handling
- **Improved admin workflow efficiency** with streamlined database interactions

**Content Management Improvements:**
- **Unified content fetching patterns** across all content types
- **Enhanced relationship management** between personas, industries, and algorithms
- **Improved admin interface reliability** with better error handling and user feedback

### 📈 Performance Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Page Load Time | 30+ seconds | 50-100ms | **300x faster** |
| Database Queries | 3-5 per page | 0 (static) | **100% reduction** |
| Time to First Byte | 25+ seconds | 50ms | **500x faster** |
| Build Time | 2-3 minutes | 45 seconds | **60% faster** |

### 🏛️ Architecture Benefits

**Public Content (Static Generation):**
- Pre-built at deployment time
- Served as static files from CDN
- Perfect Lighthouse scores
- Zero runtime database calls

**Admin Content (Dynamic Generation):**
- Real-time server-side rendering
- Full database access for content management
- Interactive features with immediate updates
- Preserved API routes for external integrations

### 🔄 Migration Status

**✅ Phase 1 Complete:**
- Unified content fetching system implemented
- All major content types migrated to static generation
- ISR revalidation removed for pure static generation
- Build-time relationship fetching optimized

**🔄 Next Phases:**
- Blog posts migration
- Advanced caching implementation
- Search functionality enhancement

### 📚 Documentation

- **[Unified Content Fetching](./unified-content-fetching.md)** - Comprehensive API documentation
- **[Hybrid Architecture](./v040-hybrid-architecture.md)** - Architecture decisions and implementation
- **[Data Fetching](./data-fetching.md)** - Updated patterns and best practices

### 🛠️ Breaking Changes

**None** - All existing functionality preserved with enhanced performance.

### 🐛 Bug Fixes

- Fixed N+1 query problems across all content types
- Resolved ISR revalidation performance issues
- Eliminated cookies context errors during build-time generation
- Fixed relationship fetching inconsistencies
- **Fixed case studies list page timeout issues**
- **Resolved logo visibility in Graphite theme**
- **Fixed service role client Promise handling**
- **Improved persona industry relationship debugging**
- **Enhanced search functionality for case studies**

### ⚠️ Known Issues

- **Admin Dropdown Transparency (Dark Mode)**: Dropdown menus in admin Classifications section have transparent backgrounds in dark mode, making options difficult to read. Workaround: Temporarily switch to light mode for admin tasks or highlight options with keyboard navigation. Fix planned for v0.4.1.

---

## v0.3.0 - Enhanced Content Management

### Newsletter System Implementation
- **Supabase Integration**: Newsletter subscriptions stored in dedicated `newsletter_subscriptions` table
- **Email Validation**: Robust client and server-side validation with comprehensive error handling
- **Admin Dashboard**: Full subscription management with analytics and export capabilities
- **Security**: RLS policies, input sanitization, and rate limiting protection

### Content Management Improvements
- **Auto-save Functionality**: Automatic content saving with visual indicators
- **Enhanced Validation**: Comprehensive content validation with user-friendly error messages
- **Publishing Workflow**: Streamlined content publishing with status tracking
- **Bulk Operations**: Efficient bulk content management operations

### Performance Optimizations
- **Database Indexing**: Optimized queries with proper database indexes
- **Caching Strategy**: Implemented strategic caching for frequently accessed content
- **Image Optimization**: Automatic image compression and format optimization
- **Bundle Optimization**: Reduced JavaScript bundle size through code splitting

### Security Enhancements
- **Authentication Hardening**: Enhanced authentication with improved session management
- **Input Validation**: Comprehensive input validation and sanitization
- **CSRF Protection**: Cross-site request forgery protection implementation
- **Rate Limiting**: API rate limiting to prevent abuse

---

## v0.2.0 - Core Platform Foundation

### Database Schema
- **Supabase Integration**: Full migration to Supabase for database and authentication
- **Content Tables**: Case studies, algorithms, personas, industries with proper relationships
- **User Management**: User profiles, authentication, and role-based access control
- **Audit Logging**: Comprehensive audit trail for all content modifications

### Admin CMS
- **Content Management**: Full CRUD operations for all content types
- **Relationship Management**: Intuitive interface for managing content relationships
- **User Interface**: Modern, responsive admin interface with dark mode support
- **Workflow Management**: Content publishing workflow with approval processes

### Public Interface
- **Content Display**: Responsive display of all content types with proper navigation
- **Search Functionality**: Basic search across all content types
- **User Authentication**: User registration, login, and profile management
- **Responsive Design**: Mobile-first responsive design implementation

---

## v0.1.0 - Initial Release

### Core Features
- **Content Types**: Basic implementation of case studies, algorithms, personas, industries
- **Next.js Foundation**: App Router implementation with TypeScript support
- **Database Setup**: Initial database schema and migrations
- **Authentication**: Basic user authentication system
- **Admin Interface**: Minimal admin interface for content management

### Technical Stack
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase for database and authentication
- **Deployment**: Vercel deployment with automated CI/CD
- **Development**: ESLint, Prettier, and development tooling setup 