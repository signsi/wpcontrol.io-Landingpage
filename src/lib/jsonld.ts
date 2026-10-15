import { SITE } from '../config/site'
import { plans, TRIAL_DAYS } from '../data/plans'
import { blogCategory } from '../content/taxonomy'
import type { BlogPost, Guide } from './content/types'

/**
 * Strukturierte Daten (schema.org) als ein Graph pro Seite.
 *
 * `Seo` setzt Organization, Person, WebSite und die WebPage der aktuellen
 * Adresse selbst und hängt die Knoten aus dem `jsonLd`-Prop an. Die Helfer
 * hier liefern deshalb Knoten ohne `@context`; sie verweisen über feste
 * `@id`s aufeinander statt Objekte zu wiederholen.
 */

type Node = Record<string, unknown>

const abs = (p: string) => `${SITE.url}${p.startsWith('/') ? p : `/${p}`}`

/** Kanonische Adresse einer Seite; die Startseite mit Schrägstrich wie in der Sitemap. */
export const pageUrl = (path: string) => (path === '/' ? `${SITE.url}/` : abs(path))

export const ORGANIZATION_ID = `${SITE.url}/#organization`
export const WEBSITE_ID = `${SITE.url}/#website`
export const PERSON_ID = `${SITE.url}/#patrick-williner`
export const SOFTWARE_ID = `${SITE.url}/#software`
export const webPageId = (path: string) => `${pageUrl(path)}#webpage`
export const breadcrumbId = (path: string) => `${pageUrl(path)}#breadcrumb`

const ref = (id: string) => ({ '@id': id })

export interface Crumb {
  label: string
  path: string
}

export function organizationLd(): Node {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE.name,
    legalName: 'viwiv GmbH',
    url: `${SITE.url}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE.url}/#logo`,
      url: abs('/apple-touch-icon.png'),
      contentUrl: abs('/apple-touch-icon.png'),
      width: 180,
      height: 180,
      caption: SITE.name,
    },
    image: ref(`${SITE.url}/#logo`),
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Suurstoffi 3c',
      postalCode: '6343',
      addressLocality: 'Rotkreuz',
      addressRegion: 'ZG',
      addressCountry: SITE.country,
    },
    taxID: 'CHE-300.685.617',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE.email,
        availableLanguage: 'de',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'privacy',
        email: 'datenschutz@wporbit.ch',
      },
    ],
    founder: ref(PERSON_ID),
  }
}

export function personLd(): Node {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Patrick Williner',
    jobTitle: 'Geschäftsführer',
    worksFor: ref(ORGANIZATION_ID),
    url: abs('/ueber-uns'),
  }
}

export function webSiteLd(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    inLanguage: SITE.lang,
    publisher: ref(ORGANIZATION_ID),
  }
}

export interface WebPageInput {
  path: string
  title: string
  description: string
  image: string
  breadcrumb?: boolean
  datePublished?: string
  dateModified?: string
}

export function webPageLd({ path, title, description, image, breadcrumb, datePublished, dateModified }: WebPageInput): Node {
  return {
    '@type': 'WebPage',
    '@id': webPageId(path),
    url: pageUrl(path),
    name: title,
    description,
    inLanguage: SITE.lang,
    isPartOf: ref(WEBSITE_ID),
    publisher: ref(ORGANIZATION_ID),
    about: ref(ORGANIZATION_ID),
    primaryImageOfPage: { '@type': 'ImageObject', url: image },
    ...(breadcrumb ? { breadcrumb: ref(breadcrumbId(path)) } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  }
}

/** Nur auf `/`, `/produkt` und `/preise`. Keine Bewertungen: es gibt keine. */
export function softwareApplicationLd(): Node {
  const offers = plans.map((plan) => {
    const base = {
      '@type': 'Offer',
      name: plan.name,
      url: abs(plan.href),
      priceCurrency: 'CHF',
      seller: ref(ORGANIZATION_ID),
    }

    if (plan.id === 'demo') {
      return {
        ...base,
        price: 0,
        description: `${TRIAL_DAYS} Tage kostenlos testen`,
        availability: 'https://schema.org/InStock',
      }
    }

    const isCloud = plan.id === 'cloud'
    return {
      ...base,
      price: plan.priceValue,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plan.priceValue,
        priceCurrency: 'CHF',
        unitText: isCloud ? 'pro Monat' : 'pro Person und Monat',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
      },
      availability: isCloud ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock',
      ...(isCloud ? { description: 'Release bis Ende 2026' } : {}),
    }
  })

  return {
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: SITE.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS 15 oder neuer',
    description: SITE.defaultDescription,
    url: `${SITE.url}/`,
    inLanguage: SITE.lang,
    publisher: ref(ORGANIZATION_ID),
    offers,
  }
}

/** Das Bild, das `og:image` eines Blogartikels zeigt; JSON-LD muss dasselbe nennen. */
export const blogImage = (post: BlogPost) => post.cover ?? SITE.blogOgImage

export function blogPostingLd(post: BlogPost): Node {
  const category = blogCategory(post.category)
  return {
    '@type': 'BlogPosting',
    '@id': `${pageUrl(post.path)}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    wordCount: post.wordCount,
    inLanguage: SITE.lang,
    ...(category ? { articleSection: category.label } : {}),
    ...(post.tags.length > 0 ? { keywords: post.tags.join(', ') } : {}),
    image: abs(blogImage(post)),
    author: post.author.key === 'patrick' ? ref(PERSON_ID) : ref(ORGANIZATION_ID),
    publisher: ref(ORGANIZATION_ID),
    isPartOf: ref(WEBSITE_ID),
    mainEntityOfPage: ref(webPageId(post.path)),
  }
}

/**
 * Dauer aus dem Frontmatter als ISO 8601: „5 Minuten" → PT5M, „1 Stunde" → PT1H,
 * „10–15 Minuten" → PT15M (obere Grenze). Ohne Zahl mit Einheit: undefined.
 */
export function durationToIso(duration: string | undefined): string | undefined {
  if (!duration) return undefined
  const num = String.raw`(\d+)(?:\s*[–-]\s*(\d+))?\s*`
  const hours = new RegExp(`${num}(?:Stunden?|Std\\.?)`, 'i').exec(duration)
  const minutes = new RegExp(`${num}(?:Minuten?|Min\\.?)`, 'i').exec(duration)
  const pick = (m: RegExpExecArray | null) => (m ? Number(m[2] ?? m[1]) : 0)
  const h = pick(hours)
  const min = pick(minutes)
  if (!h && !min) return undefined
  return `PT${h ? `${h}H` : ''}${min ? `${min}M` : ''}`
}

/**
 * `HowTo` nur für echte Schritt-für-Schritt-Anleitungen. Für Referenz- und
 * Fehlerbehebungs-Seiten ist `TechArticle` das passende Schema.
 */
export function guideLd(guide: Guide): Node {
  const base = {
    '@id': `${pageUrl(guide.path)}#article`,
    name: guide.title,
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date ?? guide.updated,
    dateModified: guide.updated,
    inLanguage: SITE.lang,
    image: abs(SITE.guideOgImage),
    author: ref(PERSON_ID),
    publisher: ref(ORGANIZATION_ID),
    isPartOf: ref(WEBSITE_ID),
    mainEntityOfPage: ref(webPageId(guide.path)),
  }

  // HowTo nur, wenn es tatsächlich ausgezeichnete Arbeitsschritte gibt.
  // Überschriften taugen dafür nicht: Abschnitte wie „Nächste Schritte" wären
  // sonst als Arbeitsschritt ausgezeichnet und die Angabe damit schlicht falsch.
  if (guide.type === 'anleitung' && guide.steps.length >= 2) {
    const totalTime = durationToIso(guide.duration)
    return {
      ...base,
      '@type': 'HowTo',
      ...(totalTime ? { totalTime } : {}),
      step: guide.steps.map((name, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name,
      })),
    }
  }

  return { ...base, '@type': 'TechArticle' }
}

/** Nur auf `/faq` und den Vergleichsseiten — nicht auf `/preise`. */
export function faqPageLd(items: { q: string; a: string }[]): Node {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

/**
 * Ohne „Start" übergeben (wie bei `Breadcrumbs`); der Eintrag wird hier ergänzt.
 * Die `@id` setzt `Seo` anhand der aktuellen Adresse.
 */
export function breadcrumbLd(crumbs: Crumb[]): Node {
  const all = crumbs[0]?.path === '/' ? crumbs : [{ label: 'Start', path: '/' }, ...crumbs]
  return {
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: pageUrl(c.path),
    })),
  }
}

/**
 * Baut den Graphen einer Seite. Nimmt Knoten mit oder ohne `@context` sowie
 * verschachtelte `@graph`s an (alte Aufrufer), entfernt Dubletten nach `@id`
 * und vergibt fehlende `@id`s anhand der Seitenadresse.
 */
export function buildGraph(page: Omit<WebPageInput, 'breadcrumb'>, extra: object | object[] | undefined) {
  const flat: Node[] = []
  const collect = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(collect)
    if (!value || typeof value !== 'object') return
    const { '@context': _ctx, '@graph': graph, ...rest } = value as Node
    if (graph) collect(graph)
    if (Object.keys(rest).length > 0) flat.push(rest)
  }
  collect(extra)

  const base = pageUrl(page.path)
  const usedIds = new Set<string>()
  for (const node of flat) {
    if (node['@type'] === 'BreadcrumbList' && !node['@id']) node['@id'] = breadcrumbId(page.path)
    if (!node['@id'] && typeof node['@type'] === 'string') {
      let id = `${base}#${node['@type'].toLowerCase()}`
      for (let n = 2; usedIds.has(id); n++) id = `${base}#${String(node['@type']).toLowerCase()}-${n}`
      node['@id'] = id
    }
    if (typeof node['@id'] === 'string') usedIds.add(node['@id'])
  }

  const hasBreadcrumb = flat.some((node) => node['@id'] === breadcrumbId(page.path))
  const nodes = [
    organizationLd(),
    personLd(),
    webSiteLd(),
    webPageLd({ ...page, breadcrumb: hasBreadcrumb }),
    ...flat,
  ]

  const seen = new Set<string>()
  const graph = nodes.filter((node) => {
    const id = node['@id']
    if (typeof id !== 'string') return true
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })

  return { '@context': 'https://schema.org', '@graph': graph }
}
