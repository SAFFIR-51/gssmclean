"use client";
import { useEffect, useRef, useState } from "react";
import { DIALYSIS_PROMISE, DIALYSIS_STATS } from "@/data/content";
import { getLenis } from "@/lib/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./DialysisCenter.module.css";

export default function DialysisCenter() {
  const pinRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    const sec = pinRef.current;
    if (!sec || mobile) return;
    let last = -1;
    // ScrollTrigger는 Lenis와 동기화되어 프레임마다 배치 처리 → 부드러움
    const st = ScrollTrigger.create({
      trigger: sec,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = Math.min(N - 1, Math.round(self.progress * (N - 1)));
        if (idx !== last) {
          last = idx;
          setActive(idx);
        }
      },
    });
    return () => st.kill();
  }, [N, mobile]);

  const jumpTo = (i: number) => {
    const sec = pinRef.current;
    if (!sec) return;
    const total = sec.offsetHeight - window.innerHeight;
    const top = sec.offsetTop + (total * i) / (N - 1) + 4;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      className={`section ${styles.pin}`}
      id="dialysis"
      ref={pinRef}
      style={{ paddingTop: 0, paddingBottom: 0, height: mobile ? "auto" : `${N * 78 + 100}vh` }}
    >
      <div className={`container ${styles.stage}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Hemodialysis Center</p>
          <h2 className="section-title">
            신장학회 인증<br />
            <span className="brand">인공신장실</span>
          </h2>
          <div className={styles.counter}>
            {String(active + 1).padStart(2, "0")}<small> / {String(N).padStart(2, "0")}</small>
          </div>
          <p className="section-desc" style={{ maxWidth: 440 }}>
            대학병원 출신 투석 전문의가 직접 진료하는, 마곡·방화동·강서구 거점 인공신장실.
            아침 이른 시간부터 야간투석까지 운영합니다.
          </p>
          <div className={styles.dots}>
            {DIALYSIS_PROMISE.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot}${i === active ? " " + styles.dotActive : ""}`}
                aria-label={`${i + 1}번 약속`}
                onClick={() => jumpTo(i)}
              />
            ))}
          </div>
          <div className={styles.stats}>
            {DIALYSIS_STATS.map((s) => (
              <div className={styles.stat} key={s.label}>
                <strong>
                  <span data-count={s.value}>0</span>
                  {s.suffix}
                </strong>
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
                <img src={c.img} alt={c.title} />
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
