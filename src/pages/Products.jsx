import ProductCard from '../components/ProductCard'
import './Products.css'
import Seo from '../components/Seo'
import productsData from '../data/products.json'

export default function Products() {
  const products = productsData.products

  return (
    <>
      <Seo title="Products" path="/products" description="Browse the GOKMUL:ONE catalogue — Grain TokTok chickpeas & oats, black soybean & lentil, farro & fava bean, and Premium Care grains. HACCP-certified, clean label, ready to eat — made with water and grains only." />
      {/* ─── 페이지 헤더 ─── */}
      <section className="page-hero">
        <div className="container">
          <p className="label">Our Range</p>
          <h1 className="display products-title">Product Catalogue</h1>
          <p className="products-hero-desc">
            Clean-label, ready-to-eat grain products made with water and grains only.
            Each product reflects our commitment to quality and care.
          </p>
        </div>
      </section>

      {/* ─── 제품 그리드 ─── */}
      <section className="section">
        <div className="container">
          <p className="products-count">{products.length} products</p>
          <div className="grid-3">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

    </>
  )
}
