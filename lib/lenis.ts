import type Lenis from "lenis";

// 전역 Lenis 인스턴스 보관 — 앵커 링크에서 부드러운 스크롤에 사용
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

export const HEADER_OFFSET = 88;

// 특정 섹션 id로 부드럽게 스크롤 (헤더 높이만큼 보정)
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: -HEADER_OFFSET });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
