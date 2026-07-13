import { dailyOutput } from '../../data/dashboardData';

export default function DailyOutputChart({ target }) {
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
