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

      {/* ─── MOQ / Custom info ─── */}
      <section className="section-sm products-info">
        <div className="container products-info__grid">
          {[
            {
              title: 'Minimum Order Quantity',
              body: 'MOQ starts from 500kg per SKU. Custom MOQs available for long-term partners. Contact our sales team for details.',
            },
            {
              title: 'Custom Packaging & OEM',
              body: 'We offer private-label packaging, custom weight options, and OEM grain blend formulation for retail and food-service clients.',
            },
            {
              title: 'Clean Label & Quality',
              body: 'HACCP certified and made with water and grains only — no preservatives, no additives. Gently steamed, clean label, and ready to eat.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="products-info__card">
              <h3 className="products-info__title">{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
