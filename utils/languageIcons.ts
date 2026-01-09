import type { SupportedLanguage } from '../config/i18n.js';

export const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  en: '🇬🇧',
  nl: '🇳🇱',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  it: '🇮🇹',
  pt: '🇵🇹',
};

export const getLanguageFlag = (lang: SupportedLanguage): string => {
  return LANGUAGE_FLAGS[lang] || '🌐';
};
