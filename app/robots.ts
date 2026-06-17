import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.gssmclean.co.kr/sitemap.xml",
    host: "https://www.gssmclean.co.kr",
  };
}
