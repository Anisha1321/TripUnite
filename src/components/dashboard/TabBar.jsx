import { Icon } from "./Icons";

export default function TabBar({ tabs, active, onChange }) {
  return (
    <div
      className="tab-bar"
      style={{
        display: "flex",
        gap: 2,
        borderBottom: "1px solid var(--border)",
        marginBottom: 24,
        overflowX: "auto",
        /* hide scrollbar on mobile but keep scrollable */
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "10px 18px",
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            color: active === t.id ? "var(--accent-light)" : "var(--text-muted)",
            borderBottom: active === t.id ? "2px solid var(--accent)" : "2px solid transparent",
            marginBottom: -1,
            transition: "color .2s ease, border-color .2s ease",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <Icon d={t.icon} size={13} />
          {t.label}
          {t.count > 0 && (
            <span
              style={{
                fontSize: 10,
                background: active === t.id ? "rgba(29,158,117,.2)" : "rgba(255,255,255,.06)",
                color: active === t.id ? "var(--accent-light)" : "var(--text-muted)",
                borderRadius: 10,
                padding: "1px 6px",
              }}
            >
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}