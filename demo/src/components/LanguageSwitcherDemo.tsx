import { LanguageSwitcher } from '@asafarim/shared-i18n'
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
          selectClassName="lang-select"
          unstyled={false}
          showEmoji={false}
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
    </div>
  )
}
