import Sparkline from '../charts/Sparkline';
import ModuleSection from './ModuleSection';

export default function SupplyDashboard({ metrics, trend }) {
  return (
    <ModuleSection
      eyebrow="Supply module"
      title="Near miss, good catch, and incident trends in one view."
      description="The dashboard surface is designed for quick action, with KPI state, recent movement, and trend visibility."
      action={<span className="status-pill status-pill--blue">Open items tracked</span>}
    >
      <div className="dashboard-grid dashboard-grid--supply">
        <div className="hero-card card card--wide">
          <div className="hero-card__copy">
            <p className="eyebrow">Supply performance</p>
            <h3>Performance trend overview</h3>
            <p>
              Track near miss, good catch, and incident movement in a layout that keeps the signal clear.
            </p>
          </div>
          <div className="hero-card__chart">
            <Sparkline values={trend} tone="blue" />
            <span className="hero-card__trend">12 week trend</span>
          </div>
        </div>

        {metrics.map((metric) => (
          <article key={metric.label} className={`card metric-card metric-card--${metric.tone}`}>
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.delta} vs last period</span>
          </article>
        ))}

        <article className="card panel-card">
          <div className="panel-card__header">
            <h3>Trend analysis</h3>
            <span className="status-pill status-pill--blue">Open items tracked</span>
          </div>
          <div className="progress-list">
            {[
              ['Near Miss', 74],
              ['Good Catch', 88],
              ['Incident Closure', 62],
            ].map(([label, value]) => (
              <div key={label} className="progress-row">
                <div>
                  <strong>{label}</strong>
                  <span>{value}% completion</span>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="card panel-card">
          <div className="panel-card__header">
            <h3>Status indicators</h3>
            <span className="status-pill status-pill--good">Live</span>
          </div>
          <ul className="status-list">
            <li><span>Near Miss</span><strong>18 active</strong></li>
            <li><span>Good Catch</span><strong>42 active</strong></li>
            <li><span>Incidents</span><strong>6 open</strong></li>
          </ul>
        </article>
      </div>
    </ModuleSection>
  );
}
