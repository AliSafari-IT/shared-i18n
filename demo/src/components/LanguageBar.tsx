import { LanguageSwitcher } from '@asafarim/shared-i18n'

export default function LanguageBar() {
  return (
    <div className="language-bar">
      <LanguageSwitcher
        variant="icon-dropdown"
        showIcon={true}
        showLabel={false}
        showEmoji={true}
        className="language-switcher"
        buttonClassName="language-switcher-button"
        selectClassName="language-switcher-select"
       // languages={undefined} // Use default languages
        languages={["en", "nl", "fr"] as const}
      />
    </div>
  )
}