import ProductCard from '../components/ProductCard'
import './Products.css'
import Seo from '../components/Seo'
import { useLocale } from '../i18n'
import productsData from '../data/products.json'

const COPY = {
  en: {
    seoTitle: 'Products',
    seoDesc: 'Browse the GOKMUL:ONE catalogue — Grain TokTok chickpeas & oats, black soybean & lentil, farro & fava bean, and Premium Care grains. HACCP-certified, clean label, ready to eat — made with water and grains only.',
    label: 'Our Range',
    title: 'Product Catalogue',
    desc: 'Clean-label, ready-to-eat grain products made with water and grains only. Each product reflects our commitment to quality and care.',
    count: n => `${n} products`,
  },
  ko: {
    seoTitle: '제품',
    seoDesc: '곡물:원 제품 카탈로그 — 곡물톡톡 병아리콩귀리, 서리태렌틸콩, 파로파바빈, 프리미엄 케어 라인. 물과 곡물만으로 만든 HACCP 인증 클린 라벨 간편 곡물.',
    label: '제품',
    title: '제품 카탈로그',
    desc: '물과 곡물만으로 만든 클린 라벨 간편 곡물. 모든 제품에 품질과 정성을 담았습니다.',
    count: n => `총 ${n}개 제품`,
  },
}

export default function Products() {
  const locale = useLocale()
  const t = COPY[locale]
  const products = productsData.products

  return (
    <>
      <Seo title={t.seoTitle} path="/products" description={t.seoDesc} />
      {/* ─── 페이지 헤더 ─── */}
      <section className="page-hero">
        <div className="container">
          <p className="label">{t.label}</p>
          <h1 className="display products-title">{t.title}</h1>
          <p className="products-hero-desc">{t.desc}</p>
        </div>
      </section>

      {/* ─── 제품 그리드 ─── */}
      <section className="section">
        <div className="container">
          <p className="products-count">{t.count(products.length)}</p>
          <div className="grid-3">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  )
}
