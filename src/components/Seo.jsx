import { Head } from 'vite-react-ssg'
import { useLocale } from '../i18n'

const SITE = 'https://www.gokmulone.com'
const DEFAULT_DESCRIPTION = {
  en: 'GOKMUL:ONE supplies premium Korean grain products — HACCP-certified, clean-label, ready-to-eat whole grains made with water and grains only — to global buyers, distributors and food manufacturers.',
  ko: '곡물:원은 물과 곡물만으로 만든 클린 라벨 간편 통곡물, 곡물톡톡을 만듭니다. HACCP 인증 시설에서 제조하는 바로 먹는 프리미엄 곡물 브랜드.',
}
const DEFAULT_IMAGE = `${SITE}/images/og-preview.jpg`

/**
 * Per-page SEO tags (title, description, canonical, Open Graph, Twitter).
 * <Head> is prerendered into the static HTML by vite-react-ssg.
 * `path`는 로케일 프리픽스 없는 기본 경로('/products')로 전달 — 로케일은 URL에서 판별.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
}) {
  const locale = useLocale()
  const desc = description || DEFAULT_DESCRIPTION[locale]
  const fullTitle = title
    ? `${title} | GOKMUL:ONE`
    : locale === 'ko'
      ? 'GOKMUL:ONE 곡물:원 — 바로 먹는 프리미엄 곡물'
      : 'GOKMUL:ONE — Premium Korean Grain Products'

  const enUrl = `${SITE}${path}`
  const koUrl = `${SITE}${path === '/' ? '/kr' : `/kr${path}`}`
  const url = locale === 'ko' ? koUrl : enUrl
  const imageUrl = image.startsWith('http') ? image : `${SITE}${image}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="ko" href={koUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={locale === 'ko' ? 'ko_KR' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  )
}
