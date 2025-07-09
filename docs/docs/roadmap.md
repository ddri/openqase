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

### 🚀 **Feature Enhancements**
*   **Search Functionality Enhancement**
    *   Implement full-text search across all content types
    *   Add search filters and advanced query capabilities
    *   Status: Planned

*   **Blog Migration Completion**  
    *   Complete blog posts migration to unified content fetching system
    *   Add blog-specific static generation optimizations
    *   Status: In Progress

*   **Advanced Admin Features**
    *   Bulk content operations (publish/unpublish multiple items)
    *   Content analytics and usage metrics
    *   Advanced content validation and quality checks
    *   Status: Planned

## Mid-Term Goals (Q2-Q3 2025)

### 🏗️ **Architecture & Performance**
*   **Advanced Caching Implementation**
    *   Edge caching for static content
    *   Smart invalidation strategies
    *   CDN integration optimization

*   **Analytics Integration**
    *   User behavior tracking
    *   Content performance metrics  
    *   Admin dashboard with insights

*   **API Enhancements**
    *   GraphQL endpoint for complex queries
    *   Public API for third-party integrations
    *   Rate limiting and authentication

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

### ✅ **OpenQase v0.4.0 Major Migration (2024-2025)**
*   **Hybrid Architecture Implementation** - Delivered 300x performance improvement (30+ seconds → 50-100ms)
*   **Unified Content Fetching System** - Eliminated N+1 query problems across all content types
*   **Static Generation Migration** - 117 static pages generated at build time
*   **Case Studies Migration** - First content type successfully migrated to new architecture
*   **Admin CMS Preservation** - Maintained all dynamic admin functionality during migration

### ✅ **Infrastructure & DevOps (2024)**
*   **Next.js 15 Upgrade** - Modern app router implementation
*   **Supabase Integration** - Comprehensive database and authentication setup  
*   **shadcn/ui Component Library** - Consistent design system implementation
*   **Comprehensive Documentation** - Developer docs, API reference, and deployment guides

---

**Last Updated**: January 2025  
**Current Version**: v0.4.0  
**Next Release**: v0.4.1 (Bug fixes and minor enhancements) 