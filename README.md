# @asafarim/shared-i18n

Lightweight, simple translation module for any React + TypeScript app, built on top of i18next and react-i18next. It ships with sensible defaults (English and Dutch) but can support any language by adding JSON files to your locales folder.

* see Demo at: [https://alisafari-it.github.io/shared-i18n/](https://alisafari-it.github.io/shared-i18n/)

## Features

- 🌍 Works in any React + TypeScript project (monorepo or standalone)
- 🗂️ JSON-based translations per language and namespace
- 🔄 Cookie-based language persistence (browser) with automatic detection
- ⚙️ Optional backend sync for user language preferences
- ⚡ Lazy loading support for app-specific translations
- 🪝 React hooks for language management (useLanguage) and translations (useTranslation)
- 🎨 Built-in LanguageSwitcher component with multiple variants (buttons, select, icon-dropdown)
- 🚀 Configurable API URL resolution for flexible backend integration

## Installation

```bash
pnpm add @asafarim/shared-i18n
# or
npm i @asafarim/shared-i18n
# or
yarn add @asafarim/shared-i18n
```

## Usage

### 1) Initialize i18n in your app

In your app's main entry point (e.g., `main.tsx`):

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initI18n } from '@asafarim/shared-i18n';
import App from './App';

// Optional: import your app-specific translations
import enApp from './locales/en/app.json';
import nlApp from './locales/nl/app.json';

initI18n({
  defaultNS: 'common',
  ns: ['common', 'app'],
  resources: {
    en: { app: enApp },
    nl: { app: nlApp }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 2) Use translations in components

```tsx
import { useTranslation } from '@asafarim/shared-i18n';

function MyComponent() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('app:customKey')}</p>
    </div>
  );
}
```

### 3) Add a language switcher

Use the built-in LanguageSwitcher component with multiple variants:

```tsx
import { LanguageSwitcher } from '@asafarim/shared-i18n/components';

// Buttons variant (default)
<LanguageSwitcher variant="buttons" />

// Select dropdown
<LanguageSwitcher variant="select" />

// Icon-only dropdown with flag emojis
<LanguageSwitcher variant="icon-dropdown" />

// Custom languages subset
<LanguageSwitcher variant="buttons" languages={['en', 'nl']} />
```

Or use the hook directly:

```tsx
import { useLanguage } from '@asafarim/shared-i18n';

export function LanguageToggle() {
  const { language, changeLanguage, isChanging } = useLanguage();
  return (
    <button onClick={() => changeLanguage(language === 'en' ? 'nl' : 'en')} disabled={isChanging}>
      Switch language (current: {language})
    </button>
  );
}
```

## Add more languages

Yes — you can support any language by adding the required JSON files to your locales folder. For example:

```
your-app/
  src/
    locales/
      en/
        app.json
      nl/
        app.json
      anotherLang/
        new.json
```

Then include them when initializing:

```tsx
import anotherLang from './locales/anotherLang/new.json';

initI18n({
  ns: ['common', 'app', 'new'],
  resources: {
    anotherLang: { new: anotherLang }
  },
  supportedLngs: ['en', 'nl', 'anotherLang'],
  defaultLanguage: 'en'
});
```

Notes:

- If you pass supportedLngs, it will override the default supported languages.
- defaultLanguage overrides the default fallback (which is English).

## LanguageSwitcher Component

The LanguageSwitcher component provides multiple UI variants for language selection with built-in styling using ASafariM design tokens.

### Props

```tsx
interface LanguageSwitcherProps {
  className?: string;
  style?: React.CSSProperties;
  languages?: readonly SupportedLanguage[];
  variant?: "buttons" | "select" | "icon-dropdown";
  disabled?: boolean;
  getLabel?: (lang: SupportedLanguage) => string;
  getIcon?: (lang: SupportedLanguage) => React.ReactNode;
  onChanged?: (lang: SupportedLanguage) => void;
  buttonClassName?: string;
  selectClassName?: string;
  showLabel?: boolean;
  showIcon?: boolean;
  showEmoji?: boolean;
  unstyled?: boolean;
  isToggler?: boolean;
}
```

### Variants

- **buttons** — Individual buttons for each language (default)
- **select** — Native dropdown select element
  ![Select Dropdown](https://github.com/AliSafari-IT/shared-i18n/blob/main/demo/public/Select%20Dropdown_Text%20Only.png?raw=true)
- **icon-dropdown** — Custom dropdown showing flag emojis with language codes
  ![Icon Dropdown](https://github.com/AliSafari-IT/shared-i18n/blob/main/demo/public/Icon%20Dropdown_Limited%20Languages.png?raw=true)

### Examples

```tsx
// Buttons with custom styling
<LanguageSwitcher 
  variant="buttons"
  buttonClassName="custom-btn"
  languages={['en', 'nl', 'fr']}
/>

// Icon-only dropdown
<LanguageSwitcher 
  variant="icon-dropdown"
  showEmoji={true}
/>

// Select with callback
<LanguageSwitcher 
  variant="select"
  onChanged={(lang) => console.log(`Language changed to ${lang}`)}
/>
```

## API Reference

### initI18n(config?: I18nConfig)

Initialize i18next with the shared configuration.

Parameters:

- config.defaultNS — Default namespace (default: 'common')
- config.ns — Namespaces to load (default: ['common'])
- config.resources — App-specific translation resources
- config.supportedLngs — Optional list of supported language codes to enable
- config.defaultLanguage — Optional fallback language code

### useLanguage()

Hook for managing language preferences.

Returns:

- language — Current language code
- changeLanguage(lang) — Function to change language
- isChanging — Boolean indicating if language change is in progress

### useTranslation()

Re-exported from react-i18next. See official docs.

### getApiUrl(envVarName?, defaultUrl?)

Configurable API URL resolver for flexible backend integration.

Parameters:

- envVarName — Environment variable name to check (default: 'VITE_API_URL')
- defaultUrl — Default URL if no env var is set (default: 'http://localhost')

Returns: Resolved API URL string

### setApiUrlResolver(resolver)

Set a custom API URL resolver function for complete control over URL resolution.

Parameters:

- resolver — Function that returns the API URL string

Example:

```tsx
import { setApiUrlResolver, getApiUrl } from '@asafarim/shared-i18n/utils';

// Custom resolver
setApiUrlResolver(() => 'https://my-custom-api.example.com');

// Or use environment variables
const url = getApiUrl('VITE_CUSTOM_API_URL', 'https://fallback.example.com');
```

## Cookie and backend integration

- A preferredLanguage cookie is used to persist the selected language in the browser.
- If your environment provides an Identity API, updateUserLanguagePreference can sync the preference server-side. If not, the library still works fully client-side.

To point to a backend, optionally set:

```env
VITE_IDENTITY_API_URL=https://your-identity.example.com
```

## Built-in translations

This package ships with default English and Dutch common translations. You can ignore them and supply your own resources if preferred.

## License

MIT © ASafariM
