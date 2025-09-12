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
  output: "export", // required for GitHub Pages
  basePath: "",     // root domain
  // ❌ remove assetPrefix, it breaks next/font
};

export default nextConfig;
