import './News.css'
import Seo from '../components/Seo'
import NewsCard from '../components/NewsCard'
import newsData from '../data/news.json'

const ARTICLES = [...newsData.articles].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export default function News() {
  return (
    <>
      <Seo
        title="News"
        path="/news"
        description="Latest news, brand stories and product updates from GOKMUL:ONE — premium ready-to-eat Korean grains."
      />

      <section className="page-hero">
        <div className="container">
          <p className="label">Newsroom</p>
          <h1 className="display products-title">News &amp; Stories</h1>
          <p className="products-hero-desc">
            Brand stories, product updates and moments from the GOKMUL:ONE team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {ARTICLES.map(a => <NewsCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>
    </>
  )
}
