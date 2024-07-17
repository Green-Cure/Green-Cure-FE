/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // TODO : komen output, assetPrefix & basePath jika running lokal, aktifkan kembali ketika push
  output: "export",
};

export default nextConfig;
