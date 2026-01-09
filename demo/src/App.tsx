import { useState } from 'react'
import { useTranslation } from '@asafarim/shared-i18n'
import LanguageBar from './components/LanguageBar'
import Panel from './components/Panel'
import KeyTable from './components/KeyTable'
import StatusCard from './components/StatusCard'
import OverviewSection from './components/OverviewSection'
import GetStartedSection from './components/GetStartedSection'
import LanguageSwitcherDemo from './components/LanguageSwitcherDemo'
import Logo from './components/Logo'

type TabType = 'overview' | 'getStarted' | 'demo'



export default function App() {
  const { t } = useTranslation('demo')
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  return (
    <div className="app-container">
      <header className="app-header">
        <Logo />
        <div className="header-content">
          <h1>{t('title')}</h1>
          <p className="subtitle">{t('subtitle')}</p>
        </div>
        <LanguageBar />
      </header>

      <main className="app-main">
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`nav-tab ${activeTab === 'getStarted' ? 'active' : ''}`}
            onClick={() => setActiveTab('getStarted')}
          >
            Get Started
          </button>
          <button
            className={`nav-tab ${activeTab === 'demo' ? 'active' : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            Demo
          </button>
        </div>

        {activeTab === 'overview' && <OverviewSection />}

        {activeTab === 'getStarted' && <GetStartedSection />}

        {activeTab === 'demo' && (
          <>
            <Panel title="LanguageSwitcher Component">
              <LanguageSwitcherDemo />
            </Panel>

            <Panel title="Translations">
              <div className="panel-grid">
                <div>
                  <h3>Common Namespace</h3>
                  <KeyTable
                    namespace="common"
                    keys={['welcome', 'language', 'apps.appName.identity', 'apps.description.identity']}
                  />
                </div>
                <div>
                  <h3>Identity Portal Namespace</h3>
                  <KeyTable
                    namespace="identityPortal"
                    keys={[
                      'navbar.admin-area',
                      'navbar.auth.signIn',
                      'navbar.auth.signOut',
                      'dashboard.title',
                      'dashboard.user-management.title'
                    ]}
                  />
                </div>
              </div>
            </Panel>

            <Panel title="Interpolation & Trans Component">
              <InterpolationDemo />
            </Panel>

            <StatusCard />
          </>
        )}
      </main>
    </div>
  )
}

function InterpolationDemo() {
  const { t, i18n } = useTranslation('identityPortal')

  return (
    <div className="interpolation-demo">
      <div className="demo-item">
        <h4>navbar.auth.welcome with interpolation</h4>
        <p className="demo-output">
          {t('navbar.auth.welcome', { userName: 'Ali' })}
        </p>
      </div>
      <div className="demo-item">
        <h4>Current language: {i18n.language}</h4>
      </div>
    </div>
  )
}
