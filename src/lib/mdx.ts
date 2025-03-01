// src/lib/mdx.ts
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';
import { ContentType } from './types';

// MDX content type with serialized source
export interface MDXContent<T = unknown> {
  source: any; // MDX source
  frontmatter: T;
  slug: string;
}

export async function getContentBySlug<T>(
  type: ContentType,
  slug: string
): Promise<MDXContent<T>> {
  const contentDirectory = path.join(process.cwd(), 'content', type);
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  const fileContents = await fs.readFile(fullPath, 'utf8');

  // Parse the frontmatter and content
  const { data, content } = matter(fileContents);

  // Process MDX content with plugins
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrismPlus],
    },
    scope: data,
  });

  return {
    source: mdxSource,
    frontmatter: data as T,
    slug
  };
}

// Define a base type for the frontmatter to ensure type safety
interface BaseFrontmatter {
  title?: string;
  lastUpdated?: string;
  [key: string]: any;
}

export async function getAllContent<T extends BaseFrontmatter = BaseFrontmatter>(
  type: ContentType
): Promise<MDXContent<T>[]> {
  const contentDirectory = path.join(process.cwd(), 'content', type);
  const files = await fs.readdir(contentDirectory);

  const content = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async (file) => {
        return await getContentBySlug<T>(
          type,
          file.replace(/\.mdx$/, '')
        );
      })
  );

  // Filter out any null results and then sort
  return content.filter(Boolean).sort((a, b) => {
    if (!a || !b) return 0;
    
    // Sort by date if available, otherwise by title
    const dateA = a.frontmatter?.lastUpdated;
    const dateB = b.frontmatter?.lastUpdated;
    if (dateA && dateB) {
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    }
    
    // Safely access title with fallback to empty string
    const titleA = a.frontmatter?.title || '';
    const titleB = b.frontmatter?.title || '';
    return titleA.localeCompare(titleB);
  });
}