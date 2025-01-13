/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "auto.dev",
      "www.motorcarmarkdown.com",
      "vehicle-photos-published.vauto.com",
      "pictures.dealer.com",
      "cdn.max.auto",
      "assets.cai-media-management.com",
      "carmine-listings.s3.us-east-1.amazonaws.com",
      "content.homenetiol.com",
      "placehold.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "auto.dev",
      },
      {
        protocol: "https",
        hostname: "www.motorcarmarkdown.com",
      },
      {
        protocol: "http",
        hostname: "vehicle-photos-published.vauto.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vehicle-photos-published.vauto.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pictures.dealer.com",
      },
      {
        protocol: "https",
        hostname: "content.homenetiol.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pictures.dealer.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "assets.cai-media-management.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "assets.cai-media-management.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "carmine-listings.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "carmine-listings.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.max.auto",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*", // Apply headers only for API routes
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Allow all origins
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS", // Specify allowed methods
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization", // Specify allowed headers
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/public/favicon.ico",
      },
    ];
  },
};

export default nextConfig;
