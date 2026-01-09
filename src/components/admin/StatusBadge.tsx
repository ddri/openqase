import * as React from "react";
import { Badge } from "@/components/ui/badge";

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
      <Badge variant="archived" className={className}>
        Deleted
      </Badge>
    );
  }

  // Handle string status (for blog posts with Scheduled state)
  if (typeof status === 'string') {
    const statusLower = status.toLowerCase() as 'published' | 'draft' | 'scheduled';
    return (
      <Badge variant={statusLower} className={className}>
        {status}
      </Badge>
    );
  }

  // Handle boolean status (backward compatible)
  return (
    <Badge variant={status ? "published" : "draft"} className={className}>
      {status ? "Published" : "Draft"}
    </Badge>
  );
};
