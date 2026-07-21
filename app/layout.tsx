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
    "폐기능검사", "강서성모맑은내과",
  ],
  authors: [{ name: "강서성모맑은내과의원" }],
  creator: "강서성모맑은내과의원",
  publisher: "강서성모맑은내과의원",
  applicationName: "강서성모맑은내과의원",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
    images: [
      {
        url: "/clinic/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "강서성모맑은내과의원 진료실",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "강서성모맑은내과의원 | 마곡 인공신장실 · 신장내과",
    description: "마곡 인공신장실·야간투석·혈액투석 전문 신장내과.",
    images: ["/clinic/og-image.jpg"],
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

const SITE = "https://www.gssmclean.co.kr";
const CLINIC_ID = `${SITE}/#clinic`;

// 이 번호·주소를 쓰던 이전 병원과 혼동되지 않도록, 상호/전화/공식 프로필을
// 하나의 엔티티(@id)로 묶어 검색엔진에 명시한다.
const clinicLd = {
  "@type": "MedicalClinic",
  "@id": CLINIC_ID,
  name: "강서성모맑은내과의원",
  alternateName: [
    "강서성모맑은내과",
    "성모맑은내과의원",
    "마곡 강서성모맑은내과의원",
    "Gangseo St. Mary Malgeun Internal Medicine Clinic",
  ],
  legalName: "강서성모맑은내과의원",
  image: `${SITE}/clinic/og-image.jpg`,
  logo: `${SITE}/clinic/logo.png`,
  url: `${SITE}/`,
  telephone: "+82-2-2666-0666",
  identifier: [
    { "@type": "PropertyValue", name: "사업자등록번호", value: CLINIC.bizNo },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "대표전화",
      telephone: "+82-2-2666-0666",
      areaServed: "KR",
      availableLanguage: ["ko"],
    },
    {
      "@type": "ContactPoint",
      contactType: "인공신장실",
      telephone: "+82-2-2666-0661",
      areaServed: "KR",
      availableLanguage: ["ko"],
    },
  ],
  // 동일 실체임을 입증하는 공식 프로필 — 잘못된 상호 연결을 밀어내는 신호
  sameAs: [CLINIC.naver.place, CLINIC.naver.blog],
  address: {
    "@type": "PostalAddress",
    streetAddress: "공항대로 200 마곡지웰타워 3F",
    addressLocality: "강서구",
    addressRegion: "서울특별시",
    postalCode: "07803",
    addressCountry: "KR",
  },
  geo: { "@type": "GeoCoordinates", latitude: CLINIC.geo.lat, longitude: CLINIC.geo.lng },
  hasMap: CLINIC.naver.place,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    clinicLd,
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "강서성모맑은내과의원",
      inLanguage: "ko-KR",
      publisher: { "@id": CLINIC_ID },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: `${SITE}/`,
      name: "강서성모맑은내과의원 | 마곡 인공신장실 · 신장내과 · 야간투석",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": CLINIC_ID },
      primaryImageOfPage: `${SITE}/clinic/og-image.jpg`,
      inLanguage: "ko-KR",
    },
  ],
};

const GTM_ID = "GTM-NPRKJ8DF";

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Google Tag Manager */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
