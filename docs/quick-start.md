# OpenQASE Quick Start Guide

## Overview

OpenQASE is a Next.js-based educational platform for quantum computing. This guide will help you get started with development and content creation.

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
   - `docs/technical-architecture.md` - Technical details
   - `docs/quick-start.md` - This guide

## Directory Structure

```
openqase/
├── content/              # MDX content files
│   ├── algorithms/      # Quantum algorithms
│   ├── case-studies/    # Implementation examples
│   ├── industries/      # Industry applications
│   └── personas/        # Role-based learning paths
├── src/
│   ├── app/            # Next.js app router pages
│   │   ├── paths/      # Learning path routes
│   │   ├── case-studies/# Case study routes
│   │   └── quantum-stack/# Stack layer routes
│   ├── components/     # React components
│   │   ├── ui/        # Base UI components
│   │   └── journey/   # Learning path components
│   └── lib/           # Utilities and types
└── docs/              # Documentation
```

## Common Tasks

### 1. Creating New Content

1. Choose content type (algorithm/case-study/industry/persona)
2. Create MDX file in appropriate directory
3. Add required frontmatter (see templates in content-management.md)
4. Write content using markdown and custom components
5. Run validation: `npm run validate`

### 2. Updating Content

1. Edit MDX file
2. Update lastUpdated date in frontmatter
3. Verify all relationships (e.g., referenced content exists)
4. Run validation
5. Test locally
6. Build and verify

### 3. Development

1. Make code changes
2. Run development server
3. Test with sample content
4. Build and validate

## Key Files

- `content/loader.ts` - Content loading and validation system
- `src/lib/mdx.ts` - MDX processing and compilation
- `src/lib/validation.ts` - Content validation rules
- `src/lib/types.ts` - TypeScript definitions for content

## Content Creation Example

1. **Create Algorithm Content**
   ```mdx
   ---
   title: "New Algorithm"
   type: "algorithm"
   slug: "new-algorithm"
   description: "Description here"
   complexity: "O(n)"
   applications: ["optimization"]
   prerequisites: ["linear-algebra"]
   relatedCaseStudies: ["case-study-slug"]
   keywords: ["quantum", "optimization"]
   lastUpdated: "2024-02-23"
   ---

   # Algorithm Content
   Content here...
   ```

2. **Run Validation**
   ```bash
   npm run validate
   ```

3. **Test Locally**
   ```bash
   npm run dev
   ```

## Build Process

1. **Validate Content**
   ```bash
   npm run validate
   ```

2. **Build Site**
   ```bash
   npm run build
   ```

3. **Start Production Server**
   ```bash
   npm run start
   ```

## Troubleshooting

### Common Issues

1. **Content Validation Errors**
   - Check required frontmatter fields
   - Verify referenced content exists
   - Ensure proper date format

2. **Build Errors**
   - Run validation first
   - Check content relationships
   - Verify MDX syntax

3. **Development Server Issues**
   - Clear .next directory
   - Restart development server
   - Check for syntax errors

### Need Help?

- Check the documentation in `/docs`
- Review content examples in `/content`
- Examine component implementations in `/src/components`
- Verify types in `src/lib/types.ts`

## Best Practices

1. **Content Creation**
   - Follow templates exactly
   - Keep content focused
   - Use appropriate tags
   - Maintain relationships

2. **Development**
   - Test changes locally
   - Run validation often
   - Follow TypeScript types
   - Use existing components

3. **Deployment**
   - Always run validation
   - Build and test locally
   - Verify all routes work
   - Check relationships