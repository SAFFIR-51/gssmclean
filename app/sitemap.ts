import type { MetadataRoute } from "next";

// 원페이지 구성 — 홈(주 콘텐츠 전부) + 법적 고지 페이지
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.gssmclean.co.kr";
  const lastModified = "2026-06-17";
  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
