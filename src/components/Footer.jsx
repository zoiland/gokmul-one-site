import { NavLink } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      {/* 브랜드 이미지 — 원본 비율 전체 너비 표시 */}
      <div className="footer__image-wrap">
        <img src="/images/company/brand-lifestyle.png" alt="GOKMUL:ONE brand" className="footer__image" />
      </div>

      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo-ko">곡물:원</span>
          <span className="footer__logo-en">GOKMUL:ONE</span>
          <p className="footer__tagline">
            Premium Korean grain products<br />for global markets.
          </p>
          <p className="footer__tagline footer__tagline-ko">
            곡물원 · 곡물톡톡 — 바로 먹는 프리미엄 곡물
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <span className="label">Navigation</span>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/brand">Brand</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>

        <div className="footer__contact">
          <span className="label">Contact</span>
          <ul>
            <li><a href="mailto:zoiland@gokmulone.com">zoiland@gokmulone.com</a></li>
            <li><a href="mailto:river@gokmulone.com">river@gokmulone.com</a></li>
            <li><a href="tel:05070443003">0507-0443-0003</a></li>
            <li>511, 5F, Annex Building A,<br />12 Gaetbeol-ro, Yeonsu-gu,<br />Incheon 21999, Republic of Korea</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} GOKMUL:ONE. All rights reserved.</p>
          <p>곡물원 (GOKMUL:ONE) | CEO: Kim Kang | Business Reg. No.: 638-13-02161 | E-commerce Reg. No.: 2024-Incheon Yeonsu-0854</p>
        </div>
      </div>
    </footer>
  )
}
