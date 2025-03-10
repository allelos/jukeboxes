/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/jukeboxes.gr/stations/**",
      },
    ],
  },
};

module.exports = nextConfig;
