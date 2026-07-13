export default function Sparkline({ values, tone = 'blue' }) {
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
