/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "7178",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "127.0.0.1",
        port: "7178",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
