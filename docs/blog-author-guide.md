# Blog Author Guide

This guide explains how to create, edit, and manage blog posts for the openQase website.

## Creating a New Blog Post

### 1. Create a New MDX File

Create a new `.mdx` file in the `content/blog` directory. The filename will become the URL slug, so use a descriptive, URL-friendly name.

```bash
# Example: Creating a new blog post
touch content/blog/quantum-algorithms-explained.mdx
```

### 2. Add Frontmatter

Every blog post must include frontmatter at the top of the file, enclosed in triple dashes (`---`). The frontmatter contains metadata about the post.

```yaml
---
title: "Quantum Algorithms Explained"
description: "A comprehensive guide to understanding quantum algorithms and their applications"
date: "2024-04-01"
category: "Tutorial"
published: true
---
```

#### Required Frontmatter Fields

- `title`: The title of the blog post
- `description`: A brief description of the post (used in previews and meta tags)
- `date`: The publication date (YYYY-MM-DD format)
- `category`: The category of the post (e.g., Tutorial, News, Case Study)
- `published`: Set to `true` to make the post visible, `false` to keep it as a draft

### 3. Write Your Content

After the frontmatter, write your blog post content using Markdown syntax. You can use all standard Markdown features:

```markdown
# Main Heading

## Subheading

This is a paragraph with **bold** and *italic* text.

### Lists

- Item 1
- Item 2
- Item 3

### Code Blocks

```python
def quantum_algorithm():
    print("Hello, quantum world!")
```

### Links

[Link text](https://example.com)

### Images

![Alt text](/path/to/image.jpg)
```

### 4. Preview Your Post

To preview your post, run the development server:

```bash
npm run dev
```

Then navigate to `http://localhost:3000/blog/[your-slug]` in your browser.

## Managing Blog Posts

### Publishing and Unpublishing

To control whether a post is visible on the site:

1. Open the MDX file
2. Change the `published` field in the frontmatter:
   - `published: true` - Post is visible on the site
   - `published: false` - Post is hidden (returns 404)

### Editing an Existing Post

1. Open the MDX file in your editor
2. Make your changes
3. Save the file
4. The changes will be reflected on the site after the next build

### Deleting a Post

To remove a post from the site:

1. Either delete the MDX file from the `content/blog` directory
2. Or set `published: false` in the frontmatter

## Best Practices

### Writing Style

- Use clear, concise language
- Break up long paragraphs with subheadings
- Include code examples where appropriate
- Use images to illustrate complex concepts

### SEO Optimization

- Use descriptive titles and descriptions
- Include relevant keywords naturally in your content
- Add alt text to images
- Use proper heading hierarchy (H1, H2, H3, etc.)

### Content Organization

- Keep related posts in the same category
- Use consistent formatting across posts
- Link to related content within your site

## Troubleshooting

### Post Not Appearing

If your post doesn't appear on the blog listing page:

1. Check that `published: true` is set in the frontmatter
2. Verify the file is in the correct directory (`content/blog`)
3. Ensure the file has the `.mdx` extension
4. Check for syntax errors in the frontmatter

### Formatting Issues

If your post's formatting looks incorrect:

1. Check your Markdown syntax
2. Ensure proper spacing between sections
3. Verify that code blocks are properly enclosed in triple backticks

## Need Help?

If you encounter any issues or have questions about creating blog posts, please contact the site administrator. 