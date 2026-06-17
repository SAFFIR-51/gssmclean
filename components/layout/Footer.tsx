import Link from "next/link";
import { CLINIC } from "@/data/clinic";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <a href="#hero" className="footer-logo">
            <img src="/clinic/logo.png" alt="강서성모맑은내과의원" />
          </a>
          <ul className="footer-links">
            <li><Link href="/terms">이용약관</Link></li>
            <li><Link href="/privacy">개인정보처리방침</Link></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>{CLINIC.name} | 대표자 : {CLINIC.rep} | 사업자등록번호 : {CLINIC.bizNo}</p>
          <p>{CLINIC.address}</p>
          <p>
            대표전화 <a href={`tel:${CLINIC.tel.main}`}>{CLINIC.tel.main}</a> · 인공신장실{" "}
            <a href={`tel:${CLINIC.tel.dialysis}`}>{CLINIC.tel.dialysis}</a>
          </p>
          <p>Copyright © 2026 {CLINIC.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
