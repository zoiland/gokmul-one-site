import './ProductCard.css'

// 이미지가 없을 때 표시할 grain 아이콘 SVG (인라인)
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

export default function ProductCard({ product }) {
  const { name, koreanName, tagline, description, weight, origin, certifications, image } = product

  return (
    <article className="product-card">
      {/* 이미지 영역 */}
      <div className="product-card__image-wrap">
        {image ? (
          <img src={image} alt={name} className="product-card__image" />
        ) : (
          <div className="product-card__placeholder">
            <GrainPlaceholder />
          </div>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="product-card__body">
        <p className="product-card__korean">{koreanName}</p>
        <h3 className="product-card__name heading-md">{name}</h3>
        <p className="product-card__tagline">{tagline}</p>
        <div className="divider" />
        <p className="product-card__desc">{description}</p>

        <dl className="product-card__meta">
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
          <div className="product-card__certs">
            {certifications.map(c => (
              <span key={c} className="badge">{c}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
