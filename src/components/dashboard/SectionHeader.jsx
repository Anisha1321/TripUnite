export default function SectionHeader({ title, count }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20 }}>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 300,
          fontSize: 22,
          letterSpacing: "-.4px",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h2>
      {count !== undefined && (
        <span
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            background: "rgba(255,255,255,.05)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: "1px 8px",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}