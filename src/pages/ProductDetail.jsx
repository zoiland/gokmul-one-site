import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './ProductDetail.css'
import Seo from '../components/Seo'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate  = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/products.json')
      .then(r => r.json())
      .then(d => {
        const found = d.products.find(p => p.slug === slug)
        if (!found) { navigate('/products', { replace: true }); return }
        setProduct(found)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug, navigate])

  if (loading) return (
    <div className="pdp-loading">
      <div className="pdp-loading__spinner" />
    </div>
  )

  if (!product) return null

  const { name, koreanName, tagline, description, weight, origin, certifications, image, gallery } = product
  return (
    <>
      <Seo title={name} path={`/products/${slug}`} description={`${tagline} — ${description}`.slice(0, 300)} image={image} type="product" />
      {/* ─── 뒤로 가기 ─── */}
      <div className="pdp-back">
        <div className="container">
          <Link to="/products" className="pdp-back__link">← Back to Products</Link>
        </div>
      </div>

      {/* ─── 제품 정보 ─── */}
      <section className="pdp-hero section">
        <div className="container pdp-hero__inner">
          {image && (
            <div className="pdp-thumb">
              <img src={image} alt={name} className="pdp-thumb__img" />
            </div>
          )}
          <div className="pdp-info">
            <p className="label pdp-info__ko">{koreanName}</p>
            <h1 className="heading-lg pdp-info__name">{name}</h1>
            <p className="pdp-info__tagline">{tagline}</p>
            <div className="divider" />
            <p className="pdp-info__desc">{description}</p>

            <dl className="pdp-info__meta">
              <div>
                <dt>Weight</dt>
                <dd>{weight}</dd>
              </div>
              <div>
                <dt>Origin</dt>
                <dd>{origin}</dd>
              </div>
            </dl>

            {certifications?.length > 0 && (
              <div className="pdp-info__certs">
                {certifications.map(c => (
                  <span key={c} className="badge">{c}</span>
                ))}
              </div>
            )}

            <Link to="/contact" className="btn btn-primary pdp-info__cta">
              Inquire About This Product
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 상세 이미지: 세로로 쭉 연결 ─── */}
      {gallery?.length > 0 && (
        <section className="pdp-gallery">
          {gallery.map((src, i) => (
            <div key={i} className="pdp-gallery__item">
              <img src={src} alt={`${name} detail ${i + 1}`} />
            </div>
          ))}
        </section>
      )}

      {/* ─── 다른 제품 보기 CTA ─── */}
      <section className="section-sm pdp-footer">
        <div className="container pdp-footer__inner">
          <p>Interested in other products?</p>
          <Link to="/products" className="btn btn-outline">View All Products</Link>
        </div>
      </section>
    </>
  )
}
