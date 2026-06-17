"use client";
import { useEffect, useRef, useState } from "react";
import { EQUIPMENT } from "@/data/content";
import styles from "./Equipment.module.css";

export default function Equipment() {
  const [idx, setIdx] = useState(0);
  const N = EQUIPMENT.length;
  const timer = useRef<number | null>(null);
  const idxRef = useRef(0);
  useEffect(() => { idxRef.current = idx; }, [idx]);

  const start = () => {
    stop();
    timer.current = window.setInterval(() => setIdx((idxRef.current + 1) % N), 4800);
  };
  const stop = () => {
    if (timer.current) { window.clearInterval(timer.current); timer.current = null; }
  };
  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (i: number) => { setIdx((i + N) % N); start(); };

  return (
    <section className="section equipment" id="equipment">
      <div className="equipment-bg"></div>
      <div className="container">
        <header className="section-head section-head--left equipment-head">
          <p className="eyebrow light">Gangseo Maleun Equipment</p>
          <h2 className="section-title light">
            <span className="brand-white">강서성모맑은내과의 자신감</span><br />
            최첨단 의료장비
          </h2>
          <p className="section-desc light">
            대학병원급 장비로 더 정밀하게, 더 신속하게.<br />
            환자분의 건강을 위해 강서성모맑은내과의 자신감으로 진료합니다.
          </p>
        </header>

        <div className={styles.slider} onMouseEnter={stop} onMouseLeave={start}>
          <div className={styles.viewport}>
            {EQUIPMENT.map((e, i) => (
              <article className={`${styles.slide}${i === idx ? " " + styles.slideActive : ""}`} key={e.num} aria-hidden={i !== idx}>
                <div className={styles.imageWrap}>
                  <img className={styles.photo} src={e.photo} alt={`${e.title} 설치 공간`} />
                  <div className={styles.device}>
                    <img src={e.device} alt={`${e.title} 장비`} />
                    <span className={styles.deviceCap}>{e.title}</span>
                  </div>
                </div>
                <div className={styles.body}>
                  <div className={styles.num}>{e.num}</div>
                  <span className={styles.cat}>{e.cat}</span>
                  <h3 className={styles.title}>{e.title}</h3>
                  <p className={styles.sub}>{e.sub}</p>
                  <ul className={styles.features}>
                    {e.features.map((f) => (
                      <li key={f}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.controls}>
            <button className={styles.nav} type="button" aria-label="이전 장비" onClick={() => go(idx - 1)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button className={styles.nav} type="button" aria-label="다음 장비" onClick={() => go(idx + 1)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
            <div className={styles.dots} role="tablist" aria-label="장비 선택">
              {EQUIPMENT.map((_, i) => (
                <button key={i} type="button" className={`${styles.dot}${i === idx ? " " + styles.dotActive : ""}`} aria-label={`${i + 1}번 장비`} onClick={() => go(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
