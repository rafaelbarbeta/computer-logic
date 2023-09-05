/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: false,
  },
  experimental: {
    appDir: true,
  },
  basePath: '/logicapp',
};

module.exports = nextConfig;
