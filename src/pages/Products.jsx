import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import './Products.css'
import Seo from '../components/Seo'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    fetch('/data/products.json')
      .then(r => r.json())
      .then(d => { setProducts(d.products); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <Seo title="Products" path="/products" description="Browse the GOKMUL:ONE catalogue — Grain TokTok chickpeas & oats, black soybean & lentil, farro & fava bean, and Premium Care grains. HACCP & Non-GMO certified, ready for export." />
      {/* ─── 페이지 헤더 ─── */}
      <section className="page-hero">
        <div className="container">
          <p className="label">Our Range</p>
          <h1 className="display products-title">Product Catalogue</h1>
          <p className="products-hero-desc">
            Traceable, certified, and sourced directly from Korean farms.
            Each product reflects our commitment to quality and heritage.
          </p>
        </div>
      </section>

      {/* ─── 제품 그리드 ─── */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="products-loading">
              <div className="products-loading__spinner" />
              <p>Loading products…</p>
            </div>
          ) : (
            <>
              <p className="products-count">{products.length} products</p>
              <div className="grid-3">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </>
          )}
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
              title: 'Certifications & Compliance',
              body: 'All products are HACCP certified and Non-GMO. Halal and Gluten-Free options available depending on variety.',
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
