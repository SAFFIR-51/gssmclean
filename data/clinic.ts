// 병원 기본 정보 — 단일 소스
type Hour = { label: string; value: string; badge?: string; muted?: boolean };

export const CLINIC = {
  name: "강서성모맑은내과의원",
  rep: "오영승",
  bizNo: "812-97-01891",
  address: "서울특별시 강서구 공항대로 200, 마곡지웰타워 3F",
  addressLine1: "서울특별시 강서구 공항대로 200",
  addressLine2: "마곡지웰타워 3층 · 5호선 마곡역 2·4번 출구 도보 2분",
  tel: {
    main: "02-2666-0666",
    dialysis: "02-2666-0661",
  },
  hours: [
    { label: "평일", value: "08:00 – 19:00", badge: "점심 13:00 – 14:00", muted: true },
    { label: "토요일", value: "09:00 – 14:00" },
    { label: "일요일 · 공휴일", value: "휴진" },
  ] as Hour[],
  mapEmbed:
    "https://maps.google.com/maps?q=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EC%84%9C%EA%B5%AC%20%EA%B3%B5%ED%95%AD%EB%8C%80%EB%A1%9C%20200&t=&z=16&ie=UTF8&iwloc=&output=embed",
  naver: {
    place:
      "https://map.naver.com/p/entry/place/2045817205?placePath=/home?entry=plt&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606171436&locale=ko&svcName=map_pcv5&searchType=place&lng=126.8294731&lat=37.5589625&c=15.00,0,0,0,dh",
    blog: "https://blog.naver.com/rkdtjtjdah",
  },
  // 네이버 지도 마커 좌표 (place 링크 기준)
  geo: { lat: 37.5589625, lng: 126.8294731 },
} as const;

// 원페이지 앵커 네비게이션
export const NAV = [
  { id: "intro", label: "병원소개" },
  { id: "department", label: "진료분야" },
  { id: "dialysis", label: "인공신장실" },
  { id: "nephrology", label: "신장클리닉" },
  { id: "internal", label: "내과클리닉" },
  { id: "team", label: "의료진" },
  { id: "location", label: "둘러보기" },
  { id: "visit", label: "오시는 길" },
] as const;
