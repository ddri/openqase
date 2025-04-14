# OpenQASE API Documentation

## Overview

The OpenQASE API provides endpoints for managing case studies, algorithms, industries, user personas, and user preferences. All endpoints follow RESTful conventions and return JSON responses.

## Authentication

Most endpoints require authentication using Supabase. The authentication token should be included in the request headers:

```http
Authorization: Bearer <your-supabase-token>
```

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Endpoints

### Case Studies

#### List Case Studies
```http
GET /case-studies
```

Query Parameters:
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `industry` (optional): Filter by industry slug
- `algorithm` (optional): Filter by algorithm slug
- `persona` (optional): Filter by persona slug

Response:
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "slug": "string",
      "summary": "string",
      "content": "string",
      "difficulty_level": "beginner" | "intermediate" | "advanced",
      "estimated_time": "string",
      "partner_company": ["string"],
      "quantum_company": ["string"],
      "created_at": "string",
      "updated_at": "string",
      "industry": {
        "id": "string",
        "name": "string",
        "slug": "string"
      },
      "algorithms": [
        {
          "id": "string",
          "name": "string",
          "slug": "string"
        }
      ]
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "total_pages": "number"
  }
}
```

#### Get Single Case Study
```http
GET /case-studies/[slug]
```

Response:
```json
{
  "data": {
    "id": "string",
    "title": "string",
    "slug": "string",
    "summary": "string",
    "content": "string",
    "difficulty_level": "beginner" | "intermediate" | "advanced",
    "estimated_time": "string",
    "partner_company": ["string"],
    "quantum_company": ["string"],
    "created_at": "string",
    "updated_at": "string",
    "industry": {
      "id": "string",
      "name": "string",
      "slug": "string",
      "description": "string",
      "related_case_studies": [
        {
          "id": "string",
          "title": "string",
          "slug": "string"
        }
      ]
    },
    "algorithms": [
      {
        "id": "string",
        "name": "string",
        "slug": "string",
        "description": "string",
        "related_case_studies": [
          {
            "id": "string",
            "title": "string",
            "slug": "string"
          }
        ]
      }
    ]
  }
}
```

### Industries

#### List Industries
```http
GET /industries
```

Response:
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "slug": "string",
      "description": "string",
      "related_case_studies": [
        {
          "id": "string",
          "title": "string",
          "slug": "string"
        }
      ]
    }
  ]
}
```

#### Get Single Industry
```http
GET /industries/[slug]
```

Response:
```json
{
  "data": {
    "id": "string",
    "name": "string",
    "slug": "string",
    "description": "string",
    "related_case_studies": [
      {
        "id": "string",
        "title": "string",
        "slug": "string",
        "summary": "string",
        "difficulty_level": "string",
        "estimated_time": "string"
      }
    ],
    "related_algorithms": [
      {
        "id": "string",
        "name": "string",
        "slug": "string",
        "description": "string"
      }
    ]
  }
}
```

### Algorithms

#### List Algorithms
```http
GET /algorithms
```

Response:
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "slug": "string",
      "description": "string",
      "related_case_studies": [
        {
          "id": "string",
          "title": "string",
          "slug": "string"
        }
      ]
    }
  ]
}
```

#### Get Single Algorithm
```http
GET /algorithms/[slug]
```

Response:
```json
{
  "data": {
    "id": "string",
    "name": "string",
    "slug": "string",
    "description": "string",
    "related_case_studies": [
      {
        "id": "string",
        "title": "string",
        "slug": "string",
        "summary": "string",
        "difficulty_level": "string",
        "estimated_time": "string"
      }
    ],
    "related_industries": [
      {
        "id": "string",
        "name": "string",
        "slug": "string",
        "description": "string"
      }
    ]
  }
}
```

### User Personas

#### List User Personas
```http
GET /personas
```

Response:
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "slug": "string",
      "description": "string",
      "industry_focus": "string",
      "key_interests": ["string"],
      "related_case_studies": [
        {
          "id": "string",
          "title": "string",
          "slug": "string"
        }
      ]
    }
  ]
}
```

#### Get Single Persona
```http
GET /personas/[slug]
```

Response:
```json
{
  "data": {
    "id": "string",
    "name": "string",
    "slug": "string",
    "description": "string",
    "industry_focus": "string",
    "key_interests": ["string"],
    "related_case_studies": [
      {
        "id": "string",
        "title": "string",
        "slug": "string",
        "summary": "string",
        "difficulty_level": "string",
        "estimated_time": "string"
      }
    ],
    "related_industries": [
      {
        "id": "string",
        "name": "string",
        "slug": "string",
        "description": "string"
      }
    ]
  }
}
```

### User Preferences

#### Get User Preferences
```http
GET /user/preferences
```

Requires authentication.

Response:
```json
{
  "data": {
    "id": "string",
    "user_id": "string",
    "theme": "light" | "dark" | "system",
    "email_notifications": boolean,
    "ui_settings": {
      "sidebar_collapsed": boolean,
      "show_progress": boolean
    },
    "created_at": "string",
    "updated_at": "string"
  }
}
```

#### Update User Preferences
```http
PATCH /user/preferences
```

Requires authentication.

Request Body:
```json
{
  "theme": "light" | "dark" | "system",
  "email_notifications": boolean,
  "ui_settings": {
    "sidebar_collapsed": boolean,
    "show_progress": boolean
  }
}
```

Response:
```json
{
  "data": {
    "id": "string",
    "user_id": "string",
    "theme": "string",
    "email_notifications": boolean,
    "ui_settings": {
      "sidebar_collapsed": boolean,
      "show_progress": boolean
    },
    "created_at": "string",
    "updated_at": "string"
  }
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Detailed error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "The requested resource was not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Best Practices

1. **Error Handling**
   - Always check the response status code
   - Handle rate limiting by implementing exponential backoff
   - Implement proper error handling for network issues

2. **Authentication**
   - Store the authentication token securely
   - Refresh the token before it expires
   - Handle authentication errors gracefully

3. **Pagination**
   - Use the pagination parameters for large datasets
   - Implement infinite scrolling or pagination controls
   - Cache paginated results when appropriate

4. **Caching**
   - Cache responses when appropriate
   - Use conditional requests with ETags
   - Implement proper cache invalidation strategies

## Future TODO

### Short Term
1. **API Enhancements**
   - Add request validation for PUT endpoints
   - Implement rate limiting
   - Add API versioning
   - Add request/response compression

2. **Content Management**
   - Add draft/preview functionality for case studies
   - Implement content versioning
   - Add bulk operations for admin functions

3. **Search & Discovery**
   - Add full-text search across case studies
   - Implement advanced filtering options
   - Add sorting options for list endpoints

### Medium Term
1. **Analytics & Insights**
   - Track popular content
   - Implement view counts
   - Add user engagement metrics
   - Create analytics dashboard

2. **Performance Optimization**
   - Implement caching layer
   - Add response field selection
   - Optimize database queries
   - Add performance monitoring

3. **User Experience**
   - Add user progress tracking
   - Implement content recommendations
   - Add user bookmarks/favorites
   - Create personalized learning paths

### Long Term
1. **Advanced Features**
   - Implement collaborative features
   - Add commenting system
   - Create interactive tutorials
   - Add real-time updates

2. **Integration & Extension**
   - Add webhook support
   - Create SDK/client libraries
   - Add export functionality
   - Implement third-party integrations

3. **Community Features**
   - Add user contributions
   - Implement peer review system
   - Create community forums
   - Add expert verification system 