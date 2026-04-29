import { useState } from 'react'
import { LanguageSwitcher, useTranslation } from '@asafarim/shared-i18n'
import type { Locale } from '@asafarim/shared-i18n'
import type { SupportedLanguage } from '@asafarim/shared-i18n'
import { countries } from '../data/countries'
import { resolveLocaleFromLanguage } from '../i18n/localeAdapter'
import type { ResolveLocaleResult } from '../i18n/localeAdapter'

interface Props {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

interface DemoItemProps {
  title: string
  description: string
  code: string
  notice?: ResolveLocaleResult | null
  children: React.ReactNode
  previewLabel?: string
  codeLabel?: string
  note?: string
}

function DemoItem({ title, description, code, notice, children, previewLabel = 'Preview', codeLabel = 'Code', note }: DemoItemProps) {
  return (
    <article className="lab-item">
      <header className="lab-item__head">
        <h3 className="lab-item__title">{title}</h3>
        <p className="lab-item__desc">{description}</p>
      </header>
      <div className="lab-item__body">
        <div className="lab-item__preview">
          <span className="lab-item__caption">{previewLabel}</span>
          {children}
          {notice?.reason === 'fallback-country' && (
            <p className="notice notice--warn">{notice.message}</p>
          )}
          {notice?.reason === 'unsupported' && (
            <p className="notice notice--err">{notice.message}</p>
          )}
        </div>
        <div className="lab-item__code">
          <span className="lab-item__caption">{codeLabel}</span>
          <pre><code>{code}</code></pre>
        </div>
      </div>
      {note && (
        <p className="lab-item__note">
          ℹ️ {note}
        </p>
      )}
    </article>
  )
}

export default function LanguageSwitchersPage({ locale, onLocaleChange }: Props) {
  const { t } = useTranslation('demo')
  const [lastResult, setLastResult] = useState<ResolveLocaleResult | null>(null)

  const makeHandler = () => (lang: SupportedLanguage) => {
    const result = resolveLocaleFromLanguage(locale, lang, countries)
    setLastResult(result)
    if (result.reason !== 'unsupported') onLocaleChange(result.locale)
  }

  return (
    <div className="lab">
      <header className="section-head">
        <h2>{t('languageSwitchers.heading')}</h2>
        <p>{t('languageSwitchers.intro')}</p>
      </header>

      <div className="switcher-distinction surface">
        <h3>{t('languageSwitchers.distinction.title')}</h3>
        <p>{t('languageSwitchers.distinction.p1')}</p>
        <ul className="slug-list">
          <li><code>be-en</code> — Belgium English</li>
          <li><code>nl-en</code> — Netherlands English</li>
          <li><code>lu-en</code> — Luxembourg English</li>
          <li><code>gb-en</code> — UK English</li>
        </ul>
        <p>
          {t('languageSwitchers.distinction.p2')}{' '}
          <strong>{t('languageSwitchers.distinction.link')}</strong>
        </p>
      </div>

      <div className="comparison-table surface">
        <h3>{t('languageSwitchers.comparison.title')}</h3>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>{t('languageSwitchers.comparison.capability')}</th>
                <th>{t('languageSwitchers.comparison.ls')}</th>
                <th>{t('languageSwitchers.comparison.cls')}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>{t('languageSwitchers.comparison.changesLang')}</td><td className="yes">{t('languageSwitchers.comparison.yes')}</td><td className="yes">{t('languageSwitchers.comparison.yesVia')}</td></tr>
              <tr><td>{t('languageSwitchers.comparison.knowsCountry')}</td><td className="no">{t('languageSwitchers.comparison.no')}</td><td className="yes">{t('languageSwitchers.comparison.yes')}</td></tr>
              <tr><td>{t('languageSwitchers.comparison.representsBeEn')}</td><td className="no">{t('languageSwitchers.comparison.no')}</td><td className="yes">{t('languageSwitchers.comparison.yes')}</td></tr>
              <tr><td>{t('languageSwitchers.comparison.distinguishes')}</td><td className="no">{t('languageSwitchers.comparison.no')}</td><td className="yes">{t('languageSwitchers.comparison.yes')}</td></tr>
              <tr><td>{t('languageSwitchers.comparison.bestUrls')}</td><td className="no">{t('languageSwitchers.comparison.needsAdapter')}</td><td className="yes">{t('languageSwitchers.comparison.yes')}</td></tr>
              <tr><td>{t('languageSwitchers.comparison.bestTransOnly')}</td><td className="yes">{t('languageSwitchers.comparison.yes')}</td><td>{t('languageSwitchers.comparison.optional')}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="lab__grid">
        <DemoItem
          title={t('languageSwitchers.variants.0.title')}
          description={t('languageSwitchers.variants.0.desc')}
          notice={lastResult}
          previewLabel={t('languageSwitchers.preview')}
          codeLabel={t('languageSwitchers.code')}
          note={t('languageSwitchers.note')}
          code={`import { LanguageSwitcher } from '@asafarim/shared-i18n'

<LanguageSwitcher
  variant="buttons"
  onChanged={(lang) => {
    const { locale } = resolveLocaleFromLanguage(currentLocale, lang, countries)
    navigate(locale)
  }}
/>`}
        >
          <LanguageSwitcher
            variant="buttons"
            onChanged={makeHandler()}
          />
        </DemoItem>

        <DemoItem
          title={t('languageSwitchers.variants.1.title')}
          description={t('languageSwitchers.variants.1.desc')}
          notice={lastResult}
          previewLabel={t('languageSwitchers.preview')}
          codeLabel={t('languageSwitchers.code')}
          note={t('languageSwitchers.note')}
          code={`<LanguageSwitcher
  variant="select"
  showEmoji={false}
  onChanged={makeHandler()}
/>`}
        >
          <LanguageSwitcher
            variant="select"
            showEmoji={false}
            showLabel={true}
            unstyled={true}
            onChanged={makeHandler()}
          />
        </DemoItem>

        <DemoItem
          title={t('languageSwitchers.variants.2.title')}
          description={t('languageSwitchers.variants.2.desc')}
          notice={lastResult}
          previewLabel={t('languageSwitchers.preview')}
          codeLabel={t('languageSwitchers.code')}
          note={t('languageSwitchers.note')}
          code={`<LanguageSwitcher
  variant="icon-dropdown"
  onChanged={makeHandler()}
/>`}
        >
          <LanguageSwitcher
            variant="icon-dropdown"
            onChanged={makeHandler()}
          />
        </DemoItem>

        <DemoItem
          title={t('languageSwitchers.variants.3.title')}
          description={t('languageSwitchers.variants.3.desc')}
          notice={lastResult}
          previewLabel={t('languageSwitchers.preview')}
          codeLabel={t('languageSwitchers.code')}
          note={t('languageSwitchers.note')}
          code={`<LanguageSwitcher
  variant="icon-dropdown"
  languages={['en', 'nl', 'fr', 'de']}
  onChanged={makeHandler()}
/>`}
        >
          <LanguageSwitcher
            variant="icon-dropdown"
            languages={['en', 'nl', 'fr', 'de']}
            onChanged={makeHandler()}
          />
        </DemoItem>

        <DemoItem
          title={t('languageSwitchers.variants.4.title')}
          description={t('languageSwitchers.variants.4.desc')}
          notice={lastResult}
          previewLabel={t('languageSwitchers.preview')}
          codeLabel={t('languageSwitchers.code')}
          note={t('languageSwitchers.note')}
          code={`<LanguageSwitcher
  variant="icon-dropdown"
  languages={['en', 'nl', 'fr', 'de']}
  showLabelInIconDropdown={true}
  onChanged={makeHandler()}
/>`}
        >
          <LanguageSwitcher
            variant="icon-dropdown"
            languages={['en', 'nl', 'fr', 'de']}
            showLabelInIconDropdown={true}
            onChanged={makeHandler()}
          />
        </DemoItem>

        <DemoItem
          title={t('languageSwitchers.variants.5.title')}
          description={t('languageSwitchers.variants.5.desc')}
          notice={lastResult}
          previewLabel={t('languageSwitchers.preview')}
          codeLabel={t('languageSwitchers.code')}
          note={t('languageSwitchers.note')}
          code={`<LanguageSwitcher
  variant="select"
  languages={['en', 'nl']}
  isToggler={true}
  showEmoji={true}
  onChanged={makeHandler()}
/>`}
        >
          <LanguageSwitcher
            variant="select"
            languages={['en', 'nl']}
            isToggler={true}
            showEmoji={true}
            unstyled={true}
            onChanged={makeHandler()}
          />
        </DemoItem>
      </div>
    </div>
  )
}
