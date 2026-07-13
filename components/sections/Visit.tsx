import { CLINIC } from "@/data/clinic";
import NaverMap from "./NaverMap";
import styles from "./Visit.module.css";

const SubwayIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="14" rx="3" /><path d="M4 11h16" /><circle cx="8.5" cy="14" r="0.6" fill="currentColor" /><circle cx="15.5" cy="14" r="0.6" fill="currentColor" /><path d="m7 21 2-3M17 21l-2-3" /></svg>
);
const BusIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6c0-1.5 1-2 8-2s8 .5 8 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><path d="M4 11h16" /><circle cx="7.5" cy="14.5" r="0.6" fill="currentColor" /><circle cx="16.5" cy="14.5" r="0.6" fill="currentColor" /><path d="m6 19-1 2M18 19l1 2" /></svg>
);
const CarIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13" /><path d="M5 13h14v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" /><circle cx="7.5" cy="15.5" r="0.6" fill="currentColor" /><circle cx="16.5" cy="15.5" r="0.6" fill="currentColor" /></svg>
);
const ParkIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 16V8h3.5a2.5 2.5 0 0 1 0 5H9" /></svg>
);

export default function Visit() {
  return (
    <section className="section visit-section" id="visit">
      <div className="container visit-v2">
        <div className="visit-map-col">
          <div className="visit-map-embed">
            <NaverMap />
          </div>
        </div>

        <div className="visit-text-col">
          <header className="visit-head">
            <p className="eyebrow">Visit Gangseo Maleun Internal Medicine</p>
            <h2 className="section-title">오시는 길</h2>
            <p className="visit-lead">
              가까이 닿는 안심, 강서성모맑은내과의원.<br />
              진료시간과 위치·교통편을 안내드립니다.
            </p>
          </header>

          <div className="visit-addr-block">
            <p className="visit-addr">
              {CLINIC.addressLine1}<br />
              <span className="visit-addr-sub">{CLINIC.addressLine2}</span>
            </p>
            <p className="visit-tel">
              대표 <a href={`tel:${CLINIC.tel.main}`}>{CLINIC.tel.main}</a>
              <span className="visit-tel__sep">·</span>
              인공신장실 <a href={`tel:${CLINIC.tel.dialysis}`}>{CLINIC.tel.dialysis}</a>
            </p>
          </div>

          <div className="visit-hours">
            <h3 className="visit-hours-title">진료 시간</h3>
            <dl className="visit-hours-list">
              {CLINIC.hours.map((h) => (
                <div className="vh-row" key={h.label}>
                  <dt>{h.label}</dt>
                  <dd>
                    {h.value}
                    {h.badge && <em className="vh-badge vh-badge--mute">{h.badge}</em>}
                  </dd>
                </div>
              ))}
              <div className="vh-row vh-sub-title">
                <dt>인공신장실</dt><dd></dd>
              </div>
              <div className="vh-row">
                <dt>운영</dt>
                <dd>연중무휴 <em className="vh-badge">일요일 제외</em></dd>
              </div>
            </dl>

            <ul className="visit-notes">
              <li>점심시간(평일 13:00–14:00) 및 운영 시작 30분 전에는 접수가 마감됩니다.</li>
              <li>투석실 일정은 별도 안내해 드립니다.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 교통안내 */}
      <div className="container">
        <div className={styles.transit}>
          <header className={styles.transitHead}>
            <p className="eyebrow">Directions</p>
            <h3>교통안내</h3>
            <p>지하철 · 버스 · 자가용 어느 쪽으로든 편하게 오실 수 있습니다.</p>
          </header>

          <div className={styles.grid}>
            {/* 지하철 */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.badge}><SubwayIcon /></span>
                <h4>지하철 이용</h4>
              </div>
              <div className={styles.item}>
                <p className={styles.itemTitle}>5호선 마곡역 <em>2 · 4번 출구</em></p>
                <p className={styles.note}>출구에서 약 <strong>150m (도보 2분)</strong></p>
              </div>
              <div className={styles.item}>
                <p className={styles.itemTitle}>9호선 · 공항철도 마곡나루역 <em>5번 출구</em></p>
                <p className={styles.note}>도보 약 7~13분</p>
              </div>
            </div>

            {/* 버스 */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.badge}><BusIcon /></span>
                <h4>버스 이용</h4>
              </div>
              <div className={styles.item}>
                <p className={styles.itemTitle}>마곡역교차로 <em>도보 1~2분</em></p>
                <div className={styles.lines}>
                  <span className={styles.line}><span className={styles.lineLabel}>지선</span> 6632 · 6648</span>
                  <span className={styles.line}><span className={styles.lineLabel}>심야</span> N64</span>
                </div>
              </div>
              <div className={styles.item}>
                <p className={styles.itemTitle}>마곡역(중) · 마곡동로사거리 <em>도보 3분</em></p>
                <div className={styles.lines}>
                  <span className={styles.line}><span className={styles.lineLabel}>간선</span> 601 · 605 · 642 · 6629</span>
                  <span className={styles.line}><span className={styles.lineLabel}>공항</span> 6003 · 3000 · 1002 · 9731</span>
                  <span className={styles.line}><span className={styles.lineLabel}>지선</span> 60 · 388 · 654 · 6633</span>
                </div>
              </div>
            </div>

            {/* 자가용 */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.badge}><CarIcon /></span>
                <h4>자가용 이용</h4>
              </div>
              <div className={styles.item}>
                <p className={styles.itemTitle}>내비게이션 검색</p>
                <p className={styles.note}><strong>“강서성모맑은내과”</strong> 또는 “서울 강서구 공항대로 200 (마곡지웰타워)”</p>
              </div>
              <div className={styles.item}>
                <p className={styles.note}><strong>올림픽대로</strong> — 방화대교 방향 → 공항대로 진입 → 마곡역 방면 우회전</p>
                <p className={styles.note}><strong>강남 · 여의도</strong> — 강변북로 · 양화대교 → 올림픽대로 → 마곡역 교차로 우회전</p>
                <p className={styles.note}><strong>김포공항</strong> — 공항대로 → 마곡역 교차로에서 좌회전 (5분 이내)</p>
              </div>
            </div>

            {/* 주차 */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.badge}><ParkIcon /></span>
                <h4>주차 안내</h4>
              </div>
              <div className={styles.item}>
                <p className={styles.note}>건물 <strong>지하주차장 B2~B4</strong> 이용 가능</p>
                <p className={styles.note}>입구 : 건물 후면 진입로 또는 공항대로 측면</p>
              </div>
              <div className={styles.item}>
                <p className={styles.note}>병원 방문 시 <strong>무료 주차권</strong> 제공</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
