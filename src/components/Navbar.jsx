import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/brand',    label: 'Brand'    },
  { to: '/products', label: 'Products' },
  { to: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const location = useLocation()

  // 스크롤 감지 → 배경 전환
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* 로고 */}
        <NavLink to="/" className="navbar__logo">
          <img src="/images/logo/logo-transparent.png" alt="GOKMUL:ONE" className="navbar__logo-img" />
        </NavLink>

        {/* 데스크탑 네비게이션 */}
        <nav className="navbar__links" aria-label="Primary navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="btn btn-primary navbar__cta">
            Inquire Now
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
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
        <NavLink to="/contact" className="btn btn-primary navbar__mobile-cta">
          Inquire Now
        </NavLink>
      </nav>
    </header>
  )
}
