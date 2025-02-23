// mdx.config.mjs
export default {
    remarkPlugins: [
      // Add any remark plugins you want to use
    ],
    rehypePlugins: [
      // Add any rehype plugins you want to use
    ],
    options: {
      jsx: true,
      // This ensures options are serializable
      format: 'mdx',
      development: process.env.NODE_ENV === 'development',
      providerImportSource: '@mdx-js/react'
    }
  };