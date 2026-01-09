# OpenQase Design System

**Version:** 1.0.0
**Branch:** design2026
**Last Updated:** January 2026

## Overview

The OpenQase Design System provides a consistent, maintainable UI foundation for the admin interface. It eliminates hardcoded colors, standardizes spacing, and provides semantic design tokens with full dark mode support.

## Table of Contents

- [Design Tokens](#design-tokens)
- [Components](#components)
- [Usage Examples](#usage-examples)
- [Migration Guide](#migration-guide)
- [Best Practices](#best-practices)
- [Accessibility](#accessibility)

---

## Design Tokens

All design tokens are centralized in `src/lib/design-tokens.ts`.

### Status Colors

Used for published/draft/archived states in content management.

```typescript
import { statusColors } from '@/lib/design-tokens';

// Available variants
statusColors.published  // Green (published content)
statusColors.draft      // Yellow (unpublished content)
statusColors.archived   // Gray (deleted/archived content)

// Each variant includes:
{
  bg: 'bg-green-50 dark:bg-green-950',
  text: 'text-green-800 dark:text-green-200',
  border: 'border-green-200 dark:border-green-800'
}
```

### Severity Colors

Used for alerts, warnings, errors, and validation messages.

```typescript
import { severityColors } from '@/lib/design-tokens';

// Available variants
severityColors.error    // Red (errors, critical issues)
severityColors.warning  // Yellow (warnings, cautions)
severityColors.info     // Blue (informational messages)
severityColors.success  // Green (success messages)

// Each variant includes:
{
  bg: 'bg-red-50 dark:bg-red-950',
  text: 'text-red-800 dark:text-red-200',
  border: 'border-red-200 dark:border-red-800',
  icon: 'text-red-600 dark:text-red-400'
}
```

### Progress Colors

Used for progress bars and completion indicators.

```typescript
import { progressColors, getProgressColors } from '@/lib/design-tokens';

// Helper function - automatically selects color based on percentage
const colors = getProgressColors(validPercentage);
// 0-29%: progressColors.low (red)
// 30-69%: progressColors.medium (yellow)
// 70-100%: progressColors.high (green)

// Each variant includes:
{
  bg: 'bg-red-100 dark:bg-red-950',
  text: 'text-red-800 dark:text-red-200',
  fill: 'bg-red-500 dark:bg-red-600'  // For progress bar fill
}
```

### Category Colors

Used for dashboard icons representing different content types.

```typescript
import { categoryColors } from '@/lib/design-tokens';

// Available categories
categoryColors.caseStudy        // Blue
categoryColors.algorithm        // Purple
categoryColors.industry         // Green
categoryColors.persona          // Orange
categoryColors.blog             // Pink
categoryColors.quantumSoftware  // Indigo
categoryColors.quantumHardware  // Cyan
categoryColors.quantumCompany   // Teal
categoryColors.partnerCompany   // Emerald
```

### Spacing Constants

Used for consistent layout and padding.

```typescript
import { spacing } from '@/lib/design-tokens';

spacing.listPadding     // 'p-6' - List view wrapper padding
spacing.cardPadding     // 'p-6' - Card content padding
spacing.sectionPadding  // 'p-8' - Main section wrapper padding
spacing.formPadding     // 'p-6' - Form container padding

spacing.itemGap         // 'gap-4' - Gap between list items
spacing.sectionGap      // 'gap-6' - Gap between major sections
spacing.listGap         // 'gap-4' - Gap within lists
```

---

## Components

### StatusBadge

Unified status display for published/draft/scheduled/archived states.

**File:** `src/components/admin/StatusBadge.tsx`

**Props:**
```typescript
interface StatusBadgeProps {
  status: boolean | string;  // Boolean or "Published"/"Draft"/"Scheduled"
  deleted?: boolean;         // Shows "Deleted" variant
  className?: string;
}
```

**Usage:**
```tsx
import { StatusBadge } from '@/components/admin/StatusBadge';

// Boolean status (most common)
<StatusBadge status={item.published} />

// String status (for blog posts with scheduled state)
<StatusBadge status="Scheduled" />

// With deleted flag
<StatusBadge status={false} deleted={item.deleted_at !== null} />
```

**Replaces:** 16+ inline status badge implementations across admin pages.

---

### BulkOperationBar

Standardized bulk action interface for admin list views.

**File:** `src/components/admin/BulkOperationBar.tsx`

**Props:**
```typescript
interface BulkOperationBarProps {
  selectedCount: number;
  onPublish?: () => void;
  onUnpublish?: () => void;
  onDelete?: () => void;
  onRestore?: () => void;          // For trash views
  onPermanentDelete?: () => void;  // For trash views
  onClearSelection: () => void;
  isLoading?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
import { BulkOperationBar } from '@/components/admin/BulkOperationBar';

<BulkOperationBar
  selectedCount={selectedItems.size}
  onPublish={() => handleBulk('publish')}
  onUnpublish={() => handleBulk('unpublish')}
  onDelete={() => handleBulk('delete')}
  onClearSelection={() => setSelectedItems(new Set())}
  isLoading={isLoading}
/>
```

**Features:**
- Fixed bottom bar (better UX than inline)
- Automatic hide when selectedCount = 0
- Loading states for async operations
- Icon + text buttons with semantic variants
- Clear selection button

**Replaces:** 8+ duplicate bulk operation bar implementations.

---

### IconContainer

Standardized icon wrapper with category-based colors.

**File:** `src/components/ui/icon-container.tsx`

**Props:**
```typescript
interface IconContainerProps {
  category: 'caseStudy' | 'algorithm' | 'industry' | 'persona' |
            'blog' | 'quantumSoftware' | 'quantumHardware' |
            'quantumCompany' | 'partnerCompany';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
import { IconContainer } from '@/components/ui/icon-container';
import { FileText } from 'lucide-react';

<IconContainer category="caseStudy" size="lg">
  <FileText className="h-full w-full" />
</IconContainer>
```

**Replaces:** Hardcoded icon colors across dashboard cards.

---

### Enhanced Button

The Button component now supports loading states and icons.

**File:** `src/components/ui/button.tsx`

**New Props:**
```typescript
interface ButtonProps {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  'data-testid'?: string;
  // ... existing props
}
```

**Usage:**
```tsx
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

// With loading state
<Button
  loading={isSaving}
  loadingText="Saving..."
  leftIcon={<Save className="h-4 w-4" />}
>
  Save Changes
</Button>

// Icons without loading
<Button leftIcon={<Plus className="h-4 w-4" />}>
  Add New
</Button>
```

**Improvements:**
- No manual Loader2 implementation needed
- Automatic icon spacing
- Loading spinner replaces leftIcon
- data-testid for better testing

---

### Enhanced Badge

Added status variants with dark mode support.

**File:** `src/components/ui/badge.tsx`

**New Variants:**
```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="published">Published</Badge>
<Badge variant="draft">Draft</Badge>
<Badge variant="scheduled">Scheduled</Badge>
<Badge variant="archived">Deleted</Badge>
```

**Note:** Most cases should use `<StatusBadge>` instead of Badge directly.

---

### Simplified Card

Removed Framer Motion dependency, uses CSS-only animations.

**File:** `src/components/ui/card.tsx`

**Variants:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Default - no animation
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Interactive - hover scale animation
<Card variant="interactive">
  ...
</Card>

// Elevated - permanent shadow
<Card variant="elevated">
  ...
</Card>
```

**Bundle Impact:** -31KB (removed Framer Motion)

---

### Enhanced Input

Added validation states and helper text.

**File:** `src/components/ui/input.tsx`

**New Props:**
```typescript
interface InputProps {
  error?: boolean;
  success?: boolean;
  helperText?: string;
  // ... existing props
}
```

**Usage:**
```tsx
import { Input } from '@/components/ui/input';

<Input
  error={!!errors.email}
  helperText={errors.email?.message || "Enter your email address"}
  placeholder="email@example.com"
/>
```

**Features:**
- Automatic aria-invalid and aria-describedby
- Red border for errors
- Green border for success
- Helper text below input

---

## Usage Examples

### Creating a New Admin List Page

```tsx
'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { BulkOperationBar } from '@/components/admin/BulkOperationBar';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export function MyListClient({ data }: { data: MyItem[] }) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const columns: ColumnDef<MyItem>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'published',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.published ?? false} />
    },
    // ... more columns
  ];

  const handleBulkOperation = async (operation: 'publish' | 'delete') => {
    setIsLoading(true);
    // ... perform operation
    setIsLoading(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Items</h1>
          <p className="text-muted-foreground">
            Manage your items here.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/my-items/new">
            <Plus className="w-4 h-4 mr-2" />
            New Item
          </Link>
        </Button>
      </div>

      <BulkOperationBar
        selectedCount={selectedItems.size}
        onPublish={() => handleBulkOperation('publish')}
        onDelete={() => handleBulkOperation('delete')}
        onClearSelection={() => setSelectedItems(new Set())}
        isLoading={isLoading}
      />

      <div className="bg-card rounded-lg border">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
```

### Using Design Tokens in Custom Components

```tsx
import { severityColors } from '@/lib/design-tokens';
import { cn } from '@/lib/utils';

export function CustomAlert({ severity, message }: Props) {
  const colors = severityColors[severity];

  return (
    <div className={cn(colors.bg, colors.border, "border rounded-lg p-4")}>
      <p className={colors.text}>{message}</p>
    </div>
  );
}
```

---

## Migration Guide

### Migrating from Hardcoded Status Badges

**Before:**
```tsx
<span className={`px-2 py-1 rounded text-xs ${
  item.published
    ? 'bg-green-100 text-green-800'
    : 'bg-yellow-100 text-yellow-800'
}`}>
  {item.published ? 'Published' : 'Draft'}
</span>
```

**After:**
```tsx
import { StatusBadge } from '@/components/admin/StatusBadge';

<StatusBadge status={item.published ?? false} />
```

### Migrating from Hardcoded Colors

**Before:**
```tsx
<div className="bg-red-50 border-red-200 text-red-800">
  Error message
</div>
```

**After:**
```tsx
import { severityColors } from '@/lib/design-tokens';
import { cn } from '@/lib/utils';

<div className={cn(severityColors.error.bg, severityColors.error.border)}>
  <p className={severityColors.error.text}>Error message</p>
</div>
```

### Migrating Button Loading States

**Before:**
```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Saving...
    </>
  ) : (
    'Save'
  )}
</Button>
```

**After:**
```tsx
<Button
  loading={isLoading}
  loadingText="Saving..."
>
  Save
</Button>
```

---

## Best Practices

### DO ✅

- **Use design tokens** for all colors instead of hardcoding
- **Use StatusBadge** for all published/draft/archived displays
- **Use BulkOperationBar** for multi-select operations
- **Use IconContainer** for dashboard/card icons
- **Use Button loading prop** instead of manual spinners
- **Apply consistent spacing** (p-8 for pages, p-6 for cards)
- **Test dark mode** for all new components

### DON'T ❌

- **Don't hardcode colors** like `bg-green-100 text-green-800`
- **Don't create inline status badges** - use StatusBadge
- **Don't use random spacing** - stick to design tokens
- **Don't forget dark mode** - all tokens support it
- **Don't import Framer Motion** for simple animations - use CSS
- **Don't skip null coalescing** for nullable status fields: `status={published ?? false}`

### Code Review Checklist

When reviewing PRs that touch admin UI:

- [ ] No hardcoded color classes (bg-green-*, text-red-*, etc.)
- [ ] StatusBadge used for status displays
- [ ] BulkOperationBar used for bulk operations
- [ ] Design tokens imported and used where applicable
- [ ] Spacing consistent with design-tokens.ts
- [ ] Dark mode support verified
- [ ] TypeScript errors resolved (null handling for status)

---

## Accessibility

### Color Contrast

All design tokens meet WCAG AA contrast requirements:

- **Text on background:** 4.5:1 minimum (7:1 for small text)
- **UI components:** 3:1 minimum
- **Dark mode:** Same contrast requirements apply

### Semantic HTML

- StatusBadge uses semantic color meanings (green=success, yellow=caution, red=error)
- BulkOperationBar uses descriptive button labels
- All interactive elements have focus states

### Screen Reader Support

- Input validation states use `aria-invalid` and `aria-describedby`
- Progress bars use `role="progressbar"` with aria values
- Icon-only buttons include `<span className="sr-only">` labels

### Keyboard Navigation

- All buttons are keyboard accessible
- Focus rings visible (3px with 50% opacity)
- Tab order follows visual layout

---

## Performance

### Bundle Size Impact

- **CSS:** 1,210 → 879 lines (-27%)
- **Framer Motion removed:** -31KB (-10-12KB gzipped)
- **Component dedupe:** ~200 lines removed from admin pages
- **Net code change:** +681 insertions, -620 deletions

### Loading Performance

- Design tokens add minimal runtime overhead (pure CSS classes)
- No JavaScript execution for color/spacing decisions
- Reduced CSS parse time due to smaller stylesheet

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Dark mode supported in all browsers

---

## Troubleshooting

### TypeScript Error: Type 'boolean | null' not assignable

**Problem:** StatusBadge expects `boolean | string` but field is nullable.

**Solution:** Use null coalescing operator:
```tsx
<StatusBadge status={row.original.published ?? false} />
```

### Colors Not Updating in Dark Mode

**Problem:** Using hardcoded colors instead of design tokens.

**Solution:** Replace with design tokens:
```tsx
// ❌ Before
<div className="bg-green-100 text-green-800">

// ✅ After
import { statusColors } from '@/lib/design-tokens';
<div className={cn(statusColors.published.bg, statusColors.published.text)}>
```

### Bulk Operation Bar Not Showing

**Problem:** BulkOperationBar automatically hides when `selectedCount === 0`.

**Solution:** This is expected behavior. Ensure selectedCount updates when items are selected.

---

## Future Enhancements

Potential additions to the design system:

1. **Storybook Integration** - Visual component documentation
2. **Theme Builder Tool** - Customize color tokens per environment
3. **Animation Library** - Curated, lightweight animations
4. **Form Component Suite** - Standardized form controls
5. **npm Package** - Export design system for other projects

---

## Support

For questions or issues with the design system:

1. Check this documentation first
2. Review examples in existing admin pages
3. Open an issue in the repository
4. Tag @design-system in PR reviews

---

**Last Updated:** January 2026
**Maintained By:** OpenQase Team
