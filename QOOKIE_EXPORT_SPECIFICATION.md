# Qookie Export Specification for OpenQase

## Overview

This document specifies the exact JSON format that Qookie should export for seamless integration with OpenQase. The goal is to eliminate all mapping complexity by having Qookie export data in exactly the format OpenQase expects.

## OpenQase Database Structure

### Case Studies Table Structure

Based on the production schema, the `case_studies` table has the following structure:

```sql
CREATE TABLE case_studies (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug text NOT NULL UNIQUE,
    title text NOT NULL,
    description text,
    main_content text,
    partner_companies text[],
    quantum_companies text[],
    algorithms text[],
    quantum_hardware text[],
    quantum_software text[],
    published boolean DEFAULT false,
    published_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    academic_references text,
    resource_links jsonb DEFAULT '[]'::jsonb
);
```

### Relationship Tables

Case studies are linked to industries and personas through relationship tables:

1. **Industries** - linked via `case_study_industry_relations`
2. **Personas** - linked via `case_study_persona_relations`

## Required Export Format

### JSON Schema

Qookie should export case studies as a JSON array with the following structure:

```json
{
  "case_studies": [
    {
      "qookie_id": "string",
      "qookie_slug": "string", 
      "slug": "string",
      "title": "string",
      "description": "string|null",
      "main_content": "string|null",
      "partner_companies": ["string"],
      "quantum_companies": ["string"],
      "algorithms": ["string"],
      "quantum_hardware": ["string"],
      "quantum_software": ["string"],
      "academic_references": "string|null",
      "resource_links": [
        {
          "title": "string",
          "url": "string",
          "type": "string"
        }
      ],
      "industries": ["string"],
      "personas": ["string"],
      "year": number,
      "published": boolean
    }
  ]
}
```

### Field Specifications

#### Core Content Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `qookie_id` | string | Yes | Original Qookie internal ID |
| `qookie_slug` | string | Yes | Original Qookie slug |
| `slug` | string | Yes | URL-friendly identifier (must be unique) |
| `title` | string | Yes | Case study title |
| `description` | string\|null | No | Brief description/summary |
| `main_content` | string\|null | No | Full case study content (HTML or Markdown) |
| `academic_references` | string\|null | No | Academic citations and references |
| `year` | number | No | Year of implementation (defaults to current year) |
| `published` | boolean | No | Publication status (defaults to false) |

#### Array Fields (Company/Technology Lists)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partner_companies` | string[] | No | Traditional companies involved |
| `quantum_companies` | string[] | No | Quantum computing companies involved |
| `algorithms` | string[] | No | Quantum algorithms used |
| `quantum_hardware` | string[] | No | Quantum hardware platforms used |
| `quantum_software` | string[] | No | Quantum software/frameworks used |

#### Relationship Fields (Taxonomy)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `industries` | string[] | No | Industry slugs (see taxonomy below) |
| `personas` | string[] | No | Persona slugs (see taxonomy below) |

#### Resource Links

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `resource_links` | object[] | No | External resources and links |
| `resource_links[].title` | string | Yes | Link title |
| `resource_links[].url` | string | Yes | URL |
| `resource_links[].type` | string | No | Link type (e.g., "paper", "demo", "code") |

## OpenQase Taxonomy Values

### Industries (Use these exact slugs)

Based on the current OpenQase taxonomy, use these industry slugs:

```json
[
  "quantum-computing",
  "financial-services", 
  "healthcare",
  "manufacturing",
  "aerospace",
  "automotive",
  "energy",
  "telecommunications",
  "logistics",
  "cybersecurity",
  "pharmaceuticals",
  "chemical",
  "retail",
  "media",
  "government"
]
```

### Personas (Use these exact slugs)

```json
[
  "quantum-researcher",
  "technology-executive", 
  "data-scientist",
  "business-analyst",
  "software-engineer",
  "product-manager",
  "quantum-engineer",
  "cto",
  "ciso",
  "cfo",
  "consultant",
  "investor"
]
```

### Algorithms (Use these exact values)

```json
[
  "quantum-phase-estimation",
  "grovers-algorithm", 
  "quantum-fourier-transform",
  "shors-algorithm",
  "variational-quantum-eigensolver",
  "quantum-approximate-optimization-algorithm",
  "quantum-machine-learning",
  "quantum-walk",
  "quantum-counting",
  "quantum-teleportation",
  "quantum-key-distribution",
  "deutsch-jozsa-algorithm",
  "bernstein-vazirani-algorithm",
  "simons-algorithm",
  "quantum-simulation"
]
```

## Example Export

```json
{
  "case_studies": [
    {
      "qookie_id": "qookie_case_123",
      "qookie_slug": "original-qookie-slug",
      "slug": "quantum-ml-drug-discovery",
      "title": "Quantum Machine Learning in Drug Discovery",
      "description": "How quantum algorithms are accelerating pharmaceutical research and reducing drug discovery timelines by 40%.",
      "main_content": "<h2>Overview</h2><p>This case study explores...</p>",
      "partner_companies": ["PharmaCorp", "BioTech Inc", "Roche"],
      "quantum_companies": ["IBM Quantum", "Google Quantum AI", "Rigetti"],
      "algorithms": ["variational-quantum-eigensolver", "quantum-machine-learning"],
      "quantum_hardware": ["IBM Quantum Network", "Google Sycamore"],
      "quantum_software": ["Qiskit", "Cirq", "PennyLane"],
      "academic_references": "1. Smith, J. et al. (2023). Quantum ML in Drug Discovery. Nature Quantum Information.\n2. Doe, A. (2023). VQE Applications in Chemistry.",
      "resource_links": [
        {
          "title": "Research Paper",
          "url": "https://example.com/paper.pdf",
          "type": "paper"
        },
        {
          "title": "Demo Video", 
          "url": "https://youtube.com/watch?v=example",
          "type": "demo"
        }
      ],
      "industries": ["pharmaceuticals", "healthcare"],
      "personas": ["quantum-researcher", "data-scientist", "technology-executive"],
      "year": 2023,
      "published": true
    }
  ]
}
```

## Validation Rules

### Required Validations

1. **Unique Slugs**: Each `slug` must be unique across all case studies
2. **Valid Slugs**: Slugs must be URL-safe (lowercase, hyphens, no spaces)
3. **Valid Industries**: All industry slugs must match the approved taxonomy
4. **Valid Personas**: All persona slugs must match the approved taxonomy  
5. **Valid URLs**: All resource link URLs must be valid HTTP/HTTPS URLs

### Data Quality Guidelines

1. **Content Length**: `main_content` should be substantial (recommended minimum 500 characters)
2. **Description**: Should be 1-3 sentences, under 300 characters
3. **Title**: Should be descriptive and under 100 characters
4. **Arrays**: Empty arrays are acceptable, but avoid null values
5. **Year**: Should be realistic (between 2020-2030)

## Import Process

Once exported in this format, OpenQase will:

1. **Direct Import**: Import case studies directly into staging tables
2. **Validation**: Validate against taxonomy and business rules
3. **Relationship Creation**: Automatically create industry/persona relationships
4. **Promotion**: Move validated data to production tables
5. **No Mapping Required**: Zero transformation needed

## Benefits of This Approach

1. **Zero Mapping Complexity**: Data imports directly without transformation
2. **Faster Import Process**: No ETL pipeline needed
3. **Data Integrity**: Validation happens at import, not transformation
4. **Audit Trail**: Original Qookie data preserved alongside transformed data
5. **Simplified Workflow**: Single JSON export → direct import

## Support

For questions about this specification:

- **Technical Issues**: Reference the OpenQase database schema
- **Taxonomy Updates**: Check the current production taxonomy values
- **Field Questions**: See the staging table structure in migrations
- **Validation Errors**: Review the import batch error logs

---

**Version**: 1.0  
**Date**: 2025-07-27  
**Status**: Ready for Implementation