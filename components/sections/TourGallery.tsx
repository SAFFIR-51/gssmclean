"use client";
import { useEffect, useRef, useState } from "react";
import { GALLERY } from "@/data/content";
import styles from "./TourGallery.module.css";

export default function TourGallery() {
  const [active, setActive] = useState(0);
  const N = GALLERY.length;
  const timer = useRef<number | null>(null);
  const idxRef = useRef(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  useEffect(() => { idxRef.current = active; }, [active]);

  // 활성 썸네일이 한 줄 스트립 안에서 항상 보이도록 가로 스크롤
  useEffect(() => {
    const el = thumbsRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const start = () => {
    stop();
    timer.current = window.setInterval(() => setActive((idxRef.current + 1) % N), 4800);
  };
  const stop = () => {
    if (timer.current) { window.clearInterval(timer.current); timer.current = null; }
  };
  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (i: number) => { setActive((i + N) % N); start(); };
  const cur = GALLERY[active];

  return (
    <section className="section location" id="location">
      <div className="location-watermark">Gangseo Maleun Care</div>
      <div className="container">
        <header className="section-head section-head--left location-head">
          <p className="eyebrow">Tour Of Gangseo Maleun Internal Medicine</p>
          <h2 className="section-title">
            안전하고 쾌적한 공간<br />
            <span className="brand">강서성모맑은내과 둘러보기</span>
          </h2>
        </header>

        <div className={styles.main} onMouseEnter={stop} onMouseLeave={start}>
          <img className={styles.mainImg} src={cur.img} alt={cur.alt} key={active} />
          <button className={`${styles.nav} ${styles.navPrev}`} type="button" aria-label="이전 사진" onClick={() => go(active - 1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button className={`${styles.nav} ${styles.navNext}`} type="button" aria-label="다음 사진" onClick={() => go(active + 1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>

        <div className={styles.thumbs} ref={thumbsRef}>
          {GALLERY.map((g, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.thumb}${i === active ? " " + styles.thumbActive : ""}`}
              aria-label={g.alt}
              aria-current={i === active}
              onClick={() => go(i)}
            >
              <img src={g.img} alt="" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
