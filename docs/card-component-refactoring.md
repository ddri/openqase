# Card Component Refactoring Documentation

## Current Implementation

1. **Unified Card System**
   - Implemented a standardized `ContentCard` component
   - All content types now use the same card component
   - Consistent styling and behavior across the application
   - Proper theme support with dark mode

2. **Card Features**
   - Title with consistent styling
   - Description with line clamp
   - Badge system for metadata display
   - Consistent spacing and layout
   - Proper hover states and interactions

3. **Badge System**
   - Badges are sorted by length
   - Maximum of three visible badges
   - Overflow indicator for additional badges
   - Consistent badge styling and spacing

## Component Structure

The card system is now built around these key components:

1. **ContentCard Component** (`src/components/ui/content-card.tsx`)
   - Main component for all content types
   - Uses shadcn/ui Card component internally
   - Handles consistent layout and styling
   - Manages badge display and overflow

2. **Content List Components**
   - `AlgorithmList`
   - `CaseStudyList`
   - `IndustryList`
   - `PersonaList`
   Each list component:
   - Handles filtering and sorting
   - Uses ContentCard for display
   - Manages its own state
   - Provides consistent search functionality

## Implementation Details

### ContentCard Props
```typescript
interface ContentCardProps {
  title: string;
  description: string;
  badges: string[];
  href: string;
}
```

### Key Features
- Title uses consistent font size and weight
- Description is limited to 2 lines with ellipsis
- Badges are displayed in a flex container
- Hover state provides visual feedback
- Links wrap entire card for better UX

## Usage Examples

1. **Algorithm Display**
```typescript
<ContentCard
  title={algorithm.title}
  description={algorithm.description}
  badges={[algorithm.complexity, ...algorithm.keyApplications]}
  href={`/paths/algorithm/${algorithm.slug}`}
/>
```

2. **Industry Display**
```typescript
<ContentCard
  title={industry.title}
  description={industry.description}
  badges={[industry.sector, ...industry.keyApplications]}
  href={`/paths/industry/${industry.slug}`}
/>
```

## Styling Guidelines

- Cards maintain consistent padding and margins
- Text sizes follow the design system
- Badge colors use theme variables
- Hover states are subtle but noticeable
- All interactive elements are accessible

## Best Practices

1. **Component Usage**
   - Always use ContentCard for content display
   - Pass all required props
   - Handle badge arrays appropriately
   - Use proper TypeScript types

2. **Styling**
   - Use theme variables for colors
   - Follow spacing guidelines
   - Maintain accessibility standards
   - Test in both light and dark modes

3. **Performance**
   - Memoize card components when needed
   - Handle large badge arrays efficiently
   - Optimize image loading if used
   - Monitor render performance

## Testing Checklist

- [ ] Verify card rendering for all content types
- [ ] Check badge overflow behavior
- [ ] Test responsive design
- [ ] Verify hover states
- [ ] Check accessibility
- [ ] Test theme switching
- [ ] Verify link behavior

## Future Improvements

1. **Potential Enhancements**
   - Image support for certain content types
   - Custom badge colors by type
   - Enhanced hover interactions
   - Additional metadata display options

2. **Performance Optimizations**
   - Virtual scrolling for long lists
   - Better image optimization
   - More efficient badge handling
   - Reduced re-renders

## Relevant Files

- `src/components/ui/content-card.tsx` - Main card component
- `src/components/AlgorithmList.tsx` - Algorithm list implementation
- `src/components/CaseStudyList.tsx` - Case study list implementation
- `src/components/IndustryList.tsx` - Industry list implementation
- `src/components/PersonaList.tsx` - Persona list implementation

## Maintenance Notes

When making changes:
1. Test across all content types
2. Verify theme compatibility
3. Check responsive behavior
4. Update documentation
5. Run accessibility checks