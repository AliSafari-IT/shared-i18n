import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from '@asafarim/shared-i18n'
import type { Locale } from '@asafarim/shared-i18n'
import LanguageBar from './components/LanguageBar'
import OverviewSection from './components/OverviewSection'
import GetStartedSection from './components/GetStartedSection'
import LanguageSwitchersPage from './components/LanguageSwitchersPage'
import CountryLanguageSelectorsPage from './components/CountryLanguageSelectorsPage'
import RoutingLabPage from './components/RoutingLabPage'
import {
  buildLocalizedPath,
  parsePathname,
  localeToSlug,
} from './i18n/localeRouting'
import type { DemoPage } from './i18n/localeRouting'

interface RouteState {
  locale: Locale
  page: DemoPage
}

function readRouteFromLocation(): RouteState & { needsRedirect: boolean } {
  return parsePathname(window.location.pathname)
}

export default function App() {
  const { i18n, t } = useTranslation('demo')

  const [route, setRoute] = useState<RouteState>(() => {
    const parsed = readRouteFromLocation()
    return { locale: parsed.locale, page: parsed.page }
  })

  // Normalize URL on first paint and sync i18n language.
  useEffect(() => {
    const parsed = readRouteFromLocation()
    const target = buildLocalizedPath(parsed.locale, parsed.page)
    if (parsed.needsRedirect || window.location.pathname !== target) {
      window.history.replaceState({}, '', target)
    }
    if (i18n?.changeLanguage && i18n.language !== parsed.locale.language) {
      i18n.changeLanguage(parsed.locale.language)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep i18n language in sync with route locale.
  useEffect(() => {
    if (i18n?.changeLanguage && i18n.language !== route.locale.language) {
      i18n.changeLanguage(route.locale.language)
    }
  }, [route.locale.language, i18n])

  // Browser back/forward.
  useEffect(() => {
    const onPop = () => {
      const parsed = readRouteFromLocation()
      setRoute({ locale: parsed.locale, page: parsed.page })
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((next: RouteState, replace = false) => {
    const target = buildLocalizedPath(next.locale, next.page)
    if (window.location.pathname !== target) {
      if (replace) window.history.replaceState({}, '', target)
      else window.history.pushState({}, '', target)
    }
    setRoute(next)
  }, [])

  const handleLocaleChange = useCallback((locale: Locale) => {
    navigate({ locale, page: route.page })
  }, [navigate, route.page])

  const handlePageChange = useCallback((page: DemoPage) => {
    navigate({ locale: route.locale, page })
  }, [navigate, route.locale])

  const slug = useMemo(() => localeToSlug(route.locale), [route.locale])
  const path = useMemo(() => buildLocalizedPath(route.locale, route.page), [route.locale, route.page])

  return (
    <div className="app-shell">
      <LanguageBar
        locale={route.locale}
        onLocaleChange={handleLocaleChange}
        currentPage={route.page}
        onPageChange={handlePageChange}
      />

      <main className="app-main" id="main">
        {route.page === 'overview' && (
          <>
            <section className="hero">
              <div className="hero__content">
                <span className="hero__eyebrow">@asafarim/shared-i18n</span>
                <h1 className="hero__title">{t('title')}</h1>
                <p className="hero__subtitle">{t('subtitle')}</p>
                <div className="hero__cta">
                  <button className="btn btn--primary" onClick={() => handlePageChange('get-started')}>
                    {t('hero.getStarted')}
                  </button>
                  <button className="btn btn--ghost" onClick={() => handlePageChange('country-language-selectors')}>
                    {t('hero.trySelector')}
                  </button>
                </div>
              </div>

              <aside className="url-card" aria-label={t('hero.liveRoutePreview')}>
                <div className="url-card__label">{t('hero.liveRoutePreview')}</div>
                <code className="url-card__url">
                  alisafari-it.github.io<span className="url-card__path">{path}</span>
                </code>
                <dl className="url-card__grid">
                  <div><dt>Country</dt><dd>{route.locale.country}</dd></div>
                  <div><dt>Language</dt><dd>{route.locale.language.toUpperCase()}</dd></div>
                  <div><dt>Slug</dt><dd>{slug}</dd></div>
                  <div><dt>i18n</dt><dd>{i18n.language}</dd></div>
                </dl>
              </aside>
            </section>

            <OverviewSection />

            <section className="contract">
              <header className="section-head">
                <h2>{t('routingContract.heading')}</h2>
                <p>{t('routingContract.description')}</p>
              </header>
              <ul className="contract__list">
                <li><code>/shared-i18n/</code> {t('routingContract.items.0', { base: '/shared-i18n/', target: '/shared-i18n/be-en/overview' })}</li>
                <li><code>/shared-i18n/&lt;country&gt;-&lt;lang&gt;/&lt;page&gt;</code> {t('routingContract.items.1', { pattern: '/shared-i18n/<country>-<lang>/<page>' })}</li>
                <li><strong>CountryLanguageSelector</strong> {t('routingContract.items.2')}</li>
                <li><strong>LanguageSwitcher</strong> {t('routingContract.items.3')}</li>
                <li>{t('routingContract.items.4', { defaultSlug: 'be-en', defaultPage: 'overview' })}</li>
              </ul>
            </section>
          </>
        )}

        {route.page === 'get-started' && (
          <section className="page-section">
            <GetStartedSection />
          </section>
        )}

        {route.page === 'language-switchers' && (
          <section className="page-section">
            <LanguageSwitchersPage locale={route.locale} onLocaleChange={handleLocaleChange} />
          </section>
        )}

        {route.page === 'country-language-selectors' && (
          <section className="page-section">
            <CountryLanguageSelectorsPage locale={route.locale} onLocaleChange={handleLocaleChange} />
          </section>
        )}

        {route.page === 'routing-lab' && (
          <section className="page-section">
            <RoutingLabPage locale={route.locale} onLocaleChange={handleLocaleChange} />
          </section>
        )}
      </main>

      <footer className="app-footer">
        <span>
          {t('footer.activeRoute')}: <code>{path}</code>
        </span>
        <span>
          {t('footer.builtWith')} <a href="https://github.com/AliSafari-IT/shared-i18n" target="_blank" rel="noopener noreferrer">@asafarim/shared-i18n</a>
        </span>
      </footer>
    </div>
  )
}
