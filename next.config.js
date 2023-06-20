/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: false,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
