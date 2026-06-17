"use client";
import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/lenis";
import { NEPHROLOGY, INTERNAL } from "@/data/content";
import styles from "./Header.module.css";

type Sub = { label: string; section: string; cond?: string; hint?: string };
type MenuItem = { label: string; section: string; subs?: Sub[] };

const MENU: MenuItem[] = [
  {
    label: "병원소개",
    section: "intro",
    subs: [
      { label: "이야기", section: "intro", hint: "강서성모맑은내과 이야기" },
      { label: "둘러보기", section: "location", hint: "진료실 · 인공신장실" },
      { label: "오시는 길", section: "visit", hint: "진료시간 · 위치" },
    ],
  },
  { label: "인공신장실", section: "dialysis" },
  {
    label: "신장클리닉",
    section: "nephrology",
    subs: NEPHROLOGY.map((c) => ({ label: c.label, section: "nephrology", cond: c.key, hint: c.lead.split(".")[0] })),
  },
  {
    label: "내과클리닉",
    section: "internal",
    subs: INTERNAL.map((c) => ({ label: c.label, section: "internal", cond: c.key, hint: c.lead.split(".")[0] })),
  },
  { label: "건강검진", section: "checkup" },
  { label: "의료진", section: "team" },
  { label: "오시는 길", section: "visit" },
];

function go(e: React.MouseEvent, section: string, cond?: string) {
  e.preventDefault();
  scrollToId(section);
  if (cond) {
    window.dispatchEvent(new CustomEvent("activate-cond", { detail: { section, cond } }));
  }
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
                  {item.subs && (
                    <div className="mega">
                      <ul>
                        {item.subs.map((s) => (
                          <li key={s.label}>
                            <a href={`#${s.section}`} onClick={(e) => go(e, s.section, s.cond)}>
                              <span>{s.label}</span>
                              {s.hint && <em>{s.hint}</em>}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-utils">
            <button type="button" className="hd-cta hd-cta--book" aria-label="예약하기" data-open-call>
              <span>예약하기</span>
            </button>
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
                {item.subs && (
                  <ul className="mnav-sub">
                    {item.subs.map((s) => (
                      <li key={s.label}>
                        <a href={`#${s.section}`} onClick={(e) => { go(e, s.section, s.cond); closeDrawer(); }}>
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mnav-foot">
          <button type="button" className="mnav-cta" data-open-call>예약하기</button>
          <p className="mnav-info">서울특별시 강서구 공항대로 200<br />마곡지웰타워 3F</p>
        </div>
      </aside>
    </>
  );
}
