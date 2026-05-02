export default function ProfileProgress({ pct = 70 }) {
  return (
    <div
      className="card profile-progress-row"
      style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Profile completion</span>
          <span style={{ fontSize: 13, color: "var(--accent-light)", fontWeight: 400 }}>{pct}%</span>
        </div>
        <div
          style={{
            height: 4,
            borderRadius: 4,
            background: "rgba(255,255,255,.07)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 4,
              width: `${pct}%`,
              background: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
              transition: "width 1s ease",
            }}
          />
        </div>
      </div>
      <button className="btn-outline" style={{ padding: "6px 14px", fontSize: 12, flexShrink: 0 }}>
        Complete profile
      </button>
    </div>
  );
}