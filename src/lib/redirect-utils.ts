/**
 * Security utilities for validating and sanitizing redirect URLs
 * to prevent open redirect vulnerabilities
 */

/**
 * Validates and sanitizes redirect URLs to prevent open redirect vulnerabilities
 * @param redirectTo - The redirect path from user input
 * @returns A safe relative path or '/' if invalid
 */
export function getSafeRedirectPath(redirectTo: string | null | undefined): string {
  // Default to home if no redirect specified
  if (!redirectTo) {
    return '/'
  }

  // Only allow relative paths that start with '/' but not '//'
  // This prevents absolute URLs and protocol-relative URLs
  if (!redirectTo.startsWith('/') || redirectTo.startsWith('//')) {
    return '/'
  }

  // Additional security: block common attack patterns
  const lower = redirectTo.toLowerCase()
  if (lower.includes('://') || lower.includes('javascript:') || lower.includes('data:')) {
    return '/'
  }

  // Path is safe - return it
  return redirectTo
}

/**
 * Validates if a redirect path is safe
 * @param redirectTo - The redirect path to validate
 * @returns true if the path is safe, false otherwise
 */
export function isValidRedirectPath(redirectTo: string | null | undefined): boolean {
  if (!redirectTo) {
    return false
  }

  // Must start with '/' but not '//'
  if (!redirectTo.startsWith('/') || redirectTo.startsWith('//')) {
    return false
  }

  // Must not contain protocol schemes
  const lower = redirectTo.toLowerCase()
  if (lower.includes('://') || lower.includes('javascript:') || lower.includes('data:')) {
    return false
  }

  return true
}
