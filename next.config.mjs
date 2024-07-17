/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // TODO : komen output, assetPrefix & basePath jika running lokal, aktifkan kembali ketika push
  output: "export",
  assetPrefix: "https://green-cure.github.io/Green-Cure-FE",
  basePath: "/Green-Cure-FE",
};

export default nextConfig;
