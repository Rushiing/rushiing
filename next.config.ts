import type { NextConfig } from "next";

/** Notion 图片常见域名：文件直链、S3、Notion CDN（含 notionusercontent） */
const notionImageHosts = [
  "img.notionusercontent.com",
  "www.notion.so",
  "notion.so",
  "prod-files-secure.s3.us-west-2.amazonaws.com",
  "s3.us-west-2.amazonaws.com",
  "s3.amazonaws.com",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 通配子域（S3 各 region / 桶）
      { protocol: "https", hostname: "**.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "**.notion.so", pathname: "/**" },
      { protocol: "https", hostname: "**.notionusercontent.com", pathname: "/**" },
      ...notionImageHosts.map((hostname) => ({
        protocol: "https" as const,
        hostname,
        pathname: "/**" as const,
      })),
    ],
  },
};

export default nextConfig;
