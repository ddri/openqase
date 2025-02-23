// src/lib/mdx.ts
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';
import { BaseFrontmatter, ContentType, MDXContent } from './types';

export async function getContentBySlug<T extends BaseFrontmatter>(
  type: ContentType, 
  slug: string
): Promise<MDXContent<T>> {
  const contentDirectory = path.join(process.cwd(), 'content', type);
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  const fileContents = await fs.readFile(fullPath, 'utf8');

  // Parse the frontmatter and content
  const { data, content } = matter(fileContents);

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

export async function getAllContent<T extends BaseFrontmatter>(
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

  return content.sort((a, b) => {
    // Sort by date if available, otherwise by title
    const dateA = a.frontmatter.lastUpdated;
    const dateB = b.frontmatter.lastUpdated;
    if (dateA && dateB) {
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    }
    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
}