import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // Enable MDX support
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
    domains: ["ui.shadcn.com"],
  },
};

// Configure MDX with plugins if needed
const withMDX = createMDX({
  // Add markdown plugins here if needed
  // options: {
  //   remarkPlugins: [],
  //   rehypePlugins: [],
  // },
});

export default withMDX(nextConfig);
