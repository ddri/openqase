'use client';

import React from 'react';
import MarkdownIt from 'markdown-it';

// Initialize markdown-it
const md = new MarkdownIt({
  html: true,       // Allow HTML tags in source
  linkify: true,    // Autoconvert URL-like text to links
  typographer: true // Enable smartypants and other typographic replacements
});

interface RecommendedReadingItem {
  id: string;
  content: string;
}

interface RecommendedReadingRendererProps {
  readingMarkup: string | null;
  className?: string;
}

/**
 * Parses markdown reference-style links and renders them as a list.
 * Example Format: `[^1]: Reading item text...`
 */
const parseRecommendedReading = (markup: string): RecommendedReadingItem[] => {
  if (!markup) return [];
  
  const items: RecommendedReadingItem[] = [];
  // Regex to capture reference-style links: [^id]: content
  const regex = /\[\^(\w+)\]:\s*(.*)/g;
  let match;

  while ((match = regex.exec(markup)) !== null) {
    items.push({
      id: match[1],
      content: match[2].trim()
    });
  }
  
  return items;
};

/**
 * Renders a list of recommended reading items parsed from markdown markup.
 */
export function RecommendedReadingRenderer({ readingMarkup, className = '' }: RecommendedReadingRendererProps) {
  if (!readingMarkup) {
    return null;
  }

  const readingItems = parseRecommendedReading(readingMarkup);

  if (readingItems.length === 0) {
    return null;
  }

  return (
    <div className={`recommended-reading-section mt-8 ${className}`}>
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Recommended Reading</h2>
      <ol className="list-decimal list-outside pl-6 space-y-3">
        {readingItems.map((item) => (
          <li key={item.id} id={`reading-${item.id}`} className="text-muted-foreground text-sm leading-relaxed">
            {/* Render the content using markdown-it */}
            <span dangerouslySetInnerHTML={{ __html: md.renderInline(item.content) }} />
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Utility function to process main content, converting citation markers 
 * like [^1] into links pointing to the corresponding reading list item.
 * --- THIS FUNCTION HAS BEEN MOVED TO src/utils/contentProcessing.ts ---
 */
// export const processContentWithReadingLinks = (content: string | null): string => {
//   if (!content) return '';
// 
//   // Replace [^id] with <a href="#reading-id">[id]</a>
//   return content.replace(/\[\^(\w+)\]/g, (match, id) => {
//     return `<a href="#reading-${id}" class="text-primary hover:underline">[${id}]</a>`;
//   });
// }; 