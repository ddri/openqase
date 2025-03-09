# References Design Investigation

## Overview

This document records our investigation into styling superscript reference numbers and their links in MDX content, specifically focusing on making reference numbers use the theme's accent color.

## Original Goal

We wanted to implement a references system in our MDX content where:
1. Superscript reference numbers (e.g., <sup><a href="#ref-1">1</a></sup>) would be styled in the theme's accent color
2. The styling would be consistent with our theme system
3. The references would be clickable links to the references section
4. The styling would work without requiring hover states

## Implementation Attempts

### First Approach: Direct Link Styling

We initially tried styling the links directly in the MDX components configuration:

```typescript
const components = {
  sup: ({ children }: { children: React.ReactNode }) => (
    <sup className="text-xs">{children}</sup>
  ),
  a: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a 
      href={href} 
      className="text-[hsl(var(--primary))] hover:underline scroll-smooth"
    >
      {children}
    </a>
  )
}
```

This approach didn't work as expected - the links remained in their default color instead of using the theme's accent color.

### Second Approach: Nested Component Styling

We then investigated how MDX handles nested components (`sup` containing `a`) and their styling:

```typescript
// Attempted to style both components
sup: ({ children }: { children: React.ReactNode }) => (
  <sup className="text-xs text-[hsl(var(--primary))]">{children}</sup>
),
a: ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="text-[hsl(var(--primary))] hover:underline scroll-smooth"
  >
    {children}
  </a>
)
```

This also didn't achieve the desired result.

## Technical Analysis

### Theme System

Our theme system uses CSS variables for colors:

```css
:root {
  --primary: 210 90% 50%;  /* Blue accent */
}

[data-theme='graphite'] {
  --primary: 22 100% 50%;  /* orange-500 */
}
```

The CSS variable format is correct, providing HSL values without the `hsl()` wrapper.

### CSS Specificity

Analysis of the CSS specificity showed:
1. No obvious conflicts in specificity that would override our link styling
2. Correct usage of CSS variables in the format `text-[hsl(var(--primary))]`
3. Theme text colors are used with different class names, avoiding direct conflicts

## Learnings

1. **MDX Component Nesting**
   - MDX's handling of nested components (`sup` containing `a`) may be more complex than initially assumed
   - The relationship between parent and child component styling needs further investigation

2. **Theme System**
   - Our theme system implementation using CSS variables is correct
   - The variable format and usage in components follows best practices
   - The issue likely isn't with the theme system itself

3. **CSS Specificity**
   - No clear specificity conflicts were found
   - The styling issue isn't due to competing CSS rules

## Next Steps

When revisiting this issue, consider:

1. **Component Hierarchy**
   - Investigate how MDX processes nested component styling
   - Consider alternative approaches to component nesting

2. **Runtime Behavior**
   - Add debugging to verify theme variable values at runtime
   - Check how styles are being applied in the component hierarchy

3. **Alternative Approaches**
   - Consider using a custom component for references instead of nested HTML elements
   - Investigate using a different styling strategy for reference numbers
   - Look into MDX's handling of HTML elements vs custom components

## References

- Current implementation in `src/app/paths/algorithm/[slug]/page.tsx`
- Theme system in `src/app/globals.css`
- MDX configuration in `src/lib/mdx.ts` 