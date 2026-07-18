import { Link } from 'react-router-dom'
import { useLocale, useLocalePath } from '../i18n'
import './NewsCard.css'

function formatDate(d, locale) {
  try {
    return new Date(d).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', { year: 'numeric', month: locale === 'ko' ? 'long' : 'short', day: 'numeric' })
  } catch {
    return d
  }
}

export default function NewsCard({ article }) {
  const locale = useLocale()
  const lp = useLocalePath()
  const ko = locale === 'ko'
  const { slug, title, titleKo, date, excerpt, excerptKo, thumbnail } = article
  const displayTitle = ko ? (titleKo || title) : title
  const displayExcerpt = ko ? (excerptKo || excerpt) : excerpt

  return (
    <Link to={lp(`/news/${slug}`)} className="news-card" aria-label={displayTitle}>
      <div className="news-card__image-wrap">
        {thumbnail
          ? <img src={thumbnail} alt={displayTitle} className="news-card__image" loading="lazy" />
          : <div className="news-card__image news-card__image--placeholder" />}
      </div>
      <div className="news-card__body">
        <time className="news-card__date">{formatDate(date, locale)}</time>
        <h3 className="news-card__title heading-md">{displayTitle}</h3>
        <p className="news-card__excerpt">{displayExcerpt}</p>
        <span className="news-card__more">{ko ? '자세히 보기 →' : 'Read more →'}</span>
      </div>
    </Link>
  )
}
