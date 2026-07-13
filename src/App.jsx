import { useEffect, useMemo, useState } from 'react';
import './App.css';

const modules = [
  {
    id: 'supply',
    label: 'Supply Dashboard',
    title: 'Real-time supply monitoring',
    description: 'Near miss, good catch, and incident tracking with status visibility.',
  },
  {
    id: 'quality',
    label: 'Quality Dashboard',
    title: 'Structured quality issue control',
    description: 'Capture material and product issues with owners, priority, and actions.',
  },
  {
    id: 'productivity',
    label: 'Productivity Dashboard',
    title: 'Production performance and yield analysis',
    description: 'Track output, MHP, daily trends, and yield against configurable targets.',
  },
];

const supplyMetrics = [
  { label: 'Near Miss', value: 18, delta: '+12%', tone: 'good' },
  { label: 'Good Catch', value: 42, delta: '+8%', tone: 'blue' },
  { label: 'Incidents', value: 6, delta: '-3%', tone: 'warn' },
];

const supplyTrend = [18, 22, 20, 26, 30, 35, 33, 38, 41, 45, 47, 52];

const qualityIssues = [
  {
    title: 'Seal wear found at station 4',
    owner: 'A. Gomez',
    priority: 'High',
    status: 'In Progress',
    completed: false,
  },
  {
    title: 'Label mismatch on batch 2408',
    owner: 'M. Patel',
    priority: 'Medium',
    status: 'Not Started',
    completed: false,
  },
  {
    title: 'Packaging defect closed',
    owner: 'J. Chen',
    priority: 'Low',
    status: 'Completed',
    completed: true,
  },
];

const productivityKpis = [
  { label: 'FOLG', value: 92, target: 100, accent: 'cyan' },
  { label: 'LP', value: 87, target: 100, accent: 'blue' },
  { label: 'HPC', value: 95, target: 100, accent: 'navy' },
];

const dailyOutput = [
  { day: 'Mon', value: 88 },
  { day: 'Tue', value: 97 },
  { day: 'Wed', value: 92 },
  { day: 'Thu', value: 102 },
  { day: 'Fri', value: 94 },
  { day: 'Sat', value: 86 },
  { day: 'Sun', value: 101 },
];

const yieldRows = [
  { label: 'FOLG', mtd: '96.4%', ytd: '95.7%' },
  { label: 'LP', mtd: '94.2%', ytd: '93.6%' },
  { label: 'HPC', mtd: '97.1%', ytd: '96.5%' },
];

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(date)
    .replace(/\b([a-z])/, (match) => match.toUpperCase())
    .toUpperCase();

const formatTime = (date) =>
  [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((part) => String(part).padStart(2, '0'))
    .join('-');

function Sparkline({ values, tone = 'blue' }) {
  const width = 180;
  const height = 56;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const range = max - min || 1;
      const y = height - ((value - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`sparkline sparkline--${tone}`} aria-hidden="true">
      <polyline points={points} />
    </svg>
  );
}

function RingChart({ value, target, label, accent }) {
  const percent = Math.min(100, Math.round((value / target) * 100));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="ring-card">
      <svg viewBox="0 0 120 120" className={`ring ring--${accent}`} aria-hidden="true">
        <circle cx="60" cy="60" r={radius} />
        <circle cx="60" cy="60" r={radius} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <div className="ring-card__content">
        <strong>{label}</strong>
        <span>{percent}% to target</span>
      </div>
    </div>
  );
}

function DailyOutputChart({ target }) {
  const max = Math.max(...dailyOutput.map((item) => item.value), 110);
  const width = 520;
  const height = 240;
  const padding = 24;
  const plotHeight = height - padding * 2;
  const plotWidth = width - padding * 2;
  const targetY = height - padding - (target / max) * plotHeight;

  return (
    <div className="chart-panel">
      <div className="chart-panel__heading">
        <div>
          <h3>Daily Output Graph</h3>
          <p>Red line shows the minimum required target.</p>
        </div>
        <div className="chart-legend">
          <span className="chart-badge">Target {target} MT</span>
          <span className="chart-legend__item">
            <i className="chart-legend__swatch chart-legend__swatch--target" />
            Below target
          </span>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="daily-chart" role="img" aria-label="Daily production output chart">
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#46a3ff" />
            <stop offset="100%" stopColor="#0f72d8" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((step) => {
          const y = padding + (plotHeight / 4) * step;
          return <line key={step} x1={padding} y1={y} x2={width - padding} y2={y} className="grid-line" />;
        })}
        {dailyOutput.map((item, index) => {
          const barWidth = plotWidth / dailyOutput.length - 14;
          const gap = plotWidth / dailyOutput.length;
          const barHeight = ((item.value / max) * plotHeight) * 0.95;
          const x = padding + index * gap + 6;
          const y = height - padding - barHeight;
          const belowTarget = item.value < target;

          return (
            <g key={item.day}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="10"
                className={belowTarget ? 'bar bar--below' : 'bar'}
              />
              <text x={x + barWidth / 2} y={height - 8} textAnchor="middle" className="chart-label">
                {item.day}
              </text>
              <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" className="chart-value">
                {item.value}
              </text>
            </g>
          );
        })}
        <line x1={padding} y1={targetY} x2={width - padding} y2={targetY} className="target-line" />
        <text x={width - padding} y={targetY - 8} textAnchor="end" className="target-label">
          Target {target} MT
        </text>
      </svg>
    </div>
  );
}

function ModuleSection({ eyebrow, title, description, action, children, className = '' }) {
  return (
    <section className={`module-panel ${className}`.trim()}>
      <div className="module-panel__header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h3>{title}</h3>
          <p className="module-panel__description">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function App() {
  const [activeModule, setActiveModule] = useState('supply');
  const [now, setNow] = useState(() => new Date());
  const [productionTarget, setProductionTarget] = useState(100);
  const [mhpTarget, setMhpTarget] = useState(1.8);
  const [qualityForm, setQualityForm] = useState({
    issueTitle: 'Valve inspection overdue',
    description: 'Create a follow-up record for the missing inspection cycle.',
    owner: 'S. Rivera',
    priority: 'High',
    status: 'In Progress',
    completed: false,
  });

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const stats = useMemo(
    () => ({
      date: formatDate(now),
      time: formatTime(now),
    }),
    [now],
  );

  const activeLabel = modules.find((module) => module.id === activeModule)?.label ?? '';

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="sidebar__inner">
          <div>
            <p className="eyebrow">SQP Control Center</p>
            <h1>Real-Time Monitoring Dashboard</h1>
            <p className="sidebar__copy">
              Blue-themed enterprise monitoring for supply, quality, and productivity operations.
            </p>
          </div>

          <nav className="module-nav" aria-label="Dashboard sections">
            {modules.map((module) => (
              <button
                key={module.id}
                type="button"
                className={`module-nav__item ${activeModule === module.id ? 'is-active' : ''}`}
                onClick={() => setActiveModule(module.id)}
              >
                <span>{module.label}</span>
                <small>{module.description}</small>
              </button>
            ))}
          </nav>

          <div className="sidebar__foot">
            <span className="status-pill status-pill--good">SharePoint Excel Connected</span>
            <span className="status-pill status-pill--blue">Auto refresh ready</span>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-main__inner">
          <header className="topbar">
            <div>
              <p className="topbar__label">Current Date</p>
              <strong>{stats.date}</strong>
            </div>

            <div className="topbar__center">
              <p className="eyebrow">{activeLabel}</p>
              <h2>{modules.find((module) => module.id === activeModule)?.title}</h2>
            </div>

            <div className="topbar__time">
              <p className="topbar__label">Current Time</p>
              <strong>{stats.time}</strong>
            </div>
          </header>

          {activeModule === 'supply' && (
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
                    <Sparkline values={supplyTrend} tone="blue" />
                    <span className="hero-card__trend">12 week trend</span>
                  </div>
                </div>

                {supplyMetrics.map((metric) => (
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
          )}

          {activeModule === 'quality' && (
            <ModuleSection
              className="module-panel--quality"
              eyebrow="Quality module"
              title="Structured issue capture with accountable ownership."
              description="Capture material and product issues with clear status, priority, and corrective action tracking."
              action={<span className="status-pill status-pill--warn">Issue intake</span>}
            >
              <div className="dashboard-grid dashboard-grid--quality">
                <article className="card card--form">
                  <div className="panel-card__header">
                    <h3>Material Under QE</h3>
                    <span className="status-pill status-pill--warn">Issue intake</span>
                  </div>
                  <div className="form-grid">
                    <label>
                      Issue Title
                      <input value={qualityForm.issueTitle} onChange={(event) => setQualityForm({ ...qualityForm, issueTitle: event.target.value })} />
                    </label>
                    <label>
                      Responsible Owner
                      <input value={qualityForm.owner} onChange={(event) => setQualityForm({ ...qualityForm, owner: event.target.value })} />
                    </label>
                    <label className="form-grid__full">
                      Description
                      <textarea value={qualityForm.description} onChange={(event) => setQualityForm({ ...qualityForm, description: event.target.value })} rows="4" />
                    </label>
                    <label>
                      Priority Level
                      <select value={qualityForm.priority} onChange={(event) => setQualityForm({ ...qualityForm, priority: event.target.value })}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </label>
                    <label>
                      Status
                      <select value={qualityForm.status} onChange={(event) => setQualityForm({ ...qualityForm, status: event.target.value })}>
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </label>
                    <label className="toggle-row form-grid__full">
                      <span>Mark completion</span>
                      <input
                        type="checkbox"
                        checked={qualityForm.completed}
                        onChange={(event) => setQualityForm({ ...qualityForm, completed: event.target.checked })}
                      />
                    </label>
                  </div>
                </article>

                <article className="card card--form">
                  <div className="panel-card__header">
                    <h3>Product Under QE</h3>
                    <span className="status-pill status-pill--blue">Structured form</span>
                  </div>
                  <div className="form-summary">
                    <div>
                      <span>Issue title</span>
                      <strong>{qualityForm.issueTitle}</strong>
                    </div>
                    <div>
                      <span>Owner</span>
                      <strong>{qualityForm.owner}</strong>
                    </div>
                    <div>
                      <span>Priority</span>
                      <strong>{qualityForm.priority}</strong>
                    </div>
                    <div>
                      <span>Status</span>
                      <strong>{qualityForm.completed ? 'Completed' : qualityForm.status}</strong>
                    </div>
                  </div>
                  <div className="inline-check">
                    <span>Completion toggle</span>
                    <label className="switch">
                      <input type="checkbox" checked={qualityForm.completed} readOnly />
                      <span />
                    </label>
                  </div>
                </article>

                <article className="card panel-card card--wide">
                  <div className="panel-card__header">
                    <h3>Quality issue tracker</h3>
                    <span className="status-pill status-pill--good">User-friendly records</span>
                  </div>
                  <div className="issue-list">
                    {qualityIssues.map((issue) => (
                      <div key={issue.title} className="issue-row">
                        <div>
                          <strong>{issue.title}</strong>
                          <span>{issue.owner}</span>
                        </div>
                        <div className="issue-row__meta">
                          <span className={`badge badge--${issue.priority.toLowerCase()}`}>{issue.priority}</span>
                          <span className={`badge badge--${issue.completed ? 'completed' : 'progress'}`}>{issue.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </ModuleSection>
          )}

          {activeModule === 'productivity' && (
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
                        onChange={(event) => setProductionTarget(Number(event.target.value))}
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
                      onChange={(event) => setMhpTarget(Number(event.target.value))}
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
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
