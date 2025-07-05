# API Quick Reference

Quick reference for OpenQase unified API architecture.

## Decision Tree

```
Need to fetch data?
│
├── Server-side page/component?
│   └── Use direct Supabase queries → createServerSupabaseClient()
│
└── Client-side component?
    ├── Simple data fetching → React hooks (useXxx)
    └── Complex operations → API routes (fetch('/api/...'))
```

## Common Patterns

### ✅ Server-side Pages (Recommended)
```typescript
// Individual content pages - FASTEST
import { createServerSupabaseClient } from '@/lib/supabase-server';

export default async function Page({ params }) {
  const supabase = await createServerSupabaseClient();
  
  // Single item
  const { data: algorithm } = await supabase
    .from('algorithms')
    .select('*')
    .eq('slug', params.slug)
    .single();
  
  // With relationships
  const { data: caseStudy } = await supabase
    .from('case_studies')
    .select(`
      *,
      case_study_industry_relations(industries(id, name, slug)),
      algorithm_case_study_relations(algorithms(id, name, slug))
    `)
    .eq('slug', params.slug)
    .single();
}
```

### ✅ Client-side React Hooks
```typescript
// Case studies with filtering
const { data, isLoading, error } = useCaseStudies(1, 10, { industry: 'aerospace' });

// Single case study
const { data: caseStudy } = useCaseStudy('ibm-boeing-aerospace');

// Newsletter subscription
const subscribe = useNewsletterSubscription();
await subscribe.mutateAsync('user@example.com');
```

### ✅ Direct API Route Calls
```typescript
// Complex operations
const response = await fetch('/api/case-studies', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Case Study',
    industries: ['industry-id-1'],
    algorithms: ['algorithm-id-1']
  })
});

// Custom filtering
const response = await fetch('/api/case-studies?industry=aerospace&page=1');
const data = await response.json();
```

## Available React Hooks

| Hook | Purpose | Example |
|------|---------|---------|
| `useCaseStudies()` | List case studies with filtering | `useCaseStudies(1, 10, { industry: 'tech' })` |
| `useCaseStudy()` | Single case study | `useCaseStudy('ibm-boeing-aerospace')` |
| `useNewsletterSubscription()` | Subscribe to newsletter | `subscribe.mutateAsync('user@email.com')` |

## Available API Routes

| Route | Method | Purpose |
|-------|---------|---------|
| `/api/case-studies` | GET | List case studies with filtering |
| `/api/case-studies` | POST | Create/update case study |
| `/api/case-studies` | DELETE | Delete case study |
| `/api/case-studies/[slug]` | GET | Get single case study |
| `/api/algorithms` | GET | List algorithms |
| `/api/algorithms/[slug]` | GET | Get single algorithm |
| `/api/industries/[slug]` | GET | Get single industry |
| `/api/newsletter` | POST | Subscribe to newsletter |
| `/api/revalidate` | POST | Revalidate cached pages |

## Error Handling Patterns

### Server-side
```typescript
const { data, error } = await supabase
  .from('case_studies')
  .select('*')
  .eq('slug', slug)
  .single();

if (error || !data) {
  return notFound();
}
```

### Client-side Hooks
```typescript
const { data, isLoading, error } = useCaseStudies();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error.message} />;
if (!data?.items) return <NoData />;

return <CaseStudiesList items={data.items} />;
```

### API Routes
```typescript
const response = await fetch('/api/case-studies');
if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message);
}
const data = await response.json();
```

## Performance Tips

### ✅ Do's
- **Use server-side queries** for individual pages (fastest)
- **Use React hooks** for client-side data fetching (automatic caching)
- **Handle loading states** properly
- **Use TypeScript** for better type safety

### ❌ Don'ts
- Don't mix server and client data fetching in the same component
- Don't forget error handling
- Don't bypass RLS policies
- Don't use `useEffect` for data fetching when hooks are available

## Migration Examples

### From Old ApiClient Pattern
```typescript
// ❌ Old (removed)
import { ApiClient } from '@/lib/api-client';
const response = await ApiClient.getCaseStudies();

// ✅ New (server-side)
const supabase = await createServerSupabaseClient();
const { data } = await supabase.from('case_studies').select('*');

// ✅ New (client-side)
const { data } = useCaseStudies();
```

### From Manual useEffect
```typescript
// ❌ Old
const [data, setData] = useState([]);
useEffect(() => {
  fetch('/api/case-studies')
    .then(res => res.json())
    .then(setData);
}, []);

// ✅ New
const { data } = useCaseStudies();
```

---

*This quick reference reflects our unified API architecture. All examples use current, supported patterns.* 