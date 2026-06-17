"use client";
import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { INTRO_IMG } from "@/data/content";

export default function Intro() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion() || !wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".intro-img-main img", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ".intro", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".intro-img-sub", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: ".intro", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".intro-blob", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: wrapRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="intro-phrase-wrap" ref={wrapRef}>
      <div className="intro-blob" aria-hidden="true"></div>
      <section className="section intro" id="intro">
        <div className="container intro-wrap">
          <div className="intro-text">
            <p className="eyebrow reveal" data-reveal>Gangseo Maleun Internal Medicine</p>
            <h2 className="section-title reveal" data-reveal style={{ "--rd": ".15s" } as React.CSSProperties}>
              늘 환자를 먼저<br />
              생각하는 <span className="brand">강서성모맑은내과</span>
            </h2>
            <p className="intro-desc reveal" data-reveal style={{ "--rd": ".3s" } as React.CSSProperties}>
              건강한 일상에 행복한 삶이 있습니다. 강서성모맑은내과의원은 내원하시는 환자분들의 건강을 소중히 여기며,
              더 나아가 삶 자체를 존중하는 마음으로 정성 어린 진료를 제공합니다.
            </p>
            <p className="intro-desc small reveal" data-reveal style={{ "--rd": ".45s" } as React.CSSProperties}>
              신장학회 인증 인공신장실과 보건복지부 인정 내과전문의가 함께하여,
              만성질환 관리부터 혈액투석까지 한 분 한 분의 상태에 맞는 맞춤 진료를 약속드립니다.
              치료를 넘어, 일상의 행복까지. 강서성모맑은내과에서 경험해 보세요.
            </p>
          </div>
          <div className="intro-visual">
            <div className="intro-img-main">
              <img src={INTRO_IMG.main} alt="강서성모맑은내과 진료 환경" />
            </div>
            <div className="intro-img-sub">
              <img src={INTRO_IMG.sub} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
