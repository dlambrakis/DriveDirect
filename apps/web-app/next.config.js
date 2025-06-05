/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabling for now, can be enabled if static export is strictly needed
  // distDir: 'dist',
  eslint: {
    // Recommended: Lints during build. Set to false if you want to manage linting separately.
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: true, // Useful for static exports or if image optimization is handled elsewhere
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  // If using pnpm workspaces, you might need to transpile packages from the workspace
  transpilePackages: ['@directdrive/core-types', '@directdrive/supabase-client', '@directdrive/utils'],
  typescript: {
    // Disable type checking during build if it's handled by a separate CI step or `turbo lint`
    // ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
