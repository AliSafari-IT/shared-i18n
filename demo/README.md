# @asafarim/shared-i18n Demo

A comprehensive interactive demo application showcasing the features of [@asafarim/shared-i18n](../README.md) and its integration with [@asafarim/country-language-selector](https://www.npmjs.com/package/@asafarim/country-language-selector).

## Live Demo

View the demo online at: [https://alisafari-it.github.io/shared-i18n/](https://alisafari-it.github.io/shared-i18n/)

## Local Development

### Prerequisites

- Node.js 18+
- pnpm 10+

### Setup

```bash
# From the root directory
pnpm install

# Build the shared-i18n package
pnpm run build

# Navigate to demo and start dev server
cd demo
pnpm run dev
```

The demo will be available at `http://localhost:5173/shared-i18n/`

### Build

```bash
pnpm run build
```

Output files are generated in `dist/`

## Demo Features

### Tab 1: Overview

Highlights the key features and use cases of shared-i18n:
- Multi-language support with cookie persistence
- Built-in language detection and fallback
- TypeScript support with full type safety
- Seamless integration with react-i18next

### Tab 2: Get Started

Step-by-step guide to integrate shared-i18n into your React application:
1. Install the package
2. Initialize i18n in your app
3. Use the `useLanguage` hook
4. Translate with `useTranslation`
5. Leverage cookie persistence
6. Optional backend synchronization

Includes code examples and pro tips for each step.

### Tab 3: Demo

Live examples of the `LanguageSwitcher` component:
- **Buttons Variant** — Individual language buttons
- **Select Dropdown** — Native HTML dropdown
- **Icon Dropdown** — Compact flag emoji selector
- **Toggle Button** — For exactly 2 languages
- **Limited Languages** — Filter languages per component
- **Translations Panel** — View actual translations from common and identity-portal namespaces
- **Interpolation & Trans Component** — Dynamic string interpolation examples

### Tab 4: Country Selector

Live examples of the `CountryLanguageSelector` component:
- **Default Selector** — Standard country/language picker with compact mode
- **Full Trigger Variant** — Display full country and language names
- **Custom Trigger** — Implement your own button styling and layout

### Header Features

- **Country/Language Selector** — In the header, select from Belgium, Switzerland, and Canada
- **Language Support** — English, Dutch, French, German, Italian (6+ languages total)
- **Dark/Light Theme Toggle** — Accessible theme switching
- **Links** — GitHub and NPM package links

## Supported Languages

The demo includes translations for:
- 🇬🇧 English (en)
- 🇳🇱 Dutch (nl)
- 🇫🇷 French (fr)
- 🇩🇪 German (de)
- 🇮🇹 Italian (it)

Language selection persists to localStorage automatically.

## Project Structure

```
demo/
├── src/
│   ├── components/
│   │   ├── LanguageSwitcherDemo.tsx        # Shared-i18n examples
│   │   ├── CountryLanguageDemo.tsx         # Country selector examples
│   │   ├── LanguageBar.tsx                 # Header with country selector
│   │   ├── OverviewSection.tsx             # Overview tab
│   │   ├── GetStartedSection.tsx           # Get started tab
│   │   ├── Panel.tsx                       # Reusable panel wrapper
│   │   ├── KeyTable.tsx                    # Translations table
│   │   └── StatusCard.tsx                  # Language sync status
│   ├── locales/
│   │   ├── en/demo.json
│   │   ├── nl/demo.json
│   │   ├── fr/demo.json
│   │   ├── de/demo.json
│   │   └── it/demo.json
│   ├── App.tsx                             # Main app with tabs
│   ├── main.tsx                            # Entry point
│   └── index.css                           # Global styles
├── package.json
└── vite.config.ts
```

## Key Technologies

- **React 19** — UI library
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **i18next** — Translation engine
- **react-i18next** — React bindings for i18next
- **ASafariM Design Tokens** — Design system styling

## Related Packages

- [@asafarim/shared-i18n](../README.md) — Core i18n package
- [@asafarim/country-language-selector](https://www.npmjs.com/package/@asafarim/country-language-selector) — Country/language selector component
- [@asafarim/design-tokens](https://www.npmjs.com/package/@asafarim/design-tokens) — Design system

## License

MIT

## Support

For issues or questions about the shared-i18n package, see the [main README](../README.md).

For issues specific to the country-language-selector, see its [documentation](https://alisafari-it.github.io/country-language-switch/).
