# Color Hierarchy Implementation Plan

## Current Problems
1. All cards use `bg-card` (white in light, dark gray in dark)
2. No visual hierarchy - everything is the same level
3. Some sections use `bg-muted/30` which doesn't respect dark mode properly

## Proper Semantic Hierarchy

### Using EXISTING CSS Variables

```css
/* Light Mode Values */
--background: Cool gray background (#F5F5F4)
--card: Pure white (#FFFFFF)
--muted: Neutral gray (#F5F5F4)
--surface-secondary: Light gray (#F5F5F4)
--surface-tertiary: Lighter gray (#F2F2F0)

/* Dark Mode Values */
--background: Deep charcoal (#1C1C1C)
--card: Slightly lighter charcoal (#262626)
--muted: Muted charcoal
--surface-secondary: Slightly lighter (#2A2A2A)
--surface-tertiary: Even lighter (#2E2E2E)
```

### Visual Hierarchy Strategy

#### Hero Section
- **Background**: `bg-background` (base layer)
- **Search Box**: `bg-card` (primary action - elevated)
- **Stats Cards**: `bg-muted` (metadata - recessed)
- **Newsletter**: `bg-card` with `border-primary/30` (call to action)

#### Knowledge Organization Section  
- **Section Background**: `bg-background` (maintains base)
- **Case Studies Card**: `bg-card` (primary content - elevated)
- **Category Cards**: `bg-muted` (navigation - recessed)

#### Latest Content Section
- **Section Background**: `bg-muted/10` (subtle section separator)
- **Content Cards**: `bg-card` (content - elevated)

### Implementation Rules

1. **NEVER use hard-coded colors**
   - ❌ `bg-white`
   - ❌ `bg-gray-100`
   - ✅ `bg-card`
   - ✅ `bg-muted`

2. **Use semantic meaning**
   - Primary actions/content → `bg-card`
   - Navigation/metadata → `bg-muted`
   - Base layer → `bg-background`

3. **Test both modes**
   - Every change must work in both light and dark
   - Visual hierarchy should be maintained in both

4. **Borders should adapt**
   - Use `border-border` not `border-gray-200`
   - Consider `border-border/50` for subtle borders

## Testing Checklist

- [ ] Light mode: Can you see the hierarchy?
- [ ] Dark mode: Do cards stand out from background?
- [ ] Dark mode: No jarring white elements?
- [ ] Borders visible in both modes?
- [ ] Text readable in both modes?

## References

- GitHub Primer: Functional color tokens
- Linear: Semantic surface levels
- Vercel: Adaptive borders and shadows