import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // enables static export
  trailingSlash: true, // GitHub Pages needs trailing slashes
};

export default nextConfig;
