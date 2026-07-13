export default function ModuleSection({ eyebrow, title, description, action, children, className = '' }) {
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
