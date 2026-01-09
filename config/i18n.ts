import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import common translations
import enCommon from '../locales/en/common.json';
import nlCommon from '../locales/nl/common.json';

// Import identity-portal translations
import enIdentityPortal from '../locales/en/identity-portal.json';
import nlIdentityPortal from '../locales/nl/identity-portal.json';

export const LANGUAGE_CONFIGS = [{ code: 'en', name: 'English', emoji: '🌍' }, { code: 'nl', name: 'Nederlands', emoji: '🇳🇱' }, { code: 'fr', name: 'Français', emoji: '🇫🇷' }, { code: 'de', name: 'Deutsch', emoji: '🇩🇪' }, { code: 'es', name: 'Español', emoji: '🇪🇸' }, { code: 'it', name: 'Italiano', emoji: '🇮🇹' }, { code: 'pt', name: 'Português', emoji: '🇵🇹' }] as const;
export type SupportedLanguage = typeof LANGUAGE_CONFIGS[number]['code'];
export const SUPPORTED_LANGUAGES = LANGUAGE_CONFIGS.map(config => config.code) as readonly SupportedLanguage[];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = Object.fromEntries(
  LANGUAGE_CONFIGS.map(config => [config.code, config.name])
) as Record<SupportedLanguage, string>;

export const LANGUAGE_EMOJIS: Record<SupportedLanguage, string> = Object.fromEntries(
  LANGUAGE_CONFIGS.map(config => [config.code, config.emoji])
) as Record<SupportedLanguage, string>;

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
export const LANGUAGE_COOKIE_NAME = 'preferredLanguage';

export interface I18nConfig {
  defaultNS?: string;
  ns?: string[];
  resources?: Record<string, Record<string, any>>;
  supportedLngs?: string[];
  defaultLanguage?: string;
}

export const initI18n = (config?: I18nConfig) => {
  const resources = config?.resources;
  const supportedLngs = config?.supportedLngs;
  const defaultLanguage = config?.defaultLanguage;
  const defaultNS = config?.defaultNS;
  const ns = config?.ns;

  // const {
  //   defaultNS = 'common',
  //   ns = ['common', 'identityPortal'],
  //   resources,
  //   supportedLngs,
  //   defaultLanguage,
  // } = config || {};

  // Merge common translations with app-specific resources
  const mergedResources: Record<string, Record<string, any>> = { ...config?.resources };

  mergedResources.en = {
    common: enCommon,
    identityPortal: enIdentityPortal,
    ...(resources?.en || {}),
  };
  mergedResources.nl = {
    common: nlCommon,
    identityPortal: nlIdentityPortal,
    ...(resources?.nl || {}),
  };

  const finalSupportedLngs = supportedLngs ?? Object.keys(mergedResources);
  const fallbackLng = defaultLanguage ?? DEFAULT_LANGUAGE;

  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources: mergedResources,
      fallbackLng,
      defaultNS,
      ns,
      supportedLngs: finalSupportedLngs,
      detection: {
        order: ['cookie', 'navigator'],
        caches: ['cookie'],
        lookupCookie: LANGUAGE_COOKIE_NAME
      },
      interpolation: {
        escapeValue: false // React already escapes
      },
      react: {
        useSuspense: false
      }
    });

  return i18n;
};

export default i18n;
