"use client";
import { useState } from "react";
import { DEPARTMENTS } from "@/data/content";

const ChevL = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);
const ChevR = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);

export default function Departments() {
  const [idx, setIdx] = useState(0);
  const n = DEPARTMENTS.length;
  const prev = () => setIdx((i) => (i - 1 + n) % n);
  const next = () => setIdx((i) => (i + 1) % n);

  return (
    <section className="section department" id="department">
      <div className="container">
        <header className="section-head section-head--row">
          <div className="section-head__text">
            <p className="eyebrow">Gangseo Maleun Department</p>
            <h2 className="section-title">
              내과부터 신장특화까지<br />
              <span className="brand">강서성모맑은내과 진료분야</span>
            </h2>
            <p className="section-desc">
              내원이 망설여지셨나요?<br />
              강서성모맑은내과는 풍부한 임상경험과 깊이 있는 전문성으로 환자 맞춤 진료를 제공합니다.
            </p>
          </div>
          <div className="dept-nav">
            <button className="dept-nav-btn" aria-label="이전 진료분야" onClick={prev}><ChevL /></button>
            <button className="dept-nav-btn" aria-label="다음 진료분야" onClick={next}><ChevR /></button>
          </div>
        </header>

        <div className="department-slider" data-slider="department">
          <div
            className="department-track"
            style={{
              transform: `translateX(-${idx * 100}%)`,
              transition: "transform 0.6s cubic-bezier(0.6, 0.05, 0.01, 0.9)",
            }}
          >
            {DEPARTMENTS.map((d) => (
              <article className="depart-card" key={d.id}>
                <div className="depart-img">
                  <img src={d.img} alt={d.title} />
                </div>
                <div className="depart-info">
                  <h3 className="depart-title">{d.title}</h3>
                  <p className="depart-desc">{d.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
