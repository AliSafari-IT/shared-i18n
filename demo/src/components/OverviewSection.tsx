import { useTranslation } from '@asafarim/shared-i18n'

export default function OverviewSection() {
  const { t } = useTranslation('demo')
  const overview = t('overview', { returnObjects: true }) as any

  return (
    <div className="overview-section">
      <div className="overview-header">
        <h2 className="overview-title">{overview.heading}</h2>
        <p className="overview-description">{overview.description}</p>
      </div>

      <div className="overview-grid">
        <div className="feature-card">
          <div className="feature-icon">✨</div>
          <h3>{overview.features.title}</h3>
          <ul className="feature-list">
            {overview.features.items.map((item: string, idx: number) => (
              <li key={idx}>
                <span className="feature-dot">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>{overview.useCases.title}</h3>
          <ul className="feature-list">
            {overview.useCases.items.map((item: string, idx: number) => (
              <li key={idx}>
                <span className="feature-dot">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
