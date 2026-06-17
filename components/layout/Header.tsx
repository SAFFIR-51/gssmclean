"use client";
import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/lenis";
import { CLINIC } from "@/data/clinic";
import styles from "./Header.module.css";

type MenuItem = { label: string; section: string };

const MENU: MenuItem[] = [
  { label: "병원소개", section: "intro" },
  { label: "인공신장실", section: "dialysis" },
  { label: "신장클리닉", section: "nephrology" },
  { label: "내과클리닉", section: "internal" },
  { label: "건강검진", section: "checkup" },
  { label: "의료진", section: "team" },
  { label: "오시는 길", section: "visit" },
];

function go(e: React.MouseEvent, section: string) {
  e.preventDefault();
  scrollToId(section);
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 스크롤스파이 — 현재 보이는 섹션의 네비 항목 하이라이트
  useEffect(() => {
    const ids = Array.from(new Set(MENU.map((m) => m.section)));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mnav-open", drawer);
  }, [drawer]);

  const closeDrawer = () => setDrawer(false);

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
        <div className="header-inner">
          <a href="#hero" className="logo" aria-label="강서성모맑은내과의원 홈" onClick={(e) => go(e, "hero")}>
            <img src="/clinic/logo.png" alt="강서성모맑은내과의원" />
          </a>
          <nav className="gnb" aria-label="주메뉴">
            <ul className="gnb-list">
              {MENU.map((item) => (
                <li className="gnb-item" key={item.label}>
                  <a
                    href={`#${item.section}`}
                    className={`gnb-link${activeId === item.section ? " " + styles.linkActive : ""}`}
                    onClick={(e) => go(e, item.section)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-utils">
            <a
              className="hd-cta hd-cta--book"
              href={CLINIC.naver.place}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="네이버 예약"
            >
              <span>예약하기</span>
            </a>
            <button
              id="mnav-toggle"
              type="button"
              aria-label="메뉴"
              className={drawer ? "open" : ""}
              onClick={() => setDrawer((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 드로어 */}
      <aside id="mnav" className={drawer ? "open" : ""} aria-label="모바일 메뉴">
        <div className="mnav-head">
          <a href="#hero" className="mnav-logo" aria-label="강서성모맑은내과의원 홈" onClick={(e) => { go(e, "hero"); closeDrawer(); }}>
            <img src="/clinic/logo.png" alt="강서성모맑은내과의원" />
          </a>
          <button className="mnav-close" type="button" aria-label="메뉴 닫기" onClick={closeDrawer}>
            <span></span><span></span>
          </button>
        </div>
        <nav className="mnav-body">
          <ul className="mnav-list">
            {MENU.map((item) => (
              <li className="mnav-group" key={item.label}>
                <a className="mnav-top" href={`#${item.section}`} onClick={(e) => { go(e, item.section); closeDrawer(); }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mnav-foot">
          <a className="mnav-cta" href={CLINIC.naver.place} target="_blank" rel="noopener noreferrer" onClick={closeDrawer}>예약하기</a>
          <p className="mnav-info">서울특별시 강서구 공항대로 200<br />마곡지웰타워 3F</p>
        </div>
      </aside>
    </>
  );
}
