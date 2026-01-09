/**
 * Design Tokens - Semantic color and spacing system
 *
 * This file centralizes all color and spacing decisions to ensure consistency
 * across the application, particularly in admin UI components.
 *
 * All tokens support both light and dark modes using Tailwind dark: prefix.
 */

/**
 * Status colors for published/draft/archived states
 * Used in: StatusBadge, list views, card badges
 */
export const statusColors = {
  published: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-800 dark:text-green-200',
    border: 'border-green-200 dark:border-green-800',
  },
  draft: {
    bg: 'bg-yellow-50 dark:bg-yellow-950',
    text: 'text-yellow-800 dark:text-yellow-200',
    border: 'border-yellow-200 dark:border-yellow-800',
  },
  archived: {
    bg: 'bg-gray-50 dark:bg-gray-950',
    text: 'text-gray-800 dark:text-gray-200',
    border: 'border-gray-200 dark:border-gray-800',
  },
} as const;

/**
 * Severity colors for alerts, warnings, and messages
 * Used in: ContentValidationWarnings, error states, alerts
 */
export const severityColors = {
  error: {
    bg: 'bg-red-50 dark:bg-red-950',
    text: 'text-red-800 dark:text-red-200',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-950',
    text: 'text-yellow-800 dark:text-yellow-200',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    text: 'text-blue-800 dark:text-blue-200',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-800 dark:text-green-200',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
  },
} as const;

/**
 * Category colors for content type icons
 * Used in: Dashboard cards, navigation icons, category indicators
 */
export const categoryColors = {
  caseStudy: 'text-blue-500 dark:text-blue-400',
  algorithm: 'text-purple-500 dark:text-purple-400',
  industry: 'text-green-500 dark:text-green-400',
  persona: 'text-orange-500 dark:text-orange-400',
  blog: 'text-pink-500 dark:text-pink-400',
  quantumCompany: 'text-indigo-500 dark:text-indigo-400',
  partnerCompany: 'text-cyan-500 dark:text-cyan-400',
  quantumHardware: 'text-violet-500 dark:text-violet-400',
  quantumSoftware: 'text-teal-500 dark:text-teal-400',
} as const;

/**
 * Progress/completion colors
 * Used in: ContentCompleteness component, progress indicators
 */
export const progressColors = {
  low: {
    bg: 'bg-red-100 dark:bg-red-950',
    text: 'text-red-800 dark:text-red-200',
    fill: 'bg-red-500 dark:bg-red-600',
  },
  medium: {
    bg: 'bg-yellow-100 dark:bg-yellow-950',
    text: 'text-yellow-800 dark:text-yellow-200',
    fill: 'bg-yellow-500 dark:bg-yellow-600',
  },
  high: {
    bg: 'bg-green-100 dark:bg-green-950',
    text: 'text-green-800 dark:text-green-200',
    fill: 'bg-green-500 dark:bg-green-600',
  },
} as const;

/**
 * Spacing constants for consistent layout
 * Used in: Admin pages, cards, lists, sections
 */
export const spacing = {
  // Padding
  listPadding: 'p-6',
  cardPadding: 'p-6',
  sectionPadding: 'p-8',
  formPadding: 'p-6',

  // Gaps
  itemGap: 'gap-4',
  sectionGap: 'gap-6',
  listGap: 'gap-4',
  gridGap: 'gap-6',

  // Margins
  sectionMargin: 'mb-6',
  itemMargin: 'mb-4',
} as const;

/**
 * Button state colors
 * Used in: Bulk operation bars, action buttons
 */
export const buttonColors = {
  publish: {
    bg: 'bg-green-600 dark:bg-green-700',
    hover: 'hover:bg-green-700 dark:hover:bg-green-800',
    text: 'text-white',
  },
  delete: {
    bg: 'bg-red-600 dark:bg-red-700',
    hover: 'hover:bg-red-700 dark:hover:bg-red-800',
    text: 'text-white',
  },
  unpublish: {
    bg: 'bg-yellow-600 dark:bg-yellow-700',
    hover: 'hover:bg-yellow-700 dark:hover:bg-yellow-800',
    text: 'text-white',
  },
} as const;

/**
 * Bulk operation bar colors
 * Used in: Admin list views with selection
 */
export const bulkBarColors = {
  bg: 'bg-blue-50 dark:bg-blue-950',
  border: 'border-blue-200 dark:border-blue-800',
  text: 'text-blue-800 dark:text-blue-200',
} as const;

/**
 * Helper function to get status color classes
 */
export function getStatusColors(status: boolean, deleted?: boolean) {
  if (deleted) return statusColors.archived;
  return status ? statusColors.published : statusColors.draft;
}

/**
 * Helper function to get severity color classes
 */
export function getSeverityColors(severity: 'error' | 'warning' | 'info' | 'success') {
  return severityColors[severity];
}

/**
 * Helper function to get progress color based on percentage
 */
export function getProgressColors(percentage: number) {
  if (percentage < 30) return progressColors.low;
  if (percentage < 70) return progressColors.medium;
  return progressColors.high;
}

/**
 * Helper function to get category color
 */
export function getCategoryColor(category: keyof typeof categoryColors) {
  return categoryColors[category];
}
