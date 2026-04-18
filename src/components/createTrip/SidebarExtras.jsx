const TIPS = [
  "High-quality cover images boost bookings by 3×",
  "Detailed itineraries build trust with travelers",
  "Clear inclusions reduce cancellations",
];

const TRACKED_FIELDS = [
  "title",
  "destination",
  "tripType",
  "description",
  "startDate",
  "endDate",
  "price",
  "seats",
];

const SidebarExtras = ({ form }) => {
  const completeness = Math.round(
    (TRACKED_FIELDS.filter((k) => Boolean(form[k])).length / TRACKED_FIELDS.length) * 100
  );

  return (
    <>
      {/* Tips card */}
      <div
        style={{
          marginTop: 16,
          padding: "16px",
          background: "rgba(29,158,117,0.05)",
          border: "1px solid rgba(29,158,117,0.15)",
          borderRadius: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--green-light)",
            marginBottom: 10,
          }}
        >
          💡 Tips
        </div>
        {TIPS.map((tip, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 8, marginBottom: i < TIPS.length - 1 ? 8 : 0 }}
          >
            <span style={{ color: "var(--green)", marginTop: 1, flexShrink: 0 }}>→</span>
            <span style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>{tip}</span>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div
        style={{
          marginTop: 16,
          padding: "16px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid var(--border)",
          borderRadius: 16,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Profile Completeness
          </span>
          <span className="grad-text" style={{ fontSize: 12, fontWeight: 700 }}>
            {completeness}%
          </span>
        </div>
        <div
          style={{
            height: 4,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${completeness}%`,
              background: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
              borderRadius: 99,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SidebarExtras;