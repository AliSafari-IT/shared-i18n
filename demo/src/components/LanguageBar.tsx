import { useEffect, useState } from 'react'
import { CountryLanguageSelector } from '@asafarim/shared-i18n'
import type { Locale } from '@asafarim/shared-i18n'
import { useTranslation } from '@asafarim/shared-i18n'
import { countries } from '../data/countries'
import type { DemoPage } from '../i18n/localeRouting'
import { PAGES, localeToSlug } from '../i18n/localeRouting'
import Logo from './Logo'

interface LanguageBarProps {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  currentPage: DemoPage
  onPageChange: (page: DemoPage) => void
}

const usePageLabels = (t: (key: string) => string): Record<DemoPage, string> => ({
  'overview': t('nav.overview'),
  'get-started': t('nav.getStarted'),
  'language-switchers': t('nav.languageSwitchers'),
  'country-language-selectors': t('nav.countrySelectors'),
  'routing-lab': t('nav.routingLab'),
})

function getStoredTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('demo-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function LanguageBar({ locale, onLocaleChange, currentPage, onPageChange }: LanguageBarProps) {
  const { i18n, t } = useTranslation('demo')
  const PAGE_LABELS = usePageLabels(t)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getStoredTheme())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('demo-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  const handleLocaleChange = (next: Locale) => {
    onLocaleChange(next)
    if (i18n?.changeLanguage) i18n.changeLanguage(next.language)
  }

  return (
    <header className="topnav" role="banner">
      <div className="topnav__inner">
        <a
          className="topnav__brand"
          href="#"
          onClick={(e) => { e.preventDefault(); onPageChange('overview') }}
          aria-label="Shared i18n home"
        >
          <Logo />
          <div className="topnav__brand-text">
            <span className="topnav__brand-name">@asafarim/shared-i18n</span>
            <span className="topnav__brand-tag">{t('nav.tagline')}</span>
          </div>
        </a>

        <nav className="topnav__pills" aria-label="Demo sections">
          {PAGES.map(page => (
            <button
              key={page}
              type="button"
              className={`pill ${page === currentPage ? 'pill--active' : ''}`}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {PAGE_LABELS[page]}
            </button>
          ))}
        </nav>

        <div className="topnav__actions">
          <span className="locale-chip" title={`Active locale: ${localeToSlug(locale)}`}>
            <span className="locale-chip__dot" aria-hidden="true" />
            {locale.country} / {locale.language.toUpperCase()}
            <span className="locale-chip__slug">{localeToSlug(locale)}</span>
          </span>

          <CountryLanguageSelector
            countries={countries}
            value={locale}
            onChange={handleLocaleChange}
            triggerVariant="compact"
            flagMode="image"
            align="end"
            ariaLabel="Select country and language with image flags"
          />

          <CountryLanguageSelector
            countries={countries}
            value={locale}
            onChange={handleLocaleChange}
            triggerVariant="flag"
            flagMode="image"
            align="end"
            ariaLabel="Select country and language with image flags"
          />

          <a
            href="https://github.com/AliSafari-IT/shared-i18n"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
            title="View on GitHub"
            aria-label="View repository on GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>

          <a
            href="https://www.npmjs.com/package/@asafarim/shared-i18n"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
            title="View on npm"
            aria-label="View package on npm"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M0 0v16h16V0H0zm13 13h-2V6H8v7H3V3h10v10z"/>
            </svg>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className="icon-button"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}
