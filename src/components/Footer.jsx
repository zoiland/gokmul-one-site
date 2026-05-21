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
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <span className="label">Navigation</span>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/brand">Brand</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>

        <div className="footer__contact">
          <span className="label">Contact</span>
          <ul>
            <li>contact@gokmulone.com</li>
            <li>+82-2-0000-0000</li>
            <li>Seoul, Republic of Korea</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} GOKMUL:ONE. All rights reserved.</p>
          <p>곡물:원 | 사업자등록번호: 000-00-00000</p>
        </div>
      </div>
    </footer>
  )
}
