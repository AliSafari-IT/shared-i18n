import type { Country } from '@asafarim/shared-i18n'

/** Benelux + United Kingdom — the scope for this demo. */
export const countries: Country[] = [
  {
    code: 'BE',
    name: 'Belgium',
    nativeName: 'België',
    flag: '🇧🇪',
    languages: [
      { code: 'en', label: 'English', nativeLabel: 'English' },
      { code: 'nl', label: 'Dutch', nativeLabel: 'Nederlands' },
      { code: 'fr', label: 'French', nativeLabel: 'Français' },
      { code: 'de', label: 'German', nativeLabel: 'Deutsch' }
    ]
  },
  {
    code: 'NL',
    name: 'Netherlands',
    nativeName: 'Nederland',
    flag: '��',
    languages: [
      { code: 'nl', label: 'Dutch', nativeLabel: 'Nederlands' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ]
  },
  {
    code: 'LU',
    name: 'Luxembourg',
    nativeName: 'Lëtzebuerg',
    flag: '🇱🇺',
    languages: [
      { code: 'lb', label: 'Luxembourgish', nativeLabel: 'Lëtzebuergesch' },
      { code: 'fr', label: 'French', nativeLabel: 'Français' },
      { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ]
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    nativeName: 'United Kingdom',
    flag: '��',
    languages: [
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ]
  }
]
