import React from 'react'
import ReactDOM from 'react-dom/client'
import { initI18n } from '@asafarim/shared-i18n'
import App from './App'
import './index.css'
import enDemo from './locales/en/demo.json'
import nlDemo from './locales/nl/demo.json'
import frDemo from './locales/fr/demo.json'

initI18n({
  defaultNS: 'common',
  ns: ['common', 'demo'],
  resources: {
    en: { demo: enDemo },
    nl: { demo: nlDemo },
    fr: { demo: frDemo }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
