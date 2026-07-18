import { useLocation } from 'react-router-dom'

// URL이 /kr 로 시작하면 한국어, 아니면 영어
export function useLocale() {
  const { pathname } = useLocation()
  return pathname === '/kr' || pathname.startsWith('/kr/') ? 'ko' : 'en'
}

// 현재 로케일에 맞게 내부 링크 경로를 변환 ('/products' → '/kr/products')
export function useLocalePath() {
  const locale = useLocale()
  return path => (locale === 'ko' ? (path === '/' ? '/kr' : `/kr${path}`) : path)
}

// 언어 전환용: 현재 경로를 반대 로케일의 동일 페이지로 변환
export function switchLocalePath(pathname, target) {
  const bare = pathname === '/kr' ? '/' : pathname.replace(/^\/kr\//, '/')
  if (target === 'ko') return bare === '/' ? '/kr' : `/kr${bare}`
  return bare
}

// 제품 데이터 공용 번역
export const GRAIN_KO = {
  'Chickpeas': '병아리콩',
  'Oats': '귀리',
  'Black Soybeans': '서리태',
  'Lentils': '렌틸콩',
  'Farro': '파로',
  'Fava Beans': '파바빈',
  'Khorasan Wheat': '호라산밀',
}

export const ORIGIN_KO = {
  'Canada': '캐나다',
  'South Korea': '국산',
  'United States': '미국',
  'Australia': '호주',
}

export const FEATURE_KO = {
  'HACCP': 'HACCP',
  'No Preservatives': '무보존료',
  'No Additives': '무첨가물',
  'Water & Grains Only': '물과 곡물만',
  'Steamed Grains': '스팀 쿠킹',
  'Clean Label': '클린 라벨',
  'Ready to Eat': '바로 섭취',
}

export const MADE_IN_KO = '대한민국'
