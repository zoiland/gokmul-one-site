import { useEffect, useState, useCallback } from 'react'
import './Gallery.css'
import Seo from '../components/Seo'
import galleryData from '../data/gallery.json'

export default function Gallery() {
  const images = galleryData.images
  const [active, setActive] = useState(null) // 라이트박스로 열린 이미지 index (null = 닫힘)

  // 스크롤 페이드인
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-visible)')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [images.length])

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive(i => (i == null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  )
  const next = useCallback(
    () => setActive(i => (i == null ? i : (i + 1) % images.length)),
    [images.length],
  )

  // 라이트박스 열렸을 때: 키보드 조작 + 배경 스크롤 잠금
  useEffect(() => {
    if (active == null) return
    const onKey = e => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close, prev, next])

  return (
    <>
      <Seo
        title="Gallery"
        path="/gallery"
        description="Real moments from the GOKMUL:ONE community — customers around the world enjoying our ready-to-eat Korean grains, their way, every day."
      />

      {/* ─── 헤더 ─── */}
      <section className="gallery-hero">
        <div className="container gallery-hero__inner">
          <p className="label gallery-hero__eyebrow" data-reveal>Gallery</p>
          <h1 className="display gallery-hero__title" data-reveal>Loved at every table.</h1>
          <p className="gallery-hero__desc" data-reveal>
            Real moments from our community — customers enjoying GOKMUL:ONE grains,
            their way, every day.
          </p>
        </div>
      </section>

      {/* ─── 사진 그리드 (메이슨리) ─── */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-masonry">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className="gallery-item"
                data-reveal
                style={{ '--delay': `${(i % 4) * 0.06}s` }}
                onClick={() => setActive(i)}
                aria-label={`Open photo ${i + 1}`}
              >
                <img src={src} alt={`GOKMUL:ONE customer photo ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 라이트박스 ─── */}
      {active != null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="gallery-lightbox__close" aria-label="Close" onClick={close}>×</button>
          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--prev"
            aria-label="Previous photo"
            onClick={e => { e.stopPropagation(); prev() }}
          >‹</button>
          <img
            className="gallery-lightbox__img"
            src={images[active]}
            alt={`GOKMUL:ONE customer photo ${active + 1}`}
            onClick={e => e.stopPropagation()}
          />
          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            aria-label="Next photo"
            onClick={e => { e.stopPropagation(); next() }}
          >›</button>
          <span className="gallery-lightbox__count">{active + 1} / {images.length}</span>
        </div>
      )}
    </>
  )
}
