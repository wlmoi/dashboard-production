export default function Sidebar({ modules, activeModule, onSelectModule }) {
  return (
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
              onClick={() => onSelectModule(module.id)}
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
  );
}
