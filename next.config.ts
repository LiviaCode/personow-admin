/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "34.39.211.212",
        port: "3018",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
