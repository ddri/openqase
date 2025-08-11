# Contributing to OpenQase

Thank you for your interest in contributing to OpenQase! This guide will help you get started with development and understand our processes.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Git** for version control
- **Supabase CLI** for database management
- **Code Editor** (VS Code recommended)

### Initial Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/openqase.git
   cd openqase
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Database Setup**
   ```bash
   npx supabase start
   npx supabase db reset
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Main app: http://localhost:3000
   - Admin panel: http://localhost:3000/admin
   - Supabase Studio: http://localhost:54323

## 📋 Development Workflow

### Branch Strategy

- **`main`** - Production-ready code
- **`develop`** - Integration branch for features
- **`feature/[name]`** - New features
- **`fix/[name]`** - Bug fixes
- **`docs/[name]`** - Documentation updates

### Making Changes

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow our [coding standards](#coding-standards)
   - Test your changes locally
   - Update documentation if needed

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🏗️ Architecture Overview

### Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Styling**: Tailwind CSS, shadcn/ui components
- **Tables**: TanStack Table (React Table)
- **Documentation**: Docusaurus

### Project Structure

```
openqase/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/          # Admin CMS routes
│   │   ├── api/            # API routes
│   │   └── [content]/      # Public content pages
│   ├── components/         # Reusable React components
│   │   ├── ui/             # shadcn/ui components
│   │   └── admin/          # Admin-specific components
│   ├── lib/                # Utility functions and configs
│   ├── hooks/              # Custom React hooks
│   └── types/              # TypeScript type definitions
├── docs/                   # Docusaurus documentation
├── migrations/             # Database migration files
├── scripts/                # Development and deployment scripts
└── supabase/              # Supabase configuration
```

## 📝 Coding Standards

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow the configured rules
- **Prettier**: Auto-formatting (if configured)
- **Naming Conventions**:
  - Components: `PascalCase`
  - Functions: `camelCase`
  - Files: `kebab-case.tsx`
  - Database: `snake_case`

### Component Guidelines

1. **Use TypeScript** - All components must be typed
2. **Follow shadcn/ui patterns** - Use existing UI components
3. **Server vs Client Components**:
   - Server components for data fetching
   - Client components for interactivity
4. **File Structure**:
   ```typescript
   // Server Component (default)
   export default function ServerComponent() {
     return <div>Server rendered</div>;
   }
   
   // Client Component
   'use client';
   export default function ClientComponent() {
     return <div>Client rendered</div>;
   }
   ```

### Database Guidelines

1. **Use migrations** for schema changes
2. **Junction tables** for many-to-many relationships
3. **RLS policies** for data security
4. **Indexes** for performance optimization

## 🔧 Development Patterns

### Data Fetching

Follow our unified API architecture:

**Server-side (Recommended)**:
```typescript
// For individual pages - fastest performance
import { createServerSupabaseClient } from '@/lib/supabase-server';

export default async function Page() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from('table').select('*');
  
  return <div>{data}</div>;
}
```

**Client-side**:
```typescript
// For complex filtering and interactions
import { useCaseStudies } from '@/hooks/useApi';

export default function Component() {
  const { data, isLoading, error } = useCaseStudies();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data}</div>;
}
```

### Form Handling

Use our standardized form patterns:

```typescript
// Admin forms use Server Actions
'use server';

export async function saveItem(formData: FormData) {
  const supabase = createServiceRoleSupabaseClient();
  
  // Validate input
  const result = await supabase
    .from('table')
    .insert(data);
  
  // Revalidate cache
  revalidatePath('/admin/items');
  
  return result;
}
```

### Styling Guidelines

1. **Use Tailwind CSS** - Utility-first approach
2. **shadcn/ui components** - Don't create custom styled components
3. **CSS variables** - Use theme variables for consistency
4. **Responsive design** - Mobile-first approach

## 🧪 Testing

### Current Status

- **No automated testing framework** is currently configured
- **Manual testing** is required for all changes
- **Future**: Jest/Vitest + React Testing Library planned

### Manual Testing Checklist

Before submitting a PR, verify:

- [ ] Main app loads without errors
- [ ] Admin panel authentication works
- [ ] Your feature works as expected
- [ ] No console errors or warnings
- [ ] Mobile responsiveness (if applicable)
- [ ] Database operations work correctly

### Testing Commands

```bash
# Run type checking
npm run build

# Run linting
npm run lint

# Test database connection
npx ts-node src/lib/supabase.test.ts
```

## 🔍 Code Review Process

### Pull Request Guidelines

1. **Title**: Use conventional commits format
   - `feat: add new feature`
   - `fix: resolve bug issue`
   - `docs: update documentation`
   - `style: improve styling`
   - `refactor: code restructuring`

2. **Description**: Include
   - What changed and why
   - How to test the changes
   - Any breaking changes
   - Screenshots (for UI changes)

3. **Checklist**:
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Manual testing performed
   - [ ] Documentation updated
   - [ ] No merge conflicts

### Review Process

1. **Automatic Checks**: Build and lint must pass
2. **Manual Review**: Code quality and architecture
3. **Testing**: Reviewer tests the changes
4. **Approval**: At least one approval required
5. **Merge**: Squash and merge to main

## 📚 Documentation

### When to Update Docs

- **New features**: Add to relevant documentation
- **API changes**: Update API documentation
- **Breaking changes**: Update migration guides
- **Bug fixes**: Update troubleshooting guides

### Documentation Structure

```
docs/
├── docs/
│   ├── getting-started/    # Installation and setup
│   ├── architecture/       # Technical architecture
│   ├── backend/           # Supabase and API patterns
│   ├── frontend/          # React and component patterns
│   └── features/          # Feature-specific guides
```

### Writing Guidelines

- **Clear and concise** - Avoid jargon
- **Code examples** - Include working examples
- **Screenshots** - Visual guides for UI features
- **Up-to-date** - Keep docs current with code

## 🚨 Common Issues

### Development Setup

**Issue**: Supabase connection errors
**Solution**: Verify `.env.local` credentials and run `npx supabase start`

**Issue**: Type errors with database types
**Solution**: Regenerate types with `npx supabase gen types`

**Issue**: Build failures
**Solution**: Check for TypeScript errors and ESLint issues

### Database Issues

**Issue**: Migration failures
**Solution**: Check migration syntax and run `npx supabase db reset`

**Issue**: RLS policy errors
**Solution**: Verify user permissions and policy configuration

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Code Review**: PR comments and suggestions

### Before Asking for Help

1. **Search existing issues** - Your question might be answered
2. **Check documentation** - Review relevant docs
3. **Try debugging** - Include error messages and context
4. **Minimal reproduction** - Provide steps to reproduce

### Reporting Bugs

Use our bug report template:

```markdown
**Bug Description**
Clear description of the issue

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 119]
- Node.js: [e.g., 18.17.0]
```

## 🎯 Contributing Areas

### High Priority

- **Testing framework** - Set up Jest/Vitest
- **Performance optimization** - Database queries and rendering
- **Accessibility** - ARIA labels and keyboard navigation
- **Error handling** - Better error boundaries and messaging

### Medium Priority

- **Content management** - Admin UI improvements
- **Search functionality** - Full-text search implementation
- **Analytics** - Usage tracking and insights
- **Internationalization** - Multi-language support

### Good for Beginners

- **Documentation updates** - Fix typos and improve clarity
- **UI polish** - Improve styling and responsiveness
- **Content validation** - Add form validation rules
- **Bug fixes** - Resolve reported issues

## 📄 License

By contributing to OpenQase, you agree that your contributions will be licensed under the same license as the project.

## 🙏 Recognition

Contributors are recognized in:
- GitHub contributors page
- Release notes for significant contributions
- Documentation credits (for major doc contributions)

---

**Thank you for contributing to OpenQase!** Your help makes this project better for everyone.

For questions about this guide, please open an issue or start a discussion on GitHub.