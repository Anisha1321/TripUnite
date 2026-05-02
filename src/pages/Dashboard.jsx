// import { useState, useEffect, useRef } from "react";

// /* ─── Inject global styles ─────────────────────────────────────────────── */
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Fraunces:ital,wght@0,300;0,400;1,300&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   :root {
//     --bg-primary: #0D1117;
//     --bg-secondary: #111827;
//     --accent: #1D9E75;
//     --accent-light: #5DCAA5;
//     --accent-muted: #9FE1CB;
//     --border: rgba(255,255,255,0.06);
//     --border-hover: #1D9E75;
//     --text-primary: #F3F4F6;
//     --text-secondary: #9CA3AF;
//     --text-muted: #6B7280;
//   }

//   html { scroll-behavior: smooth; }

//   body {
//     background: var(--bg-primary);
//     color: var(--text-primary);
//     font-family: 'DM Sans', system-ui, sans-serif;
//     font-weight: 300;
//     line-height: 1.65;
//     min-height: 100vh;
//   }

//   .grad-text {
//     background: linear-gradient(135deg, #5DCAA5 0%, #1D9E75 50%, #9FE1CB 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   .btn-primary {
//     background: linear-gradient(135deg, #1D9E75, #0F6E56);
//     color: #fff;
//     border: none;
//     border-radius: 12px;
//     padding: 10px 24px;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 14px;
//     font-weight: 400;
//     cursor: pointer;
//     transition: opacity .2s ease, transform .2s ease;
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     white-space: nowrap;
//   }
//   .btn-primary:hover { opacity: .88; transform: translateY(-1px); }

//   .btn-outline {
//     background: transparent;
//     color: var(--text-secondary);
//     border: 1px solid rgba(255,255,255,0.1);
//     border-radius: 12px;
//     padding: 10px 24px;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 14px;
//     font-weight: 400;
//     cursor: pointer;
//     transition: background .2s ease, color .2s ease, transform .2s ease;
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     white-space: nowrap;
//   }
//   .btn-outline:hover { background: rgba(29,158,117,.1); color: var(--accent-light); transform: translateY(-1px); }

//   .card {
//     background: var(--bg-secondary);
//     border: 1px solid var(--border);
//     border-radius: 16px;
//     transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
//   }
//   .card:hover {
//     transform: translateY(-3px);
//     border-color: var(--border-hover);
//     box-shadow: 0 8px 32px rgba(29,158,117,.12);
//   }

//   .fade-in {
//     opacity: 0;
//     transform: translateY(28px);
//     transition: opacity .6s ease, transform .6s ease;
//   }
//   .fade-in.visible { opacity: 1; transform: translateY(0); }

//   /* Responsive layout */
//   .main-layout {
//     display: grid;
//     grid-template-columns: 1fr 320px;
//     gap: 24px;
//     align-items: start;
//   }
//   .sidebar { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 24px; }

//   @media (max-width: 900px) {
//     .main-layout { grid-template-columns: 1fr; }
//     .sidebar { position: static; }
//   }
//   @media (max-width: 600px) {
//     .btn-primary, .btn-outline { padding: 9px 16px; font-size: 13px; }
//     .profile-progress-row { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
//     .profile-progress-row button { width: 100%; justify-content: center; }
//   }

//   /* Scrollbar */
//   ::-webkit-scrollbar { width: 6px; }
//   ::-webkit-scrollbar-track { background: var(--bg-primary); }
//   ::-webkit-scrollbar-thumb { background: rgba(29,158,117,.3); border-radius: 3px; }

//   /* Noise overlay */
//   .noise::before {
//     content: '';
//     position: fixed;
//     inset: 0;
//     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
//     opacity: .018;
//     pointer-events: none;
//     z-index: 9999;
//   }

//   input[type="text"] {
//     background: var(--bg-secondary);
//     border: 1px solid var(--border);
//     border-radius: 10px;
//     color: var(--text-primary);
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 300;
//     font-size: 14px;
//     padding: 9px 14px;
//     outline: none;
//     transition: border-color .2s ease;
//     width: 100%;
//   }
//   input[type="text"]:focus { border-color: var(--accent); }
//   input::placeholder { color: var(--text-muted); }

//   select {
//     background: var(--bg-secondary);
//     border: 1px solid var(--border);
//     border-radius: 10px;
//     color: var(--text-secondary);
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 300;
//     font-size: 13px;
//     padding: 9px 12px;
//     outline: none;
//     cursor: pointer;
//     appearance: none;
//     -webkit-appearance: none;
//   }
// `;

// /* ─── Inject styles once ─────────────────────────────────────────────────── */
// function StyleInjector() {
//   useEffect(() => {
//     if (!document.getElementById("tu-global")) {
//       const el = document.createElement("style");
//       el.id = "tu-global";
//       el.textContent = GLOBAL_CSS;
//       document.head.appendChild(el);
//     }
//   }, []);
//   return null;
// }

// /* ─── FadeIn wrapper ─────────────────────────────────────────────────────── */
// function FadeIn({ children, delay = 0, style = {} }) {
//   const ref = useRef(null);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     el.style.transitionDelay = `${delay}s`;
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
//     }, { threshold: 0.1 });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [delay]);
//   return <div ref={ref} className="fade-in" style={style}>{children}</div>;
// }

// /* ─── Thin SVG icons ──────────────────────────────────────────────────────── */
// const Icon = ({ d, size = 16 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
//     stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
//     <path d={d} />
//   </svg>
// );
// const Icons = {
//   map:       "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
//   calendar:  "M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
//   users:     "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
//   eye:       "M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
//   edit:      "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
//   chat:      "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
//   bookmark:  "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
//   search:    "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
//   bell:      "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
//   compass:   "M12 2a10 10 0 100 20A10 10 0 0012 2zm4.93 6.93l-3.36 5.83-5.83 3.36 3.36-5.83 5.83-3.36z",
//   star:      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
//   clock:     "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l4 2",
//   plus:      "M12 5v14M5 12h14",
//   x:         "M18 6L6 18M6 6l12 12",
//   check:     "M20 6L9 17l-5-5",
//   user:      "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
//   arrow:     "M5 12h14M12 5l7 7-7 7",
//   filter:    "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
// };

// /* ─── Badge ──────────────────────────────────────────────────────────────── */
// function Badge({ label, color }) {
//   const map = {
//     upcoming:  { bg: "rgba(29,158,117,.15)", text: "#5DCAA5", border: "rgba(29,158,117,.3)" },
//     host:      { bg: "rgba(93,202,165,.12)", text: "#9FE1CB", border: "rgba(93,202,165,.25)" },
//     member:    { bg: "rgba(100,116,139,.15)", text: "#94A3B8", border: "rgba(100,116,139,.3)" },
//     completed: { bg: "rgba(59,130,246,.12)", text: "#93C5FD", border: "rgba(59,130,246,.25)" },
//     draft:     { bg: "rgba(234,179,8,.1)", text: "#FCD34D", border: "rgba(234,179,8,.25)" },
//     saved:     { bg: "rgba(168,85,247,.1)", text: "#C4B5FD", border: "rgba(168,85,247,.25)" },
//     incomplete:{ bg: "rgba(239,68,68,.1)", text: "#FCA5A5", border: "rgba(239,68,68,.25)" },
//   };
//   const s = map[color] || map.upcoming;
//   return (
//     <span style={{
//       background: s.bg, color: s.text,
//       border: `1px solid ${s.border}`,
//       borderRadius: 8, padding: "2px 10px",
//       fontSize: 11, fontWeight: 400, letterSpacing: ".4px",
//       textTransform: "uppercase", whiteSpace: "nowrap",
//     }}>{label}</span>
//   );
// }

// /* ─── Trip Card ──────────────────────────────────────────────────────────── */
// function TripCard({ trip, dimmed = false }) {
//   return (
//     <div className="card" style={{
//       padding: 20,
//       opacity: dimmed ? .45 : 1,
//       filter: dimmed ? "grayscale(60%)" : "none",
//       display: "flex", flexDirection: "column", gap: 14,
//     }}>
//       {/* Top row */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
//         <div>
//           <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
//             <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
//               <Icon d={Icons.map} size={13} />
//               {trip.destination}
//             </span>
//           </div>
//           <p style={{ fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-.3px" }}>
//             {trip.name}
//           </p>
//         </div>
//         <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
//           <Badge label={trip.status} color={trip.status.toLowerCase()} />
//           <Badge label={trip.role} color={trip.role.toLowerCase()} />
//         </div>
//       </div>

//       {/* Meta row */}
//       <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
//         <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
//           <Icon d={Icons.calendar} size={12} />
//           {trip.dates}
//         </span>
//         <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
//           <Icon d={Icons.users} size={12} />
//           {trip.travellers} traveller{trip.travellers !== 1 ? "s" : ""}
//         </span>
//         {trip.countdown && (
//           <span style={{ fontSize: 12, color: "var(--accent-light)", display: "flex", alignItems: "center", gap: 5 }}>
//             <Icon d={Icons.clock} size={12} />
//             {trip.countdown}
//           </span>
//         )}
//       </div>

//       {/* Divider */}
//       <div style={{ borderTop: "1px solid var(--border)" }} />

//       {/* Actions */}
//       <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//         <button className="btn-outline" style={{ padding: "6px 16px", fontSize: 12 }}>
//           <Icon d={Icons.eye} size={13} /> View
//         </button>
//         {trip.showChat && (
//           <button className="btn-outline" style={{ padding: "6px 16px", fontSize: 12 }}>
//             <Icon d={Icons.chat} size={13} /> Chat
//           </button>
//         )}
//         {trip.showEdit && (
//           <button className="btn-primary" style={{ padding: "6px 16px", fontSize: 12 }}>
//             <Icon d={Icons.edit} size={13} /> Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ─── Empty State ────────────────────────────────────────────────────────── */
// function EmptyState({ icon, message, cta }) {
//   return (
//     <div style={{
//       textAlign: "center", padding: "40px 24px",
//       border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 16,
//       background: "rgba(255,255,255,.015)",
//     }}>
//       <div style={{ color: "var(--accent)", marginBottom: 14, opacity: .6 }}>
//         <Icon d={icon} size={30} />
//       </div>
//       <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 18, maxWidth: 280, margin: "0 auto 18px" }}>{message}</p>
//       {cta && <button className="btn-primary" style={{ fontSize: 13 }}>{cta}</button>}
//     </div>
//   );
// }

// /* ─── Section Header ─────────────────────────────────────────────────────── */
// function SectionHeader({ title, count }) {
//   return (
//     <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20 }}>
//       <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 22, letterSpacing: "-.4px", color: "var(--text-primary)" }}>
//         {title}
//       </h2> 
//       {count !== undefined && (
//         <span style={{ fontSize: 12, color: "var(--text-muted)", background: "rgba(255,255,255,.05)", border: "1px solid var(--border)", borderRadius: 20, padding: "1px 8px" }}>
//           {count}
//         </span>
//       )}
//     </div>
//   );
// }

// /* ─── Cards Grid ─────────────────────────────────────────────────────────── */
// function TripGrid({ trips, dimmed = false, emptyIcon, emptyMsg, emptyCta }) {
//   if (!trips.length) return <EmptyState icon={emptyIcon} message={emptyMsg} cta={emptyCta} />;
//   return (
//     <div style={{
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//       gap: 16,
//     }}>
//       {trips.map((t, i) => (
//         <FadeIn key={t.id} delay={i * 0.08}>
//           <TripCard trip={t} dimmed={dimmed && new Date(t.endDate) < new Date()} />
//         </FadeIn>
//       ))}
//     </div>
//   );
// }

// /* ─── Progress Bar ───────────────────────────────────────────────────────── */
// function ProfileProgress({ pct = 70 }) {
//   return (
//     <div className="card profile-progress-row" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
//       <div style={{ flex: 1 }}>
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//           <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Profile completion</span>
//           <span style={{ fontSize: 13, color: "var(--accent-light)", fontWeight: 400 }}>{pct}%</span>
//         </div>
//         <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,.07)", overflow: "hidden" }}>
//           <div style={{
//             height: "100%", borderRadius: 4,
//             width: `${pct}%`,
//             background: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
//             transition: "width 1s ease",
//           }} />
//         </div>
//       </div>
//       <button className="btn-outline" style={{ padding: "6px 14px", fontSize: 12, flexShrink: 0 }}>
//         Complete profile
//       </button>
//     </div>
//   );
// }

// /* ─── Notification Item ──────────────────────────────────────────────────── */
// function NotifItem({ icon, text, time }) {
//   return (
//     <div style={{
//       display: "flex", alignItems: "flex-start", gap: 12,
//       padding: "12px 0", borderBottom: "1px solid var(--border)",
//     }}>
//       <div style={{
//         width: 32, height: 32, borderRadius: 8,
//         background: "rgba(29,158,117,.12)", border: "1px solid rgba(29,158,117,.2)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         color: "var(--accent)", flexShrink: 0,
//       }}>
//         <Icon d={icon} size={14} />
//       </div>
//       <div style={{ flex: 1 }}>
//         <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{text}</p>
//         <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{time}</p>
//       </div>
//     </div>
//   );
// }

// /* ─── Sidebar / Activity ──────────────────────────────────────────────────── */
// function ActivityPanel() {
//   const notifs = [
//     { icon: Icons.users, text: "3 travellers joined your Kyoto Spring trip", time: "2 hours ago" },
//     { icon: Icons.clock, text: "Your Bali trip starts in 3 days — check packing list", time: "5 hours ago" },
//     { icon: Icons.star, text: "Riya left a review on your hosted Paris trip", time: "Yesterday" },
//     { icon: Icons.bell, text: "New message in Patagonia group chat", time: "2 days ago" },
//   ];
//   return (
//     <div className="card" style={{ padding: 20 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
//         <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 17, letterSpacing: "-.3px" }}>Activity</h3>
//         <span style={{ fontSize: 11, background: "rgba(29,158,117,.15)", color: "var(--accent-light)", borderRadius: 20, padding: "2px 8px", border: "1px solid rgba(29,158,117,.25)" }}>4 new</span>
//       </div>
//       <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>Recent updates across your trips</p>
//       {notifs.map((n, i) => <NotifItem key={i} {...n} />)}
//       <button className="btn-outline" style={{ width: "100%", justifyContent: "center", marginTop: 14, fontSize: 12 }}>
//         View all notifications
//       </button>
//     </div>
//   );
// }

// /* ─── Quick Stats ─────────────────────────────────────────────────────────── */
// function QuickStats({ upcoming, hosted, saved, completed }) {
//   const items = [
//     { label: "Upcoming", value: upcoming, icon: Icons.compass },
//     { label: "Hosted", value: hosted, icon: Icons.star },
//     { label: "Saved", value: saved, icon: Icons.bookmark },
//     { label: "Completed", value: completed, icon: Icons.check },
//   ];
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12 }}>
//       {items.map((s, i) => (
//         <FadeIn key={s.label} delay={i * 0.07}>
//           <div className="card" style={{ padding: "16px", textAlign: "center" }}>
//             <div style={{ color: "var(--accent)", marginBottom: 8, display: "flex", justifyContent: "center" }}>
//               <Icon d={s.icon} size={18} />
//             </div>
//             <p style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 26, letterSpacing: "-.5px" }} className="grad-text">{s.value}</p>
//             <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</p>
//           </div>
//         </FadeIn>
//       ))}
//     </div>
//   );
// }

// /* ─── Search & Filter Bar ──────────────────────────────────────────────────── */
// function FilterBar({ query, onQuery, filter, onFilter }) {
//   return (
//     <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
//       <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
//         <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>
//           <Icon d={Icons.search} size={14} />
//         </span>
//         <input type="text" placeholder="Search trips…" value={query} onChange={e => onQuery(e.target.value)}
//           style={{ paddingLeft: 32 }} />
//       </div>
//       <div style={{ position: "relative" }}>
//         <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>
//           <Icon d={Icons.filter} size={13} />
//         </span>
//         <select value={filter} onChange={e => onFilter(e.target.value)} style={{ paddingLeft: 28 }}>
//           <option value="all">All</option>
//           <option value="host">Host only</option>
//           <option value="member">Member only</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// /* ─── Tab Bar ─────────────────────────────────────────────────────────────── */
// function TabBar({ tabs, active, onChange }) {
//   return (
//     <div style={{ display: "flex", gap: 2, borderBottom: "1px solid var(--border)", marginBottom: 24, overflowX: "auto" }}>
//       {tabs.map(t => (
//         <button key={t.id} onClick={() => onChange(t.id)} style={{
//           background: "none", border: "none", cursor: "pointer",
//           padding: "10px 18px", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
//           color: active === t.id ? "var(--accent-light)" : "var(--text-muted)",
//           borderBottom: active === t.id ? "2px solid var(--accent)" : "2px solid transparent",
//           marginBottom: -1, transition: "color .2s ease, border-color .2s ease",
//           whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 7,
//         }}>
//           <Icon d={t.icon} size={13} />
//           {t.label}
//           {t.count > 0 && (
//             <span style={{ fontSize: 10, background: active === t.id ? "rgba(29,158,117,.2)" : "rgba(255,255,255,.06)", color: active === t.id ? "var(--accent-light)" : "var(--text-muted)", borderRadius: 10, padding: "1px 6px" }}>
//               {t.count}
//             </span>
//           )}
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ─── DATA ───────────────────────────────────────────────────────────────── */
// const ALL_TRIPS = [
//   { id: 1,  name: "Cherry Blossom Walk",   destination: "Kyoto, Japan",     dates: "Apr 10 – Apr 18, 2025", endDate: "2025-04-18", travellers: 6,  role: "Host",   status: "Upcoming",  countdown: "Starts in 3 days", showChat: true,  showEdit: false },
//   { id: 2,  name: "Island Hopping Week",   destination: "Bali, Indonesia",  dates: "May 3 – May 10, 2025",  endDate: "2025-05-10", travellers: 4,  role: "Member", status: "Upcoming",  countdown: "Starts in 18 days", showChat: true, showEdit: false },
//   { id: 3,  name: "Swiss Alps Trekking",   destination: "Interlaken, CH",   dates: "Jun 20 – Jun 28, 2025", endDate: "2025-06-28", travellers: 8,  role: "Host",   status: "Upcoming",  countdown: "Starts in 56 days", showChat: true, showEdit: false },
//   { id: 4,  name: "Midnight Sun Voyage",   destination: "Tromsø, Norway",   dates: "Jul 1 – Jul 8, 2025",   endDate: "2025-07-08", travellers: 5,  role: "Member", status: "Saved",     countdown: null, showChat: false, showEdit: false },
//   { id: 5,  name: "Sahara Sunset Camp",    destination: "Merzouga, Morocco",dates: "Aug 14 – Aug 20, 2025", endDate: "2025-08-20", travellers: 3,  role: "Member", status: "Saved",     countdown: null, showChat: false, showEdit: false },
//   { id: 6,  name: "Coastal Road Trip",     destination: "Amalfi, Italy",    dates: "Feb 12 – Feb 20, 2025", endDate: "2025-02-20", travellers: 4,  role: "Member", status: "Saved",     countdown: null, showChat: false, showEdit: false },
//   { id: 7,  name: "Patagonia Expedition",  destination: "Torres del Paine", dates: "TBD 2025",              endDate: "2099-01-01", travellers: 0,  role: "Host",   status: "Draft",     countdown: null, showChat: false, showEdit: true  },
//   { id: 8,  name: "Southeast Asia Loop",   destination: "Multiple cities",  dates: "TBD 2025",              endDate: "2099-01-01", travellers: 0,  role: "Host",   status: "Draft",     countdown: null, showChat: false, showEdit: true  },
//   { id: 9,  name: "Montmartre Wander",     destination: "Paris, France",    dates: "Oct 5 – Oct 12, 2024",  endDate: "2024-10-12", travellers: 6,  role: "Host",   status: "Completed", countdown: null, showChat: false, showEdit: false },
//   { id: 10, name: "Havana Nights",         destination: "Havana, Cuba",     dates: "Nov 3 – Nov 9, 2024",   endDate: "2024-11-09", travellers: 5,  role: "Member", status: "Completed", countdown: null, showChat: false, showEdit: false },
//   { id: 11, name: "Desert Stargazing",     destination: "Wadi Rum, Jordan", dates: "Dec 20 – Dec 26, 2024", endDate: "2024-12-26", travellers: 7,  role: "Host",   status: "Completed", countdown: null, showChat: false, showEdit: false },
// ];

// /* ─── Main Dashboard ─────────────────────────────────────────────────────── */
// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("upcoming");
//   const [query, setQuery] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");

//   const filter = (trips) => trips.filter(t => {
//     const q = query.toLowerCase();
//     const matchQ = !q || t.name.toLowerCase().includes(q) || t.destination.toLowerCase().includes(q);
//     const matchR = roleFilter === "all" || t.role.toLowerCase() === roleFilter;
//     return matchQ && matchR;
//   });

//   const upcoming  = filter(ALL_TRIPS.filter(t => t.status === "Upcoming"));
//   const saved     = filter(ALL_TRIPS.filter(t => t.status === "Saved"));
//   const drafts    = filter(ALL_TRIPS.filter(t => t.status === "Draft"));
//   const past      = filter(ALL_TRIPS.filter(t => t.status === "Completed"));
//   const hosted    = filter(ALL_TRIPS.filter(t => t.status === "Completed" && t.role === "Host"));

//   const tabs = [
//     { id: "upcoming",  label: "Upcoming",    icon: Icons.compass,  count: upcoming.length },
//     { id: "saved",     label: "Saved",       icon: Icons.bookmark, count: saved.length    },
//     { id: "drafts",    label: "Drafts",      icon: Icons.edit,     count: drafts.length   },
//     { id: "past",      label: "Past Trips",  icon: Icons.clock,    count: past.length     },
//     { id: "hosted",    label: "Hosted",      icon: Icons.star,     count: hosted.length   },
//   ];

//   const renderSection = () => {
//     switch (activeTab) {
//       case "upcoming": return (
//         <>
//           <SectionHeader title="Upcoming Trips" count={upcoming.length} />
//           <TripGrid trips={upcoming} emptyIcon={Icons.compass} emptyMsg="No upcoming trips. Start exploring and find your travel crew." emptyCta="Explore Trips" />
//         </>
//       );
//       case "saved": return (
//         <>
//           <SectionHeader title="Saved Trips" count={saved.length} />
//           <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>
//             Dimmed cards indicate trips whose dates have passed.
//           </p>
//           <TripGrid trips={saved} dimmed emptyIcon={Icons.bookmark} emptyMsg="No saved trips yet. Bookmark trips you're interested in." emptyCta="Browse Trips" />
//         </>
//       );
//       case "drafts": return (
//         <>
//           <SectionHeader title="Draft Trips" count={drafts.length} />
//           <TripGrid trips={drafts} emptyIcon={Icons.edit} emptyMsg="No drafts yet. Start creating your perfect trip." emptyCta="Create a Trip" />
//         </>
//       );
//       case "past": return (
//         <>
//           <SectionHeader title="Past Trips" count={past.length} />
//           <TripGrid trips={past} emptyIcon={Icons.clock} emptyMsg="No past trips yet. Your completed adventures will appear here." emptyCta={null} />
//         </>
//       );
//       case "hosted": return (
//         <>
//           <SectionHeader title="Trips You've Hosted" count={hosted.length} />
//           <TripGrid trips={hosted} emptyIcon={Icons.star} emptyMsg="You haven't hosted any completed trips yet. Create your first trip." emptyCta="Create a Trip" />
//         </>
//       );
//       default: return null;
//     }
//   };

//   return (
//     <>
//       <StyleInjector />
//       <div className="noise" style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>

//         {/* Radial glow top */}
//         <div style={{
//           position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
//           width: 700, height: 350, borderRadius: "50%",
//           background: "radial-gradient(ellipse, rgba(29,158,117,.07) 0%, transparent 70%)",
//           pointerEvents: "none", zIndex: 0,
//         }} />

//         <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px 80px", position: "relative", zIndex: 1 }}>

//           {/* ── Top Hero ─────────────────────────────────────────── */}
//           <div style={{ paddingTop: 56, paddingBottom: 40 }}>
//             <FadeIn delay={0}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
//                 <div style={{
//                   width: 6, height: 6, borderRadius: "50%",
//                   background: "var(--accent)", boxShadow: "0 0 8px var(--accent)",
//                 }} />
//                 <span style={{ fontSize: 12, color: "var(--accent-light)", letterSpacing: ".8px", textTransform: "uppercase" }}>
//                   Your Dashboard
//                 </span>
//               </div>
//               <h1 style={{
//                 fontFamily: "'Fraunces', serif", fontWeight: 300,
//                 fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-1px",
//                 color: "var(--text-primary)", lineHeight: 1.15, marginBottom: 14,
//               }}>
//                 Welcome back, <span className="grad-text">Traveler</span>
//               </h1>
//               <p style={{
//                 fontSize: 15, color: "var(--text-secondary)", maxWidth: 560,
//                 lineHeight: 1.75, marginBottom: 28,
//               }}>
//                 The best journeys are shared. Whether you're planning your next escape or looking for the right people to join you — your adventure starts here.
//               </p>
//               <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//                 <button className="btn-primary">
//                   <Icon d={Icons.compass} size={15} /> Explore Trips
//                 </button>
//                 <button className="btn-outline">
//                   <Icon d={Icons.plus} size={15} /> Create a Trip
//                 </button>
//               </div>
//             </FadeIn>
//           </div>

//           {/* ── Profile Progress ───────────────────────────────── */}
//           <FadeIn delay={0.1}>
//             <div style={{ marginBottom: 32 }}>
//               <ProfileProgress pct={70} />
//             </div>
//           </FadeIn>

//           {/* ── Quick Stats ────────────────────────────────────── */}
//           <FadeIn delay={0.15}>
//             <div style={{ marginBottom: 40 }}>
//               <QuickStats upcoming={3} hosted={2} saved={3} completed={5} />
//             </div>
//           </FadeIn>

//           {/* ── Main Content + Sidebar ─────────────────────────── */}
//           <div className="main-layout">

//             {/* Main column */}
//             <div>
//               {/* Filter bar */}
//               <FadeIn delay={0.18}>
//                 <div style={{ marginBottom: 24 }}>
//                   <FilterBar query={query} onQuery={setQuery} filter={roleFilter} onFilter={setRoleFilter} />
//                 </div>
//               </FadeIn>

//               {/* Tabs */}
//               <FadeIn delay={0.2}>
//                 <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
//               </FadeIn>

//               {/* Section */}
//               <div>{renderSection()}</div>
//             </div>

//             {/* Sidebar */}
//             <div className="sidebar">
//               <FadeIn delay={0.22}>
//                 <ActivityPanel />
//               </FadeIn>

//               {/* Quick actions card */}
//               <FadeIn delay={0.28}>
//                 <div className="card" style={{ padding: 20 }}>
//                   <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 17, letterSpacing: "-.3px", marginBottom: 14 }}>
//                     Quick Actions
//                   </h3>
//                   <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                     {[
//                       { label: "Create a new trip", icon: Icons.plus, primary: true },
//                       { label: "Find travel mates", icon: Icons.users, primary: false },
//                       { label: "Complete verification", icon: Icons.check, primary: false },
//                     ].map(a => (
//                       <button key={a.label} className={a.primary ? "btn-primary" : "btn-outline"}
//                         style={{ justifyContent: "flex-start", width: "100%", fontSize: 13 }}>
//                         <Icon d={a.icon} size={14} /> {a.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </FadeIn>

//               {/* Verification nudge */}
//               <FadeIn delay={0.32}>
//                 <div style={{
//                   border: "1px solid rgba(29,158,117,.2)", borderRadius: 16, padding: 18,
//                   background: "rgba(29,158,117,.04)",
//                 }}>
//                   <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
//                     <div style={{ color: "var(--accent)", marginTop: 1 }}><Icon d={Icons.check} size={16} /></div>
//                     <div>
//                       <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 400, marginBottom: 4 }}>
//                         Verify your identity
//                       </p>
//                       <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 12 }}>
//                         Verified members get 3× more trip invites and appear higher in search results.
//                       </p>
//                       <button className="btn-primary" style={{ fontSize: 12, padding: "6px 16px" }}>
//                         Verify now <Icon d={Icons.arrow} size={12} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </FadeIn>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




import { useState } from "react";

// ⚠️ IMPORTANT: Import the CSS file instead of runtime style injection
// This fixes the "styling hampered on back navigation" bug
import "../components/dashboard/dashboard.css";
import Navbar from "../components/explore/Navbar";

import FadeIn from "../components/dashboard/FadeIn";
import { Icon, Icons } from "../components/dashboard/Icons";
import ProfileProgress from "../components/dashboard/ProfileProgress";
import QuickStats from "../components/dashboard/QuickStats";
import FilterBar from "../components/dashboard/FilterBar";
import TabBar from "../components/dashboard/TabBar";
import SectionHeader from "../components/dashboard/SectionHeader";
import TripGrid from "../components/dashboard/TripGrid";
import ActivityPanel from "../components/dashboard/ActivityPanel";
import { ALL_TRIPS } from "../data/dashboardData";

// ─── Quick Actions sidebar card ───────────────────────────────────────────
function QuickActionsCard() {
  const actions = [
    { label: "Create a new trip",      icon: Icons.plus,  primary: true  },
    { label: "Find travel mates",      icon: Icons.users, primary: false },
    { label: "Complete verification",  icon: Icons.check, primary: false },
  ];
  return (
    <div className="card" style={{ padding: 20 }}>
      <h3
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 300,
          fontSize: 17,
          letterSpacing: "-.3px",
          marginBottom: 14,
          color: "white"
        }}
      >
        Quick Actions
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {actions.map((a) => (
          <button
            key={a.label}
            className={a.primary ? "btn-primary" : "btn-outline"}
            style={{ justifyContent: "flex-start", width: "100%", fontSize: 13 }}
          >
            <Icon d={a.icon} size={14} /> {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Verification nudge ───────────────────────────────────────────────────
function VerificationNudge() {
  return (
    <div
      style={{
        border: "1px solid rgba(29,158,117,.2)",
        borderRadius: 16,
        padding: 18,
        background: "rgba(29,158,117,.04)",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ color: "var(--accent)", marginTop: 1 }}>
          <Icon d={Icons.check} size={16} />
        </div>
        <div>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 400, marginBottom: 4 }}>
            Verify your identity
          </p>
          <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 12 }}>
            Verified members get 3× more trip invites and appear higher in search results.
          </p>
          <button className="btn-primary" style={{ fontSize: 12, padding: "6px 16px" }}>
            Verify now <Icon d={Icons.arrow} size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const applyFilters = (trips) =>
    trips.filter((t) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q);
      const matchR =
        roleFilter === "all" || t.role.toLowerCase() === roleFilter;
      return matchQ && matchR;
    });

  const upcoming  = applyFilters(ALL_TRIPS.filter((t) => t.status === "Upcoming"));
  const saved     = applyFilters(ALL_TRIPS.filter((t) => t.status === "Saved"));
  const drafts    = applyFilters(ALL_TRIPS.filter((t) => t.status === "Draft"));
  const past      = applyFilters(ALL_TRIPS.filter((t) => t.status === "Completed"));
  const hosted    = applyFilters(ALL_TRIPS.filter((t) => t.status === "Completed" && t.role === "Host"));

  const tabs = [
    { id: "upcoming", label: "Upcoming",   icon: Icons.compass,  count: upcoming.length },
    { id: "saved",    label: "Saved",      icon: Icons.bookmark, count: saved.length    },
    { id: "drafts",   label: "Drafts",     icon: Icons.edit,     count: drafts.length   },
    { id: "past",     label: "Past Trips", icon: Icons.clock,    count: past.length     },
    { id: "hosted",   label: "Hosted",     icon: Icons.star,     count: hosted.length   },
  ];

  const renderSection = () => {
    switch (activeTab) {
      case "upcoming":
        return (
          <>
            <SectionHeader title="Upcoming Trips" count={upcoming.length} />
            <TripGrid
              trips={upcoming}
              emptyIcon={Icons.compass}
              emptyMsg="No upcoming trips. Start exploring and find your travel crew."
              emptyCta="Explore Trips"
            />
          </>
        );
      case "saved":
        return (
          <>
            <SectionHeader title="Saved Trips" count={saved.length} />
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>
              Dimmed cards indicate trips whose dates have passed.
            </p>
            <TripGrid
              trips={saved}
              dimmed
              emptyIcon={Icons.bookmark}
              emptyMsg="No saved trips yet. Bookmark trips you're interested in."
              emptyCta="Browse Trips"
            />
          </>
        );
      case "drafts":
        return (
          <>
            <SectionHeader title="Draft Trips" count={drafts.length} />
            <TripGrid
              trips={drafts}
              emptyIcon={Icons.edit}
              emptyMsg="No drafts yet. Start creating your perfect trip."
              emptyCta="Create a Trip"
            />
          </>
        );
      case "past":
        return (
          <>
            <SectionHeader title="Past Trips" count={past.length} />
            <TripGrid
              trips={past}
              emptyIcon={Icons.clock}
              emptyMsg="No past trips yet. Your completed adventures will appear here."
            />
          </>
        );
      case "hosted":
        return (
          <>
            <SectionHeader title="Trips You've Hosted" count={hosted.length} />
            <TripGrid
              trips={hosted}
              emptyIcon={Icons.star}
              emptyMsg="You haven't hosted any completed trips yet. Create your first trip."
              emptyCta="Create a Trip"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="noise dashboard-root" style={{ minHeight: "100vh", background: "var(--bg-primary)" , overflowX: "hidden", width: "100%"}}>
      
      {/* Radial glow */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(29,158,117,.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 24px 80px",
          position: "relative",
          zIndex: 1,
          width: "100%",
          overflowX: "hidden"
        }}
      >
        {/* ── Hero ─────────────────────────────────────── */}
        <div style={{ paddingTop: 56, paddingBottom: 40 }}>
          <FadeIn delay={0}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent)",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "var(--accent-light)",
                  letterSpacing: ".8px",
                  textTransform: "uppercase",
                }}
              >
                Your Dashboard
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontSize: "clamp(32px, 5vw, 52px)",
                letterSpacing: "-1px",
                color: "var(--text-primary)",
                lineHeight: 1.15,
                marginBottom: 14,
              }}
            >
              Welcome back, <span className="grad-text">Traveler</span>
            </h1>

            <p
              style={{
                fontSize: 15,
                color: "var(--text-secondary)",
                maxWidth: 560,
                lineHeight: 1.75,
                marginBottom: 28,
              }}
            >
              The best journeys are shared. Whether you're planning your next escape or looking
              for the right people to join you — your adventure starts here.
            </p>

            <div
              className="hero-actions"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <button className="btn-primary">
                <Icon d={Icons.compass} size={15} /> Explore Trips
              </button>
              <button className="btn-outline">
                <Icon d={Icons.plus} size={15} /> Create a Trip
              </button>
            </div>
          </FadeIn>
        </div>

        {/* ── Profile Progress ──────────────────────────── */}
        <FadeIn delay={0.1}>
          <div style={{ marginBottom: 32 }}>
            <ProfileProgress pct={70} />
          </div>
        </FadeIn>

        {/* ── Quick Stats ───────────────────────────────── */}
        <FadeIn delay={0.15}>
          <div style={{ marginBottom: 40 }}>
            <QuickStats upcoming={3} hosted={2} saved={3} completed={5} />
          </div>
        </FadeIn>

        {/* ── Main + Sidebar ────────────────────────────── */}
        <div className="main-layout">
          {/* Main column */}
          <div>
            <FadeIn delay={0.18}>
              <div style={{ marginBottom: 24 }}>
                <FilterBar
                  query={query}
                  onQuery={setQuery}
                  filter={roleFilter}
                  onFilter={setRoleFilter}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
            </FadeIn>

            <div>{renderSection()}</div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <FadeIn delay={0.22}>
              <ActivityPanel />
            </FadeIn>
            <FadeIn delay={0.28}>
              <QuickActionsCard />
            </FadeIn>
            <FadeIn delay={0.32}>
              <VerificationNudge />
            </FadeIn>
          </div>
        </div>
      </div>
      </div>
    </>

    
  );
}