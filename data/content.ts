// 원페이지 섹션 콘텐츠 — 강서성모 실제 촬영 자산 사용
const P = "/clinic/photos";
const img = (n: number) => `${P}/interior-${String(n).padStart(2, "0")}.jpg`;
const doc = (n: number) => `${P}/doctor-${String(n).padStart(2, "0")}.jpg`;
// 질환 탭 전용 이미지 (강서성모 직접 생성 자산)
const cond = (name: string) => `/clinic/cond/cond-${name}.jpg`;

// 히어로 — 배경 영상 + 회전 메시지
export const HERO_VIDEO = { src: "/media/hero.mp4", poster: "/media/hero-poster.jpg" };
export type HeroMessage = { lines: [string, string]; sub: string };
export const HERO_MESSAGES: HeroMessage[] = [
  { lines: ["WITH YOU,", "FOR YOUR LIFE"], sub: "환자분의 건강한 일상을 지키는 가장 가까운 약속, 강서성모맑은내과의원" },
  { lines: ["FAMILY-LIKE CARE,", "FOREVER HEALTH"], sub: "환자분을 가족처럼 정성으로 보살피는 강서성모맑은내과의 약속입니다" },
  { lines: ["A NEW STANDARD", "OF INTERNAL MEDICINE"], sub: "신장학회 인증 인공신장실 · 신장클리닉 · 내과 통합 진료" },
];

export type Department = { id: string; title: string; desc: string; img: string };
export const DEPARTMENTS: Department[] = [
  { id: "dialysis", title: "인공신장실", img: img(4), desc: "대학병원 출신 신장내과 투석 전문의와 다년간의 투석실 경력을 갖춘 간호사가 함께하여 전문화된 혈액투석 치료가 가능합니다. 넓고 쾌적한 인테리어, TV모니터 설치, 투석 대기실까지 모두 마련되어 있습니다." },
  { id: "nephrology", title: "신장클리닉", img: img(10), desc: "혈뇨, 단백뇨, 부종, 만성신부전 등 신장 관련 질환을 전문적으로 진료합니다. 신장기능 검사, 24시간 소변검사, 신장초음파를 통해 정확한 진단과 단계별 맞춤 치료를 제공합니다." },
  { id: "internal", title: "내과클리닉", img: doc(7), desc: "고혈압, 당뇨, 이상지질혈증, 갑상선질환, 천식, 간질환 등 만성질환과 일반 내과 질환 전반을 진료합니다. 풍부한 임상경험으로 정확한 진단과 지속적인 관리를 약속드립니다." },
];

// 인공신장실 — 우리의 약속(sticky 스크롤 카드: 이미지 + 텍스트)
export type PromiseCard = { num: string; title: string; desc: string; img: string; imgPos?: string };
export const DIALYSIS_PROMISE: PromiseCard[] = [
  { num: "01", title: "대학병원 수준의 전문 투석 의료진", desc: "대학병원 신장내과 전문의이자 대한신장학회 인증 투석 전문의가 직접 진료합니다. 환자 한분 한분의 상태를 면밀히 평가하여 최적의 투석처방과 장기적인 혈관관리, 합병증 예방까지 책임지는 맞춤형 진료를 제공합니다.", img: doc(1) },
  { num: "02", title: "30년 이상의 투석실 경험을 갖춘 전문 간호사", desc: "30년 이상 혈액투석실에서 근무한 전문간호사가 상주하여 환자 상태를 세심하게 관찰합니다. 투석 중 발생할 수 있는 다양한 상황에 신속하게 대응하며, 환자분들이 안심하고 치료받으실 수 있는 환경을 제공합니다.", img: "/images/promise-nurse.jpg" },
  { num: "03", title: "철저한 정수 시스템과 안전한 투석 환경", desc: "혈액투석의 핵심은 깨끗한 물입니다. 본원은 철저한 정수 관리 시스템을 구축하여 투석액의 수질을 지속적으로 관리하며, 환자분들이 안심하고 치료받을 수 있는 안전한 환경을 제공합니다.", img: img(17) },
  { num: "04", title: "최신 투석장비를 이용한 고효율 혈액투석", desc: "NIPRO NCU-18 장비를 이용하여 고효율 혈액투석여과(online HDF)를 시행합니다. 투석 상태를 실시간으로 확인하며 보다 정확하고 안정적인 치료를 제공합니다. 모든 환자에게 동일한 투석을 시행하지 않습니다. 환자의 혈관 상태, 영양 상태 및 동반 질환을 고려하여 다양한 종류의 투석막을 선택함으로써 보다 효율적이고 편안한 투석치료를 제공합니다.", img: "/images/promise-equipment.png" },
  { num: "05", title: "직장인을 위한 야간 투석", desc: "이른 아침부터 야간까지 운영하여 직장인도 치료와 일상을 함께 이어갈 수 있습니다. 본원은 오전 7시부터 오후 11시까지 운영하여, 출근 전 아침 투석과 퇴근 후 야간 투석이 가능합니다. 직장·학업·일상생활로 낮 시간 투석이 어려운 환자분들도 자신의 생활 패턴에 맞추어 편리하게 치료받으실 수 있습니다.", img: img(9) },
];

// 실제 운영 정보 기반 (카운트업 대신 텍스트 표기)
export const DIALYSIS_STATS = [
  { value: "월·수·금", label: "야간투석 운영 (오후 11시까지)" },
  { value: "연중무휴", label: "인공신장실 운영 · 일요일 제외" },
  { value: "신장학회", label: "안전성·효율성 인증 의원" },
];

// 질환 탭 공통 타입
export type Condition = {
  key: string;
  label: string;
  title: string;
  lead: string;
  intro: string;
  img: string;
  symptoms: string[]; // 환자용 — 이런 증상이 있다면
};

// 신장클리닉
export const NEPHROLOGY: Condition[] = [
  {
    key: "hematuria", label: "혈뇨", title: "혈뇨 클리닉", img: cond("hematuria"),
    lead: "소변에 피가 비치면 가볍게 넘기지 마세요. 정확한 검사로 원인을 빠르게 찾아 드립니다.",
    intro: "소변에 피가 섞여 나오는 상태로, 신장이나 요로(요관·방광·요도)에 이상이 있다는 신호일 수 있습니다. 원인이 다양하기 때문에 검사를 통해 정확한 원인을 확인하는 것이 중요합니다.",
    symptoms: ["소변 색이 붉거나 탁함", "소변에 피가 비침", "건강검진 소변검사 이상"],
  },
  {
    key: "proteinuria", label: "단백뇨", title: "단백뇨 클리닉", img: cond("proteinuria"),
    lead: "소변에 거품이 많거나 단백뇨가 의심되면, 검사로 신장 상태를 정확히 확인해 드립니다.",
    intro: "단백질이 소변으로 빠져나가는 상태로, 신장이 손상되기 시작했다는 초기 신호일 수 있습니다. 소변·혈액 검사로 상태를 확인하고 원인을 함께 관리합니다.",
    symptoms: ["소변에 거품이 많음", "눈 주위·다리가 붓는다", "소변검사에서 단백뇨"],
  },
  {
    key: "edema", label: "부종", title: "부종 클리닉", img: cond("edema"),
    lead: "원인 모를 붓기, 그냥 두지 마세요. 정확한 원인을 찾아 드립니다.",
    intro: "몸에 수분이 비정상적으로 고여 붓는 상태입니다. 신장·심장·간 등 원인이 다양하므로 검사를 통해 정확히 구분하는 것이 중요합니다.",
    symptoms: ["다리·발이 자주 붓는다", "아침에 얼굴이 붓는다", "체중이 갑자기 늘었다"],
  },
  {
    key: "ckd", label: "만성신부전", title: "만성신부전 클리닉", img: cond("ckd"),
    lead: "콩팥 기능은 한번 나빠지면 회복이 어렵습니다. 꾸준한 관리로 진행을 최대한 늦춰 드립니다.",
    intro: "신장 기능이 오랜 기간에 걸쳐 서서히 떨어지는 상태입니다. 단계에 맞춰 약물·식이·생활관리를 하고, 필요할 때 원내 인공신장실에서 투석까지 이어 관리합니다.",
    symptoms: ["쉽게 피로하고 입맛이 없다", "소변량·횟수가 변했다", "신장 수치 이상 진단"],
  },
];

// 내과클리닉
export const INTERNAL: Condition[] = [
  {
    key: "hypertension", label: "고혈압", title: "고혈압 클리닉", img: cond("hypertension"),
    lead: "혈압이 높으면 신장·심장·혈관에 부담이 됩니다. 정확히 진단하고 꾸준히 관리합니다.",
    intro: "혈압이 지속적으로 높은 상태로, 오래 두면 신장·심장·뇌혈관에 여러 합병증을 일으킬 수 있습니다. 정확한 측정과 약물 조절로 안정적으로 관리합니다.",
    symptoms: ["혈압이 자주 높게 나온다", "두통·어지럼이 있다", "가족 중에 고혈압이 있다"],
  },
  {
    key: "diabetes", label: "당뇨", title: "당뇨 클리닉", img: cond("diabetes"),
    lead: "혈당 조절을 넘어 합병증까지 함께 관리합니다.",
    intro: "혈당이 높은 상태가 이어지면 신장·눈·혈관 등에 합병증이 생길 수 있습니다. 혈당을 꾸준히 관리하고 신장 합병증을 조기에 확인합니다.",
    symptoms: ["갈증이 나고 소변이 잦다", "쉽게 피로하다", "혈당 수치가 높게 나온다"],
  },
  {
    key: "dyslipidemia", label: "이상지질혈증", title: "이상지질혈증 클리닉", img: "/clinic/cond/cond-dyslipidemia.png",
    lead: "콜레스테롤 수치, 심혈관 위험까지 함께 살펴봅니다.",
    intro: "콜레스테롤·중성지방이 높은 상태로, 혈관이 좁아지는 동맥경화의 주요 원인입니다. 검사로 위험도를 평가하고 약물·식이로 관리합니다.",
    symptoms: ["콜레스테롤 수치가 높다", "중성지방이 높다", "비만·가족력이 있다"],
  },
  {
    key: "thyroid", label: "갑상선질환", title: "갑상선 클리닉", img: "/clinic/cond/cond-thyroid.png",
    lead: "피로·체중 변화의 원인일 수 있습니다. 검사로 정확히 확인합니다.",
    intro: "갑상선 호르몬이 너무 많거나 적게 나오는 이상, 또는 갑상선 결절은 흔하지만 증상이 뚜렷하지 않습니다. 혈액검사와 초음파로 정확히 진단하고 관리합니다.",
    symptoms: ["쉽게 피로하고 무기력하다", "체중이 변했다", "목 부위가 불편하다"],
  },
  {
    key: "asthma", label: "천식", title: "천식·호흡기 클리닉", img: cond("asthma"),
    lead: "반복되는 기침과 호흡곤란, 검사로 원인을 확인합니다.",
    intro: "기도에 만성적인 염증이 생겨 기침·호흡곤란이 반복되는 질환입니다. 검사로 정확히 진단하고 흡입제 등으로 증상을 효과적으로 조절합니다.",
    symptoms: ["기침이 오래 간다", "숨이 차고 쌕쌕거린다", "밤·새벽에 기침이 심하다"],
  },
  {
    key: "liver", label: "간질환", title: "간질환 클리닉", img: cond("liver"),
    lead: "지방간부터 간염까지, 검사로 간 건강을 점검합니다.",
    intro: "지방간·간염 등 간질환은 초기에 증상이 거의 없습니다. 혈액검사와 복부 초음파로 일찍 발견하고 관리합니다.",
    symptoms: ["피로하고 소화가 안 된다", "간 수치가 이상하다", "지방간 진단을 받았다"],
  },
];

// Why — 투석 강점 5카드
export type WhyItem = { num: string; title: string; desc: string; img: string };
export const WHY_ITEMS: WhyItem[] = [
  { num: "01", title: "투석전문 의료진의\n체계적인 혈액투석 시스템", desc: "대학병원 출신의 신장내과 투석 전문의와 다년간의 투석실 경력을 갖춘 간호사가 함께하여 전문화된 치료가 가능합니다.", img: img(8) },
  { num: "02", title: "편안하고 쾌적한\n투석실 환경", desc: "넓고 쾌적하며 편안한 규모의 실내 인테리어 공간에서 혈액투석이 가능합니다. 침대마다 개별 TV모니터를 설치하여 투석 중에도 편안한 시간을 보내실 수 있습니다.", img: img(7) },
  { num: "03", title: "보호자를 위한\n투석 대기실 운영", desc: "투석치료가 끝나기를 기다리는 보호자를 위한 편안하고 안락한 투석 대기실 공간이 마련되어 있습니다. 환자분뿐 아니라 가족까지 함께 케어합니다.", img: img(28) },
  { num: "04", title: "이른 아침 · 야간 투석\n유연한 시간 운영", desc: "인공신장실 월·수·금은 오전 7시부터 오후 11시까지 운영하여 직장인 환자분들도 편하게 치료받으실 수 있도록 배려합니다.", img: img(5) },
];

// 장비 — 기존 장비 제품이미지(device) + 실제 장비실 사진(photo) 함께
export type Equip = { num: string; cat: string; title: string; sub: string; device: string; photo: string; features: string[] };
export const EQUIPMENT: Equip[] = [
  {
    num: "01", cat: "디지털 X-ray", title: "ESSENCE 5", sub: "디알텍 · 저선량 정밀 영상촬영",
    device: "/clinic/equip-xray.png", photo: img(23),
    features: ["저선량 디지털 촬영으로 방사선 피폭 최소화", "흉부·복부·근골격계 고화질 영상", "촬영 즉시 빠른 판독"],
  },
  {
    num: "02", cat: "초음파", title: "HS40", sub: "삼성메디슨 · 고해상도 복부·갑상선 검사",
    device: "/clinic/equip-ultrasound.png", photo: img(30),
    features: ["복부·갑상선·경동맥 정밀 진단", "고해상도 실시간 영상", "통증 없는 비침습 검사"],
  },
  {
    num: "03", cat: "골밀도검사", title: "DEXXUM T QUANTUM", sub: "오스테오시스 · 정밀 골밀도 측정",
    device: "/clinic/equip-osteopro.png", photo: img(25),
    features: ["척추·대퇴 골밀도 정밀 측정", "골다공증 조기 진단", "저선량 신속 검사"],
  },
  {
    num: "04", cat: "혈액투석기", title: "NCU-18", sub: "Nipro · 안정적인 투석 모니터링",
    device: "/clinic/equip-dialysis.png", photo: img(11),
    features: ["실시간 투석 상태 모니터링", "정밀한 제수분량 관리", "표준 프로토콜 기반 안전 투석"],
  },
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
  { alt: "인공신장실 전경 — 넓고 쾌적한 투석 공간", img: "/images/tour-01.jpg" },
  { alt: "인공신장실 중앙 통로 — TV 개별 모니터 설치", img: "/images/tour-02.jpg" },
  { alt: "인공신장실 — 대한신장학회 투석 전문의 인증", img: "/images/tour-03.jpg" },
  { alt: "접수 · 대기 공간", img: "/images/tour-04.jpg" },
  { alt: "대표원장 자격 · 인증 현황", img: "/images/tour-05.jpg" },
  { alt: "진료협력 대학병원 안내", img: "/images/tour-06.jpg" },
  { alt: "대표원장 프로필 안내", img: "/images/tour-07.jpg" },
  { alt: "골밀도 검사실", img: "/images/tour-08.jpg" },
  { alt: "디지털 X-ray 검사실", img: "/images/tour-09.jpg" },
  { alt: "접수 · 로비", img: img(1) },
  { alt: "투석 베드 공간", img: img(5) },
  { alt: "초음파 진료실", img: img(30) },
  { alt: "인공신장실 입구", img: img(31) },
];
