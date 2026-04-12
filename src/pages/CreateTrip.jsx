import { useState, useRef } from "react";

/* ─── Utility: inject Google Fonts & global styles once ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,100;0,200;0,300;0,400;0,700;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg-primary: #0D1117;
      --bg-secondary: #111827;
      --green: #1D9E75;
      --green-light: #5DCAA5;
      --border: rgba(255,255,255,0.06);
      --border-hover: #1D9E75;
      --text-muted: rgba(255,255,255,0.45);
      --text-dim: rgba(255,255,255,0.65);
    }

    body { background: var(--bg-primary); color: #fff; font-family: 'DM Sans', sans-serif; }

    .grad-text {
      background: linear-gradient(135deg, #5DCAA5 0%, #1D9E75 50%, #0fa868 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .noise-bg {
      position: relative;
    }
    .noise-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }

    .fade-in { animation: fadeUp 0.7s ease both; }
    .fade-in-2 { animation: fadeUp 0.7s 0.15s ease both; }
    .fade-in-3 { animation: fadeUp 0.7s 0.3s ease both; }
    .fade-in-4 { animation: fadeUp 0.7s 0.45s ease both; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .card {
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 20px;
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.25s;
    }
    .card:hover {
      border-color: rgba(29,158,117,0.3);
      box-shadow: 0 0 32px rgba(29,158,117,0.07);
    }

    .input-field {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 11px 14px;
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      -webkit-appearance: none;
    }
    .input-field::placeholder { color: var(--text-muted); }
    .input-field:focus {
      border-color: var(--green);
      box-shadow: 0 0 0 3px rgba(29,158,117,0.15);
    }
    select.input-field option { background: #1a2332; color: #fff; }

    .label {
      display: block;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 7px;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #1D9E75, #0fa868);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 14px;
      padding: 13px 28px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
      text-decoration: none;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(29,158,117,0.35);
    }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      color: var(--green-light);
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 14px;
      padding: 13px 28px;
      border-radius: 12px;
      border: 1px solid rgba(93,202,165,0.3);
      cursor: pointer;
      transition: background 0.2s, transform 0.2s, border-color 0.2s;
    }
    .btn-outline:hover {
      background: rgba(93,202,165,0.07);
      border-color: var(--green-light);
      transform: translateY(-2px);
    }

    .tag-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(29,158,117,0.12);
      border: 1px solid rgba(29,158,117,0.3);
      color: var(--green-light);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 100px;
    }

    .section-title {
      font-family: 'Fraunces', serif;
      font-weight: 300;
      font-size: 18px;
      color: #fff;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-title::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    .day-card {
      background: rgba(255,255,255,0.025);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px;
      transition: border-color 0.2s;
    }
    .day-card:hover { border-color: rgba(29,158,117,0.25); }

    .preview-card {
      position: sticky;
      top: 100px;
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 24px;
      overflow: hidden;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .preview-card:hover {
      border-color: rgba(29,158,117,0.4);
      box-shadow: 0 0 48px rgba(29,158,117,0.1);
    }

    .divider { height: 1px; background: var(--border); margin: 24px 0; }

    .glow-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 8px var(--green);
      display: inline-block;
    }

    .upload-zone {
      border: 2px dashed rgba(255,255,255,0.1);
      border-radius: 14px;
      padding: 36px 20px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }
    .upload-zone:hover {
      border-color: var(--green);
      background: rgba(29,158,117,0.05);
    }

    .remove-btn {
      background: rgba(255,80,80,0.12);
      border: 1px solid rgba(255,80,80,0.25);
      color: #ff6b6b;
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.2s;
      font-family: 'DM Sans', sans-serif;
    }
    .remove-btn:hover { background: rgba(255,80,80,0.22); }

    .add-btn {
      background: rgba(29,158,117,0.08);
      border: 1px dashed rgba(29,158,117,0.35);
      color: var(--green-light);
      border-radius: 10px;
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.2s, border-color 0.2s;
      font-family: 'DM Sans', sans-serif;
    }
    .add-btn:hover { background: rgba(29,158,117,0.15); border-color: var(--green); }

    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

/* ─── Icons (inline SVG) ─── */
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    map: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    dollar: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
    list: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20"/></>,
    upload: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>,
    tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    save: <><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    sun: <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

/* ─── FormSection wrapper ─── */
const FormSection = ({ icon, title, children, className = "" }) => (
  <div className={`card p-6 ${className}`}>
    <div className="section-title">
      <span style={{ color: "var(--green-light)" }}><Icon name={icon} size={15} /></span>
      {title}
    </div>
    {children}
  </div>
);

/* ─── Field wrapper ─── */
const Field = ({ label, children, half }) => (
  <div style={{ flex: half ? "1 1 calc(50% - 8px)" : "1 1 100%" }}>
    <label className="label">{label}</label>
    {children}
  </div>
);

/* ─── Live Preview Card ─── */
const PreviewCard = ({ form, coverUrl }) => {
  const nights = (() => {
    if (!form.startDate || !form.endDate) return null;
    const diff = (new Date(form.endDate) - new Date(form.startDate)) / 86400000;
    return diff > 0 ? diff : null;
  })();

  return (
    <div className="preview-card fade-in-4">
      {/* Cover Image */}
      <div style={{ position: "relative", height: 200, background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)", overflow: "hidden" }}>
        {coverUrl ? (
          <img src={coverUrl} alt="cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8 }}>
            <Icon name="image" size={32} color="rgba(255,255,255,0.2)" />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Cover image preview</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,17,23,0.9) 0%, transparent 60%)" }} />
        {/* Badge */}
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
        <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 20, lineHeight: 1.3, marginBottom: 6, color: "#fff" }}>
          {form.title || <span style={{ color: "rgba(255,255,255,0.2)" }}>Your trip title…</span>}
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
              <div className="grad-text" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 22 }}>
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
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 22, color: "#fff" }}>{nights}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>nights</div>
            </div>
          )}
        </div>

        {/* Capacity */}
        {form.seats && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            <Icon name="users" size={12} color="var(--text-muted)" />
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{form.seats} seats available</span>
          </div>
        )}

        {/* Stars */}
        <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
          {[1,2,3,4,5].map(i => (
            <Icon key={i} name="star" size={12} color={i <= 4 ? "#f59e0b" : "rgba(255,255,255,0.15)"} />
          ))}
          <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 4 }}>New experience</span>
        </div>

        <button className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 13 }}>
          <Icon name="send" size={13} />
          Book This Trip
        </button>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
export default function CreateTrip() {
  const fileRef = useRef(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [itinerary, setItinerary] = useState([
    { id: 1, title: "", description: "" }
  ]);

  const [form, setForm] = useState({
    title: "",
    destination: "",
    tripType: "",
    description: "",
    startDate: "",
    endDate: "",
    price: "",
    seats: "",
    inclusions: "",
    exclusions: "",
    requirements: "",
  });

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setCoverUrl(URL.createObjectURL(file));
  };

  const addDay = () => setItinerary(d => [...d, { id: Date.now(), title: "", description: "" }]);
  const removeDay = (id) => setItinerary(d => d.filter(x => x.id !== id));
  const updateDay = (id, key, val) => setItinerary(d => d.map(x => x.id === id ? { ...x, [key]: val } : x));

  return (
    <>
      <GlobalStyles />
      <div className="noise-bg" style={{ minHeight: "100vh", background: "#0D1117", paddingBottom: 80 }}>

        {/* ── Radial glow ── */}
        {/* <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: 900, height: 500, background: "radial-gradient(ellipse at 50% 0%, rgba(29,158,117,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} /> */}

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

          {/* ─── HERO ─── */}
          <div style={{ paddingTop: 80, paddingBottom: 64, textAlign: "center" }}>
            <div className="fade-in" style={{ marginBottom: 18 }}>
              <span className="tag-badge">
                <span className="glow-dot" />
                Host an Experience
              </span>
            </div>

            <h1 className="fade-in-2" style={{ fontFamily: "'Fraunces', serif", fontWeight: 200, fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 20 }}>
              Create Your{" "}
              <span className="grad-text" style={{ fontStyle: "italic" }}>Trip</span>
            </h1>

            <p className="fade-in-3" style={{ fontSize: 16, color: "var(--text-dim)", maxWidth: 480, margin: "0 auto 0", lineHeight: 1.7 }}>
              Design your journey and find your perfect travel crew. Fill in the details below to bring your adventure to life.
            </p>

            {/* Decorative divider */}
            <div className="fade-in-4" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 36 }}>
              <div style={{ width: 48, height: 1, background: "var(--border)" }} />
              <Icon name="globe" size={18} color="var(--green)" />
              <div style={{ width: 48, height: 1, background: "var(--border)" }} />
            </div>
          </div>

          {/* ─── 2-COL LAYOUT ─── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>

            {/* ══ LEFT: FORM ══ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* A. Basic Info */}
              <FormSection icon="tag" title="Basic Info" className="fade-in">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <Field label="Trip Title" >
                    <input className="input-field" placeholder="e.g. Spiti Valley Hidden Gems" value={form.title} onChange={set("title")} />
                  </Field>
                  <Field label="Destination">
                    <input className="input-field" placeholder="e.g. Spiti Valley, Himachal Pradesh" value={form.destination} onChange={set("destination")} />
                  </Field>
                  <Field label="Trip Type" half>
                    <select className="input-field" value={form.tripType} onChange={set("tripType")}>
                      <option value="">Select type…</option>
                      {["Adventure", "Cultural", "Backpacking", "Luxury", "Wildlife", "Beach", "Trek", "Road Trip"].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Difficulty Level" half>
                    <select className="input-field">
                      <option value="">Select level…</option>
                      {["Easy", "Moderate", "Challenging", "Expert"].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Description">
                    <textarea className="input-field" rows={4} placeholder="Paint a picture of this trip — what makes it special?" value={form.description} onChange={set("description")} style={{ resize: "vertical" }} />
                  </Field>
                </div>
              </FormSection>

              {/* B. Dates */}
              <FormSection icon="calendar" title="Dates" className="fade-in-2">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <Field label="Start Date" half>
                    <input type="date" className="input-field" value={form.startDate} onChange={set("startDate")} style={{ colorScheme: "dark" }} />
                  </Field>
                  <Field label="End Date" half>
                    <input type="date" className="input-field" value={form.endDate} onChange={set("endDate")} style={{ colorScheme: "dark" }} />
                  </Field>
                </div>
                {form.startDate && form.endDate && new Date(form.endDate) > new Date(form.startDate) && (
                  <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(29,158,117,0.07)", border: "1px solid rgba(29,158,117,0.2)", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name="clock" size={13} color="var(--green-light)" />
                    <span style={{ fontSize: 13, color: "var(--green-light)" }}>
                      {Math.round((new Date(form.endDate) - new Date(form.startDate)) / 86400000)} nights · {Math.round((new Date(form.endDate) - new Date(form.startDate)) / 86400000) + 1} days
                    </span>
                  </div>
                )}
              </FormSection>

              {/* C. Pricing & Capacity */}
              <FormSection icon="dollar" title="Pricing & Capacity" className="fade-in-2">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <Field label="Price per Person (₹)" half>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: 14 }}>₹</span>
                      <input type="number" className="input-field" placeholder="0" value={form.price} onChange={set("price")} style={{ paddingLeft: 28 }} />
                    </div>
                  </Field>
                  <Field label="Total Seats" half>
                    <input type="number" className="input-field" placeholder="e.g. 12" value={form.seats} onChange={set("seats")} />
                  </Field>
                </div>
                <div className="divider" />
                <div style={{ display: "flex", gap: 24 }}>
                  {[
                    { label: "Early Bird", desc: "First 3 seats at reduced price" },
                    { label: "Group Discount", desc: "4+ travelers get 10% off" },
                  ].map(opt => (
                    <label key={opt.label} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", flex: 1 }}>
                      <input type="checkbox" style={{ marginTop: 2, accentColor: "var(--green)" }} />
                      <div>
                        <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{opt.label}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </FormSection>

              {/* D. Media */}
              <FormSection icon="image" title="Cover Image" className="fade-in-3">
                {coverUrl ? (
                  <div style={{ position: "relative" }}>
                    <img src={coverUrl} alt="cover" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 12 }} />
                    <div style={{ position: "absolute", top: 10, right: 10 }}>
                      <button className="remove-btn" onClick={() => setCoverUrl(null)}>
                        <Icon name="x" size={12} /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="upload-zone" onClick={() => fileRef.current?.click()}>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImage} />
                    <Icon name="upload" size={28} color="rgba(255,255,255,0.2)" />
                    <div style={{ marginTop: 12, fontSize: 14, color: "var(--text-dim)" }}>Drop your cover image or <span style={{ color: "var(--green-light)" }}>browse</span></div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>PNG, JPG up to 10MB · 16:9 recommended</div>
                  </div>
                )}
              </FormSection>

              {/* E. Itinerary */}
              <FormSection icon="list" title="Itinerary" className="fade-in-3">
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {itinerary.map((day, idx) => (
                    <div key={day.id} className="day-card">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(29,158,117,0.15)", border: "1px solid rgba(29,158,117,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--green-light)" }}>{idx + 1}</span>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>Day {idx + 1}</span>
                        </div>
                        {itinerary.length > 1 && (
                          <button className="remove-btn" onClick={() => removeDay(day.id)}>
                            <Icon name="x" size={11} />
                          </button>
                        )}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <div>
                          <label className="label">Day Title</label>
                          <input className="input-field" placeholder="e.g. Arrival & Acclimatization" value={day.title} onChange={e => updateDay(day.id, "title", e.target.value)} />
                        </div>
                        <div>
                          <label className="label">Activities & Details</label>
                          <textarea className="input-field" rows={2} placeholder="Describe the day's activities…" value={day.description} onChange={e => updateDay(day.id, "description", e.target.value)} style={{ resize: "none" }} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="add-btn" onClick={addDay}>
                    <Icon name="plus" size={14} />
                    Add Day
                  </button>
                </div>
              </FormSection>

              {/* F. Inclusions / Exclusions */}
              <FormSection icon="check" title="Inclusions & Exclusions" className="fade-in-4">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <div style={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
                    <label className="label" style={{ color: "rgba(93,202,165,0.7)" }}>✓ What's Included</label>
                    <textarea className="input-field" rows={4} placeholder={"Accommodation\nTransfers\nBreakfast"} value={form.inclusions} onChange={set("inclusions")} style={{ resize: "vertical" }} />
                  </div>
                  <div style={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
                    <label className="label" style={{ color: "rgba(255,100,100,0.6)" }}>✕ What's Excluded</label>
                    <textarea className="input-field" rows={4} placeholder={"Flights\nPersonal expenses\nInsurance"} value={form.exclusions} onChange={set("exclusions")} style={{ resize: "vertical" }} />
                  </div>
                </div>
              </FormSection>

              {/* G. Requirements */}
              <FormSection icon="info" title="Requirements & Notes" className="fade-in-4">
                <label className="label">Fitness level, rules, gear, anything travelers should know</label>
                <textarea className="input-field" rows={4} placeholder={"Moderate fitness required\nCamping gear provided\nAge: 18–55\nNo prior experience needed"} value={form.requirements} onChange={set("requirements")} style={{ resize: "vertical" }} />
              </FormSection>

              {/* CTA */}
              <div className="fade-in-4" style={{ display: "flex", gap: 14, paddingTop: 8, paddingBottom: 40 }}>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "15px 28px", fontSize: 15 }}>
                  <Icon name="send" size={15} />
                  Publish Trip
                </button>
                <button className="btn-outline" style={{ flex: "0 0 auto" }}>
                  <Icon name="save" size={14} />
                  Save Draft
                </button>
              </div>

            </div>

            {/* ══ RIGHT: LIVE PREVIEW ══ */}
            <div className="fade-in-2">
              <div style={{ marginBottom: 14 }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>Live Preview</span>
              </div>
              <PreviewCard form={form} coverUrl={coverUrl} />

              {/* Tips card */}
              <div style={{ marginTop: 16, padding: "16px", background: "rgba(29,158,117,0.05)", border: "1px solid rgba(29,158,117,0.15)", borderRadius: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--green-light)", marginBottom: 10 }}>💡 Tips</div>
                {[
                  "High-quality cover images boost bookings by 3×",
                  "Detailed itineraries build trust with travelers",
                  "Clear inclusions reduce cancellations",
                ].map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < 2 ? 8 : 0 }}>
                    <span style={{ color: "var(--green)", marginTop: 1, flexShrink: 0 }}>→</span>
                    <span style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>{tip}</span>
                  </div>
                ))}
              </div>

              {/* Progress indicator */}
              <div style={{ marginTop: 16, padding: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>Profile Completeness</span>
                  <span className="grad-text" style={{ fontSize: 12, fontWeight: 700 }}>
                    {Math.round(
                      ([form.title, form.destination, form.tripType, form.description, form.startDate, form.endDate, form.price, form.seats].filter(Boolean).length / 8) * 100
                    )}%
                  </span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${Math.round(([form.title, form.destination, form.tripType, form.description, form.startDate, form.endDate, form.price, form.seats].filter(Boolean).length / 8) * 100)}%`,
                    background: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
                    borderRadius: 99,
                    transition: "width 0.4s ease"
                  }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}