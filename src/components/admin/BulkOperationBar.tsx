import * as React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { bulkBarColors } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export interface BulkOperationBarProps {
  /** Number of selected items */
  selectedCount: number;
  /** Handler for publish action (optional) */
  onPublish?: () => void;
  /** Handler for unpublish action (optional) */
  onUnpublish?: () => void;
  /** Handler for delete action (optional) */
  onDelete?: () => void;
  /** Handler for restore action (optional, for trash views) */
  onRestore?: () => void;
  /** Handler for permanent delete action (optional, for trash views) */
  onPermanentDelete?: () => void;
  /** Handler to clear selection */
  onClearSelection: () => void;
  /** Loading state for async operations */
  isLoading?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * BulkOperationBar - Standardized bulk action interface
 *
 * Replaces 8+ duplicate implementations of bulk operation bars
 * across admin list views with a single, consistent component.
 *
 * Features:
 * - Consistent styling with design tokens
 * - Flexible action buttons
 * - Loading states
 * - Selection count display
 *
 * @example
 * ```tsx
 * <BulkOperationBar
 *   selectedCount={selectedItems.size}
 *   onPublish={() => handleBulk('publish')}
 *   onDelete={() => handleBulk('delete')}
 *   onClearSelection={() => setSelectedItems(new Set())}
 *   isLoading={isLoading}
 * />
 * ```
 */
export const BulkOperationBar: React.FC<BulkOperationBarProps> = ({
  selectedCount,
  onPublish,
  onUnpublish,
  onDelete,
  onRestore,
  onPermanentDelete,
  onClearSelection,
  isLoading = false,
  className,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-3 px-6 py-3 rounded-lg border shadow-lg",
        bulkBarColors.bg,
        bulkBarColors.border,
        className
      )}
    >
      <span className={cn("font-medium", bulkBarColors.text)}>
        {selectedCount} {selectedCount === 1 ? "item" : "items"} selected
      </span>

      <div className="flex items-center gap-2">
        {onPublish && (
          <Button
            size="sm"
            variant="default"
            onClick={onPublish}
            disabled={isLoading}
            loading={isLoading}
            data-testid="bulk-publish-button"
          >
            Publish
          </Button>
        )}

        {onUnpublish && (
          <Button
            size="sm"
            variant="outline"
            onClick={onUnpublish}
            disabled={isLoading}
            loading={isLoading}
            data-testid="bulk-unpublish-button"
          >
            Unpublish
          </Button>
        )}

        {onRestore && (
          <Button
            size="sm"
            variant="default"
            onClick={onRestore}
            disabled={isLoading}
            loading={isLoading}
            data-testid="bulk-restore-button"
          >
            Restore
          </Button>
        )}

        {onDelete && (
          <Button
            size="sm"
            variant="destructive"
            onClick={onDelete}
            disabled={isLoading}
            loading={isLoading}
            data-testid="bulk-delete-button"
          >
            {onPermanentDelete ? "Move to Trash" : "Delete"}
          </Button>
        )}

        {onPermanentDelete && (
          <Button
            size="sm"
            variant="destructive"
            onClick={onPermanentDelete}
            disabled={isLoading}
            loading={isLoading}
            data-testid="bulk-permanent-delete-button"
          >
            Permanent Delete
          </Button>
        )}

        <Button
          size="sm"
          variant="ghost"
          onClick={onClearSelection}
          disabled={isLoading}
          data-testid="bulk-clear-selection-button"
          className="ml-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear selection</span>
        </Button>
      </div>
    </div>
  );
};
