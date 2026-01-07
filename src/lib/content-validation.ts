/**
 * Built-in Content Validation
 * Fast, offline validation for UK English spelling and content quality
 * Replaces external LanguageTool API dependency
 */

import { findUSSpellings } from './spelling-patterns';
import { filterQuantumTerms } from './quantum-dictionary';

export type ValidationSeverity = 'error' | 'warning' | 'info';
export type ValidationType = 'us-spelling' | 'quality' | 'style' | 'required';

export interface ContentIssue {
  type: ValidationType;
  severity: ValidationSeverity;
  message: string;
  suggestion?: string;
  field: string;
  position?: { start: number; end: number };
  found?: string;
}

export interface ContentValidationOptions {
  checkUSSpellings?: boolean;
  checkQuality?: boolean;
  checkRequiredFields?: boolean;
  minTitleLength?: number;
  minDescriptionLength?: number;
  minContentLength?: number;
}

const DEFAULT_OPTIONS: Required<ContentValidationOptions> = {
  checkUSSpellings: true,
  checkQuality: true,
  checkRequiredFields: true,
  minTitleLength: 10,
  minDescriptionLength: 50,
  minContentLength: 100,
};

/**
 * Validate content fields for UK English and quality
 * Returns array of issues found
 */
export function validateContent(
  content: {
    title?: string;
    description?: string;
    main_content?: string;
    content?: string; // Blog posts use 'content' instead of 'main_content'
  },
  options: ContentValidationOptions = {}
): ContentIssue[] {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const issues: ContentIssue[] = [];

  // Normalize field names
  const mainContent = content.main_content || content.content || '';

  // Check required fields
  if (opts.checkRequiredFields) {
    if (!content.title || content.title.trim().length === 0) {
      issues.push({
        type: 'required',
        severity: 'error',
        message: 'Title is required',
        field: 'title',
      });
    }

    if (!content.description || content.description.trim().length === 0) {
      issues.push({
        type: 'required',
        severity: 'error',
        message: 'Description is required',
        field: 'description',
      });
    }
  }

  // Check US spellings in title
  if (opts.checkUSSpellings && content.title) {
    const titleSpellings = findUSSpellings(content.title);
    // Filter out quantum terms that might match patterns
    for (const spelling of titleSpellings) {
      const filteredMatches = filterQuantumTerms(spelling.matches);
      if (filteredMatches.length > 0) {
        issues.push({
          type: 'us-spelling',
          severity: 'warning',
          message: `US spelling detected in title. Consider UK spelling: "${spelling.ukSpelling}"`,
          suggestion: spelling.ukSpelling,
          field: 'title',
          found: filteredMatches.join(', '),
        });
      }
    }
  }

  // Check US spellings in description
  if (opts.checkUSSpellings && content.description) {
    const descriptionSpellings = findUSSpellings(content.description);
    for (const spelling of descriptionSpellings) {
      const filteredMatches = filterQuantumTerms(spelling.matches);
      if (filteredMatches.length > 0) {
        issues.push({
          type: 'us-spelling',
          severity: 'warning',
          message: `US spelling detected in description. Consider UK spelling: "${spelling.ukSpelling}"`,
          suggestion: spelling.ukSpelling,
          field: 'description',
          found: filteredMatches.join(', '),
        });
      }
    }
  }

  // Check US spellings in main content
  if (opts.checkUSSpellings && mainContent) {
    const contentSpellings = findUSSpellings(mainContent);
    for (const spelling of contentSpellings) {
      const filteredMatches = filterQuantumTerms(spelling.matches);
      if (filteredMatches.length > 0) {
        issues.push({
          type: 'us-spelling',
          severity: 'warning',
          message: `US spelling detected in content. Consider UK spelling: "${spelling.ukSpelling}"`,
          suggestion: spelling.ukSpelling,
          field: mainContent === content.content ? 'content' : 'main_content',
          found: filteredMatches.join(', '),
        });
      }
    }
  }

  // Quality checks
  if (opts.checkQuality) {
    // Title length
    if (content.title && content.title.length < opts.minTitleLength) {
      issues.push({
        type: 'quality',
        severity: 'warning',
        message: `Title is quite short (${content.title.length} chars). Consider a more descriptive title (min ${opts.minTitleLength} chars)`,
        field: 'title',
      });
    }

    // Description length
    if (content.description && content.description.length < opts.minDescriptionLength) {
      issues.push({
        type: 'quality',
        severity: 'warning',
        message: `Description is quite short (${content.description.length} chars). Consider adding more detail (min ${opts.minDescriptionLength} chars)`,
        field: 'description',
      });
    }

    // Main content length
    if (mainContent && mainContent.length < opts.minContentLength) {
      issues.push({
        type: 'quality',
        severity: 'info',
        message: `Content is quite short (${mainContent.length} chars). Consider expanding (min ${opts.minContentLength} chars)`,
        field: mainContent === content.content ? 'content' : 'main_content',
      });
    }

    // Check for common style issues
    if (content.title) {
      // Title should not end with period
      if (content.title.trim().endsWith('.')) {
        issues.push({
          type: 'style',
          severity: 'info',
          message: 'Title should not end with a full stop',
          field: 'title',
        });
      }

      // Title should be title case or sentence case
      if (content.title === content.title.toUpperCase() && content.title.length > 10) {
        issues.push({
          type: 'style',
          severity: 'warning',
          message: 'Avoid ALL CAPS in titles',
          field: 'title',
        });
      }
    }

    // Description should end with period
    if (content.description && !content.description.trim().match(/[.!?]$/)) {
      issues.push({
        type: 'style',
        severity: 'info',
        message: 'Description should end with proper punctuation',
        field: 'description',
      });
    }
  }

  return issues;
}

/**
 * Group issues by severity
 */
export function groupIssuesBySeverity(issues: ContentIssue[]): {
  errors: ContentIssue[];
  warnings: ContentIssue[];
  info: ContentIssue[];
} {
  return {
    errors: issues.filter((i) => i.severity === 'error'),
    warnings: issues.filter((i) => i.severity === 'warning'),
    info: issues.filter((i) => i.severity === 'info'),
  };
}

/**
 * Group issues by field
 */
export function groupIssuesByField(
  issues: ContentIssue[]
): Record<string, ContentIssue[]> {
  return issues.reduce((acc, issue) => {
    if (!acc[issue.field]) {
      acc[issue.field] = [];
    }
    acc[issue.field].push(issue);
    return acc;
  }, {} as Record<string, ContentIssue[]>);
}

/**
 * Check if there are any blocking errors
 */
export function hasBlockingErrors(issues: ContentIssue[]): boolean {
  return issues.some((issue) => issue.severity === 'error');
}

/**
 * Get a summary of validation results
 */
export function getValidationSummary(issues: ContentIssue[]): {
  total: number;
  errors: number;
  warnings: number;
  info: number;
  isValid: boolean;
} {
  const grouped = groupIssuesBySeverity(issues);

  return {
    total: issues.length,
    errors: grouped.errors.length,
    warnings: grouped.warnings.length,
    info: grouped.info.length,
    isValid: grouped.errors.length === 0,
  };
}
