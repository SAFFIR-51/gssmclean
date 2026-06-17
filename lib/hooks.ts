"use client";
import { useEffect } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 원본 initScrollReveal 1:1 포팅 — 기존 .reveal/.is-visible CSS 재사용
export function useScrollReveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-head, .intro-text, .intro-visual, .depart-card, " +
          ".team-card, .team-intro, .why-card, .loc-card, " +
          ".ba-card, .media-card, .map-info, .map-wrap, .cta-title, .cta-btn, " +
          ".hours-block, .visit-map, .visit-info, .depart-img, .depart-info, " +
          ".cond-card, .checkup-card, [data-reveal]"
      )
    );
    targets.forEach((el) => el.classList.add("reveal"));

    if (prefersReduced() || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("js-reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    targets.forEach((el) => observer.observe(el));

    const safety = window.setTimeout(() => {
      targets.forEach((el) => el.classList.add("is-visible"));
    }, 1800);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);
}

// [data-count] 숫자 카운트업 — 원본 initCounters 포팅
export function useCounters() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    if (!els.length || !("IntersectionObserver" in window)) return;

    if (prefersReduced()) {
      els.forEach((el) => {
        const t = parseInt(el.dataset.count || "0", 10) || 0;
        el.textContent = t.toLocaleString();
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.count || "0", 10) || 0;
          const dur = 1400;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased).toLocaleString();
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
