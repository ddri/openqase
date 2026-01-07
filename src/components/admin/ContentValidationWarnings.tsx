'use client';

/**
 * Content Validation Warnings Component
 * Displays real-time validation issues for content being edited
 */

import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { ContentIssue } from '@/lib/content-validation';

interface ContentValidationWarningsProps {
  issues: ContentIssue[];
  className?: string;
}

export function ContentValidationWarnings({
  issues,
  className = '',
}: ContentValidationWarningsProps) {
  // Group issues by severity
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');
  const info = issues.filter((i) => i.severity === 'info');

  // If no issues, show success message
  if (issues.length === 0) {
    return (
      <Alert className={`border-green-200 bg-green-50 ${className}`}>
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-900">All good!</AlertTitle>
        <AlertDescription className="text-green-700">
          No validation issues found.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Errors */}
      {errors.map((issue, index) => (
        <Alert
          key={`error-${index}`}
          variant="destructive"
          className="border-red-200 bg-red-50"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-red-900">
            {getFieldLabel(issue.field)}: {issue.message}
          </AlertTitle>
          {issue.suggestion && (
            <AlertDescription className="text-red-700">
              Suggestion: <strong>{issue.suggestion}</strong>
            </AlertDescription>
          )}
          {issue.found && (
            <AlertDescription className="text-red-700 mt-1">
              Found: <code className="bg-red-100 px-1 rounded">{issue.found}</code>
            </AlertDescription>
          )}
        </Alert>
      ))}

      {/* Warnings */}
      {warnings.map((issue, index) => (
        <Alert
          key={`warning-${index}`}
          className="border-yellow-200 bg-yellow-50"
        >
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-900">
            {getFieldLabel(issue.field)}: {issue.message}
          </AlertTitle>
          {issue.suggestion && (
            <AlertDescription className="text-yellow-700">
              Suggestion: <strong>{issue.suggestion}</strong>
            </AlertDescription>
          )}
          {issue.found && (
            <AlertDescription className="text-yellow-700 mt-1">
              Found: <code className="bg-yellow-100 px-1 rounded">{issue.found}</code>
            </AlertDescription>
          )}
        </Alert>
      ))}

      {/* Info */}
      {info.map((issue, index) => (
        <Alert key={`info-${index}`} className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-900">
            {getFieldLabel(issue.field)}: {issue.message}
          </AlertTitle>
          {issue.suggestion && (
            <AlertDescription className="text-blue-700">
              Suggestion: <strong>{issue.suggestion}</strong>
            </AlertDescription>
          )}
          {issue.found && (
            <AlertDescription className="text-blue-700 mt-1">
              Found: <code className="bg-blue-100 px-1 rounded">{issue.found}</code>
            </AlertDescription>
          )}
        </Alert>
      ))}
    </div>
  );
}

/**
 * Get a human-readable label for a field name
 */
function getFieldLabel(field: string): string {
  const labels: Record<string, string> = {
    title: 'Title',
    description: 'Description',
    main_content: 'Main Content',
    content: 'Content',
    name: 'Name',
    recommended_reading: 'Recommended Reading',
  };

  return labels[field] || field;
}

/**
 * Compact version showing just a count
 */
export function ContentValidationBadge({
  issues,
}: {
  issues: ContentIssue[];
}) {
  const errors = issues.filter((i) => i.severity === 'error').length;
  const warnings = issues.filter((i) => i.severity === 'warning').length;
  const info = issues.filter((i) => i.severity === 'info').length;

  if (issues.length === 0) {
    return (
      <div className="inline-flex items-center gap-1 text-sm text-green-600">
        <CheckCircle2 className="h-4 w-4" />
        <span>Valid</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      {errors > 0 && (
        <span className="inline-flex items-center gap-1 text-red-600">
          <AlertCircle className="h-4 w-4" />
          {errors}
        </span>
      )}
      {warnings > 0 && (
        <span className="inline-flex items-center gap-1 text-yellow-600">
          <AlertTriangle className="h-4 w-4" />
          {warnings}
        </span>
      )}
      {info > 0 && (
        <span className="inline-flex items-center gap-1 text-blue-600">
          <Info className="h-4 w-4" />
          {info}
        </span>
      )}
    </div>
  );
}
