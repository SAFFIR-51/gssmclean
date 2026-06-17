"use client";
import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO, HERO_MESSAGES } from "@/data/content";
import { gsap, reducedMotion } from "@/lib/gsap";

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const total = HERO_MESSAGES.length;
  const rootRef = useRef<HTMLElement>(null);
  const timer = useRef<number | null>(null);

  const start = () => {
    stop();
    timer.current = window.setInterval(() => setIdx((i) => (i + 1) % total), 5500);
  };
  const stop = () => {
    if (timer.current) { window.clearInterval(timer.current); timer.current = null; }
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 배경 영상 패럴랙스
  useEffect(() => {
    if (reducedMotion() || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const move = (dir: number) => {
    setIdx((i) => (i + dir + total) % total);
    start();
  };

  const msg = HERO_MESSAGES[idx];

  return (
    <section className="hero" id="hero" ref={rootRef}>
      <div className="hero-slider" onMouseEnter={stop} onMouseLeave={start}>
        <div className="hero-slide is-active">
          <div className="hero-bg">
            <video
              className="hero-img"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={HERO_VIDEO.poster}
            >
              <source src={HERO_VIDEO.src} type="video/mp4" />
            </video>
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title" key={idx}>
              <span className="line">{msg.lines[0]}</span>
              <span className="line">{msg.lines[1]}</span>
            </h1>
            <p className="hero-sub">{msg.sub}</p>
          </div>
        </div>
      </div>
      <div className="hero-paging">
        <div className="hero-dots" aria-label="히어로 메시지 선택">
          {HERO_MESSAGES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === idx ? " is-active" : ""}`}
              aria-label={`${i + 1}번 메시지`}
              aria-current={i === idx}
              onClick={() => { setIdx(i); start(); }}
            />
          ))}
        </div>
        <div className="hero-arrows">
          <button className="hero-arrow" aria-label="이전 메시지" onClick={() => move(-1)}>‹</button>
          <button className="hero-arrow" aria-label="다음 메시지" onClick={() => move(1)}>›</button>
        </div>
      </div>
      <div className="hero-scroll">
        <span>SCROLL</span>
        <i className="scroll-line"></i>
      </div>
    </section>
  );
}
