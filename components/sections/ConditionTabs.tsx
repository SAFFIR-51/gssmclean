"use client";
import { useEffect, useState } from "react";
import type { Condition } from "@/data/content";
import styles from "./ConditionTabs.module.css";

type Props = {
  id: string;
  eyebrow: string;
  titleLines: [string, string];
  brand: string;
  conditions: Condition[];
};

export default function ConditionTabs({ id, eyebrow, titleLines, brand, conditions }: Props) {
  const [active, setActive] = useState(0);

  // 헤더 메뉴에서 특정 질환 탭 활성화
  useEffect(() => {
    const onActivate = (e: Event) => {
      const detail = (e as CustomEvent).detail as { section: string; cond?: string };
      if (detail.section !== id || !detail.cond) return;
      const idx = conditions.findIndex((c) => c.key === detail.cond);
      if (idx >= 0) setActive(idx);
    };
    window.addEventListener("activate-cond", onActivate as EventListener);
    return () => window.removeEventListener("activate-cond", onActivate as EventListener);
  }, [id, conditions]);

  const c = conditions[active];

  return (
    <section className="section" id={id}>
      <div className="container">
        <header className="section-head section-head--left">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">
            {titleLines[0]}<br />
            <span className="brand">{brand}</span> {titleLines[1]}
          </h2>
        </header>

        <div className={styles.tabs} role="tablist" aria-label={`${brand} 질환 선택`}>
          {conditions.map((cond, i) => (
            <button
              key={cond.key}
              role="tab"
              aria-selected={i === active}
              className={`${styles.tab}${i === active ? " " + styles.tabActive : ""}`}
              onClick={() => setActive(i)}
            >
              {cond.label}
            </button>
          ))}
        </div>

        <div className={styles.panel} key={c.key}>
          <div>
            <h3 className={styles.panelTitle}>{c.title}</h3>
            <p className={styles.lead}>{c.lead}</p>
            <p className={styles.intro}>{c.intro}</p>
            <div className={styles.points}>
              {c.points.map((p) => (
                <div className={styles.point} key={p.name}>
                  <span className={styles.pointDot} aria-hidden="true" />
                  <div>
                    <h4>{p.name}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.visual}>
            <img src={c.img} alt={c.title} key={c.img} />
          </div>
        </div>
      </div>
    </section>
  );
}
