import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://metan.bluestone.systems/upload/image/**')],
  },
};

export default nextConfig;
