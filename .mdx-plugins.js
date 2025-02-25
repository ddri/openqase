// .mdx-plugins.js
module.exports = {
    remarkPlugins: [],
    rehypePlugins: [],
    // This ensures options are serializable
    options: {
      format: 'mdx',
      development: process.env.NODE_ENV === 'development',
      providerImportSource: '@mdx-js/react',
    },
  };