/**
 * Utility function to process main content, converting citation markers 
 * like [^1] into links pointing to corresponding elements.
 * This version is safe to run on the server.
 * 
 * @param content - The HTML content string to process.
 * @param targetPrefix - The prefix for the target element ID (e.g., "reading-" or "reference-").
 * @returns Processed HTML string with links.
 */
export const processContentWithLinks = (content: string | null, targetPrefix: string): string => {
  if (!content) return '';

  // Replace [^id] with <a href="#<targetPrefix>id">[id]</a>
  return content.replace(/\[\^(\w+)\]/g, (match, id) => {
    return `<a href="#${targetPrefix}${id}" class="text-primary hover:underline">[${id}]</a>`;
  });
}; 