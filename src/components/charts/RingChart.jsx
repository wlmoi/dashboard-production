export default function RingChart({ value, target, label, accent }) {
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
