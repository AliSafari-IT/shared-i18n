import type { Locale, Country } from '@asafarim/shared-i18n'

export type ResolveReason = 'same-country' | 'fallback-country' | 'unsupported'

export interface ResolveLocaleResult {
  locale: Locale
  reason: ResolveReason
  /** Human-readable notice when a fallback was applied. */
  message?: string
}

/**
 * Preferred first-choice country code for each language when the current
 * country does not support the selected language.
 * If the language isn't listed here, we fall through to the first country
 * in `countries` that supports it.
 */
const PREFERRED_FALLBACK: Record<string, string> = {
  nl: 'NL',
  fr: 'BE',
  de: 'BE',
  lb: 'LU',
  en: 'BE',
}

/**
 * Resolve a full Locale from a language-only change.
 *
 * Rules:
 * 1. If `currentLocale.country` supports `nextLanguage` → keep country.
 * 2. Else find the preferred fallback country (see `PREFERRED_FALLBACK`),
 *    then any other country that supports it.
 * 3. If no country supports the language → return current locale unchanged.
 */
export function resolveLocaleFromLanguage(
  currentLocale: Locale,
  nextLanguage: string,
  countries: Country[],
): ResolveLocaleResult {
  const lang = nextLanguage.toLowerCase()

  // 1. Current country already supports the language?
  const currentCountry = countries.find(
    c => c.code.toUpperCase() === currentLocale.country.toUpperCase(),
  )
  if (currentCountry?.languages.some(l => l.code.toLowerCase() === lang)) {
    return {
      locale: { country: currentLocale.country, language: lang },
      reason: 'same-country',
    }
  }

  // 2. Try preferred fallback country.
  const preferredCode = PREFERRED_FALLBACK[lang]
  if (preferredCode) {
    const preferred = countries.find(
      c => c.code.toUpperCase() === preferredCode.toUpperCase(),
    )
    if (preferred?.languages.some(l => l.code.toLowerCase() === lang)) {
      const fromCountryName = currentCountry?.name ?? currentLocale.country
      const langLabel = preferred.languages.find(l => l.code.toLowerCase() === lang)?.label ?? lang
      return {
        locale: { country: preferred.code, language: lang },
        reason: 'fallback-country',
        message: `${langLabel} is not available for ${fromCountryName}, so the locale moved to ${preferred.name}.`,
      }
    }
  }

  // 3. Any country that supports it.
  for (const country of countries) {
    if (country.languages.some(l => l.code.toLowerCase() === lang)) {
      const fromCountryName = currentCountry?.name ?? currentLocale.country
      const langLabel = country.languages.find(l => l.code.toLowerCase() === lang)?.label ?? lang
      return {
        locale: { country: country.code, language: lang },
        reason: 'fallback-country',
        message: `${langLabel} is not available for ${fromCountryName}, so the locale moved to ${country.name}.`,
      }
    }
  }

  // 4. Unsupported — no country found.
  const langLabel = nextLanguage
  const fromCountryName = currentCountry?.name ?? currentLocale.country
  return {
    locale: currentLocale,
    reason: 'unsupported',
    message: `${langLabel} is not supported by any country in this demo. Keeping ${fromCountryName}.`,
  }
}
