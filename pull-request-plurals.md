# Standardize Content Type Naming to Singular Form

## Problem
The application had inconsistent naming conventions for content types, using both plural and singular forms across different parts of the system. This caused confusion and potential bugs when trying to load content or navigate between pages.

For example:
- Content directory used plural names (personas, industries, etc.)
- Content types in code used singular names (persona, industry, etc.)
- URL paths used plural forms (/paths/personas, /case-studies)

## Solution
Standardized all content type references to use singular form consistently across:
- Directory names
- Route paths
- Internal navigation links
- Content type definitions

### Changes Made

1. Content Directory Structure:
```diff
content/
- personas/
+ persona/
- industries/
+ industry/
- algorithms/
+ algorithm/
- case-studies/
+ case-study/
```

2. App Routes:
```diff
src/app/
  paths/
-   personas/
+   persona/
-   industries/
+   industry/
-   algorithms/
+   algorithm/
- case-studies/
+ case-study/
```

3. Content Loader:
```diff
- const DIR_TO_TYPE: Record<string, ContentType> = {
-   'personas': 'persona',
-   'industries': 'industry',
-   'algorithms': 'algorithm',
-   'case-studies': 'case-study'
- };

// Now uses direct type names
const contentPath = path.join(CONTENT_DIR, type);
```

4. Navigation Links:
```diff
- href="/case-studies"
+ href="/case-study"
- href="/paths/personas"
+ href="/paths/persona"
```

5. Content Validation:
```diff
- for (const type of ['algorithms', 'case-studies', 'industries', 'personas'])
+ for (const type of ['algorithm', 'case-study', 'industry', 'persona'])
```

## Impact
- Simplified content loading logic by removing the need for type-to-directory mapping
- Reduced potential for errors by ensuring consistent naming across the application
- Improved code maintainability by establishing a clear naming convention
- Fixed runtime errors related to directory not found issues

## Testing
- Verified content loading works for all content types
- Confirmed navigation works correctly with new singular paths
- Checked all internal links are updated to use singular form
- Validated content validation still works with new directory structure

## Notes
This change is purely structural and does not affect the actual content or functionality of the application. It simply standardizes how we reference different content types throughout the codebase.