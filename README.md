# @asafarim/shared-i18n

Lightweight React + TypeScript i18n package built on top of i18next and react-i18next. Ships with sensible defaults (English and Dutch) but supports any language. Includes a **LanguageSwitcher** and, new in v0.9, re-exports the full **CountryLanguageSelector** from `@asafarim/country-language-selector` — so consumers install only one package.

* Live demo: [https://alisafari-it.github.io/shared-i18n/](https://alisafari-it.github.io/shared-i18n/)

## Features

- 🌍 Works in any React + TypeScript project (monorepo or standalone)
- 🗂️ JSON-based translations per language and namespace
- 🔄 Cookie-based language persistence with automatic browser detection
- ⚙️ Optional backend sync for user language preferences
- ⚡ Lazy loading support for app-specific translations
- 🪝 React hooks: `useLanguage`, `useTranslation`
- 🎨 **LanguageSwitcher** — three variants: buttons, select, icon-dropdown
- 🗺️ **CountryLanguageSelector** — re-exported, image or emoji flags, locale-aware URLs
- 🚀 Configurable API URL resolution for flexible backend integration

## Installation

```bash
pnpm add @asafarim/shared-i18n
# or: npm i @asafarim/shared-i18n
```

That is the only package you need. `@asafarim/country-language-selector` is a bundled dependency and re-exported for you.

## Quick Start

### 1. Initialize i18n

```tsx
// main.tsx
import { initI18n } from '@asafarim/shared-i18n';
import '@asafarim/shared-i18n/country-language-selector.css'; // if using CountryLanguageSelector

import enApp from './locales/en/app.json';
import nlApp from './locales/nl/app.json';

initI18n({
  defaultLanguage: 'en',
  defaultNS: 'common',
  ns: ['common', 'app'],
  resources: {
    en: { app: enApp },
    nl: { app: nlApp }
  }
});
```

### 2. Translate in components

```tsx
import { useTranslation } from '@asafarim/shared-i18n';

function MyComponent() {
  const { t } = useTranslation('app');
  return <h1>{t('welcome')}</h1>;
}
```

---

## LanguageSwitcher

Language-only switcher with cookie persistence.

```tsx
import { LanguageSwitcher } from '@asafarim/shared-i18n';

// Buttons
<LanguageSwitcher variant="buttons" />

// Select dropdown (no emoji)
<LanguageSwitcher variant="select" showEmoji={false} />

// Icon dropdown with flag emoji
<LanguageSwitcher variant="icon-dropdown" />

// Toggle between exactly 2 languages
<LanguageSwitcher variant="select" languages={['en', 'nl']} isToggler={true} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"buttons" \| "select" \| "icon-dropdown"` | `"buttons"` | UI variant |
| `languages` | `SupportedLanguage[]` | all supported | Subset of languages to show |
| `showEmoji` | `boolean` | `true` | Show flag emoji in select/icon variants |
| `showLabel` | `boolean` | `true` | Show language name label |
| `isToggler` | `boolean` | `true` | Renders as toggle when exactly 2 languages given |
| `onChanged` | `(lang: SupportedLanguage) => void` | — | Callback on language change |
| `unstyled` | `boolean` | `false` | Omit built-in styles |

### Limitation — country awareness

`LanguageSwitcher` emits only a language code (e.g. `"en"`). It cannot distinguish `be-en` from `gb-en`. For locale-aware URLs, use `resolveLocaleFromLanguage` as an adapter:

```tsx
import { LanguageSwitcher } from '@asafarim/shared-i18n';
import { resolveLocaleFromLanguage } from './i18n/localeAdapter';

<LanguageSwitcher
  variant="buttons"
  onChanged={(lang) => {
    const { locale, reason, message } = resolveLocaleFromLanguage(currentLocale, lang, countries);
    if (reason === 'fallback-country') showNotice(message);
    if (reason !== 'unsupported') navigate(locale);
  }}
/>
```

---

## CountryLanguageSelector

Country + language selector. Re-exported from `@asafarim/country-language-selector`.

```tsx
import {
  CountryLanguageSelector,
  type Country,
  type Locale,
} from '@asafarim/shared-i18n';

const countries: Country[] = [
  {
    code: 'BE', name: 'Belgium', nativeName: 'België', flag: '🇧🇪',
    languages: [
      { code: 'en', label: 'English', nativeLabel: 'English' },
      { code: 'nl', label: 'Dutch', nativeLabel: 'Nederlands' },
      { code: 'fr', label: 'French', nativeLabel: 'Français' },
    ]
  },
  {
    code: 'NL', name: 'Netherlands', nativeName: 'Nederland', flag: '🇳🇱',
    languages: [
      { code: 'nl', label: 'Dutch', nativeLabel: 'Nederlands' },
      { code: 'en', label: 'English', nativeLabel: 'English' },
    ]
  },
  {
    code: 'GB', name: 'United Kingdom', nativeName: 'United Kingdom', flag: '🇬🇧',
    languages: [
      { code: 'en', label: 'English', nativeLabel: 'English' },
    ]
  }
];

function LocaleBar({ locale, onLocaleChange }) {
  const { i18n } = useTranslation();
  return (
    <CountryLanguageSelector
      countries={countries}
      value={locale}
      onChange={(next) => {
        i18n.changeLanguage(next.language);
        onLocaleChange(next);
      }}
      triggerVariant="compact"
      flagMode="image"
    />
  );
}
```

### Key Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `countries` | `Country[]` | built-in list | Countries to offer |
| `value` | `Locale` | — | Controlled value |
| `defaultValue` | `Locale` | — | Uncontrolled initial value |
| `onChange` | `(locale, meta) => void` | — | Fired on every change |
| `triggerVariant` | `"compact" \| "full" \| "flag"` | `"compact"` | Trigger display |
| `flagMode` | `"emoji" \| "image"` | `"emoji"` | Flag rendering strategy |
| `align` | `"start" \| "end"` | `"end"` | Popover alignment |
| `renderTrigger` | `(ctx) => ReactNode` | — | Custom trigger render prop |
| `persistKey` | `string` | — | localStorage key (uncontrolled only) |

### Comparison: LanguageSwitcher vs CountryLanguageSelector

| Capability | LanguageSwitcher | CountryLanguageSelector |
|---|---|---|
| Changes i18n language | ✅ | ✅ via `locale.language` |
| Knows country | ❌ | ✅ |
| Represents `be-en` | ❌ | ✅ |
| Distinguishes `be-en` from `gb-en` | ❌ | ✅ |
| Best for localized URLs | ❌ needs adapter | ✅ |
| Best for translation-only apps | ✅ | optional |

---

## CSS Import

When using `CountryLanguageSelector`, import its stylesheet once in your entry point:

```tsx
import '@asafarim/shared-i18n/country-language-selector.css';
```

---

## More Languages

Add any language by including its JSON files:

```tsx
initI18n({
  ns: ['common', 'app'],
  resources: {
    en: { app: enApp },
    nl: { app: nlApp },
    fr: { app: frApp }
  },
  supportedLngs: ['en', 'nl', 'fr'],
  defaultLanguage: 'en'
});
```

---

## API Reference

### `initI18n(config?)`

| Param | Type | Description |
|-------|------|-------------|
| `defaultNS` | `string` | Default namespace (default: `'common'`) |
| `ns` | `string[]` | Namespaces to load |
| `resources` | object | App-specific translation resources |
| `supportedLngs` | `string[]` | Override supported languages |
| `defaultLanguage` | `string` | Fallback language code |

### `useLanguage()`

Returns `{ language, changeLanguage, isChanging }`.

### `useTranslation(ns?)`

Re-exported from react-i18next.

### `getApiUrl(envVarName?, defaultUrl?)`

Configurable API URL resolver.

---

## Cookie & Backend Integration

User language preference is persisted in a `preferredLanguage` cookie. To sync with a backend, set:

```env
VITE_IDENTITY_API_URL=https://your-identity.example.com
```

---

## Built-in Translations

Ships with English and Dutch for the `common` namespace. Supply your own resources via `initI18n` to override or extend.

## License

MIT © ASafariM
