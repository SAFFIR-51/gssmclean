import { CHECKUP } from "@/data/content";
import styles from "./HealthScreening.module.css";

export default function HealthScreening() {
  return (
    <section className="section" id="checkup" style={{ background: "var(--c-surface-2)" }}>
      <div className="container">
        <header className="section-head section-head--left">
          <p className="eyebrow">Health Screening</p>
          <h2 className="section-title">
            체계적인 검진과 사후관리<br />
            <span className="brand">건강검진</span>
          </h2>
          <p className="section-desc">{CHECKUP.lead}</p>
        </header>

        <div className={styles.grid}>
          {CHECKUP.items.map((it, i) => (
            <article className={`${styles.card} reveal`} data-reveal key={it.title}>
              <div className={styles.num}>{String(i + 1).padStart(2, "0")}</div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
