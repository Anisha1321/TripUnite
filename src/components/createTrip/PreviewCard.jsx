import Icon from "./Icon";

/* ─── Live Preview Card ─── */
const PreviewCard = ({ form, coverUrl }) => {
  const nights = (() => {
    if (!form.startDate || !form.endDate) return null;
    const diff = (new Date(form.endDate) - new Date(form.startDate)) / 86400000;
    return diff > 0 ? diff : null;
  })();

  return (
    <div className="preview-card fade-in-4" style={{ position: "relative", top: "auto" }}>
      {/* Cover Image */}
      <div
        style={{
          position: "relative",
          height: 200,
          background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
          overflow: "hidden",
        }}
      >
        {coverUrl ? (
          <img
            src={coverUrl}
            alt="cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 8,
            }}
          >
            <Icon name="image" size={32} color="rgba(255,255,255,0.2)" />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
              Cover image preview
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(13,17,23,0.9) 0%, transparent 60%)",
          }}
        />

        {/* Trip type badge */}
        {form.tripType && (
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <span className="tag-badge" style={{ fontSize: 10 }}>
              <span className="glow-dot" style={{ width: 5, height: 5 }} />
              {form.tripType}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 20px" }}>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontSize: 20,
            lineHeight: 1.3,
            marginBottom: 6,
            color: "#fff",
          }}
        >
          {form.title || (
            <span style={{ color: "rgba(255,255,255,0.2)" }}>Your trip title…</span>
          )}
        </h3>

        {form.destination && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
            <Icon name="map" size={12} color="var(--green-light)" />
            <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{form.destination}</span>
          </div>
        )}

        <div className="divider" style={{ margin: "14px 0" }} />

        {/* Stats row */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          {form.price ? (
            <div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>FROM</div>
              <div
                className="grad-text"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 22 }}
              >
                ₹{Number(form.price).toLocaleString()}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>per person</div>
            </div>
          ) : (
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Price TBD</div>
          )}

          {nights && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>DURATION</div>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 300,
                  fontSize: 22,
                  color: "#fff",
                }}
              >
                {nights}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>nights</div>
            </div>
          )}
        </div>

        {/* Capacity */}
        {form.seats && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            <Icon name="users" size={12} color="var(--text-muted)" />
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {form.seats} seats available
            </span>
          </div>
        )}

        {/* Stars */}
        <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Icon
              key={i}
              name="star"
              size={12}
              color={i <= 4 ? "#f59e0b" : "rgba(255,255,255,0.15)"}
            />
          ))}
          <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 4 }}>
            New experience
          </span>
        </div>

        <button
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", fontSize: 13 }}
        >
          <Icon name="send" size={13} />
          Book This Trip
        </button>
      </div>
    </div>
  );
};

export default PreviewCard;