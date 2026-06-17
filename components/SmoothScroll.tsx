"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";
import { useScrollReveal, useCounters } from "@/lib/hooks";

// Lenis 부드러운 스크롤 + GSAP ScrollTrigger 동기화. 렌더링 없음.
export default function SmoothScroll() {
  useScrollReveal();
  useCounters();

  useEffect(() => {
    if (reducedMotion()) {
      // 모션 최소화: 네이티브 스크롤 유지, Lenis 미사용
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // 레이아웃 안정화 후 ScrollTrigger 재계산
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      setLenis(null);
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
