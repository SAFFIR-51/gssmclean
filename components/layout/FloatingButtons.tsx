"use client";
import { useEffect, useState } from "react";
import { scrollToTop } from "@/lib/lenis";
import { CLINIC } from "@/data/clinic";

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="floating">
      <a
        className="float-btn float-btn--naver"
        href={CLINIC.naver.place}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="네이버 지도에서 길찾기"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
      </a>
      <a
        className="float-btn float-btn--blog"
        href={CLINIC.naver.blog}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="네이버 블로그 바로가기"
      >
        <span className="float-btn__brand" aria-hidden="true">blog</span>
      </a>
      <button className="float-btn float-btn--call" type="button" aria-label="전화 연결" data-open-call>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
        </svg>
      </button>
      <button
        className={`float-btn float-btn--top${visible ? " visible" : ""}`}
        type="button"
        aria-label="맨 위로"
        onClick={scrollToTop}
      >
        ↑
      </button>
    </div>
  );
}
