import './Brand.css'

const VALUES = [
  {
    icon: '◈',
    title: 'Traceability',
    desc: 'Every batch is traceable from field to port. We maintain direct relationships with over 40 certified farms across Korea.',
  },
  {
    icon: '◇',
    title: 'Heritage',
    desc: 'We preserve and promote heirloom varieties that have fed Korean families for centuries, before industrialisation erased them.',
  },
  {
    icon: '◉',
    title: 'Quality First',
    desc: 'Rigorous multi-stage QC — from field inspection to export lab testing — ensures every shipment meets international standards.',
  },
  {
    icon: '◐',
    title: 'Partnership',
    desc: 'We see buyers as long-term partners, not transactions. Flexible MOQs, custom packaging, and dedicated account support.',
  },
]

const TIMELINE = [
  { year: '2022', event: 'Founded with a mission to bring Korea\'s premium whole grains to global wellness consumers.' },
  { year: '2012', event: 'First international export to Japan. Established HACCP-certified processing facility.' },
  { year: '2015', event: 'Expanded to Europe and the Middle East. Launched organic product line.' },
  { year: '2018', event: 'Partnered with 40+ certified farms. Introduced custom OEM/ODM packaging service.' },
  { year: '2022', event: 'Launched direct-to-retailer programme. Entered North American and Australian markets.' },
  { year: '2025', event: 'Actively expanding product portfolio and seeking distribution partners worldwide.' },
]

export default function Brand() {
  return (
    <>
      {/* ─── 페이지 헤더 ─── */}
      <section className="brand-page-hero">
        <div className="brand-page-hero__bg" style={{ backgroundImage: 'url(/images/company/brand-story-banner.png)' }} />
        <div className="brand-page-hero__overlay" />
        <div className="brand-page-hero__content container">
          <p className="label brand-page-hero__eyebrow">Our Story</p>
          <h1 className="display brand-title">
            Grain, Grown<br />with Purpose.
          </h1>
          <p className="brand-hero-desc">
            We started GOKMUL:ONE because we believed Korea's extraordinary grain
            heritage deserved a place on the world stage.
          </p>
        </div>
      </section>

      {/* ─── Mission ─── */}
      <section className="section">
        <div className="container brand-mission">
          <div className="brand-mission__text">
            <p className="label">Mission</p>
            <h2 className="heading-lg">Premium Korean Whole Grains,<br />Curated for Everyday Wellness</h2>
            <div className="divider" />
            <p>
              We bring together Korea's grain heritage, clean ingredients, and
              balanced nutrition to create convenient wellness foods for today's
              global consumers.
            </p>
          </div>
          <div className="brand-mission__image" aria-hidden="true">
            {/* 장식용 - 실제 이미지 교체 가능 */}
            <div className="brand-mission__image-placeholder">
              <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="20" width="160" height="220" rx="8" fill="none" stroke="currentColor" strokeWidth="1"/>
                <ellipse cx="100" cy="130" rx="40" ry="60" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M100 70 C100 50 80 40 80 40 C80 40 100 48 100 70Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M100 70 C100 50 120 40 120 40 C120 40 100 48 100 70Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <line x1="100" y1="70" x2="100" y2="190" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="section brand-values">
        <div className="container">
          <div className="section-header-centered">
            <p className="label">What We Stand For</p>
            <h2 className="heading-lg">Our Core Values</h2>
            <div className="divider" style={{ margin: '1.25rem auto' }} />
          </div>
          <div className="grid-2">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="value-card">
                <span className="value-card__icon">{icon}</span>
                <h3 className="value-card__title">{title}</h3>
                <p className="value-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="section brand-timeline">
        <div className="container">
          <p className="label">History</p>
          <h2 className="heading-lg">Our Journey</h2>
          <div className="divider" />
          <ol className="timeline">
            {TIMELINE.map(({ year, event }) => (
              <li key={year} className="timeline__item">
                <span className="timeline__year">{year}</span>
                <div className="timeline__dot" />
                <p className="timeline__event">{event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 인증 섹션 ─── */}
      <section className="section-sm brand-certs">
        <div className="container">
          <p className="label" style={{ textAlign: 'center', marginBottom: '2rem' }}>Certifications & Compliance</p>
          <div className="brand-certs__grid">
            {['HACCP', 'ISO 22000', 'Organic (MAFRA)', 'Non-GMO', 'Halal', 'Gluten-Free'].map(cert => (
              <div key={cert} className="cert-item">
                <span className="cert-item__icon">✓</span>
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
