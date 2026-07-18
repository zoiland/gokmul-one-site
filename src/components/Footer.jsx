import { NavLink } from 'react-router-dom'
import { useLocale, useLocalePath } from '../i18n'
import './Footer.css'

const COPY = {
  en: {
    tagline: <>Premium Korean grain products<br />for global markets.</>,
    taglineKo: '곡물원 · 곡물톡톡 — 바로 먹는 프리미엄 곡물',
    navLabel: 'Navigation',
    contactLabel: 'Contact',
    nav: { home: 'Home', brand: 'Brand', products: 'Products', gallery: 'Gallery', news: 'News', contact: 'Contact' },
    address: <>511, 5F, Annex Building A,<br />12 Gaetbeol-ro, Yeonsu-gu,<br />Incheon 21999, Republic of Korea</>,
    privacy: 'Privacy Policy',
    legal: '곡물원 (GOKMUL:ONE) | CEO: Kim Kang | Business Reg. No.: 638-13-02161 | E-commerce Reg. No.: 2024-Incheon Yeonsu-0854',
  },
  ko: {
    tagline: <>바로 먹는 프리미엄 곡물,<br />건강한 일상을 만듭니다.</>,
    taglineKo: 'GOKMUL:ONE · Grain TokTok',
    navLabel: '메뉴',
    contactLabel: '연락처',
    nav: { home: '홈', brand: '브랜드', products: '제품', gallery: '갤러리', news: '뉴스', contact: '문의' },
    address: <>인천광역시 연수구 갯벌로 12,<br />별관 A동 5층 511호 (21999)</>,
    privacy: '개인정보처리방침',
    legal: '곡물원 (GOKMUL:ONE) | 대표: 김강 | 사업자등록번호: 638-13-02161 | 통신판매업신고: 2024-인천연수구-0854',
  },
}

export default function Footer() {
  const locale = useLocale()
  const lp = useLocalePath()
  const t = COPY[locale]

  return (
    <footer className="footer">
      {/* 브랜드 이미지 — 원본 비율 전체 너비 표시 */}
      <div className="footer__image-wrap">
        <img src="/images/company/brand-lifestyle.webp" alt="GOKMUL:ONE brand" className="footer__image" />
      </div>

      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo-ko">곡물:원</span>
          <span className="footer__logo-en">GOKMUL:ONE</span>
          <p className="footer__tagline">{t.tagline}</p>
          <p className="footer__tagline footer__tagline-ko">{t.taglineKo}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <span className="label">{t.navLabel}</span>
          <ul>
            <li><NavLink to={lp('/')}>{t.nav.home}</NavLink></li>
            <li><NavLink to={lp('/brand')}>{t.nav.brand}</NavLink></li>
            <li><NavLink to={lp('/products')}>{t.nav.products}</NavLink></li>
            <li><NavLink to={lp('/gallery')}>{t.nav.gallery}</NavLink></li>
            <li><NavLink to={lp('/news')}>{t.nav.news}</NavLink></li>
            <li><NavLink to={lp('/contact')}>{t.nav.contact}</NavLink></li>
          </ul>
        </nav>

        <div className="footer__contact">
          <span className="label">{t.contactLabel}</span>
          <ul>
            <li><a href="mailto:zoiland@gokmulone.com">zoiland@gokmulone.com</a></li>
            <li><a href="mailto:river@gokmulone.com">river@gokmulone.com</a></li>
            <li><a href="tel:05070443003">0507-0443-0003</a></li>
            <li>{t.address}</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} GOKMUL:ONE. All rights reserved. · <NavLink to={lp('/privacy')} className="footer__legal-link">{t.privacy}</NavLink></p>
          <p>{t.legal}</p>
        </div>
      </div>
    </footer>
  )
}
