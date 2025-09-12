/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // static export
  images: {
    unoptimized: true, // required for GitHub Pages
  },
};

module.exports = nextConfig;