# OpenQase Quick Start Guide

## Overview

OpenQase is a Next.js-based educational platform for quantum computing. This guide will help you get started with development and content creation.

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd openqase
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **View Documentation**
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
│   │   └── paths/   # Content type routes
│   ├── components/  # React components
│   │   ├── ui/     # Base UI components
│   │   └── journey/ # Learning path components
│   └── lib/        # Utilities and types
└── docs/           # Documentation
```

## Common Tasks

### 1. Creating New Content

1. Choose content type (algorithm/case-study/industry/persona)
2. Create MDX file in appropriate directory
3. Add required frontmatter (see templates in content-management.md)
4. Write content using markdown and custom components
5. Test locally

### 2. Updating Content

1. Edit MDX file
2. Update lastUpdated date in frontmatter
3. Test locally
4. Build and verify

### 3. Development

1. Make code changes
2. Run development server
3. Test with sample content
4. Build and verify

## Key Files

- `src/lib/mdx.ts` - MDX processing and content loading
- `src/lib/types.ts` - TypeScript definitions for content
- `src/components/ui/content-card.tsx` - Content card component

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

1. **Build Errors**
   - Check required frontmatter fields
   - Verify MDX syntax
   - Ensure frontmatter matches types
   - Check for proper date format

2. **Development Server Issues**
   - Clear .next directory
   - Restart development server
   - Check for syntax errors
   - Verify MDX content format

### Need Help?

- Check the documentation in `/docs`
- Review content examples in `/content`
- Examine component implementations in `/src/components`
- Verify types in `src/lib/types.ts`

## Best Practices

1. **Content Creation**
   - Follow templates exactly
   - Keep content focused
   - Use appropriate keywords
   - Update lastUpdated date
   - Use custom components where appropriate

2. **Development**
   - Test changes locally
   - Follow TypeScript types
   - Use existing components
   - Follow accessibility guidelines
   - Keep code DRY

3. **Deployment**
   - Build and test locally
   - Verify all routes work
   - Check content rendering
   - Test responsive design
   - Monitor performance