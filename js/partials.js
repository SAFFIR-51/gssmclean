/* Inject shared header / footer / floating buttons into subpages. */

(function () {
  const ROOT = (() => {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/pages/')) return '../';
    return './';
  })();

  const headerHTML = `
  <header class="header" id="header">
    <div class="header-inner">
      <a href="${ROOT}index.html" class="logo" aria-label="강서성모맑은내과의원 홈">
        <img src="${ROOT}assets/clinic/logo.png" alt="강서성모맑은내과의원" />
      </a>
      <nav class="gnb" aria-label="주메뉴">
        <ul class="gnb-list">
          <li class="gnb-item">
            <a href="${ROOT}pages/lu-story.html" class="gnb-link">병원소개</a>
            <div class="mega">
              <ul>
                <li><a href="${ROOT}pages/lu-story.html"><span>이야기</span><em>강서성모맑은내과 이야기</em></a></li>
                <li><a href="${ROOT}pages/lu-tour.html"><span>둘러보기</span><em>진료실 · 인공신장실</em></a></li>
                <li><a href="${ROOT}pages/lu-visit.html"><span>오시는 길</span><em>진료시간 · 위치</em></a></li>
              </ul>
            </div>
          </li>
          <li class="gnb-item">
            <a href="${ROOT}pages/implant-digital.html" class="gnb-link">내과클리닉</a>
            <div class="mega">
              <ul>
                <li><a href="${ROOT}pages/implant-digital.html#hypertension"><span>고혈압</span><em>24시간 활동혈압</em></a></li>
                <li><a href="${ROOT}pages/implant-digital.html#diabetes"><span>당뇨</span><em>HbA1c · 신장 합병증</em></a></li>
                <li><a href="${ROOT}pages/implant-digital.html#dyslipidemia"><span>이상지질혈증</span><em>심혈관 위험 평가</em></a></li>
                <li><a href="${ROOT}pages/implant-digital.html#thyroid"><span>갑상선질환</span><em>호르몬 · 초음파</em></a></li>
                <li><a href="${ROOT}pages/implant-digital.html#asthma"><span>천식</span><em>폐기능 · 흡입제</em></a></li>
                <li><a href="${ROOT}pages/implant-digital.html#liver"><span>간질환</span><em>지방간 · 간염</em></a></li>
              </ul>
            </div>
          </li>
          <li class="gnb-item">
            <a href="${ROOT}pages/natural.html" class="gnb-link">신장클리닉</a>
            <div class="mega">
              <ul>
                <li><a href="${ROOT}pages/natural.html#hematuria"><span>혈뇨</span><em>요검사 · 신장초음파</em></a></li>
                <li><a href="${ROOT}pages/natural.html#proteinuria"><span>단백뇨</span><em>정량 평가 · eGFR</em></a></li>
                <li><a href="${ROOT}pages/natural.html#edema"><span>부종</span><em>신장 · 심장 · 간 감별</em></a></li>
                <li><a href="${ROOT}pages/natural.html#ckd"><span>만성신부전</span><em>단계별 통합 관리</em></a></li>
              </ul>
            </div>
          </li>
          <li class="gnb-item"><a href="${ROOT}pages/spa.html" class="gnb-link">인공신장실</a></li>
        </ul>
      </nav>
      <div class="header-utils">
        <a href="#" class="hd-cta hd-cta--book" aria-label="예약하기">
          <span>예약하기</span>
        </a>
        <button id="mnav-toggle" type="button" aria-label="메뉴" onclick="document.getElementById('mnav').classList.toggle('open');this.classList.toggle('open');document.body.classList.toggle('mnav-open');return false;">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- 모바일 전용 드로어 (별개 요소) -->
  <aside id="mnav" aria-label="모바일 메뉴">
    <div class="mnav-head">
      <a href="${ROOT}index.html" class="mnav-logo" aria-label="강서성모맑은내과의원 홈">
        <img src="${ROOT}assets/clinic/logo.png" alt="강서성모맑은내과의원" />
      </a>
      <button class="mnav-close" type="button" aria-label="메뉴 닫기" onclick="document.getElementById('mnav').classList.remove('open');document.getElementById('mnav-toggle').classList.remove('open');document.body.classList.remove('mnav-open');return false;">
        <span></span><span></span>
      </button>
    </div>
    <nav class="mnav-body">
      <ul class="mnav-list">
        <li class="mnav-group">
          <a class="mnav-top" href="${ROOT}pages/lu-story.html">병원소개</a>
          <ul class="mnav-sub">
            <li><a href="${ROOT}pages/lu-story.html">이야기</a></li>
            <li><a href="${ROOT}pages/lu-tour.html">둘러보기</a></li>
            <li><a href="${ROOT}pages/lu-visit.html">오시는 길</a></li>
          </ul>
        </li>
        <li class="mnav-group">
          <a class="mnav-top" href="${ROOT}pages/implant-digital.html">내과클리닉</a>
          <ul class="mnav-sub">
            <li><a href="${ROOT}pages/implant-digital.html#hypertension">고혈압</a></li>
            <li><a href="${ROOT}pages/implant-digital.html#diabetes">당뇨</a></li>
            <li><a href="${ROOT}pages/implant-digital.html#dyslipidemia">이상지질혈증</a></li>
            <li><a href="${ROOT}pages/implant-digital.html#thyroid">갑상선질환</a></li>
            <li><a href="${ROOT}pages/implant-digital.html#asthma">천식</a></li>
            <li><a href="${ROOT}pages/implant-digital.html#liver">간질환</a></li>
          </ul>
        </li>
        <li class="mnav-group">
          <a class="mnav-top" href="${ROOT}pages/natural.html">신장클리닉</a>
          <ul class="mnav-sub">
            <li><a href="${ROOT}pages/natural.html#hematuria">혈뇨</a></li>
            <li><a href="${ROOT}pages/natural.html#proteinuria">단백뇨</a></li>
            <li><a href="${ROOT}pages/natural.html#edema">부종</a></li>
            <li><a href="${ROOT}pages/natural.html#ckd">만성신부전</a></li>
          </ul>
        </li>
        <li class="mnav-group">
          <a class="mnav-top" href="${ROOT}pages/spa.html">인공신장실</a>
        </li>
      </ul>
    </nav>
    <div class="mnav-foot">
      <a href="#" class="mnav-cta">예약하기</a>
      <p class="mnav-info">서울특별시 강서구 공항대로 200<br />마곡지웰타워 3F</p>
    </div>
  </aside>`;

  const footerHTML = `
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-top">
        <a href="${ROOT}index.html" class="footer-logo"><img src="${ROOT}assets/clinic/logo.png" alt="강서성모맑은내과의원" /></a>
        <ul class="footer-links">
          <li><a href="#">이용약관</a></li>
          <li><a href="#">개인정보처리방침</a></li>
        </ul>
      </div>
      <div class="footer-bottom">
        <p>강서성모맑은내과의원 | 대표자 : 오영승 | 사업자등록번호 : 812-97-01891</p>
        <p>서울특별시 강서구 공항대로 200, 마곡지웰타워 3F</p>
        <p>Copyright © 2026 강서성모맑은내과의원. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <div class="floating">
    <button class="float-btn float-btn--top" id="topBtn" aria-label="맨 위로">↑</button>
  </div>`;

  const headerSlot = document.getElementById('header-slot');
  const footerSlot = document.getElementById('footer-slot');
  if (headerSlot) headerSlot.outerHTML = headerHTML;
  if (footerSlot) footerSlot.outerHTML = footerHTML;
})();
