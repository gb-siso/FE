const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*'
      }
    ];
  },
  reactStrictMode: false,
  swcMinify: false,
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    apiHost: process.env.API_HOST
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  compiler: {
    styledComponents: true
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;
    config.plugins.push(new MiniCssExtractPlugin());

    return config;
  }
};
