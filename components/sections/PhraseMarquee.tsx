"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

const PHRASE = "We care for your kidney";

export default function PhraseMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion() || !trackRef.current) return;
    const track = trackRef.current;
    const ctx = gsap.context(() => {
      // 콘텐츠를 2벌로 채웠으므로 -50% 이동이 seamless 루프
      const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 26, repeat: -1 });
      const skewSetter = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3" });

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const v = self.getVelocity();
          loop.timeScale(1 + Math.min(2.5, Math.abs(v) / 1500));
          skewSetter(gsap.utils.clamp(-6, 6, v / -500));
        },
      });
      // 속도 멈추면 자연스럽게 원복
      const ease = () => {
        loop.timeScale(gsap.utils.interpolate(loop.timeScale(), 1, 0.04));
      };
      gsap.ticker.add(ease);
      return () => {
        st.kill();
        gsap.ticker.remove(ease);
      };
    }, track);
    return () => ctx.revert();
  }, []);

  return (
    <div className="phrase-marquee" aria-hidden="true">
      <div
        className="phrase-track"
        ref={trackRef}
        style={{ display: "flex", flexWrap: "nowrap", whiteSpace: "nowrap", willChange: "transform" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 56, paddingRight: 56, flex: "0 0 auto" }}>
            {PHRASE}
            <em style={{ fontStyle: "normal" }}>♥</em>
          </span>
        ))}
      </div>
    </div>
  );
}
