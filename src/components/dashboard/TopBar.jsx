export default function TopBar({ date, time, activeLabel, title }) {
  return (
    <header className="topbar">
      <div>
        <p className="topbar__label">Current Date</p>
        <strong>{date}</strong>
      </div>

      <div className="topbar__center">
        <p className="eyebrow">{activeLabel}</p>
        <h2>{title}</h2>
      </div>

      <div className="topbar__time">
        <p className="topbar__label">Current Time</p>
        <strong>{time}</strong>
      </div>
    </header>
  );
}
