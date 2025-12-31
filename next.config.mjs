/** @type {import('next').NextConfig} */
const nextConfig = {
//   reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Specify the protocol (http or https)
        hostname: 'inspection.carpoolkr.com', // Specify the hostname
        pathname: "/**",
      },
      {
        protocol: 'https', // Specify the protocol (http or https)
        hostname: 'media.carpoolkr.com', // Specify the hostname
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
