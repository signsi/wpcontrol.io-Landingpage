import { Head } from 'vite-react-ssg'
import { SITE } from '../config/site'
import { buildGraph, pageUrl } from '../lib/jsonld'

export interface SeoProps {
  title: string
  description?: string
  /** Absoluter Pfad ohne abschliessenden Schrägstrich, z. B. '/blog/mein-artikel'. */
  path: string
  type?: 'website' | 'article'
  image?: string
  /** Abmessungen des Vorschaubilds; unsere Bilder unter /og/ sind 1200×630. */
  imageWidth?: number
  imageHeight?: number
  /** Alternativtext des Vorschaubilds; Standard ist der Seitentitel. */
  imageAlt?: string
  publishedTime?: string
  modifiedTime?: string
  authorName?: string
  noindex?: boolean
  /** Seitenspezifische Knoten; landen zusammen mit Organisation, Website und Seite in einem `@graph`. */
  jsonLd?: object | object[]
}

export default function Seo({
  title,
  description = SITE.defaultDescription,
  path,
  type = 'website',
  image = SITE.defaultOgImage,
  imageWidth,
  imageHeight,
  imageAlt,
  publishedTime,
  modifiedTime,
  authorName,
  noindex,
  jsonLd,
}: SeoProps) {
  const url = pageUrl(path)
  const fullTitle = path === '/' ? SITE.defaultTitle : SITE.titleTemplate.replace('%s', title)
  const ogImage = image.startsWith('http') ? image : `${SITE.url}${image}`
  const isOwnOgImage = image.startsWith('/og/')
  const width = imageWidth ?? (isOwnOgImage ? 1200 : undefined)
  const height = imageHeight ?? (isOwnOgImage ? 630 : undefined)
  const alt = imageAlt ?? fullTitle
  const graph = buildGraph(
    {
      path,
      title: fullTitle,
      description,
      image: ogImage,
      datePublished: publishedTime,
      dateModified: modifiedTime,
    },
    jsonLd,
  )

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
      {width && <meta property="og:image:width" content={String(width)} />}
      {height && <meta property="og:image:height" content={String(height)} />}
      <meta property="og:image:alt" content={alt} />
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
      <meta name="twitter:image:alt" content={alt} />

      <script type="application/ld+json">{JSON.stringify(graph).replace(/</g, '\\u003c')}</script>
    </Head>
  )
}
