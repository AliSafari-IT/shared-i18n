import { LanguageSwitcher } from '@asafarim/shared-i18n'
import { CountryLanguageSelector } from '@asafarim/country-language-selector'
import styles from './LanguageSwitcherDemo.module.css'

interface DemoItemProps {
  title: string
  description: string
  code: string
  children: React.ReactNode
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

export default function LanguageSwitcherDemo() {
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

  return (
    <div className={styles.container}>
      <DemoItem
        title="Buttons Variant"
        description="Display all languages as individual button options"
        code={`<LanguageSwitcher
  variant="buttons"
  buttonClassName="lang-button"
  unstyled={false}
/>`}
      >
        <LanguageSwitcher
          variant="buttons"
          buttonClassName="lang-button"
          unstyled={false}
        />
      </DemoItem>

      <DemoItem
        title="Select Dropdown - Text Only"
        description="Dropdown with language names, no emojis"
        code={`<LanguageSwitcher
  variant="select"
  selectClassName="lang-select"
  unstyled={false}
  showEmoji={false}
/>`}
      >
        <LanguageSwitcher
          variant="select"
          unstyled={true}
          showEmoji={false}
          showLabel={true}
        />
      </DemoItem>

      <DemoItem
        title="Select Dropdown - Emoji Only (2 Languages)"
        description="Compact dropdown showing only emojis for language selection"
        code={`<LanguageSwitcher
  variant="select"
  selectClassName="lang-select"
  unstyled={true}
  showEmoji={true}
  languages={['en', 'nl']}
  isToggler={false}
/>`}
      >
        <LanguageSwitcher
          variant="select"
          selectClassName="lang-select"
          unstyled={true}
          showEmoji={true}
          languages={['en', 'nl']}
          isToggler={false}
        />
      </DemoItem>

      <DemoItem
        title="Toggle Button (2 Languages)"
        description="Automatic toggle button when exactly 2 languages are provided"
        code={`<LanguageSwitcher
  variant="select"
  selectClassName="lang-select"
  unstyled={true}
  showEmoji={true}
  languages={['en', 'nl']}
  isToggler={true}
/>`}
      >
        <LanguageSwitcher
          variant="select"
          selectClassName="lang-select"
          unstyled={true}
          showEmoji={true}
          languages={['en', 'nl']}
          isToggler={true}
        />
      </DemoItem>

      <DemoItem
        title="Icon Dropdown"
        description="Minimal icon-based dropdown for all languages"
        code={`<LanguageSwitcher
  variant="icon-dropdown"
  unstyled={false}
/>`}
      >
        <LanguageSwitcher
          variant="icon-dropdown"
          unstyled={false}
        />
      </DemoItem>

      <DemoItem
        title="Icon Dropdown - Limited Languages"
        description="Icon dropdown restricted to specific languages"
        code={`<LanguageSwitcher
  variant="icon-dropdown"
  languages={['en', 'nl']}
  unstyled={false}
/>`}
      >
        <LanguageSwitcher
          variant="icon-dropdown"
          languages={['en', 'nl']}
          unstyled={false}
        />
      </DemoItem>

      <DemoItem
        title="Icon Dropdown - Limited Languages with Labels"
        description="Icon dropdown with language names displayed next to flags"
        code={`<LanguageSwitcher
  variant="icon-dropdown"
  languages={['en', 'nl']}
  unstyled={false}
  showLabelInIconDropdown={true}
/>`}
      >
        <LanguageSwitcher
          variant="icon-dropdown"
          languages={['en', 'nl']}
          unstyled={false}
          showLabelInIconDropdown={true}
        />
      </DemoItem>

      <DemoItem
        title="Select Dropdown - Text Only (2 Languages)"
        description="Standard dropdown with text labels for 2 languages"
        code={`<LanguageSwitcher
  variant="select"
  selectClassName="lang-select"
  unstyled={false}
  showEmoji={false}
  languages={['en', 'nl']}
  isToggler={false}
/>`}
      >
        <LanguageSwitcher
          variant="select"
          selectClassName="lang-select"
          unstyled={false}
          showEmoji={false}
          languages={['en', 'nl']}
          isToggler={false}
        />
      </DemoItem>

      <DemoItem
        title="Buttons Variant - Limited Languages"
        description="Button variant restricted to specific languages"
        code={`<LanguageSwitcher
  variant="buttons"
  buttonClassName="lang-button"
  unstyled={false}
  languages={['en', 'nl']}
/>`}
      >
        <LanguageSwitcher
          variant="buttons"
          buttonClassName="lang-button"
          unstyled={false}
          languages={['en', 'nl']}
        />
      </DemoItem>

      <DemoItem
        title="Country-Language Selector (Header)"
        description="The header now uses CountryLanguageSelector for Belgium, Switzerland, and Canada with their official languages"
        code={`<CountryLanguageSelector
  countries={countries}
  defaultValue={{ country: 'BE', language: 'nl' }}
  persistKey="demo-locale"
  triggerVariant="compact"
  onChange={(locale) => i18n.changeLanguage(locale.language)}
/>`}
      >
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <p>The country-language selector is now in the header above.</p>
          <p>Try selecting different countries and languages to see the interface change!</p>
        </div>
      </DemoItem>
    </div>
  )
}
