import Badge from "./Badge";
import { Icon, Icons } from "./Icons";

export default function TripCard({ trip, dimmed = false }) {
  return (
    <div
      className="card"
      style={{
        padding: 20,
        opacity: dimmed ? 0.45 : 1,
        filter: dimmed ? "grayscale(60%)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
              <Icon d={Icons.map} size={13} />
              {trip.destination}
            </span>
          </div>
          <p style={{ fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-.3px" }}>
            {trip.name}
          </p>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Badge label={trip.status} color={trip.status.toLowerCase()} />
          <Badge label={trip.role} color={trip.role.toLowerCase()} />
        </div>
      </div>

      {/* Meta row */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
          <Icon d={Icons.calendar} size={12} />
          {trip.dates}
        </span>
        <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
          <Icon d={Icons.users} size={12} />
          {trip.travellers} traveller{trip.travellers !== 1 ? "s" : ""}
        </span>
        {trip.countdown && (
          <span style={{ fontSize: 12, color: "var(--accent-light)", display: "flex", alignItems: "center", gap: 5 }}>
            <Icon d={Icons.clock} size={12} />
            {trip.countdown}
          </span>
        )}
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border)" }} />

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="btn-outline" style={{ padding: "6px 16px", fontSize: 12 }}>
          <Icon d={Icons.eye} size={13} /> View
        </button>
        {trip.showChat && (
          <button className="btn-outline" style={{ padding: "6px 16px", fontSize: 12 }}>
            <Icon d={Icons.chat} size={13} /> Chat
          </button>
        )}
        {trip.showEdit && (
          <button className="btn-primary" style={{ padding: "6px 16px", fontSize: 12 }}>
            <Icon d={Icons.edit} size={13} /> Edit
          </button>
        )}
      </div>
    </div>
  );
}