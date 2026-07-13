import DailyOutputChart from '../charts/DailyOutputChart';
import RingChart from '../charts/RingChart';
import ModuleSection from './ModuleSection';

export default function ProductivityDashboard({ productionTarget, mhpTarget, onProductionTargetChange, onMhpTargetChange }) {
  const productivityKpis = [
    { label: 'FOLG', value: 92, target: 100, accent: 'cyan' },
    { label: 'LP', value: 87, target: 100, accent: 'blue' },
    { label: 'HPC', value: 95, target: 100, accent: 'navy' },
  ];

  const yieldRows = [
    { label: 'FOLG', mtd: '96.4%', ytd: '95.7%' },
    { label: 'LP', mtd: '94.2%', ytd: '93.6%' },
    { label: 'HPC', mtd: '97.1%', ytd: '96.5%' },
  ];

  return (
    <ModuleSection
      className="module-panel--productivity"
      eyebrow="Productivity module"
      title="Production performance and yield analysis in one place."
      description="Track output, MHP, daily trends, and yield against configurable targets."
      action={<span className="status-pill status-pill--blue">Target ready</span>}
    >
      <div className="dashboard-grid dashboard-grid--productivity">
        <article className="card card--wide hero-card hero-card--productivity">
          <div className="hero-card__copy">
            <p className="eyebrow">Production output</p>
            <h3>MTD performance compared with a configurable target.</h3>
            <p>
              Track FOLG, LP, and HPC with progress visuals, output trends, and yield metrics aligned to operational goals.
            </p>
          </div>
          <div className="target-stack">
            <div className="target-chip">
              <span>Configured target</span>
              <strong>{productionTarget} units/day</strong>
            </div>
            <label className="target-control">
              <span>Adjust daily output target</span>
              <input
                type="range"
                min="70"
                max="140"
                step="1"
                value={productionTarget}
                onChange={(event) => onProductionTargetChange(Number(event.target.value))}
              />
            </label>
          </div>
        </article>

        {productivityKpis.map((kpi) => (
          <article key={kpi.label} className="card metric-card metric-card--compact">
            <RingChart value={kpi.value} target={kpi.target} label={kpi.label} accent={kpi.accent} />
          </article>
        ))}

        <article className="card panel-card card--wide">
          <div className="panel-card__header">
            <h3>MHP monitoring</h3>
            <span className="status-pill status-pill--blue">Target ready</span>
          </div>
          <div className="mhp-grid">
            <div>
              <p>Current MHP</p>
              <strong>1.72</strong>
            </div>
            <div>
              <p>Target</p>
              <strong>{mhpTarget}</strong>
            </div>
            <div>
              <p>Trend</p>
              <strong>Improving</strong>
            </div>
          </div>
          <div className="progress-track progress-track--large">
            <span style={{ width: '86%' }} />
          </div>
          <label className="target-control target-control--inline">
            <span>Adjust MHP target</span>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              value={mhpTarget}
              onChange={(event) => onMhpTargetChange(Number(event.target.value))}
            />
          </label>
        </article>

        <DailyOutputChart target={productionTarget} />

        <article className="card panel-card card--wide">
          <div className="panel-card__header">
            <h3>Yield metrics</h3>
            <span className="status-pill status-pill--good">MTD and YTD</span>
          </div>
          <div className="yield-table">
            <div className="yield-table__head">
              <span>Line</span>
              <span>MTD Yield</span>
              <span>YTD Yield</span>
            </div>
            {yieldRows.map((row) => (
              <div key={row.label} className="yield-table__row">
                <strong>{row.label}</strong>
                <span>{row.mtd}</span>
                <span>{row.ytd}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </ModuleSection>
  );
}
