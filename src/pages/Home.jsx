import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import './Home.css'

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    fetch('./data/products.json')
      .then(r => r.json())
      .then(d => setFeatured(d.products.filter(p => p.featured)))
      .catch(console.error)
  }, [])

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="hero">
        {/* 배경 패턴 */}
        <div className="hero__pattern" aria-hidden="true" />

        <div className="container hero__content">
          <p className="label hero__eyebrow">Premium Korean Grain Products</p>
          <h1 className="display hero__title">
            From Korea's&nbsp;Soil,<br />
            To the&nbsp;World's&nbsp;Table.
          </h1>
          <p className="hero__desc">
            GOKMUL:ONE sources and processes the finest heritage grains from
            Korea's most fertile regions — delivering unmatched quality and
            traceability to global food brands and retailers.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="btn btn-primary">Explore Products</Link>
            <Link to="/brand"    className="btn btn-outline">Our Story</Link>
          </div>
        </div>

        {/* 스크롤 힌트 */}
        <div className="hero__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ─── Stats bar ─── */}
      <section className="stats-bar section-sm">
        <div className="container stats-bar__grid">
          {[
            { value: '15+', label: 'Years of expertise' },
            { value: '20+', label: 'Countries exported' },
            { value: '100%', label: 'HACCP certified' },
            { value: '30+', label: 'Product varieties' },
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
