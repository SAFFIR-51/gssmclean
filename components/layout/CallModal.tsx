"use client";
import { useEffect, useState } from "react";
import { CLINIC } from "@/data/clinic";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function CallModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const t = ev.target as HTMLElement;
      if (t.closest("[data-open-call]")) {
        ev.preventDefault();
        setOpen(true);
      } else if (t.closest("[data-close-call]")) {
        ev.preventDefault();
        setOpen(false);
      }
    };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("call-open", open);
  }, [open]);

  return (
    <div
      className={`call-modal${open ? " open" : ""}`}
      id="callModal"
      aria-hidden={!open}
      role="dialog"
      aria-labelledby="callModalTitle"
    >
      <div className="call-modal__backdrop" data-close-call></div>
      <div className="call-modal__panel" role="document">
        <button type="button" className="call-modal__close" aria-label="닫기" data-close-call>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>
        <p className="call-modal__eyebrow">Call</p>
        <h3 className="call-modal__title" id="callModalTitle">전화 연결</h3>
        <p className="call-modal__desc">원하시는 곳으로 바로 연결됩니다.</p>
        <div className="call-modal__list">
          <a href={`tel:${CLINIC.tel.main}`} className="call-item call-item--primary">
            <span className="call-item__ico" aria-hidden="true"><PhoneIcon /></span>
            <span className="call-item__text">
              <span className="call-item__label">대표전화</span>
              <strong className="call-item__num">{CLINIC.tel.main}</strong>
            </span>
            <span className="call-item__arrow" aria-hidden="true">→</span>
          </a>
          <a href={`tel:${CLINIC.tel.dialysis}`} className="call-item">
            <span className="call-item__ico" aria-hidden="true"><PhoneIcon /></span>
            <span className="call-item__text">
              <span className="call-item__label">인공신장실</span>
              <strong className="call-item__num">{CLINIC.tel.dialysis}</strong>
            </span>
            <span className="call-item__arrow" aria-hidden="true">→</span>
          </a>
        </div>
        <p className="call-modal__hours">
          평일 08:00–19:00 · 토요일 09:00–14:00<br />인공신장실은 일요일 제외 연중무휴 운영
        </p>
      </div>
    </div>
  );
}
