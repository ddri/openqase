import * as React from "react";
import MarkdownIt from 'markdown-it';

// Initialize markdown-it with same settings used in algorithm pages
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});

interface ReferencesRendererProps {
  referencesMarkup: string;
}

interface Reference {
  id: string;
  content: string;
}

/**
 * ReferencesRenderer component
 * Parses and renders academic references from markdown-style text
 * Supports references in format [^1]: Reference text
 */
export const ReferencesRenderer: React.FC<ReferencesRendererProps> = ({ referencesMarkup }) => {
  // Parse reference entries
  const referenceRegex = /\[\^(\d+|[a-z]+)\]:\s*([\s\S]*?)(?=\n\[\^|$)/g;
  const references: Reference[] = [];

  let match;
  while ((match = referenceRegex.exec(referencesMarkup))) {
    references.push({
      id: match[1],
      content: match[2].trim()
    });
  }

  if (references.length === 0) {
    return null;
  }

  return (
    <div className="my-12 border-t pt-8 border-[var(--border)]">
      <h2 className="text-3xl font-semibold mb-8">References</h2>
      <div className="space-y-6">
        {references.map((reference) => (
          <div 
            key={reference.id} 
            id={`reference-${reference.id}`} 
            className="flex gap-4 group"
          >
            <div className="flex-none text-lg font-medium min-w-[2rem] text-right">
              [{reference.id}]
            </div>
            <div 
              dangerouslySetInnerHTML={{ __html: md.render(reference.content) }}
              className="flex-1 text-[var(--text-secondary)] leading-7 prose-sm prose-p:mt-0 prose-a:text-[hsl(var(--primary))]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Process content with reference citations
 * Converts inline citations like [^1] to links to the reference section
 */
export function processContentWithReferences(content: string): string {
  // Replace [^1] with <a href="#reference-1">[1]</a>
  return content.replace(
    /\[\^(\d+|[a-z]+)\]/g, 
    '<a href="#reference-$1" class="reference-citation text-[hsl(var(--primary))] hover:underline">[$1]</a>'
  );
} 