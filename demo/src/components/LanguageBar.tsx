import { LanguageSwitcher } from '@asafarim/shared-i18n'
import { useState } from 'react'

export default function LanguageBar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'light' : 'dark')
  }

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
      <div className='package-source-actions'>
        <a
          href="https://github.com/AliSafari-IT/shared-i18n"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button"
          title="View on GitHub"
          aria-label="View repository on GitHub"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
        
        <a
          href="https://www.npmjs.com/package/@asafarim/shared-i18n"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button"
          title="View on NPM"
          aria-label="View package on NPM"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 0v16h16v-16h-16zm8.5 9.5h-1v-3h1v3zm0-4h-1v-1h1v1zm-3.5 4h-1v-6h1v6zm-3.5 0h-1v-4h1v4zm10.5 0h-1v-2h1v2zm0-3h-1v-3h1v3z"/>
          </svg>
        </a>

        <button
          onClick={toggleTheme}
          className="icon-button"
          title={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
          aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
        >
          {isDarkTheme ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  )
}