/** @type {import('next').NextConfig} */

const path = require("path");
const isProd = process.env.NODE_ENV === "prod";
console.log("------->", isProd);

const nextConfig = {
  assetPrefix: isProd
    ? "https://ecodingcd-tcs.beaconfireinc.com/cd/trading-capturing-system-system-86qb4a-ilgpy8"
    : "",
  distDir: "dist",
  output: "standalone",
  // trailingSlash: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.resolve(__dirname, "src")],
  },
  Image: {
    path: isProd
      ? "https://ecodingcd-tcs.beaconfireinc.com/cd/trading-capturing-system-system-86qb4a-ilgpy8"
      : "",
  },
};

module.exports = nextConfig;
