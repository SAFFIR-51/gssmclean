/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 기존 자산은 public/ 에서 그대로 서빙 (최적화 비활성 — 단순/안전)
    unoptimized: true,
  },
};

export default nextConfig;
