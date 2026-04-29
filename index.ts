// Main exports
export { initI18n, SUPPORTED_LANGUAGES, LANGUAGE_NAMES, DEFAULT_LANGUAGE, LANGUAGE_COOKIE_NAME } from './config/i18n.js';
export type { SupportedLanguage, I18nConfig } from './config/i18n.js';

// Hooks
export { useLanguage } from './hooks/useLanguage.js';
export type { UseLanguageReturn } from './hooks/useLanguage.js';

// Utils
export {
  getLanguageFromCookie,
  setLanguageCookie,
  isSupportedLanguage,
  getBrowserLanguage,
  getInitialLanguage,
  updateUserLanguagePreference,
  fetchUserLanguagePreference
} from './utils/languageUtils.js';

// Components
export { LanguageSwitcher } from './components/LanguageSwitcher.js';
export type { LanguageSwitcherProps } from './components/LanguageSwitcher.js';

// Re-export react-i18next for convenience
export { useTranslation, Trans, Translation } from 'react-i18next';

// CountryLanguageSelector — re-exported so consumers only install @asafarim/shared-i18n
export {
  CountryLanguageSelector,
  defaultCountries,
  useCountryLanguage,
  filterCountries,
} from '@asafarim/country-language-selector';

export type {
  Country,
  Locale,
  Language,
  CountryCode,
  LanguageCode,
  CountryLanguageSelectorProps,
  LocaleChangeHandler,
  LocaleChangeMeta,
  RenderTriggerContext,
  SelectorStrings,
} from '@asafarim/country-language-selector';
