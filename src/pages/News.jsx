import './News.css'
import Seo from '../components/Seo'
import NewsCard from '../components/NewsCard'
import { useLocale } from '../i18n'
import newsData from '../data/news.json'

const ARTICLES = [...newsData.articles].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

const COPY = {
  en: {
    seoTitle: 'News',
    seoDesc: 'Latest news, brand stories and product updates from GOKMUL:ONE — premium ready-to-eat Korean grains.',
    label: 'Newsroom',
    title: <>News &amp; Stories</>,
    desc: 'Brand stories, product updates and moments from the GOKMUL:ONE team.',
  },
  ko: {
    seoTitle: '뉴스',
    seoDesc: '곡물:원의 최신 소식, 브랜드 스토리, 제품 업데이트를 만나보세요.',
    label: '뉴스룸',
    title: '뉴스 & 스토리',
    desc: '곡물:원의 새로운 소식과 브랜드 이야기를 전해드립니다.',
  },
}

export default function News() {
  const locale = useLocale()
  const t = COPY[locale]

  return (
    <>
      <Seo title={t.seoTitle} path="/news" description={t.seoDesc} />

      <section className="page-hero">
        <div className="container">
          <p className="label">{t.label}</p>
          <h1 className="display products-title">{t.title}</h1>
          <p className="products-hero-desc">{t.desc}</p>
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
