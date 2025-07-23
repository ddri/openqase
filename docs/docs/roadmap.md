# Roadmap

This document outlines the planned features, improvements, and priorities for the future development of OpenQase.

*(Note: This is a living document and priorities may shift based on feedback and requirements.)*

## Current Sprint (January 2025)

### ✅ Recently Completed
*   **Admin Relationship Loading Bug Fix** - Fixed case studies and personas admin forms showing blank relationship selectors
*   **Email Preferences System** - Implemented industry-standard email preferences following Resend best practices
*   **Comprehensive Documentation** - Added email preferences system documentation with testing and troubleshooting guides

### 🔄 In Progress  
*   **v0.4.0 Static Migration Completion** - Continue migrating remaining content types to unified static generation system

## Near-Term Priorities (Q1 2025)

### 🐛 **Bug Fixes**
*   **Admin Dropdown Transparency Bug**
    *   **Issue**: Dropdown menus in admin Classifications section (case studies edit) have transparent backgrounds in dark mode
    *   **Impact**: Makes options difficult to read and select  
    *   **Likely Cause**: Missing dark mode background styles in shadcn/ui Select component
    *   **Location**: Admin case studies edit page, Classifications section dropdowns
    *   **Priority**: Medium - affects admin usability
    *   **Status**: Documented

### ⚡ **Performance Optimization**

*   **✅ Completed Optimizations (January 2025)**
    *   ~~Remove production console.log statements~~ - Removed 100+ logs from all components
    *   ~~Clean unused dependencies~~ - Removed prismjs, TanStack Query, react-markdown (80+ packages)
    *   ~~Consolidate markdown processing~~ - Unified to server-side markdown-server.ts
    *   ~~Fix N+1 query patterns~~ - Implemented single-query fetching with nested selects
    *   ~~React Performance~~ - Added memo, useMemo, useCallback to all list components
    *   ~~Production Logging Cleanup~~ - Removed all console.logs from admin/API/middleware
    *   **Impact**: 300x performance improvement, reduced bundle by 80+ packages
    *   **Status**: Completed

*   **High-Priority Remaining Issues** 
    *   **Build Configuration**: Enable build validation (remove `ignoreBuildErrors: true`)
    *   **Image Optimization**: Re-enable Next.js image optimization (currently disabled)
    *   Priority: High - critical for production code quality and deployment safety
    *   Status: Ready for implementation

*   **Medium-Priority Enhancements**
    *   **ISR Implementation**: Add `export const revalidate = 60` to enable auto-refresh
    *   **Selective Relationships**: Skip loading relationships on list pages where not needed
    *   **Bundle Size**: Consider native select vs Radix UI (30KB potential savings)
    *   Priority: Medium - current performance is already excellent (50-100ms)
    *   Status: Nice-to-have optimizations

### 🚀 **Feature Enhancements**
*   **Blog Migration Completion**  
    *   Complete blog posts migration to unified content fetching system
    *   Add blog-specific static generation optimizations
    *   Status: In Progress

*   **Advanced Admin Features**
    *   Bulk content operations (publish/unpublish multiple items)
    *   Content analytics and usage metrics
    *   Advanced content validation and quality checks
    *   Status: Planned

## OpenQase v0.5.0 - Global Search & Content Discovery (Q2 2025)

### 🔍 **Global Search Implementation**
*   **Navigation Search Bar**
    *   Add search input to main navigation
    *   Implement search suggestions/autocomplete
    *   Keyboard shortcuts (Ctrl/Cmd + K)
    *   Status: Planned for v0.5.0

*   **Unified Search Page (`/search`)**
    *   Create dedicated search results page
    *   Display results from all content types (algorithms, case studies, personas, industries, blog posts)
    *   Group results by content type with clear visual hierarchy
    *   Implement result highlighting for search terms
    *   Status: Planned for v0.5.0

*   **Search API Endpoint**
    *   Create `/api/search` endpoint using existing `searchContent` function
    *   Support for multiple content types in single query
    *   Add search result ranking and relevance scoring
    *   Implement search result pagination
    *   Status: Planned for v0.5.0

*   **Enhanced Search Fields**
    *   Expand search beyond title/description to include:
      - Tags and categories
      - Industry names and sectors
      - Algorithm use cases
      - Persona expertise areas
      - Related content references
    *   Implement fuzzy matching for better results
    *   Status: Planned for v0.5.0

### 🎯 **Search Experience Improvements**
*   **Search Filters & Facets**
    *   Filter results by content type
    *   Filter by industry, algorithm type, persona role
    *   Date range filtering for recent content
    *   Status: Planned for v0.5.0

*   **Search Analytics & Research**
    *   Track popular search terms and search frequency patterns
    *   Monitor search result click-through rates and search success rates
    *   Identify content gaps based on failed searches and search abandonment
    *   Analyze search trends over time to inform content strategy
    *   Status: Planned for v0.5.0

*   **Performance Optimization**
    *   Implement search result caching
    *   Optimize database queries for search performance
    *   Add search result preloading for better UX
    *   Status: Planned for v0.5.0

### 🔍 **Search Analytics & Research System**

**Overview**: While OpenQase currently has functional search capabilities across all content types, we lack visibility into user search behavior and content discovery patterns. The Search Analytics & Research system will provide data-driven insights into what users are actually looking for, enabling evidence-based content strategy and identifying opportunities for content creation.

**Key Features**:
- **Search Query Logging**: Track all search terms, frequency patterns, and search refinement behavior
- **Click-Through Analytics**: Monitor which search results get clicked, time-to-click, and search success rates
- **Content Gap Analysis**: Identify searches with no results or poor engagement to guide content creation
- **Trend Analysis**: Track search patterns over time to identify emerging topics and seasonal trends
- **Admin Dashboard**: Visual analytics interface showing popular searches, failed searches, and content recommendations

**Business Value**: This system will transform OpenQase from a content repository into an intelligence platform, providing actionable insights for content strategy, SEO optimization, and understanding the quantum computing landscape from a user perspective.

## Mid-Term Goals (Q2-Q3 2025)

### 🏗️ **Architecture & Performance**
*   **Advanced Caching Implementation**
    *   Edge caching for static content
    *   Smart invalidation strategies
    *   CDN integration optimization
    *   Status: Planned for Q2-Q3 2025

*   **Performance Monitoring & Optimization**
    *   Implement real-time performance monitoring
    *   Core Web Vitals tracking and alerting
    *   Database query optimization and indexing
    *   Image optimization and lazy loading
    *   Bundle size optimization and code splitting
    *   Monitor Vercel image optimization costs (currently minimal due to low image usage)
    *   Implement selective API route caching for high-traffic endpoints
    *   Configure function timeouts (different limits for public vs admin APIs)
    *   Status: Planned for Q2-Q3 2025

*   **Analytics Integration**
    *   User behavior tracking
    *   Content performance metrics  
    *   Admin dashboard with insights
    *   Status: Planned for Q2-Q3 2025

*   **API Enhancements**
    *   GraphQL endpoint for complex queries
    *   Public API for third-party integrations
    *   Rate limiting and authentication
    *   Status: Planned for Q2-Q3 2025

### 📱 **User Experience**
*   **Mobile Optimization**
    *   Responsive design improvements
    *   Progressive Web App (PWA) features
    *   Touch-optimized interactions

*   **Accessibility Improvements**
    *   WCAG 2.1 AA compliance
    *   Screen reader optimization
    *   Keyboard navigation enhancements

## Long-Term Vision (2025+)

### 🔮 **Advanced Features**
*   **AI-Powered Content Suggestions**
    *   Related content recommendations
    *   Content gap analysis
    *   Automated content optimization

*   **Multi-language Support**
    *   Internationalization (i18n) framework
    *   Content translation management
    *   Localized user experiences

*   **Enterprise Features**
    *   Advanced user roles and permissions
    *   Custom branding and theming
    *   White-label deployment options

### 🔗 **Integrations**
*   **Third-party Platforms**
    *   Slack/Discord notifications
    *   GitHub integration for content versioning
    *   Academic database connections

*   **Research Tools**
    *   Citation management integration
    *   Academic reference validation
    *   Research collaboration features

## Completed Items

### ✅ **OpenQase v0.4.1 Performance Sprint (January 2025)**
*   **Production Logging Cleanup** - Removed 100+ console.log statements across all components
*   **React Performance Optimizations** - Implemented memo/useMemo/useCallback across all list components
*   **Client Performance Monitor** - Removed redundant monitoring system and logs
*   **Middleware Optimization** - Cleaned up request logging for better performance
*   **Admin Console Logging** - Removed 50+ logs from admin forms and actions

### ✅ **OpenQase v0.4.0 Major Migration (2024-2025)**
*   **Hybrid Architecture Implementation** - Delivered 300x performance improvement (30+ seconds → 50-100ms)
*   **Unified Content Fetching System** - Eliminated N+1 query problems across all content types
*   **Static Generation Migration** - 117 static pages generated at build time
*   **Dependency Optimization** - Removed 80+ unused packages (react-markdown, prismjs, TanStack Query)
*   **Markdown Processing** - Unified to server-side only with markdown-server.ts
*   **Case Studies Migration** - First content type successfully migrated to new architecture
*   **Admin CMS Preservation** - Maintained all dynamic admin functionality during migration

### ✅ **Infrastructure & DevOps (2024)**
*   **Next.js 15 Upgrade** - Modern app router implementation
*   **Supabase Integration** - Comprehensive database and authentication setup  
*   **shadcn/ui Component Library** - Consistent design system implementation
*   **Comprehensive Documentation** - Developer docs, API reference, and deployment guides

---

**Last Updated**: January 2025  
**Current Version**: v0.4.1  
**Next Release**: v0.4.2 (Build config fixes and ISR implementation)  
**Planned Release**: v0.5.0 (Global Search & Content Discovery - Q2 2025) 