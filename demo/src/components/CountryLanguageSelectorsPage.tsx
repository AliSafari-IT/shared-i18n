import { CountryLanguageSelector, useTranslation } from '@asafarim/shared-i18n'
import type { Locale } from '@asafarim/shared-i18n'
import { countries } from '../data/countries'
import { localeToSlug, buildLocalizedPath } from '../i18n/localeRouting'

interface Props {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

interface DemoItemProps {
  title: string
  description: string
  code: string
  children: React.ReactNode
  previewLabel: string
  codeLabel: string
}

function DemoItem({ title, description, code, children, previewLabel, codeLabel }: DemoItemProps) {
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
        </div>
        <div className="lab-item__code">
          <span className="lab-item__caption">{codeLabel}</span>
          <pre><code>{code}</code></pre>
        </div>
      </div>
    </article>
  )
}

export default function CountryLanguageSelectorsPage({ locale, onLocaleChange }: Props) {
  const { t } = useTranslation('demo')
  const slug = localeToSlug(locale)
  const url = buildLocalizedPath(locale, 'country-language-selectors')

  return (
    <div className="lab">
      <header className="section-head">
        <h2>{t('countryLanguageSelectors.heading')}</h2>
        <p>{t('countryLanguageSelectors.intro')}</p>
      </header>

      <div className="lab__status surface">
        <div>
          <span className="lab__caption">{t('countryLanguageSelectors.country')}</span>
          <strong className="lab__value">{locale.country}</strong>
        </div>
        <div>
          <span className="lab__caption">{t('countryLanguageSelectors.language')}</span>
          <strong className="lab__value">{locale.language.toUpperCase()}</strong>
        </div>
        <div>
          <span className="lab__caption">{t('countryLanguageSelectors.slug')}</span>
          <code className="lab__value">{slug}</code>
        </div>
        <div>
          <span className="lab__caption">{t('countryLanguageSelectors.url')}</span>
          <code className="lab__value">{url}</code>
        </div>
      </div>

      <div className="lab__grid">
        <DemoItem
          title={t('countryLanguageSelectors.variants.0.title')}
          description={t('countryLanguageSelectors.variants.0.desc')}
          previewLabel={t('countryLanguageSelectors.preview')}
          codeLabel={t('countryLanguageSelectors.code')}
          code={`import { CountryLanguageSelector } from '@asafarim/shared-i18n'

<CountryLanguageSelector
  countries={countries}
  value={locale}
  onChange={onLocaleChange}
  triggerVariant="compact"
  flagMode="image"
  ariaLabel="Select locale (image flags)"
/>`}
        >
          <CountryLanguageSelector
            countries={countries}
            value={locale}
            onChange={onLocaleChange}
            triggerVariant="compact"
            flagMode="image"
            ariaLabel="Lab — compact, image flags"
          />
        </DemoItem>

        <DemoItem
          title={t('countryLanguageSelectors.variants.1.title')}
          description={t('countryLanguageSelectors.variants.1.desc')}
          previewLabel={t('countryLanguageSelectors.preview')}
          codeLabel={t('countryLanguageSelectors.code')}
          code={`<CountryLanguageSelector
  countries={countries}
  value={locale}
  onChange={onLocaleChange}
  triggerVariant="compact"
  flagMode="image"
  disabled={true}
/>`}
        >
          <CountryLanguageSelector
            countries={countries}
            value={locale}
            onChange={onLocaleChange}
            triggerVariant="compact"
            flagMode="image"
            disabled={true}
            ariaLabel="Lab — disabled"
          />
        </DemoItem>

        <DemoItem
          title={t('countryLanguageSelectors.variants.2.title')}
          description={t('countryLanguageSelectors.variants.2.desc')}
          previewLabel={t('countryLanguageSelectors.preview')}
          codeLabel={t('countryLanguageSelectors.code')}
          code={`<CountryLanguageSelector
  countries={countries}
  value={locale}
  onChange={onLocaleChange}
  triggerVariant="full"
  flagMode="image"
/>`}
        >
          <CountryLanguageSelector
            countries={countries}
            value={locale}
            onChange={onLocaleChange}
            triggerVariant="full"
            flagMode="image"
            ariaLabel="Lab — full names, image flags"
          />
        </DemoItem>

        <DemoItem
          title={t('countryLanguageSelectors.variants.3.title')}
          description={t('countryLanguageSelectors.variants.3.desc')}
          previewLabel={t('countryLanguageSelectors.preview')}
          codeLabel={t('countryLanguageSelectors.code')}
          code={`<CountryLanguageSelector
  countries={countries}
  value={locale}
  onChange={onLocaleChange}
  triggerVariant="flag"
  flagMode="image"
/>`}
        >
          <CountryLanguageSelector
            countries={countries}
            value={locale}
            onChange={onLocaleChange}
            triggerVariant="flag"
            flagMode="image"
            ariaLabel="Lab — flag only"
          />
        </DemoItem>

        <DemoItem
          title={t('countryLanguageSelectors.variants.4.title')}
          description={t('countryLanguageSelectors.variants.4.desc')}
          previewLabel={t('countryLanguageSelectors.preview')}
          codeLabel={t('countryLanguageSelectors.code')}
          code={`<CountryLanguageSelector
  countries={countries}
  value={locale}
  onChange={onLocaleChange}
  renderTrigger={({ country, language, open }) => (
    <button type="button" className="custom-trigger" data-open={open}>
      {open ? 'Close' : 'Open'}{' '}
      <img
        src={\`https://flagcdn.com/w20/\${country.code.toLowerCase()}.png\`}
        alt=""
        width="20"
        style={{ borderRadius: 2, verticalAlign: 'middle' }}
      />{' '}
      {country.name} · {language.code.toUpperCase()}
    </button>
  )}
/>`}
        >
          <CountryLanguageSelector
            countries={countries}
            value={locale}
            onChange={onLocaleChange}
            renderTrigger={({ country, language, open }) => (
              <button type="button" className="custom-trigger" data-open={open}>
                {open ? t('countryLanguageSelectors.close') : t('countryLanguageSelectors.open')}{' '}
                <img
                  src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                  alt=""
                  width="20"
                  style={{ borderRadius: 2, verticalAlign: 'middle' }}
                />{' '}
                {country.name} · {language.code.toUpperCase()}
              </button>
            )}
            ariaLabel="Lab — custom trigger"
          />
        </DemoItem>

        <DemoItem
          title={t('countryLanguageSelectors.variants.5.title')}
          description={t('countryLanguageSelectors.variants.5.desc')}
          previewLabel={t('countryLanguageSelectors.preview')}
          codeLabel={t('countryLanguageSelectors.code')}
          code={`<CountryLanguageSelector
  countries={countries}
  value={locale}
  onChange={onLocaleChange}
  triggerVariant="compact"
  flagMode="image"
  align="start"
/>`}
        >
          <CountryLanguageSelector
            countries={countries}
            value={locale}
            onChange={onLocaleChange}
            triggerVariant="compact"
            flagMode="image"
            align="start"
            ariaLabel="Lab — align start"
          />
        </DemoItem>
      </div>
    </div>
  )
}
