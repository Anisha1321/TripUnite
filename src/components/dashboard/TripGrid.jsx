import FadeIn from "./FadeIn";
import TripCard from "./TripCard";
import { Icon } from "./Icons";

export function EmptyState({ icon, message, cta }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 24px",
        border: "1px dashed rgba(255,255,255,0.08)",
        borderRadius: 16,
        background: "rgba(255,255,255,.015)",
      }}
    >
      <div style={{ color: "var(--accent)", marginBottom: 14, opacity: 0.6 }}>
        <Icon d={icon} size={30} />
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 18, maxWidth: 280, margin: "0 auto 18px" }}>
        {message}
      </p>
      {cta && (
        <button className="btn-primary" style={{ fontSize: 13 }}>
          {cta}
        </button>
      )}
    </div>
  );
}

export default function TripGrid({ trips, dimmed = false, emptyIcon, emptyMsg, emptyCta }) {
  if (!trips.length) {
    return <EmptyState icon={emptyIcon} message={emptyMsg} cta={emptyCta} />;
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
      }}
    >
      {trips.map((t, i) => (
        <FadeIn key={t.id} delay={i * 0.08}>
          <TripCard trip={t} dimmed={dimmed && new Date(t.endDate) < new Date()} />
        </FadeIn>
      ))}
    </div>
  );
}