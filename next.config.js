/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
