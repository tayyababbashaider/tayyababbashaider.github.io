/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export", // 👈 important for static export
  basePath: "", // leave empty since it's root (username.github.io)
  assetPrefix: ".", // ensures assets load correctly
};

export default nextConfig;
