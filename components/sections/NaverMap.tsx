"use client";
import { useEffect, useRef } from "react";
import { CLINIC } from "@/data/clinic";

// NCP(NAVER Cloud Platform) Maps 애플리케이션의 Client ID(ncpKeyId)
const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
const SCRIPT_ID = "naver-maps-sdk";

declare global {
  interface Window {
    // 네이버 지도 SDK 전역 (타입 패키지 미설치 환경이라 any 사용)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver?: any;
  }
}

export default function NaverMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!CLIENT_ID || !ref.current) return;

    const init = () => {
      const naver = window.naver;
      if (!naver?.maps || !ref.current) return;
      const pos = new naver.maps.LatLng(CLINIC.geo.lat, CLINIC.geo.lng);
      const map = new naver.maps.Map(ref.current, {
        center: pos,
        zoom: 16,
        scaleControl: false,
        mapDataControl: false,
        logoControlOptions: { position: naver.maps.Position.BOTTOM_LEFT },
      });
      const marker = new naver.maps.Marker({ position: pos, map });
      const info = new naver.maps.InfoWindow({
        content: `<div style="padding:8px 12px;font-size:13px;font-weight:700;white-space:nowrap;">${CLINIC.name}</div>`,
        borderWidth: 0,
        disableAnchor: true,
        backgroundColor: "#fff",
      });
      info.open(map, marker);
      naver.maps.Event.addListener(marker, "click", () => {
        info.getMap() ? info.close() : info.open(map, marker);
      });
    };

    if (window.naver?.maps) { init(); return; }

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}`;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", init);
    return () => script?.removeEventListener("load", init);
  }, []);

  // 키 미설정 시 기존 구글 지도 임베드로 폴백 (배포 안전망)
  if (!CLIENT_ID) {
    return (
      <iframe
        src={CLINIC.mapEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="강서성모맑은내과의원 위치"
        style={{ width: "100%", height: "100%", border: 0 }}
      />
    );
  }

  return <div ref={ref} style={{ width: "100%", height: "100%" }} aria-label="강서성모맑은내과의원 네이버 지도" />;
}
