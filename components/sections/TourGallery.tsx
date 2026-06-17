"use client";
import { useState } from "react";
import { GALLERY } from "@/data/content";
import styles from "./TourGallery.module.css";

export default function TourGallery() {
  const [active, setActive] = useState(0);
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

        <div className={styles.main}>
          <img className={styles.mainImg} src={cur.img} alt={cur.alt} key={active} />
          <div className={styles.caption}>
            {cur.alt}
            <span className={styles.counter}>{String(active + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className={styles.thumbs}>
          {GALLERY.map((g, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.thumb}${i === active ? " " + styles.thumbActive : ""}`}
              aria-label={g.alt}
              aria-current={i === active}
              onClick={() => setActive(i)}
            >
              <img src={g.img} alt="" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
