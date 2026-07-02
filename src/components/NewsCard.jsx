import { Link } from 'react-router-dom'
import './NewsCard.css'

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return d
  }
}

export default function NewsCard({ article }) {
  const { slug, title, date, excerpt, thumbnail } = article
  return (
    <Link to={`/news/${slug}`} className="news-card" aria-label={title}>
      <div className="news-card__image-wrap">
        {thumbnail
          ? <img src={thumbnail} alt={title} className="news-card__image" loading="lazy" />
          : <div className="news-card__image news-card__image--placeholder" />}
      </div>
      <div className="news-card__body">
        <time className="news-card__date">{formatDate(date)}</time>
        <h3 className="news-card__title heading-md">{title}</h3>
        <p className="news-card__excerpt">{excerpt}</p>
        <span className="news-card__more">Read more →</span>
      </div>
    </Link>
  )
}
