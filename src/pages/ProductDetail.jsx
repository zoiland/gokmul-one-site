import { useParams, Link, Navigate } from 'react-router-dom'
import './ProductDetail.css'
import Seo from '../components/Seo'
import { useLocale, useLocalePath, FEATURE_KO, GRAIN_KO, ORIGIN_KO, MADE_IN_KO } from '../i18n'
import productsData from '../data/products.json'

const LABELS = {
  en: {
    back: '← Back to Products',
    weight: 'Net Weight',
    madeIn: 'Manufactured In',
    origins: 'Ingredient Origins',
    certs: 'Certifications',
    features: 'Product Features',
    cta: 'Inquire About This Product',
    otherQ: 'Interested in other products?',
    otherBtn: 'View All Products',
  },
  ko: {
    back: '← 제품 목록으로',
    weight: '내용량',
    madeIn: '제조국',
    origins: '원재료 원산지',
    certs: '인증',
    features: '제품 특징',
    cta: '이 제품 문의하기',
    otherQ: '다른 제품이 궁금하신가요?',
    otherBtn: '전체 제품 보기',
  },
}

export default function ProductDetail() {
  const { slug } = useParams()
  const locale = useLocale()
  const lp = useLocalePath()
  const L = LABELS[locale]
  const product = productsData.products.find(p => p.slug === slug)

  if (!product) return <Navigate to={lp('/products')} replace />

  const { name, nameKo, koreanName, tagline, taglineKo, description, descriptionKo, weight, madeIn, grainOrigins, certifications, features, image, gallery } = product

  const ko = locale === 'ko'
  const displayName = ko ? (nameKo || name) : name
  const subName     = ko ? name : koreanName
  const displayTag  = ko ? (taglineKo || tagline) : tagline
  const displayDesc = ko ? (descriptionKo || description) : description
  const displayMadeIn = ko ? MADE_IN_KO : madeIn
  const badge = c => (ko ? (FEATURE_KO[c] || c) : c)
  const originText = g => ko
    ? `${GRAIN_KO[g.grain] || g.grain} (${ORIGIN_KO[g.origin] || g.origin})`
    : `${g.grain} (${g.origin})`

  return (
    <>
      <Seo title={displayName} path={`/products/${slug}`} description={`${displayTag} — ${displayDesc}`.slice(0, 300)} image={image} type="product" />
      {/* ─── 뒤로 가기 ─── */}
      <div className="pdp-back">
        <div className="container">
          <Link to={lp('/products')} className="pdp-back__link">{L.back}</Link>
        </div>
      </div>

      {/* ─── 제품 정보 ─── */}
      <section className="pdp-hero section">
        <div className="container pdp-hero__inner">
          {image && (
            <div className="pdp-thumb">
              <img src={image} alt={displayName} className="pdp-thumb__img" />
            </div>
          )}
          <div className="pdp-info">
            <p className="label pdp-info__ko">{subName}</p>
            <h1 className="heading-lg pdp-info__name">{displayName}</h1>
            <p className="pdp-info__tagline">{displayTag}</p>
            <div className="divider" />
            <p className="pdp-info__desc">{displayDesc}</p>

            <dl className="pdp-info__meta">
              <div>
                <dt>{L.weight}</dt>
                <dd>{weight}</dd>
              </div>
              <div>
                <dt>{L.madeIn}</dt>
                <dd>{displayMadeIn}</dd>
              </div>
              {grainOrigins?.length > 0 && (
                <div className="pdp-info__meta--full">
                  <dt>{L.origins}</dt>
                  <dd>{grainOrigins.map(originText).join(' · ')}</dd>
                </div>
              )}
            </dl>

            {certifications?.length > 0 && (
              <div className="pdp-info__spec-group">
                <p className="pdp-info__spec-label">{L.certs}</p>
                <div className="pdp-info__certs">
                  {certifications.map(c => (
                    <span key={c} className="badge">{badge(c)}</span>
                  ))}
                </div>
              </div>
            )}

            {features?.length > 0 && (
              <div className="pdp-info__spec-group">
                <p className="pdp-info__spec-label">{L.features}</p>
                <div className="pdp-info__certs">
                  {features.map(c => (
                    <span key={c} className="badge">{badge(c)}</span>
                  ))}
                </div>
              </div>
            )}

            <Link to={lp('/contact')} className="btn btn-primary pdp-info__cta">
              {L.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 상세 이미지: 세로로 쭉 연결 ─── */}
      {gallery?.length > 0 && (
        <section className="pdp-gallery">
          {gallery.map((src, i) => (
            <div key={i} className="pdp-gallery__item">
              <img src={src} alt={`${displayName} detail ${i + 1}`} />
            </div>
          ))}
        </section>
      )}

      {/* ─── 다른 제품 보기 CTA ─── */}
      <section className="section-sm pdp-footer">
        <div className="container pdp-footer__inner">
          <p>{L.otherQ}</p>
          <Link to={lp('/products')} className="btn btn-outline">{L.otherBtn}</Link>
        </div>
      </section>
    </>
  )
}
