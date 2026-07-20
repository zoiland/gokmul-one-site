import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import NewsCard from '../components/NewsCard'
import './Home.css'
import Seo from '../components/Seo'
import { useLocale, useLocalePath } from '../i18n'
import productsData from '../data/products.json'
import newsData from '../data/news.json'

const FEATURED = productsData.products.filter(p => p.featured)
const LATEST_NEWS = [...newsData.articles].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)).slice(0, 3)

const SCENE_IMAGES = [
  '/images/hero/banner-001.webp',
  '/images/hero/banner-002.webp',
  '/images/hero/banner-003.webp',
]

const COPY = {
  en: {
    scenes: [
      {
        eyebrow: 'Premium Korean Grain Products',
        headline: ["From Korea's Soil,", "To the World's Table."],
        cta: { label: 'Explore Products', to: '/products' },
        ctaAlt: { label: 'Our Story', to: '/brand' },
      },
      {
        eyebrow: 'Heritage & Craft',
        headline: ['Rooted in Tradition,', 'Driven by Quality.'],
        cta: null,
        ctaAlt: null,
      },
      {
        eyebrow: 'Premium Care Collection',
        headline: ['Ancient Grains,', 'Modern Standards.'],
        cta: { label: 'View Products', to: '/products' },
        ctaAlt: { label: 'Get in Touch', to: '/contact' },
      },
    ],
    origins: [
      {
        tag: 'Wellness Market',
        title: 'House of Shinsegae',
        desc: "Cheongdam Twelve Market — Korea's premier curated wellness destination.",
      },
      {
        tag: 'Premium Retail',
        title: 'Shinsegae Main Branch',
        desc: "Myeongdong flagship — Korea's most prestigious department store since 1930.",
      },
      {
        tag: 'Premium Retail',
        title: 'Shinsegae Gangnam',
        desc: "Korea's top-grossing department store, serving Seoul's most discerning shoppers.",
      },
    ],
    originsLabel: 'Available At',
    originsTitle: "Korea's Finest Retailers",
    featuredLabel: 'Our Selection',
    featuredTitle: 'Featured Products',
    viewAll: 'View All',
    newsLabel: 'Newsroom',
    newsTitle: 'Latest News',
    stmtEyebrow: 'Since 2022',
    stmtHeadline: <>Premium Korean Whole Grains,<em>Curated for Everyday Wellness</em></>,
    stmtSub: <>We bring together Korea's grain heritage, clean ingredients, and balanced nutrition<br />to create convenient wellness foods for today's global consumers.</>,
    catalog: 'Product Catalog (PDF, 13 MB)',
    ctaTitle: 'Ready to source Korean grains?',
    ctaDesc: <>MOQ inquiries, custom packaging, and OEM/ODM &mdash; our team is ready.</>,
    ctaBtn: 'Get in Touch',
  },
  ko: {
    scenes: [
      {
        eyebrow: '프리미엄 곡물 브랜드, 곡물:원',
        headline: ['한국의 땅에서,', '세계의 식탁으로.'],
        cta: { label: '제품 보기', to: '/products' },
        ctaAlt: { label: '브랜드 스토리', to: '/brand' },
      },
      {
        eyebrow: '전통과 정성',
        headline: ['오랜 시간 이어온 전통,', '정성으로 빚은 품질.'],
        cta: null,
        ctaAlt: null,
      },
      {
        eyebrow: '프리미엄 케어 컬렉션',
        headline: ['천년을 이어온 곡물,', '오늘의 기준으로.'],
        cta: { label: '제품 보기', to: '/products' },
        ctaAlt: { label: '문의하기', to: '/contact' },
      },
    ],
    origins: [
      {
        tag: '웰니스 마켓',
        title: '하우스 오브 신세계',
        desc: '까다로운 기준으로 큐레이션하는 청담의 프리미엄 푸드홀, 트웰브.',
      },
      {
        tag: '프리미엄 리테일',
        title: '신세계백화점 본점',
        desc: '1930년부터 명동을 지켜온 대한민국 대표 백화점.',
      },
      {
        tag: '프리미엄 리테일',
        title: '신세계백화점 강남점',
        desc: '국내 백화점 매출 1위, 가장 앞선 트렌드가 모이는 곳.',
      },
    ],
    originsLabel: '입점 안내',
    originsTitle: '곡물:원을 만나실 수 있는 곳',
    featuredLabel: '추천 제품',
    featuredTitle: '대표 제품',
    viewAll: '전체 보기',
    newsLabel: '뉴스룸',
    newsTitle: '새로운 소식',
    stmtEyebrow: 'Since 2022',
    stmtHeadline: <>좋은 곡물로 만드는<em>건강한 매일의 식탁</em></>,
    stmtSub: <>깨끗한 원재료와 균형 잡힌 영양을 담아,<br />바쁜 하루에도 부담 없이 즐기는 건강한 곡물 한 끼를 만듭니다.</>,
    catalog: '제품 카탈로그 받기 (PDF, 13 MB)',
    ctaTitle: '궁금한 점이 있으신가요?',
    ctaDesc: <>제품 문의부터 대량 구매, 납품·제휴 상담까지 편하게 문의해 주세요.</>,
    ctaBtn: '문의하기',
  },
}

// 스크롤 진행도 p(0→1) 에서 씬 i 의 opacity 계산
// FADE: 씬 경계 부근에서 crossfade 가 일어나는 폭 (0~1 단위)
function getSceneOpacity(i, p, n = SCENE_IMAGES.length, FADE = 0.09) {
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
  const locale = useLocale()
  const lp = useLocalePath()
  const t = COPY[locale]

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
      const dominant = Math.min(SCENE_IMAGES.length - 1, Math.floor(p * SCENE_IMAGES.length + 0.03))
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
          {SCENE_IMAGES.map((image, i) => (
            <div
              key={i}
              className="hero-layer"
              ref={el => layerRefs.current[i] = el}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className="hero-layer__bg" style={{ backgroundImage: `url(${image})` }} />
              <div className="hero-layer__overlay" />
            </div>
          ))}

          {/* 텍스트 레이어 — CSS transition으로 씬 전환 시 애니메이션 */}
          {t.scenes.map((s, i) => (
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
                    {s.cta    && <Link to={lp(s.cta.to)}    className="btn btn-primary">{s.cta.label}</Link>}
                    {s.ctaAlt && <Link to={lp(s.ctaAlt.to)} className="btn btn-outline-light">{s.ctaAlt.label}</Link>}
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
            <p className="label">{t.originsLabel}</p>
            <h2 className="heading-lg">{t.originsTitle}</h2>
          </div>
          <div className="origins__grid">
            {t.origins.map(({ tag, title, desc }, i) => (
              <div
                key={i}
                className="origin-tile"
                data-reveal
                style={{ '--delay': `${i * 0.12}s` }}
              >
                <div className="origin-tile__image" style={{ backgroundImage: `url(${[
                  '/images/department-store/house-of-shinsegae.webp',
                  '/images/department-store/shinsegae-main.webp',
                  '/images/department-store/shinsegae-gangnam.webp',
                ][i]})` }} />
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
              <p className="label">{t.featuredLabel}</p>
              <h2 className="heading-lg">{t.featuredTitle}</h2>
            </div>
            <Link to={lp('/products')} className="btn btn-outline">{t.viewAll}</Link>
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
                <p className="label">{t.newsLabel}</p>
                <h2 className="heading-lg">{t.newsTitle}</h2>
              </div>
              <Link to={lp('/news')} className="btn btn-outline">{t.viewAll}</Link>
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
        <div className="brand-statement__bg" style={{ backgroundImage: 'url(/images/company/ceramic-shot.webp)' }} />
        <div className="brand-statement__inner container">
          <p className="brand-statement__eyebrow label" data-reveal>{t.stmtEyebrow}</p>
          <h2 className="brand-statement__headline display" data-reveal>
            {t.stmtHeadline}
          </h2>
          <p className="brand-statement__sub" data-reveal>
            {t.stmtSub}
          </p>
          <div data-reveal>
            <a href="/documents/gokmul-one-product-catalog.pdf" download className="btn btn-outline-light">{t.catalog}</a>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="home-cta section-sm">
        <div className="container home-cta__inner" data-reveal>
          <div>
            <h2 className="heading-md">{t.ctaTitle}</h2>
            <p>{t.ctaDesc}</p>
          </div>
          <Link to={lp('/contact')} className="btn btn-primary">{t.ctaBtn}</Link>
        </div>
      </section>
    </>
  )
}
