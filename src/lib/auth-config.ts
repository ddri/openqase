/**
 * Auth Configuration Helper
 * Controls whether authentication is required for content access
 */

/**
 * Check if authentication is required for content access
 * @returns boolean - true if auth is required, false if content should be open
 */
export function requireAuthForContent(): boolean {
  // Default to requiring auth if environment variable is not set
  const envValue = process.env.REQUIRE_AUTH_FOR_CONTENT;
  
  // Only disable auth if explicitly set to 'false'
  return envValue !== 'false';
}

/**
 * Check if authentication is required for content access (client-side)
 * @returns boolean - true if auth is required, false if content should be open
 */
export function requireAuthForContentClient(): boolean {
  // Default to requiring auth if environment variable is not set
  const envValue = process.env.NEXT_PUBLIC_REQUIRE_AUTH_FOR_CONTENT;
  
  // Only disable auth if explicitly set to 'false'
  return envValue !== 'false';
} 