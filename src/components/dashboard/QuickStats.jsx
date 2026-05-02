import FadeIn from "./FadeIn";
import { Icon, Icons } from "./Icons";

export default function QuickStats({ upcoming, hosted, saved, completed }) {
  const items = [
    { label: "Upcoming",  value: upcoming,  icon: Icons.compass  },
    { label: "Hosted",    value: hosted,    icon: Icons.star     },
    { label: "Saved",     value: saved,     icon: Icons.bookmark },
    { label: "Completed", value: completed, icon: Icons.check    },
  ];

  return (
    <div className="stats-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gap: 12,
      }}
    >
      {items.map((s, i) => (
        <FadeIn key={s.label} delay={i * 0.07}>
          <div className="card" style={{ padding: "16px", textAlign: "center" }}>
            <div style={{ color: "var(--accent)", marginBottom: 8, display: "flex", justifyContent: "center" }}>
              <Icon d={s.icon} size={18} />
            </div>
            <p
              className="grad-text"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 26, letterSpacing: "-.5px" }}
            >
              {s.value}
            </p>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}