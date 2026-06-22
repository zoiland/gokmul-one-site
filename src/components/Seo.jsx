import { Helmet } from 'react-helmet-async'

const SITE = 'https://www.gokmulone.com'
const DEFAULT_DESCRIPTION =
  'GOKMUL:ONE supplies premium Korean grain products — HACCP-certified, clean-label, ready-to-eat whole grains made with water and grains only — to global buyers, distributors and food manufacturers.'
const DEFAULT_IMAGE = `${SITE}/images/og-preview.png`

/**
 * Per-page SEO tags (title, description, canonical, Open Graph, Twitter).
 * Overrides the static defaults in index.html for each route.
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
}) {
  const fullTitle = title
    ? `${title} | GOKMUL:ONE`
    : 'GOKMUL:ONE — Premium Korean Grain Products'
  const url = `${SITE}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE}${image}`

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}
