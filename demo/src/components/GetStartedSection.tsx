import { useState } from 'react'
import { useTranslation } from '@asafarim/shared-i18n'

export default function GetStartedSection() {
  const { t } = useTranslation('demo')
  const [expandedStep, setExpandedStep] = useState<number>(0)
  const getStarted = t('getStarted', { returnObjects: true }) as any

  return (
    <div className="get-started-section">
      <div className="gs-header">
        <h2 className="gs-title">{getStarted.heading}</h2>
        <p className="gs-intro">{getStarted.intro}</p>
      </div>

      <div className="steps-container">
        {getStarted.steps.map((step: any, idx: number) => (
          <div key={idx} className="step-item">
            <button
              className={`step-header ${expandedStep === idx ? 'expanded' : ''}`}
              onClick={() => setExpandedStep(expandedStep === idx ? -1 : idx)}
            >
              <div className="step-number">{idx + 1}</div>
              <div className="step-info">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="step-toggle">
                {expandedStep === idx ? '−' : '+'}
              </div>
            </button>
            {expandedStep === idx && (
              <div className="step-content">
                <pre className="code-block">
                  <code>{step.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="tips-section">
        <div className="tips-icon">💡</div>
        <div className="tips-content">
          <h3>{getStarted.tips.title}</h3>
          <ul className="tips-list">
            {getStarted.tips.items.map((tip: string, idx: number) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
