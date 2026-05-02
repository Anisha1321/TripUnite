import { Icon, Icons } from "./Icons";

function NotifItem({ icon, text, time }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "rgba(29,158,117,.12)",
          border: "1px solid rgba(29,158,117,.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
          flexShrink: 0,
        }}
      >
        <Icon d={icon} size={14} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{text}</p>
        <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{time}</p>
      </div>
    </div>
  );
}

const NOTIFS = [
  { icon: Icons.users,    text: "3 travellers joined your Kyoto Spring trip",    time: "2 hours ago"  },
  { icon: Icons.clock,    text: "Your Bali trip starts in 3 days — check packing list", time: "5 hours ago" },
  { icon: Icons.star,     text: "Riya left a review on your hosted Paris trip",  time: "Yesterday"    },
  { icon: Icons.bell,     text: "New message in Patagonia group chat",           time: "2 days ago"   },
];

export default function ActivityPanel() {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 17, letterSpacing: "-.3px", color: "white" }}>
          Activity
        </h3>
        <span
          style={{
            fontSize: 11,
            background: "rgba(29,158,117,.15)",
            color: "var(--accent-light)",
            borderRadius: 20,
            padding: "2px 8px",
            border: "1px solid rgba(29,158,117,.25)",
          }}
        >
          4 new
        </span>
      </div>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
        Recent updates across your trips
      </p>
      {NOTIFS.map((n, i) => (
        <NotifItem key={i} {...n} />
      ))}
      <button
        className="btn-outline"
        style={{ width: "100%", justifyContent: "center", marginTop: 14, fontSize: 12 }}
      >
        View all notifications
      </button>
    </div>
  );
}