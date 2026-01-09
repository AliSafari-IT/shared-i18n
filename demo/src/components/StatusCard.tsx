import { useState, useEffect } from 'react'
import {
  useTranslation,
  SUPPORTED_LANGUAGES,
  LANGUAGE_NAMES,
  LANGUAGE_COOKIE_NAME,
  getLanguageFromCookie,
  getInitialLanguage,
  updateUserLanguagePreference,
  isSupportedLanguage
} from '@asafarim/shared-i18n'
import Panel from './Panel'

export default function StatusCard() {
  const { t, i18n } = useTranslation('demo')
  const [cookieValue, setCookieValue] = useState<string | null>(null)
  const [initialLang, setInitialLang] = useState<string>('')
  const [syncResult, setSyncResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    setCookieValue(getLanguageFromCookie())
    setInitialLang(getInitialLanguage())
  }, [i18n.language])

  const backendUrl = import.meta.env.VITE_IDENTITY_API_URL || 'not set'

  const handleSync = async () => {
    setIsSyncing(true)
    setSyncResult(null)
    try {
      const currentLanguage = i18n.language
      if (isSupportedLanguage(currentLanguage)) {
        await updateUserLanguagePreference(currentLanguage)
      } else {
        throw new Error(`Unsupported language: ${currentLanguage}`)
      }
      setSyncResult({
        type: 'success',
        message: t('status.resultOk')
      })
    } catch (error) {
      setSyncResult({
        type: 'error',
        message: `${t('status.resultFail')}: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <Panel title={t('status.heading')}>
      <div className="status-grid">
        <div className="status-card">
          <h4>Current Language</h4>
          <p>{i18n.language}</p>
        </div>

        <div className="status-card">
          <h4>{t('status.cookie')}</h4>
          <p>
            <strong>Name:</strong> {LANGUAGE_COOKIE_NAME}
          </p>
          <p>
            <strong>Value:</strong> {cookieValue || '(not set)'}
          </p>
        </div>

        <div className="status-card">
          <h4>Initial Language</h4>
          <p>{initialLang}</p>
        </div>

        <div className="status-card">
          <h4>Supported Languages</h4>
          <ul className="status-list">
            {SUPPORTED_LANGUAGES.map((lang: string) => (
              <li key={lang}>
                {lang}: {LANGUAGE_NAMES[lang as keyof typeof LANGUAGE_NAMES]}
              </li>
            ))}
          </ul>
        </div>

        <div className="status-card">
          <h4>{t('status.backend')}</h4>
          <p>{backendUrl}</p>
        </div>

        <div className="status-card">
          <h4>Backend Sync</h4>
          <button
            className="sync-button"
            onClick={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? 'Syncing...' : t('status.simulate')}
          </button>
          {syncResult && (
            <div className={`sync-result ${syncResult.type}`}>
              {syncResult.message}
            </div>
          )}
        </div>
      </div>
    </Panel>
  )
}
