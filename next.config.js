/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true, // Required for static exports
  },
  // Enable static exports for Vercel
  output: 'export',
  // Add a trailing slash to all paths
  trailingSlash: true,
  // Disable the default static exports behavior
  skipTrailingSlashRedirect: true,
  // Disable the default static exports behavior for API routes
  skipApiRouteExport: true,
  // Disable the default static exports behavior for pages
  skipPageExport: true,
  // Disable the default static exports behavior for dynamic routes
  skipDynamicRouteExport: true,
  // Disable the default static exports behavior for static pages
  skipStaticPageExport: true,
  // Enable server actions (if needed)
  experimental: {
    serverActions: true,
  },
  // Configure webpack
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
  // Configure headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
