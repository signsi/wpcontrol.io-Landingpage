import { SITE } from '../config/site'
import { plans, STANDALONE_PRICE_CHF } from '../data/plans'
import type { BlogPost, Guide } from './content/types'

const abs = (p: string) => `${SITE.url}${p.startsWith('/') ? p : `/${p}`}`

export interface Crumb {
  label: string
  path: string
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: abs('/wporbit.svg'),
    email: SITE.email,
    address: { '@type': 'PostalAddress', addressCountry: SITE.country },
  }
}

export function webSiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.lang,
    publisher: { '@id': `${SITE.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/anleitungen?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function softwareApplicationLd() {
  const paid = plans.filter((p) => p.priceValue && p.priceValue > 0)
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS',
    description: SITE.defaultDescription,
    url: SITE.url,
    publisher: { '@id': `${SITE.url}/#organization` },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CHF',
      lowPrice: STANDALONE_PRICE_CHF,
      offerCount: paid.length,
      offers: paid.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: p.priceValue,
        priceCurrency: 'CHF',
        url: abs(p.href),
      })),
    },
  }
}

export function blogPostingLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    wordCount: post.wordCount,
    inLanguage: SITE.lang,
    image: abs(post.cover ?? SITE.defaultOgImage),
    author: { '@type': 'Person', name: post.author.name },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(post.path) },
  }
}

/**
 * `HowTo` nur für echte Schritt-für-Schritt-Anleitungen. Für Referenz- und
 * Fehlerbehebungs-Seiten ist `TechArticle` das passende Schema.
 */
export function guideLd(guide: Guide) {
  const base = {
    '@context': 'https://schema.org',
    name: guide.title,
    description: guide.description,
    dateModified: guide.updated,
    inLanguage: SITE.lang,
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(guide.path) },
  }

  // HowTo nur, wenn es tatsächlich ausgezeichnete Arbeitsschritte gibt.
  // Überschriften taugen dafür nicht: Abschnitte wie „Nächste Schritte" wären
  // sonst als Arbeitsschritt ausgezeichnet und die Angabe damit schlicht falsch.
  if (guide.type === 'anleitung' && guide.steps.length >= 2) {
    return {
      ...base,
      '@type': 'HowTo',
      totalTime: guide.duration,
      step: guide.steps.map((name, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name,
      })),
    }
  }

  return { ...base, '@type': 'TechArticle', headline: guide.title }
}

export function faqPageLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: abs(c.path),
    })),
  }
}
