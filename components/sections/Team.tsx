import { DOCTOR } from "@/data/content";

export default function Team() {
  return (
    <section className="section team" id="team">
      <div className="container team-wrap">
        <div className="team-top">
          <header className="team-head">
            <p className="eyebrow">Team Of Gangseo Maleun Internal Medicine</p>
            <h2 className="section-title">
              소중한 건강을 최우선으로<br />
              생각하는 <span className="brand">의료진</span>
            </h2>
          </header>
          <p className="team-intro">
            새로운 시작, 새로운 일상. 강서성모맑은내과는 진료에서의 모든 경험이 따뜻하게 진행될 수 있도록 환자분 한 분 한 분의 건강을 함께 살핍니다.<br /><br />
            오랜 임상 경험과 깊이 있는 전문성을 바탕으로 진단부터 치료, 사후 관리까지 빈틈없이 책임지며, 신장학회 인증 인공신장실과 함께하는 안정적인 진료 환경을 제공합니다.
          </p>
        </div>

        <div className="team-bottom">
          <div className="team-photo">
            <img src={DOCTOR.photo} alt={`${DOCTOR.name} ${DOCTOR.role}`} />
          </div>
          <div className="team-info">
            <h3 className="team-name">{DOCTOR.name} <span>{DOCTOR.role}</span></h3>
            <p className="team-spec">{DOCTOR.spec}</p>
            <ul className="team-history">
              {DOCTOR.history.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
