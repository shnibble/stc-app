module.exports = {
  siteMetadata: {
    title: `Something to Cook App`,
    description: `A simple interface for interacting with the something-to-cook meals API.`,
    author: `@shnibble`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        url: 'http://localhost:3000/meta/categories',
        name: 'categories',
        method: 'get',
      }
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        url: 'http://localhost:3000/meta/origins',
        name: 'origins',
        method: 'get',
      }
    }
  ],
}
