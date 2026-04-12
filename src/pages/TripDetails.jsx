import { useState } from "react";

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,100;0,200;0,300;0,400;0,700;1,200;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:        #0D1117;
      --bg2:       #111827;
      --green:     #1D9E75;
      --green-lt:  #5DCAA5;
      --border:    rgba(255,255,255,0.06);
      --muted:     rgba(255,255,255,0.42);
      --dim:       rgba(255,255,255,0.65);
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* ── typography ── */
    .fraunces { font-family: 'Fraunces', serif; }

    .grad-text {
      background: linear-gradient(135deg, #5DCAA5 0%, #1D9E75 55%, #0fa868 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ── noise overlay ── */
    .noise::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 999;
    }

    /* ── animations ── */
    .fa  { animation: fadeUp .65s ease both; }
    .fa2 { animation: fadeUp .65s .12s ease both; }
    .fa3 { animation: fadeUp .65s .24s ease both; }
    .fa4 { animation: fadeUp .65s .36s ease both; }
    .fa5 { animation: fadeUp .65s .48s ease both; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── cards ── */
    .card {
      background: rgba(255,255,255,0.028);
      border: 1px solid var(--border);
      border-radius: 20px;
      transition: border-color .3s, box-shadow .3s, transform .25s;
    }
    .card:hover {
      border-color: rgba(29,158,117,.28);
      box-shadow: 0 4px 40px rgba(29,158,117,.07);
    }

    /* ── action panel ── */
    .action-panel {
      position: sticky;
      top: 90px;
      background: rgba(17,24,39,.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 24px;
      overflow: hidden;
      transition: border-color .3s, box-shadow .3s;
    }
    .action-panel:hover {
      border-color: rgba(29,158,117,.35);
      box-shadow: 0 0 60px rgba(29,158,117,.1);
    }

    /* ── buttons ── */
    .btn-join {
      width: 100%;
      padding: 15px;
      border-radius: 14px;
      border: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: transform .2s, box-shadow .2s, opacity .2s;
    }
    .btn-join-active {
      background: linear-gradient(135deg, #1D9E75, #0fa868);
      color: #fff;
      box-shadow: 0 6px 24px rgba(29,158,117,.3);
    }
    .btn-join-active:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 32px rgba(29,158,117,.42);
    }
    .btn-join-done {
      background: rgba(29,158,117,.1);
      border: 1.5px solid rgba(29,158,117,.35) !important;
      color: var(--green-lt);
      cursor: default;
    }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: transparent;
      color: var(--dim);
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      padding: 10px 18px;
      border-radius: 10px;
      border: 1px solid var(--border);
      cursor: pointer;
      transition: background .2s, border-color .2s, color .2s, transform .2s;
    }
    .btn-outline:hover {
      background: rgba(255,255,255,.05);
      border-color: rgba(255,255,255,.15);
      color: #fff;
      transform: translateY(-1px);
    }

    /* ── tags ── */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(29,158,117,.12);
      border: 1px solid rgba(29,158,117,.3);
      color: var(--green-lt);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .1em;
      text-transform: uppercase;
      padding: 5px 13px;
      border-radius: 100px;
    }

    .label-xs {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--muted);
    }

    /* ── section heading ── */
    .sec-head {
      font-family: 'Fraunces', serif;
      font-weight: 300;
      font-size: 20px;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    .sec-head::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    /* ── divider ── */
    .divider { height: 1px; background: var(--border); margin: 22px 0; }

    /* ── timeline ── */
    .timeline-line {
      position: absolute;
      left: 14px;
      top: 32px;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, rgba(29,158,117,.4), transparent);
    }

    /* ── gallery ── */
    .gallery-img {
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      transition: transform .25s, box-shadow .25s;
    }
    .gallery-img:hover {
      transform: scale(1.03);
      box-shadow: 0 8px 32px rgba(0,0,0,.4);
    }

    /* ── review card ── */
    .review-card {
      background: rgba(255,255,255,.025);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 18px;
      transition: border-color .25s;
    }
    .review-card:hover { border-color: rgba(29,158,117,.2); }

    /* ── map placeholder ── */
    .map-ph {
      background: linear-gradient(135deg, #0f2027, #182535, #1a2f3a);
      border-radius: 16px;
      position: relative;
      overflow: hidden;
    }
    .map-ph::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg, transparent, transparent 40px, rgba(255,255,255,.015) 40px, rgba(255,255,255,.015) 41px
      ),
      repeating-linear-gradient(
        90deg, transparent, transparent 40px, rgba(255,255,255,.015) 40px, rgba(255,255,255,.015) 41px
      );
    }

    /* ── avatar ── */
    .avatar {
      width: 44px; height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1D9E75, #0d6e52);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Fraunces', serif;
      font-weight: 400;
      font-size: 17px;
      color: #fff;
      flex-shrink: 0;
      border: 2px solid rgba(29,158,117,.4);
    }
    .avatar-sm {
      width: 34px; height: 34px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2a4a5e, #1a3040);
      display: flex; align-items: center; justify-content: center;
      font-size: 12px;
      font-weight: 600;
      color: rgba(255,255,255,.7);
      flex-shrink: 0;
    }

    /* ── progress bar ── */
    .progress-bar {
      height: 4px;
      background: rgba(255,255,255,.07);
      border-radius: 99px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #1D9E75, #5DCAA5);
      border-radius: 99px;
      transition: width .4s ease;
    }

    /* ── scrollbar ── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 99px; }
  `}</style>
);

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
const Ic = ({ n, s = 16, c = "currentColor" }) => {
  const d = {
    map:      <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    cal:      <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    clock:    <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    users:    <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    star:     <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    check:    <><polyline points="20 6 9 17 4 12"/></>,
    x:        <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    share:    <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
    heart:    <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
    arrow:    <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    shield:   <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    camera:   <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></>,
    globe:    <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20"/></>,
    sun:      <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/></>,
    tent:     <><path d="M19 20L12 4 5 20"/><path d="M5 20L12 8l7 12"/><line x1="2" y1="20" x2="22" y2="20"/></>,
    bag:      <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></>,
    fire:     <><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/></>,
    check2:   <><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></>,
    info:     <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    user:     <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    verified: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {d[n]}
    </svg>
  );
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const TRIP = {
  title: "Spiti Valley — The Last Horizon",
  destination: "Spiti Valley, Himachal Pradesh",
  type: "Adventure",
  duration: "8 Days · 7 Nights",
  nights: 7,
  days: 8,
  price: 24500,
  seatsTotal: 12,
  seatsLeft: 4,
  startDate: "15 Aug 2025",
  endDate: "22 Aug 2025",
  rating: 4.9,
  reviews: 38,
  coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
  ],
  description: `Spiti Valley sits at an elevation that most maps don't bother labelling — a cold desert monastery land wedged between India and Tibet, half-forgotten by the modern world and utterly unforgettable to anyone who wanders in. This is not a postcard trip. It is a reckoning with altitude, silence, and the raw architecture of the Himalayas.

Over eight days we cross four high passes above 4,000m, sleep under skies exploding with stars, share meals with monks, and arrive at Langza — where fossils of ancient sea creatures emerge from the ground at 4,500m, proof that these peaks were once an ocean floor.`,
  itinerary: [
    { day: 1, title: "Arrival in Manali", icon: "tent",   desc: "Fly or drive into Manali. Evening acclimatisation walk along the Beas riverbank. Welcome dinner, gear check, and route briefing." },
    { day: 2, title: "Manali → Kaza via Rohtang & Kunzum", icon: "sun",   desc: "Cross Rohtang Pass (3,978m) and Kunzum Pass (4,551m). First glimpse of the moonscape plateau. Arrive Kaza by late afternoon." },
    { day: 3, title: "Kaza Exploration Day",  icon: "globe",  desc: "Visit Kaza market, Key Monastery perched on its volcanic plug, and Kibber village — one of the highest motorable villages on Earth." },
    { day: 4, title: "Langza & Komic",        icon: "star",   desc: "Morning at Langza (4,550m) fossil hunting below the giant Buddha statue. Afternoon in Komic — the world's highest permanently inhabited village." },
    { day: 5, title: "Pin Valley Trek",       icon: "tent",   desc: "Trek into the Pin Valley National Park. Spot snow leopard prints and Himalayan blue sheep. Camp beside the Pin River." },
    { day: 6, title: "Tabo & Dhankar",        icon: "fire",   desc: "Tabo Monastery (996 AD) — the oldest functioning monastery in the Himalayas. Climb to Dhankar Lake for sunset over the confluence." },
    { day: 7, title: "Rest, Bond & Celebrate",icon: "heart",  desc: "Free morning. Afternoon group bonfire, story circle, and a farewell dinner featuring local Spitian thukpa." },
    { day: 8, title: "Departure",             icon: "arrow",  desc: "Drive back toward Shimla or Manali. Transfers to airport or bus stand. End of an expedition." },
  ],
  inclusions: [
    "All accommodation (hotels + camping)",
    "All meals from Day 1 dinner to Day 8 breakfast",
    "Experienced high-altitude trek leader",
    "Shared SUV transfers throughout",
    "Camping gear & sleeping bags",
    "First-aid kit & oxygen cylinder",
    "Monastery entry fees",
    "Daily mineral water",
  ],
  exclusions: [
    "Flights / trains to Manali",
    "Travel insurance (strongly recommended)",
    "Personal expenses & tips",
    "Porter charges beyond base camp",
    "Alcohol & beverages",
    "Any costs due to itinerary change",
  ],
  requirements: [
    { icon: "fire",   text: "Moderate fitness — you should be able to walk 8–12 km/day on uneven terrain." },
    { icon: "shield", text: "Age 18–55 preferred. Exceptions on request with doctor's certificate." },
    { icon: "bag",    text: "Bring warm layers, sunscreen SPF 50+, sunglasses, and trekking shoes." },
    { icon: "info",   text: "AMS (altitude sickness) is possible above 4,000m. Diamox available on request." },
  ],
  host: {
    name: "Arjun Mehta",
    initials: "AM",
    title: "Certified Himalayan Trek Leader",
    trips: 47,
    rating: 4.97,
    joined: "2019",
    verified: true,
  },
  reviews: [
    { name: "Priya S.", initials: "PS", rating: 5, date: "Jul 2025", text: "Absolutely life-changing. Arjun knows every corner of Spiti and keeps everyone safe and spirited even at altitude." },
    { name: "Rohan D.", initials: "RD", rating: 5, date: "Jun 2025", text: "The Pin Valley camping night was surreal — no light pollution, just stars wall-to-wall. 10/10 would suffer altitude again." },
    { name: "Sneha K.", initials: "SK", rating: 5, date: "May 2025", text: "I was nervous going solo but ended up making four lifelong friends. The community TripUnite builds is unreal." },
  ],
};

/* ─────────────────────────────────────────
   SUBCOMPONENTS
───────────────────────────────────────── */

const Stars = ({ n = 5, size = 13 }) => (
  <span style={{ display: "inline-flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => (
      <Ic key={i} n="star" s={size} c={i <= Math.round(n) ? "#f59e0b" : "rgba(255,255,255,.15)"} />
    ))}
  </span>
);

const GlowDot = () => (
  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 7px var(--green)", display: "inline-block", flexShrink: 0 }} />
);

const Stat = ({ label, value, sub }) => (
  <div style={{ textAlign: "center" }}>
    <div className="fraunces" style={{ fontSize: 26, fontWeight: 300, color: "#fff", lineHeight: 1.1 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>{sub}</div>}
    <div className="label-xs">{label}</div>
  </div>
);

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function TripDetails() {
  const [joined, setJoined]   = useState(false);
  const [saved,  setSaved]    = useState(false);
  const [shared, setShared]   = useState(false);

  const trip = TRIP;
  const seatsLeft = trip.seatsLeft - (joined ? 1 : 0);
  const pct = Math.max(0, Math.round((seatsLeft / trip.seatsTotal) * 100));

  const handleShare = () => { setShared(true); setTimeout(() => setShared(false), 2000); };

  return (
    <>
      <GlobalStyles />
      <div className="noise" style={{ minHeight: "100vh", background: "var(--bg)" }}>

        {/* ══════════════════ HERO ══════════════════ */}
        <div style={{ position: "relative", height: "70vh", minHeight: 480, overflow: "hidden" }}>
          <img
            src={trip.coverUrl}
            alt={trip.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
          />
          {/* Multi-layer gradient */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0D1117 0%, rgba(13,17,23,.7) 40%, rgba(13,17,23,.1) 80%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,17,23,.5) 0%, transparent 60%)" }} />

          {/* Hero content */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 5% 52px" }}>
            <div className="fa" style={{ marginBottom: 14 }}>
              <span className="badge"><GlowDot />{trip.type}</span>
            </div>

            <h1 className="fa2 fraunces" style={{ fontWeight: 200, fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.1, letterSpacing: "-.01em", maxWidth: 700, marginBottom: 16 }}>
              {trip.title.split("—")[0]}
              <span className="grad-text" style={{ fontStyle: "italic" }}>—{trip.title.split("—")[1]}</span>
            </h1>

            <div className="fa3" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Ic n="map" s={14} c="var(--green-lt)" />
                <span style={{ fontSize: 14, color: "var(--dim)" }}>{trip.destination}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Ic n="clock" s={14} c="var(--green-lt)" />
                <span style={{ fontSize: 14, color: "var(--dim)" }}>{trip.duration}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Stars n={trip.rating} />
                <span style={{ fontSize: 14, color: "var(--dim)" }}>{trip.rating} ({trip.reviews.length} reviews)</span>
              </div>
            </div>
          </div>

          {/* Top nav bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "20px 5%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="fraunces" style={{ fontSize: 20, fontWeight: 300 }}>
              Trip<span className="grad-text">Unite</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-outline" onClick={() => setSaved(s => !s)} style={{ color: saved ? "var(--green-lt)" : undefined, borderColor: saved ? "rgba(29,158,117,.4)" : undefined }}>
                <Ic n="heart" s={14} c={saved ? "var(--green-lt)" : "currentColor"} />
                {saved ? "Saved" : "Save"}
              </button>
              <button className="btn-outline" onClick={handleShare}>
                <Ic n="share" s={14} />
                {shared ? "Copied!" : "Share"}
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════ BODY ══════════════════ */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" }}>

            {/* ══ LEFT COLUMN ══ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Stats bar */}
              <div className="card fa" style={{ padding: "20px 28px", display: "flex", justifyContent: "space-around" }}>
                <Stat label="Duration"   value={trip.days}    sub="days" />
                <div style={{ width: 1, background: "var(--border)" }} />
                <Stat label="Elevation"  value="4,551m"       sub="max" />
                <div style={{ width: 1, background: "var(--border)" }} />
                <Stat label="Group Size" value={trip.seatsTotal} sub="max" />
                <div style={{ width: 1, background: "var(--border)" }} />
                <Stat label="Rating"     value={trip.rating}  sub="/ 5.0" />
              </div>

              {/* A. Overview */}
              <div className="card fa2" style={{ padding: "28px 30px" }}>
                <div className="sec-head"><Ic n="globe" s={15} c="var(--green-lt)" />Overview</div>
                {trip.description.split("\n\n").map((para, i) => (
                  <p key={i} style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.8, marginBottom: i < 1 ? 16 : 0 }}>{para}</p>
                ))}
              </div>

              {/* Gallery */}
              <div className="fa2">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <Ic n="camera" s={14} c="var(--green-lt)" />
                  <span className="label-xs" style={{ fontSize: 11 }}>Gallery</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {trip.gallery.map((url, i) => (
                    <div key={i} className="gallery-img" style={{ aspectRatio: "1", background: "#1a2535" }}>
                      <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* B. Itinerary */}
              <div className="card fa3" style={{ padding: "28px 30px" }}>
                <div className="sec-head"><Ic n="cal" s={15} c="var(--green-lt)" />Itinerary</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {trip.itinerary.map((item, idx) => (
                    <div key={item.day} style={{ display: "flex", gap: 18, position: "relative", paddingBottom: idx < trip.itinerary.length - 1 ? 24 : 0 }}>
                      {/* Timeline stem */}
                      {idx < trip.itinerary.length - 1 && (
                        <div style={{ position: "absolute", left: 14, top: 32, bottom: 0, width: 1, background: "linear-gradient(to bottom, rgba(29,158,117,.35), transparent)" }} />
                      )}
                      {/* Node */}
                      <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", background: "rgba(29,158,117,.12)", border: "1px solid rgba(29,158,117,.3)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "var(--green-lt)" }}>{item.day}</span>
                      </div>
                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                          <span className="fraunces" style={{ fontSize: 16, fontWeight: 300, color: "#fff" }}>{item.title}</span>
                          <Ic n={item.icon} s={13} c="var(--muted)" />
                        </div>
                        <p style={{ fontSize: 13.5, color: "var(--dim)", lineHeight: 1.7 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* C. Inclusions / Exclusions */}
              <div className="card fa3" style={{ padding: "28px 30px" }}>
                <div className="sec-head"><Ic n="check2" s={15} c="var(--green-lt)" />What's Covered</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  {/* Inclusions */}
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--green-lt)", marginBottom: 14 }}>✓ Included</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {trip.inclusions.map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(29,158,117,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                            <Ic n="check" s={10} c="var(--green)" />
                          </div>
                          <span style={{ fontSize: 13.5, color: "var(--dim)", lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Exclusions */}
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,100,100,.6)", marginBottom: 14 }}>✕ Not Included</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {trip.exclusions.map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,80,80,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                            <Ic n="x" s={10} c="rgba(255,100,100,.7)" />
                          </div>
                          <span style={{ fontSize: 13.5, color: "var(--dim)", lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* D. Requirements */}
              <div className="card fa4" style={{ padding: "28px 30px" }}>
                <div className="sec-head"><Ic n="shield" s={15} c="var(--green-lt)" />Requirements & Guidelines</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {trip.requirements.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, padding: "14px 16px", background: "rgba(255,255,255,.025)", border: "1px solid var(--border)", borderRadius: 12 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(29,158,117,.1)", border: "1px solid rgba(29,158,117,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Ic n={r.icon} s={15} c="var(--green-lt)" />
                      </div>
                      <span style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.6, alignSelf: "center" }}>{r.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="fa4">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <Ic n="map" s={14} c="var(--green-lt)" />
                  <span className="label-xs">Route Map</span>
                </div>
                <div className="map-ph" style={{ height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <Ic n="globe" s={32} c="rgba(255,255,255,.15)" />
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>Interactive map — Spiti Valley Route</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)" }}>Manali → Kaza → Langza → Tabo → Dhankar</span>
                </div>
              </div>

              {/* Reviews */}
              <div className="fa5">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <Ic n="star" s={14} c="var(--green-lt)" />
                  <span className="label-xs">Traveller Reviews</span>
                  <span style={{ fontSize: 12, color: "var(--green-lt)", marginLeft: 4 }}>{trip.rating} · {trip.reviews.length} reviews</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                  {trip.reviews.map((rev, i) => (
                    <div key={i} className="review-card">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div className="avatar-sm">{rev.initials}</div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{rev.name}</div>
                            <div style={{ fontSize: 11, color: "var(--muted)" }}>{rev.date}</div>
                          </div>
                        </div>
                        <Stars n={rev.rating} size={11} />
                      </div>
                      <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.65 }}>{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ══ RIGHT: ACTION PANEL ══ */}
            <div className="fa2">
              <div className="action-panel">

                {/* Price header */}
                <div style={{ padding: "24px 24px 0", background: "linear-gradient(160deg, rgba(29,158,117,.08) 0%, transparent 60%)" }}>
                  <div className="label-xs" style={{ marginBottom: 6 }}>Price per person</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                    <span className="fraunces grad-text" style={{ fontSize: 38, fontWeight: 300, lineHeight: 1 }}>
                      ₹{trip.price.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 20 }}>includes all taxes & stays</div>

                  {/* Date strip */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                    {[
                      { label: "Start", value: trip.startDate, icon: "cal" },
                      { label: "End",   value: trip.endDate,   icon: "cal" },
                    ].map(f => (
                      <div key={f.label} style={{ background: "rgba(255,255,255,.04)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px" }}>
                        <div className="label-xs" style={{ marginBottom: 4 }}>{f.label}</div>
                        <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{f.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="divider" style={{ margin: "0 0 20px" }} />
                </div>

                <div style={{ padding: "0 24px 24px" }}>

                  {/* Seats */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Ic n="users" s={13} c="var(--muted)" />
                        <span style={{ fontSize: 13, color: "var(--dim)" }}>Seats Available</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: seatsLeft <= 3 ? "#f59e0b" : "var(--green-lt)" }}>
                        {seatsLeft} / {trip.seatsTotal}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    {seatsLeft <= 4 && (
                      <div style={{ marginTop: 8, fontSize: 12, color: "#f59e0b", display: "flex", alignItems: "center", gap: 5 }}>
                        <GlowDot style={{ background: "#f59e0b", boxShadow: "0 0 6px #f59e0b" }} />
                        Only {seatsLeft} {seatsLeft === 1 ? "seat" : "seats"} left — filling fast
                      </div>
                    )}
                  </div>

                  {/* JOIN BUTTON */}
                  <button
                    className={`btn-join ${joined ? "btn-join-done" : "btn-join-active"}`}
                    onClick={() => !joined && setJoined(true)}
                    disabled={joined}
                    style={{ marginBottom: 12, border: joined ? "1.5px solid rgba(29,158,117,.35)" : "none" }}
                  >
                    {joined ? (
                      <><Ic n="check2" s={17} c="var(--green-lt)" /> Joined ✓</>
                    ) : (
                      <><Ic n="arrow" s={17} /> Join This Trip</>
                    )}
                  </button>

                  {joined && (
                    <div style={{ background: "rgba(29,158,117,.08)", border: "1px solid rgba(29,158,117,.2)", borderRadius: 10, padding: "12px 14px", marginBottom: 12, fontSize: 13, color: "var(--dim)", lineHeight: 1.6 }}>
                      🎉 You're in! Arjun will reach out within 24 hours to confirm details.
                    </div>
                  )}

                  <button className="btn-outline" style={{ width: "100%", justifyContent: "center", marginBottom: 20 }}>
                    <Ic n="share" s={13} /> Share with Friends
                  </button>

                  <div className="divider" style={{ margin: "0 0 20px" }} />

                  {/* Host */}
                  <div style={{ marginBottom: 18 }}>
                    <div className="label-xs" style={{ marginBottom: 14 }}>Hosted by</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div className="avatar">{trip.host.initials}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{trip.host.name}</span>
                          {trip.host.verified && <Ic n="verified" s={14} c="var(--green)" />}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--muted)" }}>{trip.host.title}</div>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14 }}>
                      {[
                        { label: "Trips Led", value: trip.host.trips },
                        { label: "Rating",    value: trip.host.rating },
                        { label: "Since",     value: trip.host.joined },
                      ].map(s => (
                        <div key={s.label} style={{ textAlign: "center", background: "rgba(255,255,255,.03)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 6px" }}>
                          <div className="fraunces" style={{ fontSize: 17, fontWeight: 300, color: "#fff" }}>{s.value}</div>
                          <div className="label-xs">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <button className="btn-outline" style={{ width: "100%", justifyContent: "center", marginTop: 12, fontSize: 12 }}>
                      <Ic n="user" s={13} /> View Host Profile
                    </button>
                  </div>

                  {/* Safety note */}
                  <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10 }}>
                    <Ic n="shield" s={15} c="var(--green)" />
                    <span style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>TripUnite verifies all hosts and trips. Your booking is protected.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}