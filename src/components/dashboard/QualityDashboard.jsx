import ModuleSection from './ModuleSection';

export default function QualityDashboard({ qualityForm, onChange }) {
  return (
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
              <input value={qualityForm.issueTitle} onChange={(event) => onChange('issueTitle', event.target.value)} />
            </label>
            <label>
              Responsible Owner
              <input value={qualityForm.owner} onChange={(event) => onChange('owner', event.target.value)} />
            </label>
            <label className="form-grid__full">
              Description
              <textarea value={qualityForm.description} onChange={(event) => onChange('description', event.target.value)} rows="4" />
            </label>
            <label>
              Priority Level
              <select value={qualityForm.priority} onChange={(event) => onChange('priority', event.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
            <label>
              Status
              <select value={qualityForm.status} onChange={(event) => onChange('status', event.target.value)}>
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
                onChange={(event) => onChange('completed', event.target.checked)}
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
            {[
              { title: 'Seal wear found at station 4', owner: 'A. Gomez', priority: 'High', status: 'In Progress', completed: false },
              { title: 'Label mismatch on batch 2408', owner: 'M. Patel', priority: 'Medium', status: 'Not Started', completed: false },
              { title: 'Packaging defect closed', owner: 'J. Chen', priority: 'Low', status: 'Completed', completed: true },
            ].map((issue) => (
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
  );
}
