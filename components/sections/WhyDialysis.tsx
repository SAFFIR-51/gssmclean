"use client";
import { useEffect, useRef, useState } from "react";
import { WHY_ITEMS } from "@/data/content";

const ChevL = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);
const ChevR = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);

export default function WhyDialysis() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const N = WHY_ITEMS.length;
  const timer = useRef<number | null>(null);

  const goTo = (next: number) => {
    setFading(true);
    window.setTimeout(() => {
      setIdx(((next % N) + N) % N);
      setFading(false);
    }, 220);
  };

  const start = () => {
    stop();
    timer.current = window.setInterval(() => goTo(idxRef.current + 1), 5000);
  };
  const stop = () => {
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  };

  // idx를 인터벌 콜백에서 최신으로 참조
  const idxRef = useRef(idx);
  useEffect(() => { idxRef.current = idx; }, [idx]);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const item = WHY_ITEMS[idx];

  return (
    <section className="section why" id="why">
      <div className="why-blob" aria-hidden="true"></div>
      <div className="container">
        <header className="section-head section-head--left">
          <p className="eyebrow">Why Gangseo Maleun Internal Medicine?</p>
          <h2 className="section-title">
            왜 환자분들이 <span className="brand">강서성모맑은내과</span>를<br />
            선택하는 걸까요?
          </h2>
        </header>

        <div
          className="why-stage"
          data-why-stage
          onMouseEnter={stop}
          onMouseLeave={start}
        >
          <div className={`why-feature${fading ? " is-fading" : ""}`}>
            <div className="why-feature-img">
              <img src={item.img} alt="" />
            </div>
            <div className="why-feature-text">
              <p className="why-num">{item.num}</p>
              <h3 dangerouslySetInnerHTML={{ __html: item.title.replace(/\n/g, "<br>") }} />
              <p>{item.desc}</p>
              <div className="why-controls">
                <button className="dept-nav-btn" aria-label="이전 슬라이드" onClick={() => { goTo(idx - 1); start(); }}><ChevL /></button>
                <button className="dept-nav-btn" aria-label="다음 슬라이드" onClick={() => { goTo(idx + 1); start(); }}><ChevR /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
