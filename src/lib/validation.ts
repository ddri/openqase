import { BaseContent, RelatedContent } from './types'

export class ContentValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ContentValidationError'
  }
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateContent(
  content: any,
  contentType: string,
  contentId: string
): ValidationResult {
  const errors: string[] = []

  // Required fields for all content
  if (!content) {
    errors.push('Content is undefined or null')
    return { isValid: false, errors }
  }

  // Check basic content structure
  if (!content.title) errors.push('Missing title')
  if (!content.description) errors.push('Missing description')
  if (!content.rawContent) errors.push('Missing content body')

  // Validate related content if present
  if (content.relatedContent) {
    if (content.relatedContent.algorithm) {
      if (!Array.isArray(content.relatedContent.algorithm)) {
        errors.push('Related algorithms must be an array')
      }
    }
    if (content.relatedContent.caseStudy) {
      if (!Array.isArray(content.relatedContent.caseStudy)) {
        errors.push('Related case studies must be an array')
      }
    }
  }

  // Validate applications if present
  if (content.applications) {
    if (!Array.isArray(content.applications)) {
      errors.push('Applications must be an array')
    } else {
      content.applications.forEach((app: any, index: number) => {
        if (!app.title) errors.push(`Application ${index + 1} missing title`)
        if (!app.description) errors.push(`Application ${index + 1} missing description`)
        if (!Array.isArray(app.examples)) {
          errors.push(`Application ${index + 1} examples must be an array`)
        }
      })
    }
  }

  // MDX-specific validation
  if (typeof content.rawContent !== 'string') {
    errors.push('Content body must be a string')
  } else {
    // Basic MDX structure validation
    if (content.rawContent.includes('```') && !content.rawContent.match(/```[\s\S]*?```/g)) {
      errors.push('Malformed code blocks in content')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
} 