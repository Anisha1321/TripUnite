import Icon from "./Icon";

/* ─── FormSection wrapper ─── */
export const FormSection = ({ icon, title, children, className = "" }) => (
  <div className={`card ${className}`} style={{ padding: "24px" }}>
    <div className="section-title">
      <span style={{ color: "var(--green-light)" }}>
        <Icon name={icon} size={15} />
      </span>
      {title}
    </div>
    {children}
  </div>
);

/* ─── Field wrapper ─── */
export const Field = ({ label, children, half }) => (
  <div className={half ? "field-half" : ""} style={{ flex: half ? "1 1 calc(50% - 8px)" : "1 1 100%" }}>
    <label className="label">{label}</label>
    {children}
  </div>
);