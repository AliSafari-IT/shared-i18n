import React from 'react'
import ReactDOM from 'react-dom/client'
import { initI18n } from '@asafarim/shared-i18n'
import '@asafarim/shared-i18n/country-language-selector.css'
import App from './App'
import './index.css'
import enDemo from './locales/en/demo.json'
import nlDemo from './locales/nl/demo.json'
import frDemo from './locales/fr/demo.json'
import itDemo from './locales/it/demo.json'
import deDemo from './locales/de/demo.json'
import lbDemo from './locales/lb/demo.json'

initI18n({
  defaultLanguage: 'en',
  defaultNS: 'common',
  ns: ['common', 'demo'],
  resources: {
    en: { demo: enDemo },
    nl: { demo: nlDemo },
    fr: { demo: frDemo },
    it: { demo: itDemo },
    de: { demo: deDemo },
    lb: { demo: lbDemo }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
