import type { Metadata } from "next";
import LegalShell from "@/components/layout/LegalShell";

export const metadata: Metadata = {
  title: "이용약관 | 강서성모맑은내과의원",
  description: "강서성모맑은내과의원 웹사이트 이용약관 안내.",
  alternates: { canonical: "https://www.gssmclean.co.kr/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Terms of Service"
      title="이용약관"
      subtitle="강서성모맑은내과의원 웹사이트 이용에 관한 약관을 안내드립니다."
    >
      <p className="legal-intro">
        본 약관은 강서성모맑은내과의원(이하 “의원”)이 운영하는 웹사이트에서 제공하는 정보 및 서비스의 이용 조건과 절차에 관한 사항을 규정합니다.
      </p>

      <article className="legal-block">
        <h2 className="legal-h2">1. 목적</h2>
        <p>본 약관은 의원 웹사이트가 제공하는 진료 안내, 예약 문의, 커뮤니티 등 서비스의 이용과 관련하여 의원과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
      </article>

      <article className="legal-block">
        <h2 className="legal-h2">2. 서비스의 제공</h2>
        <ul className="legal-list">
          <li>진료 과목 및 의료진 정보 안내</li>
          <li>진료 시간 및 오시는 길 안내</li>
          <li>전화 예약 및 상담 안내</li>
          <li>공지사항 등 의원 소식 제공</li>
        </ul>
        <p>본 웹사이트의 정보는 일반적인 건강 정보 제공을 목적으로 하며, 전문적인 의학적 진단·치료를 대체하지 않습니다. 정확한 진단과 치료는 반드시 의료진과의 대면 진료를 통해 이루어져야 합니다.</p>
      </article>

      <article className="legal-block">
        <h2 className="legal-h2">3. 이용자의 의무</h2>
        <ul className="legal-list">
          <li>타인의 정보를 도용하거나 허위 정보를 입력하지 않습니다.</li>
          <li>의원 및 제3자의 지식재산권을 침해하지 않습니다.</li>
          <li>웹사이트 운영을 방해하는 행위를 하지 않습니다.</li>
        </ul>
      </article>

      <article className="legal-block">
        <h2 className="legal-h2">4. 저작권</h2>
        <p>웹사이트에 게시된 모든 콘텐츠(텍스트, 이미지, 디자인 등)의 저작권은 의원에 있으며, 사전 동의 없이 무단 복제·배포·전송할 수 없습니다.</p>
      </article>

      <article className="legal-block">
        <h2 className="legal-h2">5. 책임의 한계</h2>
        <p>의원은 천재지변, 시스템 장애 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않으며, 이용자가 웹사이트의 정보에 의존하여 행한 판단의 결과에 대해 법령이 허용하는 범위에서 책임을 제한합니다.</p>
      </article>

      <article className="legal-block">
        <h2 className="legal-h2">6. 약관의 변경</h2>
        <p>본 약관은 관련 법령 또는 의원 운영 방침에 따라 변경될 수 있으며, 변경 시 웹사이트를 통해 공지합니다.</p>
        <p className="legal-meta">시행일자 — 2026년 1월 1일</p>
      </article>
    </LegalShell>
  );
}
