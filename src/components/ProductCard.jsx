import { Link } from 'react-router-dom'
import { useLocale, useLocalePath, FEATURE_KO, MADE_IN_KO } from '../i18n'
import './ProductCard.css'

function GrainPlaceholder() {
  return (
    <svg className="product-card__placeholder-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="38" rx="14" ry="18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 20 C32 12 22 8 22 8 C22 8 32 10 32 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M32 20 C32 12 42 8 42 8 C42 8 32 10 32 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="32" y1="20" x2="32" y2="56" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  )
}

const LABELS = {
  en: { weight: 'Net Weight', madeIn: 'Manufactured In', cta: 'View Details →' },
  ko: { weight: '내용량', madeIn: '제조국', cta: '자세히 보기 →' },
}

export default function ProductCard({ product }) {
  const locale = useLocale()
  const lp = useLocalePath()
  const L = LABELS[locale]
  const { slug, name, nameKo, koreanName, tagline, taglineKo, description, descriptionKo, weight, madeIn, certifications, features, image } = product

  const ko = locale === 'ko'
  const displayName = ko ? (nameKo || name) : name
  const subName     = ko ? name : koreanName
  const displayTag  = ko ? (taglineKo || tagline) : tagline
  const displayDesc = ko ? (descriptionKo || description) : description
  const displayMadeIn = ko ? MADE_IN_KO : madeIn
  const badge = c => (ko ? (FEATURE_KO[c] || c) : c)

  return (
    <Link to={lp(`/products/${slug}`)} className="product-card" aria-label={`View ${name} details`}>
      {/* 이미지 영역 */}
      <div className="product-card__image-wrap">
        {image ? (
          <img src={image} alt={displayName} className="product-card__image" />
        ) : (
          <div className="product-card__placeholder">
            <GrainPlaceholder />
          </div>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="product-card__body">
        <p className="product-card__korean">{subName}</p>
        <h3 className="product-card__name heading-md">{displayName}</h3>
        <p className="product-card__tagline">{displayTag}</p>
        <div className="divider" />
        <p className="product-card__desc">{displayDesc}</p>

        <dl className="product-card__meta">
          <div>
            <dt>{L.weight}</dt>
            <dd>{weight}</dd>
          </div>
          <div>
            <dt>{L.madeIn}</dt>
            <dd>{displayMadeIn}</dd>
          </div>
        </dl>

        {(certifications || features) && (
          <div className="product-card__certs">
            {[...(certifications ?? []), ...(features ?? []).slice(0, 3)].map(c => (
              <span key={c} className="badge">{badge(c)}</span>
            ))}
          </div>
        )}

        <span className="product-card__cta">{L.cta}</span>
      </div>
    </Link>
  )
}
