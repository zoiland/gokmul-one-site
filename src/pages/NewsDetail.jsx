import { useParams, Link, Navigate } from 'react-router-dom'
import './NewsDetail.css'
import Seo from '../components/Seo'
import newsData from '../data/news.json'

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return d
  }
}

export default function NewsDetail() {
  const { slug } = useParams()
  const article = newsData.articles.find(a => a.slug === slug)

  if (!article) return <Navigate to="/news" replace />

  const { title, date, thumbnail, body = [], smartstoreUrl, excerpt } = article

  return (
    <>
      <Seo
        title={title}
        path={`/news/${slug}`}
        description={excerpt}
        image={thumbnail}
        type="article"
      />

      <article className="news-detail">
        <div className="news-detail__back">
          <div className="container">
            <Link to="/news" className="news-detail__back-link">← Back to News</Link>
          </div>
        </div>

        <header className="news-detail__header container">
          <time className="news-detail__date">{formatDate(date)}</time>
          <h1 className="display news-detail__title">{title}</h1>
        </header>

        {thumbnail && (
          <div className="news-detail__hero">
            <img src={thumbnail} alt={title} />
          </div>
        )}

        <div className="container news-detail__body">
          {body.map((para, i) => <p key={i}>{para}</p>)}

          {smartstoreUrl && (
            <div className="news-detail__source">
              <a href={smartstoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                View the original on Naver Smartstore →
              </a>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
