import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useLocale, useLocalePath, switchLocalePath } from '../i18n'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/',            en: 'Home',        ko: '홈' },
  { to: '/brand',       en: 'Brand',       ko: '브랜드' },
  { to: '/products',    en: 'Products',    ko: '제품' },
  { to: '/gi-balancer', en: 'GI Balancer', ko: 'GI 밸런서' },
  { to: '/gallery',     en: 'Gallery',     ko: '갤러리' },
  { to: '/news',        en: 'News',        ko: '뉴스' },
  { to: '/contact',     en: 'Contact',     ko: '문의' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const location = useLocation()
  const locale = useLocale()
  const lp = useLocalePath()
  const isHome = location.pathname === '/' || location.pathname === '/kr'

  // 스크롤 감지 → 배경 전환
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => { setMenuOpen(false) }, [location])

  const ctaLabel = locale === 'ko' ? '문의하기' : 'Inquire Now'

  const langSwitch = (
    <div className="navbar__lang" aria-label="Language">
      <NavLink
        to={switchLocalePath(location.pathname, 'en')}
        className={`navbar__lang-link${locale === 'en' ? ' navbar__lang-link--active' : ''}`}
      >
        EN
      </NavLink>
      <span className="navbar__lang-sep">|</span>
      <NavLink
        to={switchLocalePath(location.pathname, 'ko')}
        className={`navbar__lang-link${locale === 'ko' ? ' navbar__lang-link--active' : ''}`}
      >
        KR
      </NavLink>
    </div>
  )

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}${isHome && !scrolled ? ' navbar--dark-hero' : ''}`}>
      <div className="container navbar__inner">
        {/* 로고 */}
        <NavLink to={lp('/')} className="navbar__logo">
          <img src="/images/logo/logo-transparent.webp" alt="GOKMUL:ONE" className="navbar__logo-img" />
        </NavLink>

        {/* 데스크탑 네비게이션 */}
        <nav className="navbar__links" aria-label="Primary navigation">
          {NAV_LINKS.map(({ to, en, ko }) => (
            <NavLink
              key={to}
              to={lp(to)}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {locale === 'ko' ? ko : en}
            </NavLink>
          ))}
          {langSwitch}
          <NavLink to={lp('/contact')} className="btn btn-primary navbar__cta">
            {ctaLabel}
          </NavLink>
        </nav>

        {/* 모바일 햄버거 */}
        <button
          className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      <nav
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(({ to, en, ko }) => (
          <NavLink
            key={to}
            to={lp(to)}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
            }
          >
            {locale === 'ko' ? ko : en}
          </NavLink>
        ))}
        <div className="navbar__mobile-lang">{langSwitch}</div>
        <NavLink to={lp('/contact')} className="btn btn-primary navbar__mobile-cta">
          {ctaLabel}
        </NavLink>
      </nav>
    </header>
  )
}
