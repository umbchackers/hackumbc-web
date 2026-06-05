/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.mlh.io',
      },
    ], // this is the updated config to allow images from MLH, prev was deprecated so i changed it
    unoptimized: true, // This can help with Amplify deployments
  },
  // Enable output tracing to improve Amplify build process
  output: 'standalone',
};

export default nextConfig;
