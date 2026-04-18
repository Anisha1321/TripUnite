import Icon from "./Icon";

const PageHero = () => (
  <div style={{ paddingTop: 40, paddingBottom: 64, textAlign: "center" }}>
    <div className="fade-in" style={{ marginBottom: 18 }}>
      <span className="tag-badge">
        <span className="glow-dot" />
        Host an Experience
      </span>
    </div>

    <h1
      className="fade-in-2 hero-heading"
      style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 200,
        fontSize: "clamp(40px, 6vw, 72px)",
        lineHeight: 1.1,
        letterSpacing: "-0.01em",
        marginBottom: 20,
      }}
    >
      Create Your{" "}
      <span className="grad-text" style={{ fontStyle: "italic" }}>
        Trip
      </span>
    </h1>

    <p
      className="fade-in-3"
      style={{
        fontSize: 16,
        color: "var(--text-dim)",
        maxWidth: 480,
        margin: "0 auto 0",
        lineHeight: 1.7,
      }}
    >
      Design your journey and find your perfect travel crew. Fill in the details
      below to bring your adventure to life.
    </p>

    {/* Decorative divider */}
    <div
      className="fade-in-4"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        marginTop: 36,
      }}
    >
      <div style={{ width: 48, height: 1, background: "var(--border)" }} />
      <Icon name="globe" size={18} color="var(--green)" />
      <div style={{ width: 48, height: 1, background: "var(--border)" }} />
    </div>
  </div>
);

export default PageHero;