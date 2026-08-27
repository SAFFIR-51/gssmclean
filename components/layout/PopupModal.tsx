"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./PopupModal.module.css";

// 정적 import → 빌드 시 파일 내용 해시가 붙은 URL(/_next/static/media/popup-5.<hash>.png)로 변환된다.
// 이미지를 같은 이름으로 교체해 재배포해도 해시가 바뀌므로 브라우저·CDN 캐시가 자동으로 무효화된다.
// (public/ 에 그대로 두면 URL이 고정이라 옛 캐시가 계속 노출됨 — 강력 새로고침 필요)
import popup1 from "@/assets/popup/popup-1.png";
import popup2 from "@/assets/popup/popup-2.png";
import popup3 from "@/assets/popup/popup-3.png";
import popup4 from "@/assets/popup/popup-4.png";
import popup5 from "@/assets/popup/popup-5.png";

const IMAGES = [popup5, popup4, popup1, popup2, popup3].map((img) => img.src);
const STORAGE_KEY = "gssm-popup-hide-until";
const INTERVAL = 4000;

export default function PopupModal() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const N = IMAGES.length;
  const timer = useRef<number | null>(null);
  const idxRef = useRef(0);
  useEffect(() => { idxRef.current = idx; }, [idx]);

  // "오늘 하루 보지 않기" 설정이 살아있으면 표시하지 않음
  useEffect(() => {
    try {
      const until = Number(localStorage.getItem(STORAGE_KEY) || 0);
      if (Date.now() < until) return;
    } catch { /* localStorage 불가 시 그냥 표시 */ }
    setOpen(true);
  }, []);

  const stop = () => {
    if (timer.current) { window.clearInterval(timer.current); timer.current = null; }
  };
  const start = () => {
    stop();
    timer.current = window.setInterval(() => setIdx((idxRef.current + 1) % N), INTERVAL);
  };
  useEffect(() => {
    if (!open) return;
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const go = (i: number) => { setIdx((i + N) % N); start(); };

  const close = () => { stop(); setOpen(false); };
  const hideToday = () => {
    try {
      const d = new Date();
      d.setHours(23, 59, 59, 999); // 오늘 자정까지 숨김
      localStorage.setItem(STORAGE_KEY, String(d.getTime()));
    } catch { /* noop */ }
    close();
  };

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="강서성모맑은내과 안내 팝업"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className={styles.modal}>
        <div className={styles.viewport} onMouseEnter={stop} onMouseLeave={start}>
          <div className={styles.track} style={{ transform: `translateX(-${idx * 100}%)` }}>
            {IMAGES.map((src, i) => (
              <div className={styles.slide} key={src}>
                <img src={src} alt={`강서성모맑은내과 안내 ${i + 1}`} draggable={false} />
              </div>
            ))}
          </div>

          <button className={`${styles.nav} ${styles.prev}`} type="button" aria-label="이전 안내" onClick={() => go(idx - 1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button className={`${styles.nav} ${styles.next}`} type="button" aria-label="다음 안내" onClick={() => go(idx + 1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>

          <div className={styles.dots}>
            {IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot}${i === idx ? " " + styles.dotOn : ""}`}
                aria-label={`${i + 1}번 안내`}
                aria-current={i === idx}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </div>

        <div className={styles.foot}>
          <button className={styles.footBtn} type="button" onClick={hideToday}>오늘 하루 보지 않기</button>
          <button className={`${styles.footBtn} ${styles.close}`} type="button" onClick={close}>
            닫기
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
