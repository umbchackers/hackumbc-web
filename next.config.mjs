/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add image optimization settings
  images: {
    domains: ['static.mlh.io'], // Allow images from MLH domain
    unoptimized: true, // This can help with Amplify deployments
  },
  // Enable output tracing to improve Amplify build process
  output: 'standalone',
};

export default nextConfig;
