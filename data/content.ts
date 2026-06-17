// 원페이지 섹션 콘텐츠 — 강서성모 실제 촬영 자산 사용
const P = "/clinic/photos";
const img = (n: number) => `${P}/interior-${String(n).padStart(2, "0")}.jpg`;
const doc = (n: number) => `${P}/doctor-${String(n).padStart(2, "0")}.jpg`;

// 히어로 — 배경 영상 + 회전 메시지
export const HERO_VIDEO = { src: "/media/hero.mp4", poster: "/media/hero-poster.jpg" };
export type HeroMessage = { lines: [string, string]; sub: string };
export const HERO_MESSAGES: HeroMessage[] = [
  { lines: ["WITH YOU,", "FOR YOUR LIFE"], sub: "환자분의 건강한 일상을 지키는 가장 가까운 약속, 강서성모맑은내과의원" },
  { lines: ["FAMILY-LIKE CARE,", "FOREVER HEALTH"], sub: "환자분을 가족처럼 정성으로 보살피는 강서성모맑은내과의 약속입니다" },
  { lines: ["A NEW STANDARD", "OF INTERNAL MEDICINE"], sub: "신장학회 인증 인공신장실 · 내과 · 건강검진 통합 진료" },
];

export type Department = { id: string; title: string; desc: string; img: string };
export const DEPARTMENTS: Department[] = [
  { id: "dialysis", title: "인공신장실", img: img(4), desc: "대학병원 출신 신장내과 투석 전문의와 다년간의 투석실 경력을 갖춘 간호사가 함께하여 전문화된 혈액투석 치료가 가능합니다. 넓고 쾌적한 인테리어, TV모니터 설치, 투석 대기실까지 모두 마련되어 있습니다." },
  { id: "nephrology", title: "신장클리닉", img: img(10), desc: "혈뇨, 단백뇨, 부종, 만성신부전 등 신장 관련 질환을 전문적으로 진료합니다. 신장기능 검사, 24시간 소변검사, 신장초음파를 통해 정확한 진단과 단계별 맞춤 치료를 제공합니다." },
  { id: "internal", title: "내과클리닉", img: doc(7), desc: "고혈압, 당뇨, 이상지질혈증, 갑상선질환, 천식, 간질환 등 만성질환과 일반 내과 질환 전반을 진료합니다. 풍부한 임상경험으로 정확한 진단과 지속적인 관리를 약속드립니다." },
  { id: "checkup", title: "건강검진", img: doc(4), desc: "국가건강검진, 일반검진, 종합검진까지 체계적으로 진행합니다. 검진 후 결과 상담 및 사후관리까지 연계되며, 필요시 신장기능 정밀검사로 확장 가능합니다." },
];

// 인공신장실 — 우리의 약속(sticky 스크롤 카드: 이미지 + 텍스트)
export type PromiseCard = { num: string; title: string; desc: string; img: string };
export const DIALYSIS_PROMISE: PromiseCard[] = [
  { num: "01", title: "투석 전문 의료진", desc: "대학병원 출신 신장내과 투석 전문의가 직접 진료하고, 다년간의 투석실 경력을 갖춘 간호사가 1:1로 세심하게 케어합니다.", img: doc(1) },
  { num: "02", title: "신장학회 인증 안전성", desc: "대한신장학회로부터 안전성과 효율성을 인증받은 인공신장실에서, 표준화된 프로토콜로 안전한 혈액투석을 시행합니다.", img: img(17) },
  { num: "03", title: "쾌적한 투석 환경", desc: "넓고 쾌적한 실내와 침대별 개별 TV모니터, 보호자 대기실까지 — 투석 시간을 편안하게 보내실 수 있도록 배려했습니다.", img: img(9) },
  { num: "04", title: "이른 아침·야간 투석", desc: "월·수·금 오전 6시 30분부터 오후 11시까지 운영하여, 직장인 환자분도 일상을 유지하며 치료받으실 수 있습니다.", img: img(6) },
];

export const DIALYSIS_STATS = [
  { value: 11, suffix: "시간", label: "최대 운영 (야간투석)" },
  { value: 1, suffix: ":1", label: "전담 간호 케어" },
  { value: 100, suffix: "%", label: "신장학회 인증" },
];

// 질환 탭 공통 타입
export type Condition = {
  key: string;
  label: string;
  title: string;
  lead: string;
  intro: string;
  img: string;
  points: { name: string; desc: string }[];
};

// 신장클리닉
export const NEPHROLOGY: Condition[] = [
  {
    key: "hematuria", label: "혈뇨", title: "혈뇨 클리닉", img: img(29),
    lead: "소변에 피가 비치면 가벼이 넘기지 마세요. 신장학회 인증 의원의 정확한 검사로 원인을 빠르게 찾아 드립니다.",
    intro: "현미경 고배율 시야에 적혈구가 5개 이상 보이면 혈뇨로 정의합니다. 혈뇨는 신장·요관·방광·요도로 이어지는 요로 어딘가에서 출혈이 있다는 신호이므로 정확한 원인 감별이 중요합니다.",
    points: [
      { name: "요로감염", desc: "요로계에 미생물이 침입해 염증을 일으키는 대표적 혈뇨 원인입니다." },
      { name: "급성사구체신염", desc: "노폐물을 여과하는 사구체에 면역성 염증이 생겨 혈뇨가 발생합니다." },
      { name: "요로결석", desc: "결석으로 인한 혈뇨로, 심한 옆구리 통증을 동반하는 경우가 많습니다." },
      { name: "방광염·전립선염", desc: "방광·전립선의 감염성 염증으로 혈뇨가 나타날 수 있습니다." },
    ],
  },
  {
    key: "proteinuria", label: "단백뇨", title: "단백뇨 클리닉", img: img(13),
    lead: "소변에 거품이 많거나 단백뇨가 의심되면, 정량 평가와 eGFR로 신장 손상 정도를 정확히 확인합니다.",
    intro: "정상보다 많은 양의 단백질이 소변으로 빠져나가는 상태로, 신장 손상의 초기 신호일 수 있습니다. 24시간 소변검사와 혈액검사(eGFR)로 단계를 평가하고 원인 질환을 관리합니다.",
    points: [
      { name: "정량 평가", desc: "스팟뇨/24시간 소변으로 단백뇨 양을 정확히 측정합니다." },
      { name: "신기능 평가", desc: "혈청 크레아티닌과 eGFR로 신장 여과 기능을 확인합니다." },
      { name: "원인 관리", desc: "당뇨·고혈압 등 기저질환을 함께 조절해 진행을 늦춥니다." },
    ],
  },
  {
    key: "edema", label: "부종", title: "부종 클리닉", img: img(24),
    lead: "원인 모를 붓기, 그냥 두지 마세요. 신장·심장·간을 감별해 정확한 원인을 찾습니다.",
    intro: "부종은 조직에 수분이 비정상적으로 고이는 상태입니다. 신장질환·심장질환·간질환 등 원인이 다양하므로 혈액·소변·초음파 검사로 정확히 감별하는 것이 핵심입니다.",
    points: [
      { name: "신성 부종", desc: "신장 기능 저하로 수분·염분이 배출되지 못해 발생합니다." },
      { name: "심장·간성 감별", desc: "심부전·간경변 등 다른 원인과 체계적으로 구분합니다." },
      { name: "맞춤 치료", desc: "원인에 따른 약물·식이(저염식) 관리로 부종을 조절합니다." },
    ],
  },
  {
    key: "ckd", label: "만성신부전", title: "만성신부전 클리닉", img: img(12),
    lead: "콩팥 기능은 한번 나빠지면 회복이 어렵습니다. 단계별 통합 관리로 진행을 최대한 늦춰 드립니다.",
    intro: "3개월 이상 신장 기능이나 구조에 이상이 지속되는 상태로, eGFR에 따라 1~5단계로 구분합니다. 단계에 맞는 약물·식이·생활관리와 투석 시점 결정까지 일관되게 관리합니다.",
    points: [
      { name: "단계별 평가", desc: "eGFR 기반으로 신부전 단계를 정확히 평가합니다." },
      { name: "합병증 관리", desc: "빈혈·고혈압·전해질 이상 등 합병증을 함께 관리합니다." },
      { name: "투석 연계", desc: "필요 시 원내 인공신장실로 자연스럽게 연계해 투석을 시작합니다." },
    ],
  },
];

// 내과클리닉
export const INTERNAL: Condition[] = [
  {
    key: "hypertension", label: "고혈압", title: "고혈압 클리닉", img: img(27),
    lead: "진료실 혈압만으로는 부족합니다. 24시간 활동혈압으로 숨은 고혈압까지 정확히 진단합니다.",
    intro: "지속적으로 높은 혈압은 신장·심장·뇌혈관에 부담을 줍니다. 24시간 활동혈압 측정으로 백의·가면 고혈압을 감별하고, 신장 합병증을 함께 평가해 맞춤 관리합니다.",
    points: [
      { name: "24시간 활동혈압", desc: "일상 중 혈압 변동을 측정해 정확히 진단합니다." },
      { name: "신장 합병증 평가", desc: "단백뇨·신기능을 함께 확인해 표적장기 손상을 점검합니다." },
      { name: "약물 최적화", desc: "환자 상태에 맞춰 약제를 조절하고 꾸준히 추적합니다." },
    ],
  },
  {
    key: "diabetes", label: "당뇨", title: "당뇨 클리닉", img: img(2),
    lead: "혈당 조절을 넘어 합병증까지. HbA1c와 신장 합병증을 함께 관리합니다.",
    intro: "당뇨는 혈당 자체보다 합병증 관리가 중요합니다. 당화혈색소(HbA1c) 기반으로 혈당을 관리하고, 당뇨병성 신증 등 신장 합병증을 조기에 발견·관리합니다.",
    points: [
      { name: "HbA1c 관리", desc: "당화혈색소로 장기 혈당 조절 상태를 평가합니다." },
      { name: "신장 합병증", desc: "미세단백뇨·eGFR로 당뇨병성 신증을 조기 발견합니다." },
      { name: "생활습관 코칭", desc: "식이·운동·약물을 통합한 맞춤 관리를 제공합니다." },
    ],
  },
  {
    key: "dyslipidemia", label: "이상지질혈증", title: "이상지질혈증 클리닉", img: doc(9),
    lead: "콜레스테롤 수치 그 이상. 심혈관 위험도까지 종합 평가합니다.",
    intro: "LDL 콜레스테롤·중성지방 등의 이상은 동맥경화와 심혈관질환의 핵심 위험인자입니다. 개인별 심혈관 위험도를 평가해 목표 수치를 정하고 관리합니다.",
    points: [
      { name: "심혈관 위험 평가", desc: "동반 위험인자를 종합해 개인별 목표를 설정합니다." },
      { name: "지질 정밀검사", desc: "LDL·HDL·중성지방을 정확히 측정합니다." },
      { name: "약물·식이 관리", desc: "스타틴 등 약물과 식이요법을 병행합니다." },
    ],
  },
  {
    key: "thyroid", label: "갑상선질환", title: "갑상선 클리닉", img: doc(2),
    lead: "피로·체중 변화의 원인일 수 있습니다. 호르몬 검사와 초음파로 정확히 진단합니다.",
    intro: "갑상선 기능 이상(항진·저하)과 결절은 흔하지만 증상이 모호합니다. 갑상선 호르몬 혈액검사와 고해상도 초음파로 정확히 진단하고 관리합니다.",
    points: [
      { name: "호르몬 검사", desc: "TSH·T3·T4로 기능 이상을 정확히 평가합니다." },
      { name: "갑상선 초음파", desc: "고해상도 초음파로 결절을 확인합니다." },
      { name: "지속 관리", desc: "약물 조절과 정기 추적으로 안정적으로 관리합니다." },
    ],
  },
  {
    key: "asthma", label: "천식", title: "천식·호흡기 클리닉", img: img(26),
    lead: "반복되는 기침과 호흡곤란, 폐기능 검사로 원인을 확인합니다.",
    intro: "천식은 기도의 만성 염증으로 인한 호흡기 질환입니다. 폐기능 검사로 객관적으로 진단하고, 흡입제 중심의 치료로 증상을 효과적으로 조절합니다.",
    points: [
      { name: "폐기능 검사", desc: "객관적 지표로 천식·만성폐쇄성폐질환을 감별합니다." },
      { name: "흡입제 치료", desc: "흡입제 사용법 교육과 함께 맞춤 처방을 제공합니다." },
      { name: "악화 예방", desc: "유발인자 관리와 정기 점검으로 악화를 예방합니다." },
    ],
  },
  {
    key: "liver", label: "간질환", title: "간질환 클리닉", img: img(29),
    lead: "지방간부터 간염까지, 혈액검사와 초음파로 간 건강을 점검합니다.",
    intro: "지방간·간염 등 간질환은 초기에 증상이 거의 없습니다. 간기능 혈액검사와 복부 초음파로 조기에 발견하고 진행을 관리합니다.",
    points: [
      { name: "간기능 검사", desc: "AST·ALT 등 혈액검사로 간 상태를 평가합니다." },
      { name: "복부 초음파", desc: "지방간·간 구조 이상을 정밀하게 확인합니다." },
      { name: "생활·약물 관리", desc: "원인에 맞는 생활습관 교정과 치료를 제공합니다." },
    ],
  },
];

// 건강검진
export const CHECKUP = {
  lead: "국가건강검진부터 종합검진까지, 검진 후 상담과 사후관리까지 한 곳에서.",
  items: [
    { title: "국가건강검진", desc: "일반검진·암검진 등 국가에서 지원하는 검진을 정확하게 진행합니다." },
    { title: "일반·종합검진", desc: "혈액·소변·영상검사를 조합한 맞춤형 종합검진을 제공합니다." },
    { title: "신장 정밀검사", desc: "신장기능·단백뇨·신장초음파로 콩팥 건강을 심층 점검합니다." },
    { title: "결과 상담·사후관리", desc: "전문의가 결과를 직접 설명하고 필요한 진료로 연계합니다." },
  ],
};

// Why — 투석 강점 5카드
export type WhyItem = { num: string; title: string; desc: string; img: string };
export const WHY_ITEMS: WhyItem[] = [
  { num: "01", title: "투석전문 의료진의\n체계적인 혈액투석 시스템", desc: "대학병원 출신의 신장내과 투석 전문의와 다년간의 투석실 경력을 갖춘 간호사가 함께하여 전문화된 치료가 가능합니다.", img: img(8) },
  { num: "02", title: "편안하고 쾌적한\n투석실 환경", desc: "넓고 쾌적하며 편안한 규모의 실내 인테리어 공간에서 혈액투석이 가능합니다. 침대마다 개별 TV모니터를 설치하여 투석 중에도 편안한 시간을 보내실 수 있습니다.", img: img(7) },
  { num: "03", title: "보호자를 위한\n투석 대기실 운영", desc: "투석치료가 끝나기를 기다리는 보호자를 위한 편안하고 안락한 투석 대기실 공간이 마련되어 있습니다. 환자분뿐 아니라 가족까지 함께 케어합니다.", img: img(28) },
  { num: "04", title: "신장학회 인증 의원\n안전성과 효율성", desc: "대한신장학회로부터 안전성과 효율성을 모두 인증받은 의원입니다. 보건복지부에서 인정한 내과전문의가 직접 진료합니다.", img: img(20) },
  { num: "05", title: "이른 아침 · 야간 투석\n유연한 시간 운영", desc: "인공신장실 월·수·금은 오전 6시 30분부터 오후 11시까지 운영하여 직장인 환자분들도 편하게 치료받으실 수 있도록 배려합니다.", img: img(5) },
];

// 장비 — 기존 장비 제품이미지(device) + 실제 장비실 사진(photo) 함께
export type Equip = { num: string; cat: string; title: string; sub: string; device: string; photo: string };
export const EQUIPMENT: Equip[] = [
  { num: "01", cat: "디지털 X-ray", title: "ESSENCE 5", sub: "디알텍 · 저선량 정밀 영상촬영", device: "/clinic/equip-xray.png", photo: img(23) },
  { num: "02", cat: "초음파", title: "HS40", sub: "삼성메디슨 · 고해상도 복부·갑상선 검사", device: "/clinic/equip-ultrasound.png", photo: img(30) },
  { num: "03", cat: "골밀도검사", title: "DEXXUM T QUANTUM", sub: "오스테오시스 · 정밀 골밀도 측정", device: "/clinic/equip-osteopro.png", photo: img(25) },
  { num: "04", cat: "혈액투석기", title: "NCU-18", sub: "Nipro · 안정적인 투석 모니터링", device: "/clinic/equip-dialysis.png", photo: img(11) },
];

// 의료진
export const DOCTOR = {
  name: "오영승",
  role: "대표원장",
  spec: "신장 투석 전문의 · 소화기내시경 세부전문의",
  photo: doc(8),
  history: [
    "현) 강서성모맑은내과의원 원장",
    "전) 메디인병원 신장내과 과장",
    "전) 부천우리병원 소화기내과 과장",
    "전) 국군고양병원 내과 과장",
    "순천향대학교 부천병원 신장내과 임상강사",
    "가톨릭대학교 부천성모병원 소화기내과 임상강사",
    "가톨릭중앙의료원 인턴 · 내과 전문의",
    "대한내과학회 종신회원 · 대한신장학회 · 대한소화기내과학회 정회원",
    "대한당뇨병학회 · 대한고혈압학회 · 대한골대사학회 정회원",
  ],
};

// 인트로 이미지
export const INTRO_IMG = { main: img(3), sub: doc(5) };

// 둘러보기 갤러리 — 큐레이션
export const GALLERY = [
  { alt: "접수 · 로비", img: img(1) },
  { alt: "인공신장실 전경", img: img(4) },
  { alt: "투석 베드 공간", img: img(5) },
  { alt: "투석실 채광 공간", img: img(9) },
  { alt: "혈액투석기", img: img(11) },
  { alt: "수처리 설비", img: img(17) },
  { alt: "기계실", img: img(22) },
  { alt: "X-Ray 검사실", img: img(23) },
  { alt: "골밀도 검사실", img: img(25) },
  { alt: "초음파 진료실", img: img(30) },
  { alt: "인공신장실 입구", img: img(31) },
];
