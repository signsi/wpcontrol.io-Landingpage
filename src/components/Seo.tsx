import { Head } from 'vite-react-ssg'
import { SITE } from '../config/site'

export interface SeoProps {
  title: string
  description?: string
  /** Absoluter Pfad ohne abschliessenden Schrägstrich, z. B. '/blog/mein-artikel'. */
  path: string
  type?: 'website' | 'article'
  image?: string
  publishedTime?: string
  modifiedTime?: string
  authorName?: string
  noindex?: boolean
  jsonLd?: object | object[]
}

export default function Seo({
  title,
  description = SITE.defaultDescription,
  path,
  type = 'website',
  image = SITE.defaultOgImage,
  publishedTime,
  modifiedTime,
  authorName,
  noindex,
  jsonLd,
}: SeoProps) {
  const url = `${SITE.url}${path === '/' ? '' : path}`
  const fullTitle = path === '/' ? SITE.defaultTitle : SITE.titleTemplate.replace('%s', title)
  const ogImage = image.startsWith('http') ? image : `${SITE.url}${image}`
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Head>
      <html lang={SITE.lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && authorName && (
        <meta property="article:author" content={authorName} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  )
}
