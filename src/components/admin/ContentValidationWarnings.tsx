'use client';

/**
 * Content Validation Warnings Component
 * Displays real-time validation issues for content being edited
 */

import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { severityColors } from '@/lib/design-tokens';
import { cn } from '@/lib/utils';
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
      <Alert className={cn(severityColors.success.bg, severityColors.success.border, className)}>
        <CheckCircle2 className={cn("h-4 w-4", severityColors.success.icon)} />
        <AlertTitle className={severityColors.success.text}>All good!</AlertTitle>
        <AlertDescription className={severityColors.success.text}>
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
          className={cn(severityColors.error.bg, severityColors.error.border)}
        >
          <AlertCircle className={cn("h-4 w-4", severityColors.error.icon)} />
          <AlertTitle className={severityColors.error.text}>
            {getFieldLabel(issue.field)}: {issue.message}
          </AlertTitle>
          {issue.suggestion && (
            <AlertDescription className={severityColors.error.text}>
              Suggestion: <strong>{issue.suggestion}</strong>
            </AlertDescription>
          )}
          {issue.found && (
            <AlertDescription className={cn(severityColors.error.text, "mt-1")}>
              Found: <code className={cn(severityColors.error.bg, "px-1 rounded")}>{issue.found}</code>
            </AlertDescription>
          )}
        </Alert>
      ))}

      {/* Warnings */}
      {warnings.map((issue, index) => (
        <Alert
          key={`warning-${index}`}
          className={cn(severityColors.warning.bg, severityColors.warning.border)}
        >
          <AlertTriangle className={cn("h-4 w-4", severityColors.warning.icon)} />
          <AlertTitle className={severityColors.warning.text}>
            {getFieldLabel(issue.field)}: {issue.message}
          </AlertTitle>
          {issue.suggestion && (
            <AlertDescription className={severityColors.warning.text}>
              Suggestion: <strong>{issue.suggestion}</strong>
            </AlertDescription>
          )}
          {issue.found && (
            <AlertDescription className={cn(severityColors.warning.text, "mt-1")}>
              Found: <code className={cn(severityColors.warning.bg, "px-1 rounded")}>{issue.found}</code>
            </AlertDescription>
          )}
        </Alert>
      ))}

      {/* Info */}
      {info.map((issue, index) => (
        <Alert key={`info-${index}`} className={cn(severityColors.info.bg, severityColors.info.border)}>
          <Info className={cn("h-4 w-4", severityColors.info.icon)} />
          <AlertTitle className={severityColors.info.text}>
            {getFieldLabel(issue.field)}: {issue.message}
          </AlertTitle>
          {issue.suggestion && (
            <AlertDescription className={severityColors.info.text}>
              Suggestion: <strong>{issue.suggestion}</strong>
            </AlertDescription>
          )}
          {issue.found && (
            <AlertDescription className={cn(severityColors.info.text, "mt-1")}>
              Found: <code className={cn(severityColors.info.bg, "px-1 rounded")}>{issue.found}</code>
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
      <div className={cn("inline-flex items-center gap-1 text-sm", severityColors.success.icon)}>
        <CheckCircle2 className="h-4 w-4" />
        <span>Valid</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      {errors > 0 && (
        <span className={cn("inline-flex items-center gap-1", severityColors.error.icon)}>
          <AlertCircle className="h-4 w-4" />
          {errors}
        </span>
      )}
      {warnings > 0 && (
        <span className={cn("inline-flex items-center gap-1", severityColors.warning.icon)}>
          <AlertTriangle className="h-4 w-4" />
          {warnings}
        </span>
      )}
      {info > 0 && (
        <span className={cn("inline-flex items-center gap-1", severityColors.info.icon)}>
          <Info className="h-4 w-4" />
          {info}
        </span>
      )}
    </div>
  );
}
