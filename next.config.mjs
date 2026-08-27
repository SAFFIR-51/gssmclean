/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 기존 자산은 public/ 에서 그대로 서빙 (최적화 비활성 — 단순/안전)
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        // 옛 사이트의 모든 미존재 경로 → 홈(301)
        // 제외: 실제 라우트(privacy/terms), Next 내부(_next), 정적 자산(확장자)
        //  → .html/.php/.asp 등 옛 페이지는 리다이렉트되고, 이미지/파비콘/sitemap 등은 그대로 서빙됨
        source:
          "/((?!_next/|privacy|terms|.*\\.(?:png|jpe?g|gif|svg|webp|avif|ico|css|js|mjs|map|json|xml|txt|webmanifest|woff2?|ttf|otf|eot|mp4|webm|pdf)$).+)",
        destination: "/",
        // permanent:true 는 308을 내보냄 — 네이버 Yeti는 301/302 처리가 확실하므로 301로 고정
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
