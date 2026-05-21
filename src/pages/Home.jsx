import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import './Home.css'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [revealed, setRevealed] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    fetch('./data/products.json')
      .then(r => r.json())
      .then(d => setFeatured(d.products.filter(p => p.featured)))
      .catch(console.error)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      // heroRef(200vh section)의 top이 뷰포트 기준으로 얼마나 위로 올라갔는지
      const scrolledIn = -heroRef.current.getBoundingClientRect().top
      // 스크롤 버짓(100vh) 중 절반(50vh) 지나면 reveal
      setRevealed(scrolledIn >= window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ─── 200vh Hero ─── */}
      <section className="hero" ref={heroRef}>

        {/* sticky layer: 항상 뷰포트에 고정 */}
        <div className="hero-sticky">

          {/* 오버레이 */}
          <div className={`hero-overlay${revealed ? ' hero-overlay--on' : ''}`} aria-hidden="true" />

          {/* 텍스트 + CTA */}
          <div className={`hero-body${revealed ? ' hero-body--on' : ''}`}>
            <div className="container">
              <p className="hero-body__eyebrow label">Premium Korean Grain Products</p>
              <h1 className="hero-body__title display">
                From Korea's&nbsp;Soil,<br />
                To the&nbsp;World's&nbsp;Table.
              </h1>
              <p className="hero-body__desc">
                GOKMUL:ONE sources and processes the finest heritage grains from
                Korea's most fertile regions — delivering unmatched quality and
                traceability to global food brands and retailers.
              </p>
              <div className="hero-body__actions">
                <Link to="/products" className="btn btn-primary">Explore Products</Link>
                <Link to="/brand"    className="btn btn-outline">Our Story</Link>
              </div>
            </div>
          </div>

          {/* 스크롤 유도 화살표 */}
          <div className={`hero-cue${revealed ? ' hero-cue--gone' : ''}`} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

        </div>
      </section>

      {/* ─── Stats bar ─── */}
      <section className="stats-bar section-sm">
        <div className="container stats-bar__grid">
          {[
            { value: '15+',  label: 'Years of expertise' },
            { value: '20+',  label: 'Countries exported' },
            { value: '100%', label: 'HACCP certified'    },
            { value: '30+',  label: 'Product varieties'  },
          ].map(({ value, label }) => (
            <div key={label} className="stats-bar__item">
              <span className="stats-bar__value">{value}</span>
              <span className="stats-bar__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured products ─── */}
      <section className="section featured">
        <div className="container">
          <div className="section-header">
            <p className="label">Our Selection</p>
            <h2 className="heading-lg">Featured Products</h2>
            <div className="divider" />
            <p className="section-header__desc">
              Hand-selected varieties that represent the depth and diversity
              of Korean grain heritage.
            </p>
          </div>
          <div className="grid-3">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="featured__cta">
            <Link to="/products" className="btn btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ─── Brand teaser ─── */}
      <section className="brand-teaser section">
        <div className="container brand-teaser__inner">
          <div className="brand-teaser__text">
            <p className="label">Who We Are</p>
            <h2 className="heading-lg">Rooted in Tradition,<br />Driven by Quality</h2>
            <div className="divider" />
            <p>
              For over fifteen years, GOKMUL:ONE has worked directly with Korean
              farmers to bring heritage grains to the global table. We believe
              that great products start with great ingredients — and great
              relationships with those who grow them.
            </p>
            <Link to="/brand" className="btn btn-ghost brand-teaser__link">
              Learn about our brand →
            </Link>
          </div>
          <div className="brand-teaser__visual" aria-hidden="true">
            <div className="brand-teaser__circle brand-teaser__circle--1" />
            <div className="brand-teaser__circle brand-teaser__circle--2" />
            <div className="brand-teaser__circle brand-teaser__circle--3" />
            <span className="brand-teaser__ko">곡물:원</span>
          </div>
        </div>
      </section>

      {/* ─── CTA banner ─── */}
      <section className="cta-banner section-sm">
        <div className="container cta-banner__inner">
          <div>
            <h2 className="heading-md">Ready to source Korean grains?</h2>
            <p>Our team is available to answer any product or MOQ inquiry.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
        </div>
      </section>
    </>
  )
}
