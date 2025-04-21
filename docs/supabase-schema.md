# Supabase Schema Documentation

This document describes the database schema for the OpenQASE platform. The database is organized around several core entities that manage quantum algorithms, case studies, industries, and user data.

## Type Organization

All database types are centralized in `@/types/supabase.ts`. This is the single source of truth for database types in the application.

### Importing Types

```typescript
// Import the Database type
import type { Database } from '@/types/supabase';

// Define table types
type Tables = Database['public']['Tables']
type AlgorithmRow = Tables['algorithms']['Row']
type AlgorithmInsert = Tables['algorithms']['Insert']
type AlgorithmUpdate = Tables['algorithms']['Update']
```

### Type Usage Examples

```typescript
// In API routes
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('algorithms')
    .select('*')
    .returns<AlgorithmRow[]>();
}

// In components
interface AlgorithmListProps {
  algorithms: AlgorithmRow[];
  onUpdate: (algorithm: AlgorithmUpdate) => Promise<void>;
}
```

## Table: algorithms
Stores information about quantum algorithms and their applications.

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | Unique identifier for the algorithm |
| slug | string | URL-friendly version of the algorithm name |
| name | string | Display name of the algorithm |
| description | string | Brief description of the algorithm |
| use_cases | object | Array of use cases where this algorithm is applicable |
| quantum_advantage | string | Description of the quantum advantage this algorithm provides |
| published | boolean | Whether the algorithm is publicly visible |
| created_at | string | Timestamp of when the record was created |
| updated_at | string | Timestamp of when the record was last updated |
| main_content | string | Main content in markdown format describing the algorithm |
| ts_content | string | TypeScript content related to the algorithm |

## Table: case_studies
Contains detailed case studies of quantum computing applications.

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | Unique identifier for the case study |
| slug | string | URL-friendly version of the case study title |
| title | string | Title of the case study |
| description | string | Brief description of the case study |
| partner_companies | object | Array of companies partnering in this case study |
| quantum_companies | object | Array of quantum computing companies involved |
| url | object | Related URLs and references |
| algorithms | object | Array of algorithms used in this case study |
| industries | object | Industries relevant to this case study |
| personas | object | Target personas for this case study |
| quantum_hardware | object | Quantum hardware used in this implementation |
| published | boolean | Whether the case study is publicly visible |
| published_at | string | Timestamp when the case study was published |
| created_at | string | Timestamp of when the record was created |
| updated_at | string | Timestamp of when the record was last updated |
| main_content | string | Main content in markdown format of the case study |
| ts_content | string | TypeScript content related to the case study |

## Table: case_study_relations
Manages relationships between case studies and other entities (currently empty).

## Table: industries
Catalogs different industries and their quantum computing applications.

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | Unique identifier for the industry |
| slug | string | URL-friendly version of the industry name |
| name | string | Name of the industry |
| description | string | Description of the industry |
| icon | string | Icon identifier for the industry |
| created_at | string | Timestamp of when the record was created |
| main_content | string | Main content in markdown format about the industry |
| ts_content | string | TypeScript content related to the industry |

## Table: personas
Defines user personas for targeting content and experiences.

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | Unique identifier for the persona |
| slug | string | URL-friendly version of the persona name |
| name | string | Name of the persona |
| description | string | Description of the persona |
| role | string | Professional role of the persona |
| industry | object | Related industry information |
| created_at | string | Timestamp of when the record was created |
| main_content | string | Main content in markdown format about the persona |
| expertise | object | Areas of expertise |
| persona_type | object | Type classification of the persona |
| related_case_studies | object | Case studies relevant to this persona |
| ts_content | string | TypeScript content related to the persona |


## Table: user_preferences
Stores user preferences and settings.

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | Unique identifier for the user preferences |
| theme_preference | string | User's preferred UI theme |
| ui_preferences | object | General UI preferences and settings |
| email_preferences | object | Email notification preferences |
| created_at | string | Timestamp of when the record was created |
| updated_at | string | Timestamp of when the record was last updated |
| role | string | User's role in the system |

