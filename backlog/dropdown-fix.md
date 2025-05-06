# Dropdown Menu Rendering Issues

## Problem

Dropdown menus in the admin interface (specifically in the Case Studies section) are rendering behind other content instead of appearing on top as expected. This occurs across all themes and affects the usability of forms with dropdown selectors.

## Root Causes

1. **DOM Hierarchy**: Dropdown menus may be rendering within their parent container's DOM hierarchy rather than at the document body level
2. **Z-Index Management**: Insufficient z-index values or stacking context issues preventing dropdowns from appearing above other content
3. **Container Constraints**: Parent elements may have `overflow: hidden` or other properties that clip dropdown content
4. **Component Implementation**: The RelationshipSelector component may not be using portals for dropdown rendering

## Standard Pattern for Dropdowns

Modern dropdown/select components should:

1. **Use Portals**: Render dropdown menus outside their parent DOM hierarchy (at document body level)
2. **Manage Z-Index**: Have proper stacking context and z-index management
3. **Handle Positioning**: Calculate position relative to trigger but render outside of any constraining containers
4. **Remain Accessible**: Maintain proper focus management and keyboard navigation

## Recommended Fixes

1. **Use Portal-Based Dropdowns**: 
   - Update the RelationshipSelector component to use `ReactDOM.createPortal()` or a library that handles portal creation
   - Ensure all select/dropdown components render their menus at the document body level

2. **Implement Proper Z-Index Management**:
   - Define a consistent z-index strategy in the CSS
   - Ensure dropdown menus have higher z-index than page content
   - Add a proper stacking context hierarchy

3. **Fix Positioning Logic**:
   - Dropdown position should be calculated relative to its trigger
   - Use `position: fixed` or absolute positioning with properly calculated offsets
   - Implement positioning that considers viewport boundaries

4. **Remove Container Constraints**:
   - Review and remove any `overflow: hidden` properties on parent containers
   - Ensure parent elements don't inadvertently clip child content

5. **Leverage Existing UI Libraries**:
   - If using shadcn/ui (based on imports), their dropdown components already handle these considerations
   - Consider replacing custom RelationshipSelector with their Select or Combobox components

## Implementation Approach

1. Review the current implementation of RelationshipSelector component
2. If using a UI library, check if it provides proper dropdown components with portal rendering
3. If custom-built, modify to use portal rendering via `ReactDOM.createPortal`
4. Test across all themes to ensure consistent behavior

## References

- [React Portal Documentation](https://reactjs.org/docs/portals.html)
- [Understanding CSS z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index)
- [Shadcn UI Select Component](https://ui.shadcn.com/docs/components/select)
- [Headless UI Listbox Component](https://headlessui.com/react/listbox) 