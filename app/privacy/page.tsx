import type { Metadata } from "next";
import LegalShell from "@/components/layout/LegalShell";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 강서성모맑은내과의원",
  description:
    "강서성모맑은내과의원 개인정보처리방침 — 수집하는 개인정보 항목, 수집·이용 목적, 보유 및 이용 기간, 안전성 확보 조치 등을 안내드립니다.",
  alternates: { canonical: "https://www.gssmclean.co.kr/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Privacy Policy"
      title="개인정보처리방침"
      subtitle="강서성모맑은내과의원은 환자분의 개인정보를 소중히 다루며, 관련 법령을 준수합니다."
    >
      <p className="legal-intro">
        강서성모맑은내과의원(이하 “의원”)은 「개인정보 보호법」, 「의료법」 등 관련 법령에 따라 환자분의 개인정보를 안전하게 보호하고 원활한 진료를 위해 필요한 범위 내에서만 처리합니다. 본 방침은 의원이 운영하는 웹사이트와 진료 과정에서 수집·이용되는 개인정보 처리에 관한 내용을 안내드립니다.
      </p>

      <article className="legal-block">
        <h2 className="legal-h2">1. 수집하는 개인정보 항목</h2>
        <p>의원은 다음의 개인정보를 수집·이용합니다.</p>
        <ul className="legal-list">
          <li><strong>진료 관련</strong> — 성명, 생년월일, 성별, 연락처, 주소, 주민등록번호(법령상 의무 보유 시), 보호자 정보, 진료기록, 검사·영상 자료, 처방 내역, 건강보험·의료급여 정보</li>
          <li><strong>홈페이지 이용</strong> — 문의 시 입력하는 이름, 연락처, 이메일, 문의 내용</li>
          <li><strong>자동 수집 항목</strong> — 접속 IP, 쿠키, 서비스 이용 기록, 방문 일시(통계 목적의 비식별 정보)</li>
        </ul>
      </article>

      <article className="legal-block">
        <h2 className="legal-h2">2. 수집·이용 목적</h2>
        <ul className="legal-list">
          <li>진료·상담·검사·처방 등 의료서비스 제공</li>
          <li>건강보험 청구, 본인확인, 진료기록 관리</li>
          <li>예약 안내, 진료 관련 공지, 검사 결과 안내</li>
          <li>의료법·약사법·국민건강보험법 등 관련 법령상 의무 이행</li>
          <li>고충 처리, 분쟁 해결, 민원 응대</li>
        </ul>
      </article>

      <article className="legal-block">
        <h2 className="legal-h2">3. 보유 및 이용 기간</h2>
        <p>의원은 관련 법령에서 정한 기간 동안 개인정보를 보유하며, 보유 기간 경과 또는 처리 목적 달성 시 지체 없이 파기합니다.</p>
        <ul className="legal-list">
          <li>환자 명부 — 5년 (의료법 시행규칙 제15조)</li>
          <li>진료기록부, 수술기록 — 10년 (의료법 시행규칙 제15조)</li>
          <li>처방전 — 2년</li>
          <li>검사 소견서, 방사선 사진 및 그 소견서 — 5년</li>
          <li>홈페이지 문의 기록 — 처리 완료 후 1년</li>
        </ul>
      </article>

      <article className="legal-block">
        <h2 className="legal-h2">4. 개인정보의 제3자 제공</h2>
        <p>의원은 환자분의 개인정보를 정보주체의 동의 없이 외부에 제공하지 않습니다. 다만 법령에 따른 보험청구·심사, 상급 의료기관 진료 의뢰(동의 시), 감염병 신고 의무, 영장에 의한 요청 등의 경우에는 예외로 합니다.</p>
      </article>

      <article className="legal-block">
        <h2 className="legal-h2">5. 정보주체의 권리 및 행사 방법</h2>
        <p>환자분은 언제든지 자신의 개인정보에 대해 열람·정정·삭제·처리정지를 요청할 수 있으며, 의원은 요청 접수 후 10일 이내에 처리 결과를 안내드립니다. 다만 의료법 등 다른 법령에서 정한 보존 의무가 있는 경우 해당 기간 동안 보관됩니다.</p>
      </article>

      <article className="legal-block">
        <h2 className="legal-h2">6. 개인정보 보호책임자</h2>
        <div className="legal-contact">
          <p><strong>개인정보 보호책임자</strong> — 오영승 대표원장</p>
          <p><strong>연락처</strong> — 02-2666-0666</p>
          <p><strong>주소</strong> — 서울특별시 강서구 공항대로 200, 마곡지웰타워 3F</p>
        </div>
        <p className="legal-meta">시행일자 — 2026년 1월 1일</p>
      </article>
    </LegalShell>
  );
}
