import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import NewsCard from '../components/NewsCard'
import './Home.css'
import Seo from '../components/Seo'
import productsData from '../data/products.json'
import newsData from '../data/news.json'

const FEATURED = productsData.products.filter(p => p.featured)
const LATEST_NEWS = [...newsData.articles].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)).slice(0, 3)

const SCENES = [
  {
    image: '/images/hero/banner-001.png',
    eyebrow: 'Premium Korean Grain Products',
    headline: ["From Korea's Soil,", "To the World's Table."],
    cta: { label: 'Explore Products', to: '/products' },
    ctaAlt: { label: 'Our Story', to: '/brand' },
  },
  {
    image: '/images/hero/banner-002.png',
    eyebrow: 'Heritage & Craft',
    headline: ['Rooted in Tradition,', 'Driven by Quality.'],
    cta: null,
    ctaAlt: null,
  },
  {
    image: '/images/hero/banner-003.png',
    eyebrow: 'Premium Care Collection',
    headline: ['Ancient Grains,', 'Modern Standards.'],
    cta: { label: 'View Products', to: '/products' },
    ctaAlt: { label: 'Get in Touch', to: '/contact' },
  },
]

const ORIGINS = [
  {
    bg: '/images/department-store/house-of-shinsegae.png',
    tag: 'Wellness Market',
    title: 'House of Shinsegae',
    desc: 'Cheongdam Twelve Market — Korea\'s premier curated wellness destination.',
  },
  {
    bg: '/images/department-store/shinsegae-main.png',
    tag: 'Premium Retail',
    title: 'Shinsegae Main Branch',
    desc: 'Myeongdong flagship — Korea\'s most prestigious department store since 1930.',
  },
  {
    bg: '/images/department-store/shinsegae-gangnam.png',
    tag: 'Premium Retail',
    title: 'Shinsegae Gangnam',
    desc: 'Korea\'s top-grossing department store, serving Seoul\'s most discerning shoppers.',
  },
]

// 스크롤 진행도 p(0→1) 에서 씬 i 의 opacity 계산
// FADE: 씬 경계 부근에서 crossfade 가 일어나는 폭 (0~1 단위)
function getSceneOpacity(i, p, n = SCENES.length, FADE = 0.09) {
  const start = i / n
  const end   = (i + 1) / n
  if (i === 0) {
    if (p <= end - FADE) return 1
    if (p >= end)        return 0
    return (end - p) / FADE
  }
  if (i === n - 1) {
    if (p <= start)        return 0
    if (p >= start + FADE) return 1
    return (p - start) / FADE
  }
  if (p <= start || p >= end) return 0
  if (p <= start + FADE) return (p - start) / FADE
  if (p >= end   - FADE) return (end - p)   / FADE
  return 1
}

export default function Home() {
  const products = FEATURED
  const [currentScene, setCurrentScene] = useState(-1)

  const heroRef        = useRef(null)
  const layerRefs      = useRef([])   // 이미지 레이어 DOM refs (직접 opacity 조작)
  const currentSceneRef = useRef(-1)

  // 첫 씬 텍스트 fade-in
  useEffect(() => {
    const t = setTimeout(() => {
      setCurrentScene(0)
      currentSceneRef.current = 0
    }, 120)
    return () => clearTimeout(t)
  }, [])

  // 스크롤 진행도 → 이미지 opacity 연속 업데이트 + 텍스트 씬 전환
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const onScroll = () => {
      const scrollable = hero.offsetHeight - window.innerHeight
      const p = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / scrollable))

      // 이미지: re-render 없이 직접 DOM 조작 (60fps 부드러움)
      layerRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = getSceneOpacity(i, p)
      })

      // 텍스트: 지배적 씬이 바뀔 때만 state 업데이트
      const dominant = Math.min(SCENES.length - 1, Math.floor(p * SCENES.length + 0.03))
      if (dominant !== currentSceneRef.current) {
        currentSceneRef.current = dominant
        setCurrentScene(dominant)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // 마운트 시 즉시 실행
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 나머지 콘텐츠 scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-visible)')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [products.length])

  return (
    <>
      <Seo path="/" />
      {/* ─── Hero: sticky 컨테이너 (400vh) ─── */}
      {/* 100vh per scene of scroll + 100vh natural exit to stats */}
      <div className="hero-block" ref={heroRef}>
        <div className="hero-block__inner">

          {/* 이미지 레이어 — opacity를 JS가 직접 제어 (crossfade) */}
          {SCENES.map((s, i) => (
            <div
              key={i}
              className="hero-layer"
              ref={el => layerRefs.current[i] = el}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className="hero-layer__bg" style={{ backgroundImage: `url(${s.image})` }} />
              <div className="hero-layer__overlay" />
            </div>
          ))}

          {/* 텍스트 레이어 — CSS transition으로 씬 전환 시 애니메이션 */}
          {SCENES.map((s, i) => (
            <div
              key={i}
              className={`hero-text${currentScene === i ? ' hero-text--visible' : ''}`}
            >
              <div className="hero-text__content container">
                <p className="hero-eyebrow label">{s.eyebrow}</p>
                <h1 className="hero-title display">
                  {s.headline.map((line, j) => <span key={j}>{line}</span>)}
                </h1>
                {(s.cta || s.ctaAlt) && (
                  <div className="hero-actions">
                    {s.cta    && <Link to={s.cta.to}    className="btn btn-primary">{s.cta.label}</Link>}
                    {s.ctaAlt && <Link to={s.ctaAlt.to} className="btn btn-outline-light">{s.ctaAlt.label}</Link>}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* 우측 하단 씬 번호 */}
          <span className="hero-num" aria-hidden="true">
            {String(Math.max(0, currentScene) + 1).padStart(2, '0')}
          </span>

          {/* 스크롤 유도 라인 (첫 씬에서만) */}
          <div className={`hero-scroll-line${currentScene > 0 ? ' hero-scroll-line--hidden' : ''}`} aria-hidden="true">
            <span />
          </div>

        </div>
      </div>

      {/* ─── Origin Tiles ─── */}
      <section className="origins section">
        <div className="container">
          <div className="origins__header" data-reveal>
            <p className="label">Available At</p>
            <h2 className="heading-lg">Korea's Finest Retailers</h2>
          </div>
          <div className="origins__grid">
            {ORIGINS.map(({ bg, tag, title, desc }, i) => (
              <div
                key={i}
                className="origin-tile"
                data-reveal
                style={{ '--delay': `${i * 0.12}s` }}
              >
                <div className="origin-tile__image" style={{ backgroundImage: `url(${bg})` }} />
                <div className="origin-tile__overlay" />
                <div className="origin-tile__body">
                  <span className="origin-tile__tag label">{tag}</span>
                  <h3 className="origin-tile__title">{title}</h3>
                  <p className="origin-tile__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="home-featured section">
        <div className="container">
          <div className="home-featured__header" data-reveal>
            <div>
              <p className="label">Our Selection</p>
              <h2 className="heading-lg">Featured Products</h2>
            </div>
            <Link to="/products" className="btn btn-outline">View All</Link>
          </div>
          <div className="home-featured__grid">
            {products.map((p, i) => (
              <div key={p.id} data-reveal style={{ '--delay': `${i * 0.1}s` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Latest News ─── */}
      {LATEST_NEWS.length > 0 && (
        <section className="home-featured section">
          <div className="container">
            <div className="home-featured__header" data-reveal>
              <div>
                <p className="label">Newsroom</p>
                <h2 className="heading-lg">Latest News</h2>
              </div>
              <Link to="/news" className="btn btn-outline">View All</Link>
            </div>
            <div className="home-featured__grid">
              {LATEST_NEWS.map((a, i) => (
                <div key={a.slug} data-reveal style={{ '--delay': `${i * 0.1}s` }}>
                  <NewsCard article={a} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Brand Statement ─── */}
      <section className="brand-statement">
        <div className="brand-statement__bg" style={{ backgroundImage: 'url(/images/company/ceramic-shot.png)' }} />
        <div className="brand-statement__inner container">
          <p className="brand-statement__eyebrow label" data-reveal>Since 2022</p>
          <h2 className="brand-statement__headline display" data-reveal>
            Premium Korean<br /><em>Whole Grains,</em>
          </h2>
          <p className="brand-statement__sub" data-reveal>
            We bring together Korea's grain heritage, clean ingredients, and balanced nutrition<br />
            to create convenient wellness foods for today's global consumers.
          </p>
          <div data-reveal>
            <a href="/documents/gokmul-one-product-catalog.pdf" download className="btn btn-outline-light">View Product Catalog</a>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="home-cta section-sm">
        <div className="container home-cta__inner" data-reveal>
          <div>
            <h2 className="heading-md">Ready to source Korean grains?</h2>
            <p>MOQ inquiries, custom packaging, and OEM/ODM &mdash; our team is ready.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
        </div>
      </section>
    </>
  )
}
