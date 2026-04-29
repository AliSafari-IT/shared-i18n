import type { Locale } from '@asafarim/shared-i18n'
import { countries } from '../data/countries'

export type DemoPage =
  | 'overview'
  | 'get-started'
  | 'language-switchers'
  | 'country-language-selectors'
  | 'routing-lab'

export const PAGES: DemoPage[] = [
  'overview',
  'get-started',
  'language-switchers',
  'country-language-selectors',
  'routing-lab',
]

export const DEFAULT_LOCALE: Locale = { country: 'BE', language: 'en' }
export const DEFAULT_PAGE: DemoPage = 'overview'

/** Vite base path. Mirrors `vite.config.ts` `base`. */
export const BASE_PATH = '/shared-i18n'

export function isSupportedLocale(locale: Locale): boolean {
  const country = countries.find(c => c.code.toUpperCase() === locale.country.toUpperCase())
  if (!country) return false
  return country.languages.some(l => l.code.toLowerCase() === locale.language.toLowerCase())
}

export function isSupportedPage(page: string): page is DemoPage {
  return (PAGES as string[]).includes(page)
}

export function localeToSlug(locale: Locale): string {
  return `${locale.country.toLowerCase()}-${locale.language.toLowerCase()}`
}

export function slugToLocale(slug: string): Locale | null {
  const match = /^([a-z]{2})-([a-z]{2,3})$/i.exec(slug.trim())
  if (!match) return null
  const candidate: Locale = { country: match[1].toUpperCase(), language: match[2].toLowerCase() }
  return isSupportedLocale(candidate) ? candidate : null
}

/** Build a path like `/shared-i18n/be-en/overview`. */
export function buildLocalizedPath(locale: Locale, page: DemoPage): string {
  return `${BASE_PATH}/${localeToSlug(locale)}/${page}`
}

export interface ParsedRoute {
  locale: Locale
  page: DemoPage
  /** True if the input did not cleanly map to a known locale + page. */
  needsRedirect: boolean
}

/**
 * Parse a window.location.pathname into a `{ locale, page }` route.
 * Falls back to `DEFAULT_LOCALE` / `DEFAULT_PAGE` and signals redirect when needed.
 */
export function parsePathname(pathname: string): ParsedRoute {
  let path = pathname
  if (path.startsWith(BASE_PATH)) path = path.slice(BASE_PATH.length)
  path = path.replace(/^\/+/, '').replace(/\/+$/, '')

  if (!path) {
    return { locale: DEFAULT_LOCALE, page: DEFAULT_PAGE, needsRedirect: true }
  }

  const [slugPart, pagePart] = path.split('/')
  const parsedLocale = slugToLocale(slugPart)
  const locale = parsedLocale ?? DEFAULT_LOCALE
  const page = pagePart && isSupportedPage(pagePart) ? pagePart : DEFAULT_PAGE
  const needsRedirect = !parsedLocale || !pagePart || !isSupportedPage(pagePart)
  return { locale, page, needsRedirect }
}
