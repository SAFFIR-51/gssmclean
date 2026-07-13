"use client";
import { useEffect, useState } from "react";
import { DIALYSIS_PROMISE, DIALYSIS_STATS } from "@/data/content";
import styles from "./DialysisCenter.module.css";

const AUTO_MS = 5000;

export default function DialysisCenter() {
  const [active, setActive] = useState(0);
  const [mobile, setMobile] = useState(false);
  const N = DIALYSIS_PROMISE.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // 자동 슬라이드 — active가 바뀔 때마다(수동 조작 포함) 타이머 리셋
  useEffect(() => {
    if (mobile) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % N), AUTO_MS);
    return () => clearTimeout(id);
  }, [active, mobile, N]);

  const go = (i: number) => setActive((i + N) % N);

  return (
    <section
      className={`section ${styles.pin}`}
      id="dialysis"
      style={{ paddingTop: 0, paddingBottom: 0 }}
    >
      <div className={`container ${styles.stage}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Hemodialysis Center</p>
          <h2 className="section-title">
            신장학회 인증<br />
            <span className="brand">인공신장센터</span>
          </h2>
          {!mobile && (
            <div className={styles.counter}>
              {String(active + 1).padStart(2, "0")}<small> / {String(N).padStart(2, "0")}</small>
            </div>
          )}
          <p className="section-desc" style={{ maxWidth: 460 }}>
            대학병원 출신 투석 전문의가 직접 진료하고 30년 이상 경력의 전문간호사가 함께하는 인공신장실.
            마곡역 최초의 마곡·발산·방화동 거점 인공신장실로, 직장인 맞춤 이른 아침 시간부터 야간투석까지 제공합니다.
          </p>
          {!mobile && (
            <div className={styles.nav}>
              <button className={styles.arrow} aria-label="이전" onClick={() => go(active - 1)}>
                ‹
              </button>
              <div className={styles.dots}>
                {DIALYSIS_PROMISE.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot}${i === active ? " " + styles.dotActive : ""}`}
                    aria-label={`${i + 1}번 약속`}
                    onClick={() => go(i)}
                  />
                ))}
              </div>
              <button className={styles.arrow} aria-label="다음" onClick={() => go(active + 1)}>
                ›
              </button>
            </div>
          )}
          <div className={styles.stats}>
            {DIALYSIS_STATS.map((s) => (
              <div className={styles.stat} key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.cards}${mobile ? " " + styles.mobileList : ""}`}>
          {DIALYSIS_PROMISE.map((c, i) => (
            <article
              key={c.num}
              className={`${styles.card}${!mobile && i === active ? " " + styles.cardActive : ""}`}
            >
              <div className={styles.cardImg}>
                <img src={c.img} alt={c.title} style={c.imgPos ? { objectPosition: c.imgPos } : undefined} />
                <span className={styles.cardNum}>{c.num}</span>
              </div>
              <div className={styles.cardBody}>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
