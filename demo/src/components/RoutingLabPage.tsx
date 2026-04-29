import { useState } from 'react'
import { LanguageSwitcher, CountryLanguageSelector, useTranslation } from '@asafarim/shared-i18n'
import type { Locale } from '@asafarim/shared-i18n'
import type { SupportedLanguage } from '@asafarim/shared-i18n'
import { countries } from '../data/countries'
import { localeToSlug } from '../i18n/localeRouting'
import { resolveLocaleFromLanguage } from '../i18n/localeAdapter'
import type { ResolveLocaleResult } from '../i18n/localeAdapter'

interface Props {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

interface ScenarioRow {
  id: string
  startLocale: Locale
  action: string
  expectedSlug: string
  run: (onLocaleChange: (l: Locale) => void) => void
}

const SCENARIOS: ScenarioRow[] = [
  {
    id: 'be-en-fr',
    startLocale: { country: 'BE', language: 'en' },
    action: 'LanguageSwitcher selects French',
    expectedSlug: 'be-fr',
    run: (cb) => {
      const { locale } = resolveLocaleFromLanguage({ country: 'BE', language: 'en' }, 'fr', countries)
      cb(locale)
    },
  },
  {
    id: 'gb-en-nl',
    startLocale: { country: 'GB', language: 'en' },
    action: 'LanguageSwitcher selects Dutch (UK → fallback to NL)',
    expectedSlug: 'nl-nl',
    run: (cb) => {
      const { locale } = resolveLocaleFromLanguage({ country: 'GB', language: 'en' }, 'nl', countries)
      cb(locale)
    },
  },
  {
    id: 'cls-gb-en',
    startLocale: { country: 'BE', language: 'en' },
    action: 'CountryLanguageSelector selects UK English',
    expectedSlug: 'gb-en',
    run: (cb) => cb({ country: 'GB', language: 'en' }),
  },
  {
    id: 'cls-lu-de',
    startLocale: { country: 'BE', language: 'en' },
    action: 'CountryLanguageSelector selects Luxembourg German',
    expectedSlug: 'lu-de',
    run: (cb) => cb({ country: 'LU', language: 'de' }),
  },
]

export default function RoutingLabPage({ locale, onLocaleChange }: Props) {
  const { t } = useTranslation('demo')
  const [lsResult, setLsResult] = useState<ResolveLocaleResult | null>(null)

  const handleLangSwitch = (lang: SupportedLanguage) => {
    const result = resolveLocaleFromLanguage(locale, lang, countries)
    setLsResult(result)
    if (result.reason !== 'unsupported') onLocaleChange(result.locale)
  }

  return (
    <div className="lab">
      <header className="section-head">
        <h2>{t('routingLab.heading')}</h2>
        <p>{t('routingLab.intro')}</p>
      </header>

      <div className="lab__status surface">
        <div><span className="lab__caption">{t('routingLab.currentLocale')}</span><strong className="lab__value">{locale.country} / {locale.language.toUpperCase()}</strong></div>
        <div><span className="lab__caption">{t('routingLab.slug')}</span><code className="lab__value">{localeToSlug(locale)}</code></div>
        <div><span className="lab__caption">{t('routingLab.urlPath')}</span><code className="lab__value">/shared-i18n/{localeToSlug(locale)}/routing-lab</code></div>
      </div>

      <div className="lab__side-by-side">
        <div className="lab__side surface">
          <h3 className="lab__side-title">{t('routingLab.langOnly.title')}</h3>
          <p className="lab__side-desc">{t('routingLab.langOnly.desc')}</p>
          <LanguageSwitcher
            variant="buttons"
            languages={['en', 'nl', 'fr', 'de']}
            onChanged={handleLangSwitch}
          />
          {lsResult && (
            <div className={`notice ${lsResult.reason === 'fallback-country' ? 'notice--warn' : lsResult.reason === 'unsupported' ? 'notice--err' : 'notice--ok'}`}>
              {lsResult.reason === 'same-country' && (
                <>✓ Same country — locale: <code>{localeToSlug(lsResult.locale)}</code></>
              )}
              {lsResult.reason === 'fallback-country' && lsResult.message}
              {lsResult.reason === 'unsupported' && lsResult.message}
            </div>
          )}
          <div className="lab__outcome">
            {t('routingLab.langOnly.resolved')} <code>{localeToSlug(locale)}</code>
          </div>
        </div>

        <div className="lab__side surface">
          <h3 className="lab__side-title">{t('routingLab.countryLang.title')}</h3>
          <p className="lab__side-desc">{t('routingLab.countryLang.desc')}</p>
          <CountryLanguageSelector
            countries={countries}
            value={locale}
            onChange={onLocaleChange}
            triggerVariant="full"
            flagMode="image"
            ariaLabel="Routing lab — country language selector"
          />
          <div className="lab__outcome">
            {t('routingLab.countryLang.resolved')} <code>{localeToSlug(locale)}</code>
          </div>
        </div>
      </div>

      <section className="lab__scenarios">
        <h3>{t('routingLab.scenarios.title')}</h3>
        <p>{t('routingLab.scenarios.desc')}</p>
        <div className="scenario-grid">
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              type="button"
              className="scenario-card"
              onClick={() => s.run(onLocaleChange)}
            >
              <div className="scenario-card__action">{s.action}</div>
              <div className="scenario-card__result">
                {t('routingLab.scenarios.expected')} <code>{s.expectedSlug}</code>
              </div>
              <div className="scenario-card__start">
                Start: <code>{localeToSlug(s.startLocale)}</code>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
