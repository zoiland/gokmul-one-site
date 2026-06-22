import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 라우트(경로)가 바뀔 때마다 페이지를 맨 위로 즉시 이동시킨다.
 * (전역 scroll-behavior: smooth 때문에 'instant' 로 부드러운 스크롤을 끔)
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
