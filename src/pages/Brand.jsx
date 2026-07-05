import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Brand.css'
import Seo from '../components/Seo'

export default function Brand() {
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
        title="Our Story"
        path="/brand"
        description="GOKMUL:ONE — Korean Premium Grain Care. Through our Grain-Care Technology we make better grains easier to eat, easier to choose, and easier to enjoy every day."
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
          <p className="label brand2-hero__eyebrow" data-reveal>Our Story</p>
          <h1 className="display brand2-hero__title" data-reveal>
            Better grains,<br />made easier for<br />everyday life.
          </h1>
          <span className="brand2-hero__cue" aria-hidden="true" />
        </div>
      </section>

      {/* ─── 1. 문제 제기 (중앙 에디토리얼) ─── */}
      <section className="brand2-statement section">
        <div className="container brand2-statement__inner">
          <p className="brand2-statement__lead display" data-reveal>
            Grains have long been at the heart of healthy eating.
          </p>
          <p className="brand2-statement__body" data-reveal>
            Yet in modern life, they are often too difficult to prepare
            and too inconvenient to enjoy every day.
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
            <p className="label brand2-scene__eyebrow">Our Purpose</p>
            <h2 className="heading-lg">GOKMUL:ONE was created<br />to solve this gap.</h2>
            <p>
              We believe that better grains should be easier to eat,
              easier to choose, and easier to make part of everyday life.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 3. Grain-Care Technology (이미지 + 텍스트 분할) ─── */}
      <section className="brand2-split section">
        <div className="container brand2-split__inner">
          <figure className="brand2-split__media" data-reveal>
            <img
              src="/images/company/grain-care-technology.webp"
              alt="GOKMUL:ONE Grain-Care Technology — each blend prepared at its optimal texture and flavour"
              loading="lazy"
            />
          </figure>
          <div className="brand2-split__text" data-reveal>
            <p className="label">Grain-Care Technology</p>
            <h2 className="heading-lg">Studied by grain,<br />prepared with care.</h2>
            <div className="divider" />
            <p>
              Through our Grain-Care Technology, we study the natural properties
              of each grain and prepare every blend at its optimal texture and flavour.
            </p>
            <p>
              The result is a new grain-based food experience that preserves the
              satisfaction of a real, chewable meal — while adding the convenience
              modern consumers need.
            </p>
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
            <p className="label brand2-scene__eyebrow">Korean Premium Grain Care</p>
            <h2 className="heading-lg">More than a convenient meal.</h2>
            <p>
              GOKMUL:ONE is more than a convenient meal option.
              It is Korean Premium Grain Care — designed for everyday eating,
              and made for better nutrition.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 마무리: 태그라인 + CTA ─── */}
      <section className="brand2-close section">
        <div className="container brand2-close__inner">
          <p className="label" data-reveal>GOKMUL:ONE</p>
          <p className="brand2-close__tagline display" data-reveal>
            Better grains, made easier for everyday life.
          </p>
          <div className="brand2-close__cta" data-reveal>
            <Link to="/products" className="btn btn-primary">Explore Products</Link>
            <Link to="/contact" className="btn btn-outline">Partner With Us</Link>
          </div>
        </div>
      </section>

      {/* ─── 신뢰 스트립 ─── */}
      <section className="brand2-trust">
        <div className="container brand2-trust__inner" data-reveal>
          {['HACCP', 'No Preservatives', 'No Additives', 'Water & Grains Only', 'Steamed Grains', 'Clean Label', 'Ready to Eat'].map(c => (
            <span key={c} className="brand2-trust__item">{c}</span>
          ))}
        </div>
      </section>
    </>
  )
}
