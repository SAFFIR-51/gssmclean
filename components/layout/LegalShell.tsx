import Link from "next/link";
import Footer from "./Footer";

export default function LegalShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="header scrolled" id="header" style={{ position: "fixed" }}>
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="강서성모맑은내과의원 홈">
            <img src="/clinic/logo.png" alt="강서성모맑은내과의원" />
          </Link>
          <div className="header-utils">
            <Link href="/" className="hd-cta hd-cta--book"><span>홈으로</span></Link>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: 80 }}>
        <section className="page-hero">
          <img className="page-hero__bg" src="/clinic/clinic-reception.jpg" alt="" aria-hidden="true" />
          <div className="container">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="page-hero-sub">{subtitle}</p>
          </div>
        </section>

        <section className="legal-section">
          <div className="container legal-container">{children}</div>
        </section>
      </main>

      <Footer />
    </>
  );
}
