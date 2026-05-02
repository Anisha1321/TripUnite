import { Icon, Icons } from "./Icons";

export default function FilterBar({ query, onQuery, filter, onFilter }) {
  return (
    <div className="filter-bar" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
        <span
          style={{
            position: "absolute",
            left: 11,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
            pointerEvents: "none",
          }}
        >
          <Icon d={Icons.search} size={14} />
        </span>
        <input
          type="text"
          placeholder="Search trips…"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          style={{ paddingLeft: 32 }}
        />
      </div>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
            pointerEvents: "none",
          }}
        >
          <Icon d={Icons.filter} size={13} />
        </span>
        <select value={filter} onChange={(e) => onFilter(e.target.value)} style={{ paddingLeft: 28, paddingTop: 9, paddingBottom: 9 }}>
          <option value="all">All</option>
          <option value="host">Host only</option>
          <option value="member">Member only</option>
        </select>
      </div>
    </div>
  );
}