# @asafarim/shared-i18n Demo

Interactive demo for [@asafarim/shared-i18n](../README.md). Showcases **both** `LanguageSwitcher` and `CountryLanguageSelector` imported from a single package, with Benelux + UK locale-aware URL routing.

Live: [https://alisafari-it.github.io/shared-i18n/](https://alisafari-it.github.io/shared-i18n/)

## Local Development

```bash
# From workspace root — build the package first
pnpm install
pnpm run build          # builds @asafarim/shared-i18n (including CSS copy)

# Start the demo dev server
cd demo
pnpm run dev            # http://localhost:5173/shared-i18n/
```

## Demo Pages

### Overview (`/be-en/overview`)
- Hero with live locale / URL preview
- Two-column feature comparison between `LanguageSwitcher` and `CountryLanguageSelector`
- Routing contract explanation

### Get Started (`/be-en/get-started`)
- Step-by-step guide: install → CSS import → `initI18n` → add both selectors
- Code snippets for `resolveLocaleFromLanguage` adapter pattern
- Pro tips

### Language Switchers (`/be-en/language-switchers`)
All six `LanguageSwitcher` variants with live `resolveLocaleFromLanguage` wiring:
- Buttons, select, icon-dropdown (all / limited languages)
- Icon-dropdown with labels
- Toggle button (2 languages)
- **Comparison table** and country-awareness explanation
- Inline notice when language falls back to a different country

### Country Language Selectors (`/be-en/country-language-selectors`)
All `CountryLanguageSelector` variants controlled by the same locale:
- Image flags / emoji flags × compact / full / flag-only triggers
- Custom `renderTrigger` render prop example
- Popover `align="start"` variant
- Live status bar (country, language, slug, URL)

### Routing Lab (`/be-en/routing-lab`)
Side-by-side demo:
- Left: `LanguageSwitcher` + `resolveLocaleFromLanguage` adapter with fallback notices
- Right: `CountryLanguageSelector` direct full-locale output
- Scripted scenario cards that apply predefined transitions

## Countries Covered

| Code | Country | Languages |
|------|---------|-----------|
| BE | Belgium | en, nl, fr, de |
| NL | Netherlands | nl, en |
| LU | Luxembourg | lb, fr, de, en |
| GB | United Kingdom | en |

## URL Structure

```
/shared-i18n/<country-lower>-<language-lower>/<page>

Examples:
  /shared-i18n/be-en/overview
  /shared-i18n/nl-nl/language-switchers
  /shared-i18n/lu-fr/country-language-selectors
  /shared-i18n/gb-en/routing-lab
```

Changing locale preserves the active page; changing page preserves the active locale. Invalid slugs fall back to `be-en/overview`.

## Architecture

```
demo/src/
├── App.tsx                          # URL-driven router, locale ↔ i18n sync
├── main.tsx                         # initI18n + CSS import
├── index.css                        # Premium app-shell design
├── data/
│   └── countries.ts                 # Benelux + UK country list (Country[])
├── i18n/
│   ├── localeRouting.ts             # DemoPage type, slug helpers, parsePathname
│   └── localeAdapter.ts             # resolveLocaleFromLanguage helper
├── components/
│   ├── LanguageBar.tsx              # Navbar: two CLS controls, theme toggle
│   ├── OverviewSection.tsx          # Overview feature cards
│   ├── GetStartedSection.tsx        # Accordion steps
│   ├── LanguageSwitchersPage.tsx    # All LanguageSwitcher variants + comparison table
│   ├── CountryLanguageSelectorsPage.tsx  # All CLS variants
│   ├── RoutingLabPage.tsx           # Side-by-side LS vs CLS routing demo
│   ├── KeyTable.tsx                 # Translation key inspector
│   ├── StatusCard.tsx               # i18n live status
│   └── Logo.tsx                     # Brand logo
└── locales/
    ├── en/demo.json
    ├── nl/demo.json
    ├── fr/demo.json
    ├── de/demo.json
    └── it/demo.json
```

## Key Technologies

- **React 19** + **TypeScript**
- **Vite 6** — build tool and dev server
- **i18next** + **react-i18next** — translation engine
- **@asafarim/shared-i18n** — LanguageSwitcher, CountryLanguageSelector, all hooks
- **@asafarim/design-tokens** — Design system

## GitHub Pages Deployment

The demo uses a `public/404.html` + `index.html` script pattern to handle SPA deep links on GitHub Pages. See those files for the implementation.

## License

MIT
