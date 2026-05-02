const BADGE_MAP = {
  upcoming:   { bg: "rgba(29,158,117,.15)",  text: "#5DCAA5", border: "rgba(29,158,117,.3)"   },
  host:       { bg: "rgba(93,202,165,.12)",  text: "#9FE1CB", border: "rgba(93,202,165,.25)"  },
  member:     { bg: "rgba(100,116,139,.15)", text: "#94A3B8", border: "rgba(100,116,139,.3)"  },
  completed:  { bg: "rgba(59,130,246,.12)",  text: "#93C5FD", border: "rgba(59,130,246,.25)"  },
  draft:      { bg: "rgba(234,179,8,.1)",    text: "#FCD34D", border: "rgba(234,179,8,.25)"   },
  saved:      { bg: "rgba(168,85,247,.1)",   text: "#C4B5FD", border: "rgba(168,85,247,.25)"  },
  incomplete: { bg: "rgba(239,68,68,.1)",    text: "#FCA5A5", border: "rgba(239,68,68,.25)"   },
};

export default function Badge({ label, color }) {
  const s = BADGE_MAP[color] || BADGE_MAP.upcoming;
  return (
    <span
      style={{
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        borderRadius: 8,
        padding: "2px 10px",
        fontSize: 11,
        fontWeight: 400,
        letterSpacing: ".4px",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}