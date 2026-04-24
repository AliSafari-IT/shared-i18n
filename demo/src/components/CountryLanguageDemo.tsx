import { useState } from 'react'
import type { ReactNode } from 'react'
import { CountryLanguageSelector } from '@asafarim/country-language-selector'
import styles from './LanguageSwitcherDemo.module.css'

interface DemoItemProps {
  title: string
  description: string
  code: string
  children: ReactNode
}

function DemoItem({ title, description, code, children }: DemoItemProps) {
  return (
    <div className={styles.demoItem}>
      <div className={styles.demoHeader}>
        <h4 className={styles.demoTitle}>{title}</h4>
        <p className={styles.demoDescription}>{description}</p>
      </div>
      <div className={styles.demoContent}>
        <div className={styles.demoPreview}>
          <div className={styles.previewLabel}>Preview</div>
          {children}
        </div>
        <div className={styles.demoCode}>
          <div className={styles.codeLabel}>Code</div>
          <pre className={styles.codeBlock}>{code}</pre>
        </div>
      </div>
    </div>
  )
}

const countries = [
  {
    code: 'BE',
    name: 'Belgium',
    nativeName: 'België',
    flag: '🇧🇪',
    languages: [
      { code: 'nl', label: 'Dutch', nativeLabel: 'Nederlands' },
      { code: 'fr', label: 'French', nativeLabel: 'Français' },
      { code: 'de', label: 'German', nativeLabel: 'Deutsch' }
    ]
  },
  {
    code: 'CH',
    name: 'Switzerland',
    nativeName: 'Schweiz',
    flag: '🇨🇭',
    languages: [
      { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
      { code: 'fr', label: 'French', nativeLabel: 'Français' },
      { code: 'it', label: 'Italian', nativeLabel: 'Italiano' },
      { code: 'rm', label: 'Romansh', nativeLabel: 'Rumantsch' }
    ]
  },
  {
    code: 'CA',
    name: 'Canada',
    nativeName: 'Canada',
    flag: '🇨🇦',
    languages: [
      { code: 'en', label: 'English' },
      { code: 'fr', label: 'French', nativeLabel: 'Français' }
    ]
  }
]

export default function CountryLanguageDemo() {
  const [selectedLocale, setSelectedLocale] = useState({ country: 'BE', language: 'nl' })
  const [customLocale, setCustomLocale] = useState({ country: 'CH', language: 'it' })

  return (
    <div className={styles.container}>
      <DemoItem
        title="Default Selector"
        description="A standard country-language selector with compact trigger mode and persistence."
        code={`<CountryLanguageSelector
  countries={countries}
  defaultValue={{ country: 'BE', language: 'nl' }}
  persistKey="country-locale"
/>`}
      >
        <CountryLanguageSelector
          countries={countries}
          defaultValue={{ country: 'BE', language: 'nl' }}
          persistKey="country-locale"
          onChange={(locale) => setSelectedLocale(locale)}
        />
        <p style={{ marginTop: '1rem' }}>
          Selected locale: <strong>{selectedLocale.country}</strong> / <strong>{selectedLocale.language}</strong>
        </p>
      </DemoItem>

      <DemoItem
        title="Full Trigger Variant"
        description="Render the current selection using full country and language names."
        code={`<CountryLanguageSelector
  countries={countries}
  defaultValue={{ country: 'CA', language: 'fr' }}
  triggerVariant="full"
/>`}
      >
        <CountryLanguageSelector
          countries={countries}
          defaultValue={{ country: 'CA', language: 'fr' }}
          triggerVariant="full"
          onChange={(locale) => setSelectedLocale(locale)}
        />
      </DemoItem>

      <DemoItem
        title="Custom Trigger"
        description="Use a custom trigger renderer to show selected country and language in your own button style."
        code={`<CountryLanguageSelector
  countries={countries}
  defaultValue={{ country: 'CH', language: 'it' }}
  renderTrigger={({ country, language, open }) => (
    <button>{open ? 'Close' : 'Open'} {country.code} · {language.code}</button>
  )}
/>`}
      >
        <CountryLanguageSelector
          countries={countries}
          defaultValue={{ country: 'CH', language: 'it' }}
          renderTrigger={({ country, language, open }) => (
            <button type="button" style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #ccc', background: open ? '#f0f4ff' : '#fff' }}>
              {open ? 'Close' : 'Open'} {country.flag} {country.name} · {language.nativeLabel ?? language.label}
            </button>
          )}
          onChange={(locale) => setCustomLocale(locale)}
        />
        <p style={{ marginTop: '1rem' }}>
          Custom trigger locale: <strong>{customLocale.country}</strong> / <strong>{customLocale.language}</strong>
        </p>
      </DemoItem>
    </div>
  )
}
