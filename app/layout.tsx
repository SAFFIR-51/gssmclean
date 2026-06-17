import type { Metadata, Viewport } from "next";
// 디자인 토큰/컴포넌트 스타일 — 원본 CSS를 로드 순서 그대로 유지
import "./styles/style.css";
import "./styles/design-v2.css";
import "./styles/sections-extra.css";
import "./styles/subpage.css";
import "./globals.css";
import { CLINIC } from "@/data/clinic";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gssmclean.co.kr"),
  title: "강서성모맑은내과의원 | 마곡 인공신장실 · 신장내과 · 야간투석",
  description:
    "강서성모맑은내과의원 — 마곡 인공신장실·야간투석·혈액투석 전문. 신장내과 전문의가 직접 진료하는 마곡·방화동·강서구 지역 거점 의원. 고혈압·당뇨·고지혈증·갑상선·소화기·호흡기·예방접종·수액치료까지 통합 케어.",
  keywords: [
    "마곡 투석실", "마곡 인공신장실", "마곡 혈액투석", "마곡 야간투석", "마곡 신장내과",
    "방화동 투석실", "방화동 인공신장실", "방화동 혈액투석", "방화동 야간투석", "방화동 신장내과",
    "강서구 투석실", "강서구 인공신장실", "강서구 혈액투석", "강서구 야간투석", "강서구 신장내과",
    "방화동 내과", "강서구 내과", "혈액투석", "야간투석", "당뇨", "고혈압", "고지혈증", "골다공증",
    "부종", "단백뇨", "갑상선", "비만", "초음파", "예방접종", "수액치료", "소화기질환", "호흡기질환",
    "폐기능검사", "건강검진", "강서성모맑은내과",
  ],
  authors: [{ name: "강서성모맑은내과의원" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.gssmclean.co.kr/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/clinic/favicon.png", type: "image/png", sizes: "256x256" },
    ],
    shortcut: "/favicon.ico",
    apple: "/clinic/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "강서성모맑은내과의원",
    title: "강서성모맑은내과의원 | 마곡 인공신장실 · 신장내과 · 야간투석",
    description:
      "마곡 인공신장실·야간투석·혈액투석 전문. 신장내과 전문의가 진료하는 마곡·방화동·강서구 거점 의원.",
    url: "https://www.gssmclean.co.kr/",
    locale: "ko_KR",
    images: ["/clinic/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "강서성모맑은내과의원 | 마곡 인공신장실 · 신장내과",
    description: "마곡 인공신장실·야간투석·혈액투석 전문 신장내과.",
    images: ["/clinic/og-image.png"],
  },
  other: {
    "naver-site-verification": "7680a384477470e13f89f2b6e76a01607109443e",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B396E",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "강서성모맑은내과의원",
  alternateName: "Gangseo St. Mary Malgeun Internal Medicine Clinic",
  image: "https://www.gssmclean.co.kr/clinic/og-image.png",
  url: "https://www.gssmclean.co.kr/",
  telephone: CLINIC.tel.main,
  address: {
    "@type": "PostalAddress",
    streetAddress: "공항대로 200 마곡지웰타워 3F",
    addressLocality: "강서구",
    addressRegion: "서울특별시",
    postalCode: "07803",
    addressCountry: "KR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 37.5601, longitude: 126.8252 },
  medicalSpecialty: ["Nephrology", "InternalMedicine"],
  areaServed: [
    { "@type": "Place", name: "마곡동" },
    { "@type": "Place", name: "방화동" },
    { "@type": "Place", name: "강서구" },
    { "@type": "Place", name: "발산동" },
    { "@type": "Place", name: "가양동" },
    { "@type": "Place", name: "등촌동" },
  ],
  knowsAbout: [
    "마곡 투석실", "마곡 인공신장실", "마곡 혈액투석", "마곡 야간투석", "마곡 신장내과",
    "방화동 투석실", "방화동 인공신장실", "방화동 혈액투석", "방화동 야간투석", "방화동 신장내과",
    "강서구 투석실", "강서구 인공신장실", "강서구 혈액투석", "강서구 야간투석", "강서구 신장내과",
  ],
  availableService: [
    "마곡 혈액투석", "마곡 야간투석", "방화동 혈액투석", "방화동 야간투석", "강서구 혈액투석", "강서구 야간투석",
    "인공신장실 운영", "신장기능검사", "고혈압 관리", "당뇨 관리", "고지혈증 관리", "갑상선 진료",
    "초음파 검사", "예방접종", "수액치료", "폐기능검사",
  ].map((name) => ({ "@type": "MedicalProcedure", name })),
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
