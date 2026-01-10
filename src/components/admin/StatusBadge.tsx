import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  /** Publication status - boolean (true=published, false=draft) or string ("Published", "Draft", "Scheduled") */
  status: boolean | string;
  /** Whether the item is deleted/archived */
  deleted?: boolean;
  /** Additional className for customization */
  className?: string;
}

/**
 * StatusBadge - Unified status display component
 *
 * Replaces multiple inconsistent inline implementations of status badges
 * across admin list views with a single, consistent component.
 *
 * @example
 * ```tsx
 * // Simple usage with boolean
 * <StatusBadge status={row.original.published} />
 *
 * // With string status (for blog posts)
 * <StatusBadge status="Scheduled" />
 *
 * // With deleted status
 * <StatusBadge status={false} deleted={row.original.deleted_at !== null} />
 * ```
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  deleted,
  className,
}) => {
  if (deleted) {
    return (
      <Badge
        variant="secondary"
        className={cn(
          "bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-950 dark:text-gray-200 dark:border-gray-800",
          className
        )}
      >
        Deleted
      </Badge>
    );
  }

  // Handle string status (for blog posts with Scheduled state)
  if (typeof status === 'string') {
    const statusLower = status.toLowerCase();

    if (statusLower === 'scheduled') {
      return (
        <Badge
          variant="secondary"
          className={cn(
            "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800",
            className
          )}
        >
          {status}
        </Badge>
      );
    }

    if (statusLower === 'published') {
      return (
        <Badge
          variant="secondary"
          className={cn(
            "bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800",
            className
          )}
        >
          {status}
        </Badge>
      );
    }

    // Draft
    return (
      <Badge
        variant="secondary"
        className={cn(
          "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-800",
          className
        )}
      >
        {status}
      </Badge>
    );
  }

  // Handle boolean status (backward compatible)
  if (status) {
    return (
      <Badge
        variant="secondary"
        className={cn(
          "bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800",
          className
        )}
      >
        Published
      </Badge>
    );
  }

  return (
    <Badge
      variant="secondary"
      className={cn(
        "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-800",
        className
      )}
    >
      Draft
    </Badge>
  );
};
