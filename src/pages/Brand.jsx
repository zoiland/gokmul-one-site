import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Brand.css'
import Seo from '../components/Seo'
import { useLocale, useLocalePath } from '../i18n'

const COPY = {
  en: {
    seoTitle: 'Our Story',
    seoDesc: 'GOKMUL:ONE — Korean Premium Grain Care. Through our Grain-Care Technology we make better grains easier to eat, easier to choose, and easier to enjoy every day.',
    heroEyebrow: 'Our Story',
    heroTitle: <>Better grains,<br />made easier for<br />everyday life.</>,
    stmtLead: 'Grains have long been at the heart of healthy eating.',
    stmtBody: 'Yet in modern life, they are often too difficult to prepare and too inconvenient to enjoy every day.',
    purposeEyebrow: 'Our Purpose',
    purposeTitle: <>GOKMUL:ONE was created<br />to solve this gap.</>,
    purposeBody: 'We believe that better grains should be easier to eat, easier to choose, and easier to make part of everyday life.',
    techAlt: 'GOKMUL:ONE Grain-Care Technology — each blend prepared at its optimal texture and flavour',
    techLabel: 'Grain-Care Technology',
    techTitle: <>Studied by grain,<br />prepared with care.</>,
    techBody1: 'Through our Grain-Care Technology, we study the natural properties of each grain and prepare every blend at its optimal texture and flavour.',
    techBody2: 'The result is a new grain-based food experience that preserves the satisfaction of a real, chewable meal — while adding the convenience modern consumers need.',
    careEyebrow: 'Korean Premium Grain Care',
    careTitle: 'More than a convenient meal.',
    careBody: 'GOKMUL:ONE is more than a convenient meal option. It is Korean Premium Grain Care — designed for everyday eating, and made for better nutrition.',
    closeLabel: 'GOKMUL:ONE',
    closeTagline: 'Better grains, made easier for everyday life.',
    closeCta1: 'Explore Products',
    closeCta2: 'Partner With Us',
    trust: ['HACCP', 'No Preservatives', 'No Additives', 'Water & Grains Only', 'Steamed Grains', 'Clean Label', 'Ready to Eat'],
  },
  ko: {
    seoTitle: '브랜드 스토리',
    seoDesc: '곡물:원 — 코리안 프리미엄 그레인 케어. 그레인케어 기술로 더 좋은 곡물을 더 쉽게 먹고, 더 쉽게 선택하고, 매일 즐길 수 있게 만듭니다.',
    heroEyebrow: '브랜드 스토리',
    heroTitle: <>더 좋은 곡물을,<br />일상에서<br />더 쉽게.</>,
    stmtLead: '곡물은 오래전부터 건강한 식탁의 중심이었습니다.',
    stmtBody: '하지만 바쁜 현대의 일상에서 곡물은 준비하기 번거롭고, 매일 챙겨 먹기 어려운 음식이 되었습니다.',
    purposeEyebrow: '우리의 시작',
    purposeTitle: <>곡물:원은 그 간극을 잇기 위해<br />시작되었습니다.</>,
    purposeBody: '우리는 더 좋은 곡물이 더 쉽게 선택되고, 더 편하게, 매일의 일상이 되어야 한다고 믿습니다.',
    techAlt: '곡물:원 그레인케어 기술 — 곡물마다 가장 알맞은 식감과 풍미로 완성',
    techLabel: '그레인케어 기술',
    techTitle: <>곡물마다 연구하고,<br />정성으로 준비합니다.</>,
    techBody1: '곡물:원의 그레인케어 기술은 곡물 고유의 특성을 연구해 각 블렌드를 가장 알맞은 식감과 풍미로 완성합니다.',
    techBody2: '꼭꼭 씹어 먹는 진짜 식사의 만족감은 지키면서, 현대인에게 필요한 간편함을 더한 새로운 곡물 식문화를 제안합니다.',
    careEyebrow: '코리안 프리미엄 그레인 케어',
    careTitle: '간편식, 그 이상.',
    careBody: '곡물:원은 단순한 간편식이 아닙니다. 매일의 식사를 위해 설계되고, 더 나은 영양을 위해 만들어진 코리안 프리미엄 그레인 케어입니다.',
    closeLabel: 'GOKMUL:ONE',
    closeTagline: '더 좋은 곡물을, 일상에서 더 쉽게.',
    closeCta1: '제품 보기',
    closeCta2: '파트너십 문의',
    trust: ['HACCP 인증', '무보존료', '무첨가물', '물과 곡물만', '스팀 쿠킹', '클린 라벨', '바로 섭취'],
  },
}

export default function Brand() {
  const locale = useLocale()
  const lp = useLocalePath()
  const t = COPY[locale]

  // ─── 스크롤 페이드인 (전역 [data-reveal] 재사용) ───
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-visible)')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // ─── 풀블리드 배경 패럴럭스 ───
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const layers = Array.from(document.querySelectorAll('[data-parallax]'))
    if (!layers.length) return
    let raf = null
    const update = () => {
      raf = null
      const vh = window.innerHeight
      for (const el of layers) {
        const parent = el.parentElement
        if (!parent) continue
        const rect = parent.getBoundingClientRect()
        const offset = rect.top + rect.height / 2 - vh / 2
        el.style.transform = `translate3d(0, ${(offset * -0.08).toFixed(1)}px, 0)`
      }
    }
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <Seo
        title={t.seoTitle}
        path="/brand"
        description={t.seoDesc}
      />

      {/* ─── 히어로 ─── */}
      <section className="brand2-hero">
        <div
          className="brand2-hero__bg"
          data-parallax
          style={{ backgroundImage: 'url(/images/company/brand-story-banner.webp)' }}
        />
        <div className="brand2-hero__scrim" />
        <div className="container brand2-hero__inner">
          <p className="label brand2-hero__eyebrow" data-reveal>{t.heroEyebrow}</p>
          <h1 className="display brand2-hero__title" data-reveal>
            {t.heroTitle}
          </h1>
          <span className="brand2-hero__cue" aria-hidden="true" />
        </div>
      </section>

      {/* ─── 1. 문제 제기 (중앙 에디토리얼) ─── */}
      <section className="brand2-statement section">
        <div className="container brand2-statement__inner">
          <p className="brand2-statement__lead display" data-reveal>
            {t.stmtLead}
          </p>
          <p className="brand2-statement__body" data-reveal>
            {t.stmtBody}
          </p>
        </div>
      </section>

      {/* ─── 2. 우리의 목적 (풀블리드 + 우측 카드) ─── */}
      <section className="brand2-scene brand2-scene--right">
        <div
          className="brand2-scene__bg"
          data-parallax
          style={{ backgroundImage: 'url(/images/company/ceramic-shot.webp)' }}
        />
        <div className="brand2-scene__scrim" />
        <div className="container brand2-scene__inner">
          <div className="brand2-scene__card" data-reveal>
            <p className="label brand2-scene__eyebrow">{t.purposeEyebrow}</p>
            <h2 className="heading-lg">{t.purposeTitle}</h2>
            <p>{t.purposeBody}</p>
          </div>
        </div>
      </section>

      {/* ─── 3. Grain-Care Technology (이미지 + 텍스트 분할) ─── */}
      <section className="brand2-split section">
        <div className="container brand2-split__inner">
          <figure className="brand2-split__media" data-reveal>
            <img
              src="/images/company/grain-care-technology.webp"
              alt={t.techAlt}
              loading="lazy"
            />
          </figure>
          <div className="brand2-split__text" data-reveal>
            <p className="label">{t.techLabel}</p>
            <h2 className="heading-lg">{t.techTitle}</h2>
            <div className="divider" />
            <p>{t.techBody1}</p>
            <p>{t.techBody2}</p>
          </div>
        </div>
      </section>

      {/* ─── 4. Korean Premium Grain Care (풀블리드 다크 · 중앙) ─── */}
      <section className="brand2-scene brand2-scene--center brand2-scene--dark">
        <div
          className="brand2-scene__bg"
          data-parallax
          style={{ backgroundImage: 'url(/images/hero/banner-002.webp)' }}
        />
        <div className="brand2-scene__scrim brand2-scene__scrim--strong" />
        <div className="container brand2-scene__inner brand2-scene__inner--center">
          <div className="brand2-scene__card brand2-scene__card--plain" data-reveal>
            <p className="label brand2-scene__eyebrow">{t.careEyebrow}</p>
            <h2 className="heading-lg">{t.careTitle}</h2>
            <p>{t.careBody}</p>
          </div>
        </div>
      </section>

      {/* ─── 마무리: 태그라인 + CTA ─── */}
      <section className="brand2-close section">
        <div className="container brand2-close__inner">
          <p className="label" data-reveal>{t.closeLabel}</p>
          <p className="brand2-close__tagline display" data-reveal>
            {t.closeTagline}
          </p>
          <div className="brand2-close__cta" data-reveal>
            <Link to={lp('/products')} className="btn btn-primary">{t.closeCta1}</Link>
            <Link to={lp('/contact')} className="btn btn-outline">{t.closeCta2}</Link>
          </div>
        </div>
      </section>

      {/* ─── 신뢰 스트립 ─── */}
      <section className="brand2-trust">
        <div className="container brand2-trust__inner" data-reveal>
          {t.trust.map(c => (
            <span key={c} className="brand2-trust__item">{c}</span>
          ))}
        </div>
      </section>
    </>
  )
}
