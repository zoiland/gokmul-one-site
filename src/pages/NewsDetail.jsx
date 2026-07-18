import { useParams, Link, Navigate } from 'react-router-dom'
import './NewsDetail.css'
import Seo from '../components/Seo'
import { useLocale, useLocalePath } from '../i18n'
import newsData from '../data/news.json'

function formatDate(d, locale) {
  try {
    return new Date(d).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return d
  }
}

export default function NewsDetail() {
  const { slug } = useParams()
  const locale = useLocale()
  const lp = useLocalePath()
  const ko = locale === 'ko'
  const article = newsData.articles.find(a => a.slug === slug)

  if (!article) return <Navigate to={lp('/news')} replace />

  const { title, titleKo, date, thumbnail, body = [], bodyKo, smartstoreUrl, excerpt, excerptKo } = article
  const displayTitle = ko ? (titleKo || title) : title
  const displayBody = ko ? (bodyKo || body) : body
  const displayExcerpt = ko ? (excerptKo || excerpt) : excerpt

  return (
    <>
      <Seo
        title={displayTitle}
        path={`/news/${slug}`}
        description={displayExcerpt}
        image={thumbnail}
        type="article"
      />

      <article className="news-detail">
        <div className="news-detail__back">
          <div className="container">
            <Link to={lp('/news')} className="news-detail__back-link">{ko ? '← 뉴스 목록으로' : '← Back to News'}</Link>
          </div>
        </div>

        <header className="news-detail__header container">
          <time className="news-detail__date">{formatDate(date, locale)}</time>
          <h1 className="display news-detail__title">{displayTitle}</h1>
        </header>

        {thumbnail && (
          <div className="news-detail__hero">
            <img src={thumbnail} alt={displayTitle} />
          </div>
        )}

        <div className="container news-detail__body">
          {displayBody.map((para, i) => <p key={i}>{para}</p>)}

          {smartstoreUrl && (
            <div className="news-detail__source">
              <a href={smartstoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                {ko ? '네이버 스마트스토어에서 보기 →' : 'View the original on Naver Smartstore →'}
              </a>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
