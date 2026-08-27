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
  async headers() {
    // 재배포 후에도 옛 화면이 보이는 문제(브라우저/CDN 캐시) 방지
    //  - HTML 문서: 항상 서버에 재검증 → 새 빌드의 해시된 자산을 즉시 참조
    //  - public/ 정적 파일: 같은 이름으로 교체될 수 있으므로 ETag 재검증(변경 없으면 304, 트래픽 거의 없음)
    //  - /_next/static/* 은 내용 해시가 붙으므로 Next 기본값(immutable, 1년) 그대로 둔다
    const revalidate = [
      { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
    ];
    return [
      { source: "/", headers: revalidate },
      { source: "/privacy", headers: revalidate },
      { source: "/terms", headers: revalidate },
      { source: "/images/:path*", headers: revalidate },
      { source: "/clinic/:path*", headers: revalidate },
      { source: "/media/:path*", headers: revalidate },
      { source: "/favicon.ico", headers: revalidate },
      { source: "/site.webmanifest", headers: revalidate },
      { source: "/sitemap.xml", headers: revalidate },
      { source: "/robots.txt", headers: revalidate },
    ];
  },
};

export default nextConfig;
