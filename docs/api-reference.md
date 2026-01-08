# OpenQase API Reference

Complete reference documentation for the OpenQase REST API.

## Base URL

```
Production: https://openqase.com/api
Local: http://localhost:3000/api
```

## Overview

The OpenQase API is a REST API that provides access to quantum computing case studies, algorithms, industries, personas, and ecosystem data. The API uses JSON for requests and responses.

### Key Features

- **RESTful Design** - Standard HTTP methods (GET, POST, PUT, DELETE)
- **JSON Format** - All requests and responses use JSON
- **Rate Limited** - Protection against abuse
- **Authentication** - Admin operations require authentication
- **Pagination** - List endpoints support pagination
- **Filtering** - Query parameters for filtering results

---

## Authentication

### Public Endpoints

Most **GET** requests are public and do not require authentication:
- `/api/case-studies` (GET)
- `/api/algorithms` (GET)
- `/api/industries` (GET)
- `/api/personas` (GET)
- `/api/newsletter` (POST - special case)
- `/api/search-data` (GET)

### Admin Endpoints

**POST, PUT, PATCH, DELETE** requests require admin authentication:

**Authentication Method:** Cookie-based session authentication via Supabase Auth

**Headers Required:**
```http
Cookie: sb-access-token=<your-session-token>
```

**How to Authenticate:**
1. Sign in via `/auth` page
2. Session cookie is automatically set
3. Cookie is sent with subsequent requests

**Admin Check:**
- User must be authenticated
- User must have `role: 'admin'` in `user_preferences` table

**Unauthorized Response:**
```json
{
  "error": "Authentication required"
}
```
**Status Code:** `401`

**Forbidden Response:**
```json
{
  "error": "Admin access required"
}
```
**Status Code:** `403`

---

## Rate Limiting

Rate limiting protects the API from abuse. Limits are applied per IP address.

### Newsletter Endpoint

```
Limit: 5 requests per 5 minutes
Endpoint: /api/newsletter
```

**Configurable via environment variables:**
- `RATE_LIMIT_NEWSLETTER` (default: 5)
- `RATE_LIMIT_NEWSLETTER_WINDOW` (default: 300000ms = 5 minutes)

### General Endpoints

```
Limit: 100 requests per 15 minutes
Endpoints: All other API endpoints
```

**Configurable via environment variables:**
- `RATE_LIMIT_GENERAL` (default: 100)
- `RATE_LIMIT_GENERAL_WINDOW` (default: 900000ms = 15 minutes)

### Rate Limit Headers

Rate-limited responses include these headers:

```http
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 2
Retry-After: 180
```

### Rate Limit Exceeded Response

```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 180
}
```
**Status Code:** `429`

---

## Error Codes

The API uses standard HTTP status codes:

| Status Code | Meaning | Description |
|-------------|---------|-------------|
| `200` | OK | Request succeeded |
| `400` | Bad Request | Invalid request parameters or body |
| `401` | Unauthorized | Authentication required |
| `403` | Forbidden | Insufficient permissions (not admin) |
| `404` | Not Found | Resource not found |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Server error occurred |

### Error Response Format

```json
{
  "error": "Error message describing what went wrong"
}
```

**Example Error Responses:**

```json
// 400 Bad Request
{
  "error": "Invalid email address"
}

// 404 Not Found
{
  "error": "Case study not found"
}

// 429 Rate Limit
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 300
}

// 500 Server Error
{
  "error": "Failed to fetch case studies"
}
```

---

## Pagination

List endpoints support pagination via query parameters:

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number (1-indexed) |
| `pageSize` | integer | 10 | Items per page |

### Response Format

```json
{
  "items": [...],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 45,
    "totalPages": 5
  }
}
```

### Example Request

```http
GET /api/case-studies?page=2&pageSize=20
```

### Example Response

```json
{
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "IBM Quantum for Aerospace",
      "slug": "ibm-quantum-aerospace",
      "published": true
    }
  ],
  "pagination": {
    "page": 2,
    "pageSize": 20,
    "totalItems": 45,
    "totalPages": 3
  }
}
```

---

## Filtering & Sorting

### Common Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `slug` | string | Get single item by slug | `?slug=quantum-annealing` |
| `published` | boolean | Filter by published status (admin only) | `?published=true` |
| `algorithm` | string | Filter by algorithm name | `?algorithm=VQE` |
| `industry` | string | Filter by industry | `?industry=aerospace` |

### Example: Filter Case Studies by Algorithm

```http
GET /api/case-studies?algorithm=VQE&page=1&pageSize=10
```

---

## API Endpoints

### Case Studies

#### List Case Studies

```http
GET /api/case-studies
```

**Query Parameters:**
- `page` (integer) - Page number
- `pageSize` (integer) - Items per page
- `algorithm` (string) - Filter by algorithm name
- `industry` (string) - Filter by industry slug

**Response:** `200 OK`
```json
{
  "items": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string",
      "year": 2024,
      "published": true,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 45,
    "totalPages": 5
  }
}
```

#### Get Single Case Study

```http
GET /api/case-studies?slug={slug}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "title": "string",
  "slug": "string",
  "description": "string",
  "main_content": "string",
  "year": 2024,
  "published": true,
  "related_algorithms": [
    {
      "id": "uuid",
      "name": "VQE",
      "slug": "vqe"
    }
  ],
  "related_industries": [
    {
      "id": "uuid",
      "name": "Aerospace",
      "slug": "aerospace"
    }
  ],
  "related_personas": [
    {
      "id": "uuid",
      "name": "CTO",
      "slug": "cto"
    }
  ]
}
```

#### Create/Update Case Study

```http
POST /api/case-studies
```

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "id": "uuid (optional for update)",
  "title": "string (required)",
  "slug": "string (required)",
  "description": "string",
  "main_content": "string",
  "year": 2024,
  "published": true,
  "algorithms": ["algorithm-id-1", "algorithm-id-2"],
  "industries": ["industry-id-1"],
  "personas": ["persona-id-1"]
}
```

**Response:** `200 OK`
```json
{
  "message": "Case study saved successfully",
  "data": {
    "id": "uuid",
    "title": "string",
    "slug": "string"
  }
}
```

#### Soft Delete Case Study

```http
DELETE /api/case-studies?id={uuid}
```

**Authentication:** Required (Admin)

**Response:** `200 OK`
```json
{
  "message": "Case study deleted successfully"
}
```

#### Restore Case Study

```http
POST /api/case-studies/restore
```

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "id": "uuid"
}
```

**Response:** `200 OK`
```json
{
  "message": "Case study restored successfully"
}
```

#### Permanently Delete Case Study

```http
DELETE /api/case-studies/permanent-delete?id={uuid}
```

**Authentication:** Required (Admin)

**Warning:** This action is irreversible.

**Response:** `200 OK`
```json
{
  "message": "Case study permanently deleted"
}
```

---

### Algorithms

#### List Algorithms

```http
GET /api/algorithms
```

**Query Parameters:**
- `page` (integer) - Page number
- `pageSize` (integer) - Items per page

**Response:** `200 OK`
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Variational Quantum Eigensolver (VQE)",
      "slug": "vqe",
      "description": "string",
      "published": true
    }
  ],
  "pagination": {...}
}
```

#### Get Single Algorithm

```http
GET /api/algorithms?slug={slug}
```

**Response:** Same as case study pattern

#### Create/Update Algorithm

```http
POST /api/algorithms
```

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "id": "uuid (optional)",
  "name": "string (required)",
  "slug": "string (required)",
  "description": "string",
  "main_content": "string",
  "published": true
}
```

#### Delete Algorithm

```http
DELETE /api/algorithms?id={uuid}
```

**Authentication:** Required (Admin)

---

### Industries

#### List Industries

```http
GET /api/industries
```

**Query Parameters:**
- `page` (integer)
- `pageSize` (integer)

**Response:** Same pattern as algorithms

#### Get Single Industry

```http
GET /api/industries?slug={slug}
```

#### Create/Update Industry

```http
POST /api/industries
```

**Authentication:** Required (Admin)

#### Delete Industry

```http
DELETE /api/industries?id={uuid}
```

**Authentication:** Required (Admin)

---

### Personas

#### List Personas

```http
GET /api/personas
```

**Query Parameters:**
- `page` (integer)
- `pageSize` (integer)

**Response:** Same pattern as algorithms

#### Get Single Persona

```http
GET /api/personas?slug={slug}
```

#### Create/Update Persona

```http
POST /api/personas
```

**Authentication:** Required (Admin)

#### Delete Persona

```http
DELETE /api/personas?id={uuid}
```

**Authentication:** Required (Admin)

---

### Quantum Ecosystem

#### Quantum Companies

```http
GET /api/quantum-companies
POST /api/quantum-companies (Admin)
DELETE /api/quantum-companies?id={uuid} (Admin)
```

#### Partner Companies

```http
GET /api/partner-companies
POST /api/partner-companies (Admin)
DELETE /api/partner-companies?id={uuid} (Admin)
```

#### Quantum Hardware

```http
GET /api/quantum-hardware
POST /api/quantum-hardware (Admin)
DELETE /api/quantum-hardware?id={uuid} (Admin)
```

#### Quantum Software

```http
GET /api/quantum-software
POST /api/quantum-software (Admin)
DELETE /api/quantum-software?id={uuid} (Admin)
```

**Note:** All ecosystem endpoints follow the same pattern as other content types.

---

### Blog Posts

#### List Blog Posts

```http
GET /api/blog-posts
```

#### Get Single Blog Post

```http
GET /api/blog-posts?slug={slug}
```

#### Create/Update Blog Post

```http
POST /api/blog-posts
```

**Authentication:** Required (Admin)

#### Delete Blog Post

```http
DELETE /api/blog-posts?id={uuid}
```

**Authentication:** Required (Admin)

---

### Newsletter

#### Subscribe to Newsletter

```http
POST /api/newsletter
```

**Rate Limit:** 5 requests per 5 minutes

**Request Body:**
```json
{
  "email": "user@example.com",
  "source": "website"
}
```

**Validation:**
- `email` must be valid email format
- `source` is optional (default: "website")

**Response:** `200 OK`
```json
{
  "message": "Successfully subscribed to newsletter",
  "email": "user@example.com",
  "alreadySubscribed": false
}
```

**Error Response:** `400 Bad Request`
```json
{
  "error": "Invalid email address"
}
```

#### Get Newsletter Subscription Status

```http
GET /api/newsletter/subscription?email={email}
```

**Response:** `200 OK`
```json
{
  "subscribed": true,
  "email": "user@example.com"
}
```

---

### Search Data

#### Get Search Index

```http
GET /api/search-data
```

**Description:** Returns complete search index for client-side search functionality.

**Response:** `200 OK`
```json
{
  "caseStudies": [...],
  "algorithms": [...],
  "industries": [...],
  "personas": [...]
}
```

---

### Preview Mode

#### Enable Preview Mode

```http
GET /api/preview?secret={secret}&slug={content-slug}
```

**Query Parameters:**
- `secret` (string, required) - Preview secret from `PREVIEW_SECRET` env var
- `slug` (string, required) - Content slug to preview

**Description:** Enables Next.js preview mode to view unpublished content.

**Response:** `200 OK` - Redirects to content page

**Error:** `401 Unauthorized` if secret is invalid

---

### Import System

**Status:** Removed in v0.6.0

The admin UI for batch imports has been removed. For bulk imports, use the command-line script:
```bash
tsx scripts/import-case-studies-with-mapping.ts /path/to/json/files --commit
```

See `docs/import-system.md` for detailed script documentation.

**Note:** The import system will be redesigned and reimplemented in v0.7.0 with proper database migrations and improved workflow.

---

## Code Examples

### JavaScript/TypeScript

#### Fetch Case Studies

```typescript
// Fetch all case studies
const response = await fetch('https://openqase.com/api/case-studies?page=1&pageSize=10');
const data = await response.json();

console.log(data.items); // Array of case studies
console.log(data.pagination); // Pagination info
```

#### Fetch Single Case Study

```typescript
const response = await fetch('https://openqase.com/api/case-studies?slug=ibm-quantum-aerospace');
const caseStudy = await response.json();

console.log(caseStudy.title);
console.log(caseStudy.related_algorithms);
```

#### Filter by Algorithm

```typescript
const response = await fetch('https://openqase.com/api/case-studies?algorithm=VQE');
const data = await response.json();

// Returns only case studies related to VQE algorithm
console.log(data.items);
```

#### Subscribe to Newsletter

```typescript
const response = await fetch('https://openqase.com/api/newsletter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    source: 'homepage'
  })
});

const result = await response.json();

if (response.ok) {
  console.log('Subscribed:', result.email);
} else {
  console.error('Error:', result.error);
}
```

#### Create Case Study (Admin)

```typescript
// Must be authenticated with admin session cookie
const response = await fetch('https://openqase.com/api/case-studies', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Important: Send cookies
  body: JSON.stringify({
    title: 'New Quantum Case Study',
    slug: 'new-quantum-case-study',
    description: 'A groundbreaking application...',
    main_content: 'Full content here...',
    year: 2024,
    published: true,
    algorithms: ['algorithm-uuid-1'],
    industries: ['industry-uuid-1']
  })
});

const result = await response.json();
console.log(result.message);
```

### cURL

#### Get Case Studies

```bash
curl https://openqase.com/api/case-studies?page=1&pageSize=10
```

#### Get Single Case Study

```bash
curl "https://openqase.com/api/case-studies?slug=ibm-quantum-aerospace"
```

#### Subscribe to Newsletter

```bash
curl -X POST https://openqase.com/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","source":"website"}'
```

#### Create Case Study (Admin)

```bash
curl -X POST https://openqase.com/api/case-studies \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_SESSION_TOKEN" \
  -d '{
    "title": "New Case Study",
    "slug": "new-case-study",
    "description": "Description",
    "published": true
  }'
```

### Python

```python
import requests

# Get case studies
response = requests.get('https://openqase.com/api/case-studies', params={
    'page': 1,
    'pageSize': 10
})
data = response.json()

# Subscribe to newsletter
response = requests.post('https://openqase.com/api/newsletter', json={
    'email': 'user@example.com',
    'source': 'python-script'
})
result = response.json()
```

---

## Related Documentation

- [Environment Variables](./environment-variables.md) - Configure API settings
- [Unified Content Fetching](./unified-content-fetching.md) - Server-side content API
- [Authentication](./authentication.md) - Auth patterns and setup

---

**Last Updated:** January 2026
**API Version:** v0.5.0
**Next Review:** With v0.6.0 release (February 2026)
