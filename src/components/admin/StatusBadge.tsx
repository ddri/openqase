import * as React from "react";
import { Badge } from "@/components/ui/badge";

export interface StatusBadgeProps {
  /** Publication status - true for published, false for draft */
  status: boolean;
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
 * // Simple usage
 * <StatusBadge status={row.original.published} />
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

  return (
    <Badge variant={status ? "published" : "draft"} className={className}>
      {status ? "Published" : "Draft"}
    </Badge>
  );
};
