# Content Loading and Dynamic Routing

This document explains how content is loaded and rendered in the OpenQase application, focusing on the MDX content system and dynamic routing.

## Content System (lib/mdx.ts)

The content system is built around `lib/mdx.ts`, which provides a unified way to load and process MDX content with proper frontmatter handling.

### Content Loading

```typescript
// lib/mdx.ts exports two main functions:
export async function getContentBySlug<T>(type: ContentType, slug: string): Promise<MDXContent<T>>
export async function getAllContent<T>(type: ContentType): Promise<MDXContent<T>[]>
```

The content loader:
1. Reads MDX files from the content directory
2. Processes them with MDX plugins (remarkGfm, rehypePrismPlus)
3. Returns a structured object containing:
   - source: Processed MDX content ready for rendering
   - frontmatter: Typed metadata from the file
   - slug: URL-friendly identifier

### Content Types

Content is organized into four main types (defined in `lib/types.ts`):
- algorithm
- case-study
- industry
- persona

Each type extends the BaseContent interface with specific fields:

```typescript
interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  slug: string;
  description: string;
  lastUpdated: string;
  rawContent: string;
}
```

## Dynamic Routing

The application uses Next.js dynamic routing to handle content pages. Each content type follows a similar pattern:

### Route Structure

```
/paths/
  ├── algorithm/
  │   ├── page.tsx (list view)
  │   └── [slug]/page.tsx (detail view)
  ├── industry/
  │   ├── page.tsx
  │   └── [slug]/page.tsx
  ├── persona/
  │   ├── page.tsx
  │   └── [slug]/page.tsx
  └── case-study/
      ├── page.tsx
      └── [slug]/page.tsx
```

### List Pages

List pages (e.g., `/paths/algorithm/page.tsx`) follow this pattern:
1. Load all content of their type using `getAllContent`
2. Render a grid/list of items
3. Access content via frontmatter

Example:
```typescript
export default async function AlgorithmPage() {
  const algorithmList = await getAllContent<Algorithm>('algorithm');

  return (
    <div className="grid">
      {algorithmList.map((algorithm) => (
        <Card key={algorithm.slug}>
          <h2>{algorithm.frontmatter.title}</h2>
          <p>{algorithm.frontmatter.description}</p>
        </Card>
      ))}
    </div>
  );
}
```

### Detail Pages

Detail pages (e.g., `/paths/algorithm/[slug]/page.tsx`) follow this pattern:
1. Load specific content using `getContentBySlug`
2. Render the MDX content using MDXRemote
3. Display metadata from frontmatter

Example:
```typescript
export default async function AlgorithmDetailPage({ params }: { params: { slug: string } }) {
  const algorithm = await getContentBySlug<Algorithm>('algorithm', params.slug);

  return (
    <article>
      <h1>{algorithm.frontmatter.title}</h1>
      <MDXRemote source={algorithm.source} components={components} />
    </article>
  );
}
```

### Static Paths Generation

Each detail page implements `generateStaticParams` to pre-render content pages:

```typescript
export async function generateStaticParams() {
  const contentList = await getAllContent<ContentType>('content-type');
  return contentList.map((content) => ({
    slug: content.slug,
  }));
}
```

## Content Access Pattern

When working with content, always:
1. Use the appropriate type from `lib/types.ts`
2. Access metadata through the frontmatter property
3. Use MDXRemote to render the content source

Example:
```typescript
// Correct way to access content
const title = content.frontmatter.title;
const description = content.frontmatter.description;

// Render MDX content
<MDXRemote source={content.source} components={components} />
```

## MDX Components

Custom MDX components are defined per-page to control rendering:

```typescript
const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold mb-6">{children}</h1>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-300 mb-4">{children}</p>
  ),
};
```

These components are passed to MDXRemote to customize the rendering of MDX content.

## Content Directory Structure

```
content/
  ├── algorithm/
  │   └── *.mdx
  ├── case-study/
  │   └── *.mdx
  ├── industry/
  │   └── *.mdx
  └── persona/
      └── *.mdx
```

Each MDX file must include frontmatter that matches its content type interface.